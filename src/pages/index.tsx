import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Hero from "../components/landing/hero";
import FeaturedClasses from "../components/landing/featuredClasses";
import FeaturedInstructors from "../components/landing/featuredInstructors";
import { useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const payment = trpc.payment.addPayment.useMutation();
  // const stripePromise = useStripe();
  const handleSubmit = async () => {
    const response = await payment.mutateAsync();
    // const stripe = await stripePromise;
    // stripe?.redirectToCheckout();
    router.push(response as string);
    // console.log(response);
  };
  return (
    <>
      <Head>
        <title>Fitness Finder</title>
        <meta name="description" content="Fitness Finder" />
        <link rel="icon" href="/fficon.png" />
      </Head>
      <div className="mx-auto w-4/5 overflow-hidden bg-white">
        <Hero />
        <button className="bg-red-200 p-2" onClick={handleSubmit}>
          Pay Here
        </button>
        {/* <div className="mb-6 flex w-full flex-col gap-6"> */}
        <FeaturedClasses />
        <FeaturedInstructors />
        {/* </div> */}
      </div>
    </>
  );
};

export default Home;
