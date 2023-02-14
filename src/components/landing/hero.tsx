import React from "react";
import Image from "next/image";
import Link from "next/link";
const Hero = () => {
  return (
    <main>
      <div className=" m-auto -mt-10 flex h-screen w-full flex-col items-center justify-center lg:flex-row">
        <section className="flex w-full flex-col items-center justify-center gap-4 lg:h-full lg:w-1/2">
          <h1 className="text-center text-7xl font-bold">Fitness Finder</h1>
          <p className="w-full text-center text-2xl">
            Browse thousands of fitness classes from a variety of activities and
            difiiculty levels to find the perfect class for your needs!
          </p>
          <Link
            href="/viewclasses"
            className="rounded-full bg-gray-600 pt-2 pb-2 pl-4 pr-4 text-white hover:bg-slate-800"
          >
            Browse Now
          </Link>
        </section>
        <Image
          src={"/heroimage.webp"}
          alt="heroimage"
          height={500}
          width={500}
          className="hidden lg:block lg:w-1/2"
        />
      </div>
    </main>
  );
};

export default Hero;
