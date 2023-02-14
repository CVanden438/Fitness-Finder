import React from "react";
import { trpc } from "../../utils/trpc";
import ClassCard from "../classCard";
import ClassCardLoading from "../classCardLoading";
import ScrollingList from "../ui/ScrollingClassList";

const FeaturedClasses = () => {
  const { data: featured, isLoading } = trpc.class.getFeaturedClasses.useQuery(
    undefined,
    { refetchOnWindowFocus: false }
  );
  return (
    <section className="min-h-screen">
      <p className="mb-8 w-full text-center text-6xl font-bold">
        Featured Classes
      </p>
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
        // <ScrollingInstructorList elements={instructors} />
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
