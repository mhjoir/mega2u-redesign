import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // منطقة العملاء - Customer Portal
  customer: router({
    // الحصول على بيانات الملف الشخصي
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      return ctx.user;
    }),

    // تحديث بيانات الملف الشخصي
    updateProfile: protectedProcedure
      .input(
        z.object({
          name: z.string().optional(),
          email: z.string().email().optional(),
          phone: z.string().optional(),
          address: z.string().optional(),
          city: z.string().optional(),
          country: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // TODO: تطبيق تحديث البيانات في قاعدة البيانات
        console.log("Updating profile for user:", ctx.user?.id, "with data:", input);
        return { success: true };
      }),

    // الحصول على جميع الطلبات
    getOrders: protectedProcedure.query(async ({ ctx }) => {
      // TODO: جلب الطلبات من قاعدة البيانات
      console.log("Fetching orders for user:", ctx.user?.id);
      return [];
    }),

    // الحصول على تفاصيل طلب معين
    getOrderDetails: protectedProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ input }) => {
        // TODO: جلب تفاصيل الطلب من قاعدة البيانات
        console.log("Fetching order details for:", input.orderId);
        return { order: null, items: [] };
      }),

    // إنشاء طلب جديد
    createOrder: protectedProcedure
      .input(
        z.object({
          items: z.array(
            z.object({
              productId: z.string(),
              productName: z.string(),
              productCategory: z.string().optional(),
              quantity: z.number().default(1),
              price: z.string(),
              duration: z.string().optional(),
            })
          ),
          totalAmount: z.number(),
          currency: z.string().default("ريال"),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // TODO: إنشاء طلب جديد في قاعدة البيانات
        console.log("Creating order for user:", ctx.user?.id, "with data:", input);
        return {
          success: true,
          orderId: 1,
        };
      }),

    // الحصول على الفواتير
    getInvoices: protectedProcedure.query(async ({ ctx }) => {
      // TODO: جلب الفواتير من قاعدة البيانات
      console.log("Fetching invoices for user:", ctx.user?.id);
      return [];
    }),
  }),
});

export type AppRouter = typeof appRouter;