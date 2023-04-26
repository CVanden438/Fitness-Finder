import React from "react";
import { trpc } from "../../utils/trpc";
import ClassCard from "../ClassCard";
import ClassCardLoading from "../ClassCardLoading";
import ScrollingList from "../ui/ScrollingClassList";

const FeaturedClasses = () => {
  const { data: featured, isLoading } = trpc.class.getFeaturedClasses.useQuery(
    undefined,
    { refetchOnWindowFocus: false }
  );
  return (
    <section className="flex min-h-screen flex-col gap-8 p-5">
      <h2 className="mb-8 w-full text-center text-6xl font-bold">
        Featured Classes
      </h2>
      <div className="h-1 w-full bg-yellow-500"></div>
      {isLoading ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <ClassCardLoading />
          <ClassCardLoading />
          <ClassCardLoading />
          <ClassCardLoading />
          <ClassCardLoading />
          <ClassCardLoading />
          <ClassCardLoading />
          <ClassCardLoading />
          <ClassCardLoading />
          <ClassCardLoading />
          <ClassCardLoading />
          <ClassCardLoading />
          <ClassCardLoading />
          <ClassCardLoading />
          <ClassCardLoading />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {featured?.map((i) => {
            return <ClassCard data={i} key={i.id} />;
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedClasses;
