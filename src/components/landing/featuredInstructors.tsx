import React from "react";
import { trpc } from "../../utils/trpc";
import ClassCard from "../ClassCard";
import ClassCardLoading from "../ClassCardLoading";
import InstructorCard from "../InstructorCard";
import ScrollingInstructorList from "../ui/scrollingInstructorList";
const FeaturedInstructors = () => {
  const { data: instructors, isLoading } =
    trpc.user.getFeaturedInstructors.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });
  return (
    <section className="mt-8 min-h-screen pb-6">
      <h2 className="mb-8 w-full text-center text-6xl font-bold">
        Featured Instructors
      </h2>
      {isLoading ? (
        <div className="grid gap-2 xl:grid-cols-5">
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
          {instructors?.map((i) => {
            return <InstructorCard data={i} key={i.id} />;
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedInstructors;
