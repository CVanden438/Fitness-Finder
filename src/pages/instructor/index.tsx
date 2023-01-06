import { useRouter } from "next/router";
import React, { useState } from "react";
import InstructorCard from "../../components/InstructorCard";
import SearchBar from "../../components/searchBar";
import { trpc } from "../../utils/trpc";

const LIMIT = 20;
const Instructors = () => {
  const [queryString, setQueryString] = useState({});
  const router = useRouter();
  const { search, page } = router.query as { search: string; page: string };
  const { data: instructorData, isLoading } =
    trpc.user.viewAllInstructors.useQuery(
      { search },
      {
        refetchOnWindowFocus: false,
      }
    );
  return (
    <div className="">
      <p>{instructorData?.count}</p>
      <SearchBar
        queryString={queryString}
        setQueryString={setQueryString}
        route={"/instructor"}
        search={search}
      />
      <div className="m-auto w-3/4 pt-6 ">
        {instructorData &&
          instructorData.items.map((i) => {
            return <InstructorCard data={i} key={i.id} />;
          })}
      </div>
    </div>
  );
};

export default Instructors;
