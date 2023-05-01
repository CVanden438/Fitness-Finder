import React from "react";
import Image from "next/image";
import Link from "next/link";
const Hero = () => {
  return (
    <section
      // style={{ backgroundImage: `url(./hero-pic.avif)` }}
      className="relative min-h-screen bg-cover bg-fixed bg-center md:bg-top"
    >
      <div className="absolute inset-0 -mt-28 grid place-content-center gap-8">
        <h2 className="text-center text-7xl font-bold">Fitness Finder</h2>
        <p className="m-auto w-3/4 text-center text-2xl md:w-1/2">
          Browse thousands of fitness classes from a variety of activities and
          difficulty levels to find the perfect class for your needs!
        </p>
        <Link
          href="/viewclasses"
          className="m-auto w-fit rounded-full bg-slate-800 p-4 text-lg outline outline-2 hover:outline-4"
        >
          Browse Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
