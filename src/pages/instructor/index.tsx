import { useRouter } from "next/router";
import React, { useState } from "react";
import InstructorCard from "../../components/InstructorCard";
import SearchBar from "../../components/searchBar";
import { trpc } from "../../utils/trpc";
import Pagination from "../../components/pagination";
import Head from "next/head";
const LIMIT = 20;
const InstructorsPage = () => {
  const [queryString, setQueryString] = useState({});
  const router = useRouter();
  const { search, page } = router.query as { search?: string; page?: number };
  const { data: instructorData, isLoading } =
    trpc.user.getAllInstructors.useQuery(
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
    <>
      <Head>
        <title>Fitness Finder - View Instructors</title>
        <meta name="description" content="Fitness Finder" />
        <link rel="icon" href="/fficon.png" />
      </Head>
      <div className="">
        <SearchBar
          queryString={queryString}
          setQueryString={setQueryString}
          route={"/instructor"}
          search={search}
        />
        <div className="m-auto grid w-3/4 grid-cols-1 gap-2 pb-4 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
    </>
  );
};

export default InstructorsPage;
