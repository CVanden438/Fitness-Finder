import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env/server.mjs";
import Stripe from "stripe";
import { buffer } from "micro";
const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
});

const endpointSecret = env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};
const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log("hello");
    const buff = await buffer(req);
    let event = req.body;
    console.log("hello2");
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = req.headers["stripe-signature"] as string;
      try {
        event = stripe.webhooks.constructEvent(buff, signature, endpointSecret);
      } catch (err) {
        if (err instanceof Error) {
          console.log(
            `⚠️  Webhook signature verification failed.`,
            err.message
          );
        }
        return res.status(400).send("Webhook Error!");
      }
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(
          `PaymentIntent for ${paymentIntent.amount} was successful!`
        );
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send("WOOHOO WENT WELL");
  }
};

export default webhook;
