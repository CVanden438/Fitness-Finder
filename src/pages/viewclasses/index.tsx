import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { Class } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next/types";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { useSession } from "next-auth/react";
import ClassCard from "../../components/classCard";
import Link from "next/link";
import { useRouter } from "next/router";
import Sidebar from "../../components/sidebar";
import SearchBar from "../../components/searchBar";
const currDate = new Date().toISOString().slice(0, 10);
const initialQuery: filters = {};
const viewClasses = () => {
  const router = useRouter();
  const { category, difficulty, search } = router.query as filters;
  const { data: classData, isLoading } = trpc.class.viewAll.useQuery(
    { category, difficulty, search },
    { refetchOnWindowFocus: false }
  );
  const { data: sesh } = useSession();
  const [queryString, setQueryString] = useState(initialQuery);
  const [upcoming, setUpcoming] = useState(true);
  const pastClasses = classData?.filter((c) => {
    return c.date < currDate;
  });
  const upcomingClasses = classData?.filter((c) => {
    return c.date >= currDate;
  });
  return (
    <>
      <Sidebar
        queryString={queryString}
        setQueryString={setQueryString}
        category={category}
        difficulty={difficulty}
      />
      <SearchBar setQueryString={setQueryString} search={search} />
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setUpcoming(false)}
          className={`${
            !upcoming ? "bg-slate-400" : "bg-slate-200 hover:bg-slate-300"
          } rounded-l-full border-r border-black  p-2`}
        >
          Previous Classes
        </button>
        <button
          onClick={() => setUpcoming(true)}
          className={`${
            upcoming ? "bg-slate-400" : "bg-slate-200 hover:bg-slate-300"
          } rounded-r-full p-2 `}
        >
          Upcoming Classes
        </button>
      </div>
      {isLoading && <img src="loader.svg" alt="" className="ml-[200px]" />}
      <div className="ml-[200px] grid grid-cols-5 gap-6 p-6">
        {upcoming
          ? upcomingClasses?.map((c) => {
              return <ClassCard key={c.id} data={c} />;
            })
          : pastClasses?.map((c) => {
              return <ClassCard key={c.id} data={c} />;
            })}
      </div>
    </>
  );
};
// export const getServerSideProps: GetServerSideProps = async (
//   ctx: GetServerSidePropsContext
// ) => {
//   const session = await getServerAuthSession(ctx);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// };

export default viewClasses;
