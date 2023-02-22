import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import Stripe from "stripe";

const stripe = new Stripe("", { apiVersion: "2022-11-15" });

export const paymentRouter = router({
  addPayment: publicProcedure.mutation(async ({ ctx, input }) => {
    // const paymentLink = await stripe.paymentLinks.create({
    //   line_items: [{ price: "price_1MdlX3KfU5KZzoWDxNvoMO4E", quantity: 1 }],
    //   after_completion: {
    //     type: "redirect",
    //     redirect: { url: "http://localhost:3000" },
    //   },
    // });
    // return paymentLink;
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: "", quantity: 1 }],
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
