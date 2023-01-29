import React from "react";
import { trpc } from "../../utils/trpc";
import ScrollingInstructorList from "../ui/scrollingInstructorList";
const FeaturedInstructors = () => {
  const { data: instructors, isLoading } =
    trpc.user.getFeaturedInstructors.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });
  return (
    <div className="p-2">
      <p className="w-full text-center text-3xl font-bold">
        Featured Instructors
      </p>
      <ScrollingInstructorList elements={instructors} />
    </div>
  );
};

export default FeaturedInstructors;
