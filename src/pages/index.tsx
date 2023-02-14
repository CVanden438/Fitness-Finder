import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import Hero from "../components/landing/hero";
import FeaturedClasses from "../components/landing/featuredClasses";
import FeaturedInstructors from "../components/landing/featuredInstructors";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Fitness Finder</title>
        <meta name="description" content="Fitness Finder" />
        <link rel="icon" href="/fficon.png" />
      </Head>
      <main className="mx-auto w-4/5 overflow-hidden bg-white">
        <Hero />
        {/* <div className="mb-6 flex w-full flex-col gap-6"> */}
        <FeaturedClasses />
        <FeaturedInstructors />
        {/* </div> */}
      </main>
    </>
  );
};

export default Home;
