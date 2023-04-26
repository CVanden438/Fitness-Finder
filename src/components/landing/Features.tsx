import React from "react";
import useScroll from "../../hooks/useScroll";
import BookIcon from "../../icons/BookIcon";

const Features = () => {
  return (
    <section className="flex min-h-screen flex-col gap-8 p-5">
      <h2 className="text-center text-5xl font-bold">Features</h2>
      <div className="h-1 w-full bg-yellow-500"></div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <article className="h-20 bg-slate-800 outline outline-2 outline-yellow-500">
          <BookIcon height={90} width={90} />
        </article>
        <article className="h-20 bg-slate-800 outline outline-2 outline-yellow-500"></article>
        <article className="h-20 bg-slate-800 outline outline-2 outline-yellow-500"></article>
      </div>
    </section>
  );
};

export default Features;
