import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Hero from "../components/landing/Hero";
import FeaturedClasses from "../components/landing/FeaturedClasses";
import FeaturedInstructors from "../components/landing/FeaturedInstructors";
import { useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  //Stripe Test
  // const router = useRouter();
  // const payment = trpc.payment.addPayment.useMutation();
  // const handleSubmit = async () => {
  //   const response = await payment.mutateAsync();
  //   router.push(response as string);
  // };
  return (
    <>
      <Head>
        <title>Fitness Finder</title>
        <meta name="description" content="Fitness Finder" />
        <link rel="icon" href="/fficon.png" />
      </Head>
      <main className="mx-auto w-4/5 overflow-hidden bg-white">
        <Hero />
        <FeaturedClasses />
        <FeaturedInstructors />
      </main>
    </>
  );
};

export default Home;
