import React from "react";
import { trpc } from "../../utils/trpc";
import ScrollingList from "../ui/ScrollingClassList";

const elements = ["1", "2", "3", "4", "5"];
const FeaturedClasses = () => {
  const { data: featured, isLoading } = trpc.class.getFeaturedClasses.useQuery(
    undefined,
    { refetchOnWindowFocus: false }
  );
  return (
    <div>
      <div className="">
        <p className="w-full text-center text-3xl font-bold">
          Featured Classes
        </p>
        <ScrollingList elements={featured} />
      </div>
    </div>
  );
};

export default FeaturedClasses;
