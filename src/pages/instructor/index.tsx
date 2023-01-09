import { useRouter } from "next/router";
import React, { useState } from "react";
import InstructorCard from "../../components/InstructorCard";
import SearchBar from "../../components/searchBar";
import { trpc } from "../../utils/trpc";
import Pagination from "../../components/Pagination";
const LIMIT = 20;
const Instructors = () => {
  const [queryString, setQueryString] = useState({});
  const router = useRouter();
  const { search, page } = router.query as { search?: string; page?: number };
  const { data: instructorData, isLoading } =
    trpc.user.viewAllInstructors.useQuery(
      { search },
      {
        refetchOnWindowFocus: false,
      }
    );
  const handlePageChange = (direction: number) => {
    if (direction === 0) {
      if (instructorData) {
        if (
          Number(page) === Math.ceil(instructorData.count / LIMIT) ||
          instructorData.count <= LIMIT
        ) {
          return;
        }
      }
      router.push({
        pathname: "/instructor",
        query: { ...queryString, page: page ? Number(page) + 1 : 2 },
      });
    } else {
      if (Number(page) === 1 || page == undefined) {
        return;
      }
      router.push({
        pathname: "/instructor",
        query: { ...queryString, page: Number(page) - 1 },
      });
    }
  };
  return (
    <div className="">
      <SearchBar
        queryString={queryString}
        setQueryString={setQueryString}
        route={"/instructor"}
        search={search}
      />
      <div className="m-auto grid w-3/4 grid-cols-5 pt-6">
        {instructorData &&
          instructorData.items.map((i) => {
            return <InstructorCard data={i} key={i.id} />;
          })}
      </div>
      <Pagination
        handlePageChange={handlePageChange}
        LIMIT={LIMIT}
        count={instructorData?.count}
        page={page}
      />
    </div>
  );
};

export default Instructors;
