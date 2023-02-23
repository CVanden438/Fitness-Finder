import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import Stripe from "stripe";
import { env } from "../../../env/server.mjs";
const stripe = new Stripe(env.STRIPE_API_KEY, { apiVersion: "2022-11-15" });

export const paymentRouter = router({
  addPayment: publicProcedure.mutation(async ({ ctx, input }) => {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/cancel",
    });
    return session.url;
  }),
  updateUserPaid: publicProcedure
    .input(z.object({ email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return "hello";
    }),
});
