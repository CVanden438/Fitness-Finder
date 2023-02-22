import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import Layout from "../components/layout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51MLwoHKfU5KZzoWDySsdgq60xLt7w9VkpUqucZmyKSSbtLvlz4mUp8mu8xtsFxaYJK2FZ9Mxwh5YWJy9oBlqUVhr000lb1LNpF"
);
const secret =
  "pk_test_51MLwoHKfU5KZzoWDySsdgq60xLt7w9VkpUqucZmyKSSbtLvlz4mUp8mu8xtsFxaYJK2FZ9Mxwh5YWJy9oBlqUVhr000lb1LNpF";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
