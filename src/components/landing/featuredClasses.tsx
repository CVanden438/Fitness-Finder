import React from "react";
import { trpc } from "../../utils/trpc";
import ClassCardLoading from "../classCardLoading";
import ScrollingList from "../ui/ScrollingClassList";

const FeaturedClasses = () => {
  const { data: featured, isLoading } = trpc.class.getFeaturedClasses.useQuery(
    undefined,
    { refetchOnWindowFocus: false }
  );
  return (
    <div>
      <div className="p-2">
        <p className="w-full text-center text-3xl font-bold">
          Featured Classes
        </p>
        {isLoading ? (
          <ClassCardLoading />
        ) : (
          <ScrollingList elements={featured} />
        )}
      </div>
    </div>
  );
};

export default FeaturedClasses;
