import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, orders, orderItems, invoices, Order, OrderItem, InsertOrderItem, Invoice } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

/**
 * إدارة المستخدمين
 */
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "phone", "address", "city", "country", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateUserProfile(userId: number, data: Partial<InsertUser>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update user: database not available");
    return;
  }

  const updateData: Record<string, unknown> = {};
  const allowedFields = ["name", "email", "phone", "address", "city", "country"] as const;
  
  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  });

  if (Object.keys(updateData).length === 0) return;

  await db.update(users).set(updateData).where(eq(users.id, userId));
}

/**
 * إدارة الطلبات
 */
export async function createOrder(userId: number, totalAmount: number, currency: string = "ريال") {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create order: database not available");
    return null;
  }

  const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const result = await db.insert(orders).values({
    userId,
    orderNumber,
    totalAmount: totalAmount.toString(),
    currency,
    status: "pending",
    paymentStatus: "pending",
  });

  return result;
}

export async function getUserOrders(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get orders: database not available");
    return [];
  }

  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));

  return userOrders;
}

export async function getOrderDetails(orderId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get order details: database not available");
    return { order: null, items: [] };
  }

  const order = await db.select().from(orders).where(eq(orders.id, orderId)).limit(1);
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));

  return {
    order: order.length > 0 ? order[0] : null,
    items,
  };
}

export async function updateOrderStatus(orderId: number, status: "pending" | "completed" | "cancelled" | "expired") {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update order: database not available");
    return;
  }

  await db.update(orders).set({ status }).where(eq(orders.id, orderId));
}

export async function updateOrderPaymentStatus(orderId: number, paymentStatus: "pending" | "completed" | "failed") {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update order: database not available");
    return;
  }

  await db.update(orders).set({ paymentStatus }).where(eq(orders.id, orderId));
}

/**
 * إدارة تفاصيل الطلب
 */
export async function addOrderItem(orderId: number, item: Omit<InsertOrderItem, 'orderId'>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot add order item: database not available");
    return null;
  }

  const result = await db.insert(orderItems).values({
    orderId,
    ...item,
  });

  return result;
}

export async function getOrderItems(orderId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get order items: database not available");
    return [];
  }

  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  return items;
}

export async function updateOrderItem(itemId: number, data: Partial<OrderItem>) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update order item: database not available");
    return;
  }

  const updateData: Record<string, unknown> = {};
  const allowedFields = ["activationCode", "activationEmail", "activatedAt", "expiresAt", "notes"] as const;
  
  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  });

  if (Object.keys(updateData).length === 0) return;

  await db.update(orderItems).set(updateData).where(eq(orderItems.id, itemId));
}

/**
 * إدارة الفواتير
 */
export async function createInvoice(orderId: number, amount: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create invoice: database not available");
    return null;
  }

  const invoiceNumber = `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  const result = await db.insert(invoices).values({
    orderId,
    invoiceNumber,
    amount: amount.toString(),
    status: "draft",
  });

  return result;
}

export async function getUserInvoices(userId: number) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get invoices: database not available");
    return [];
  }

  const userInvoices = await db
    .select({
      invoice: invoices,
      order: orders,
    })
    .from(invoices)
    .innerJoin(orders, eq(invoices.orderId, orders.id))
    .where(eq(orders.userId, userId))
    .orderBy(desc(invoices.createdAt));

  return userInvoices;
}

export async function updateInvoiceStatus(invoiceId: number, status: "draft" | "sent" | "paid" | "overdue") {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot update invoice: database not available");
    return;
  }

  await db.update(invoices).set({ status }).where(eq(invoices.id, invoiceId));
}