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
import Features from "../components/landing/Features";
import useScroll from "../hooks/useScroll";
import Footer from "../components/landing/Footer";

const Home: NextPage = () => {
  //Stripe Test
  // const router = useRouter();
  // const payment = trpc.payment.addPayment.useMutation();
  // const handleSubmit = async () => {
  //   const response = await payment.mutateAsync();
  //   router.push(response as string);
  // };
  const scrollY = useScroll();
  return (
    <>
      <Head>
        <title>Fitness Finder</title>
        <meta name="description" content="Fitness Finder" />
        <link rel="icon" href="/fficon.png" />
      </Head>
      <main
        style={{
          backgroundImage: `url(./landingPic.avif)`,
        }}
        className="overflow-hidden bg-cover bg-fixed bg-center md:bg-top"
      >
        <div style={{ backdropFilter: `brightness(${50 - scrollY / 20}%)` }}>
          <Hero />
          <Features />
          <FeaturedClasses />
          <FeaturedInstructors />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Home;
