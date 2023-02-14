import React from "react";
import { trpc } from "../../utils/trpc";
import ScrollingInstructorList from "../ui/scrollingInstructorList";
const FeaturedInstructors = () => {
  const { data: instructors, isLoading } =
    trpc.user.getFeaturedInstructors.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });
  return (
    <section className="h-screen">
      <p className="mb-8 w-full text-center text-6xl font-bold">
        Featured Instructors
      </p>
      <ScrollingInstructorList elements={instructors} />
    </section>
  );
};

export default FeaturedInstructors;
