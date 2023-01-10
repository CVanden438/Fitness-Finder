import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import ClassCard from "../../components/classCard";
import { useRouter } from "next/router";
import Sidebar from "../../components/sidebar";
import SearchBar from "../../components/searchBar";
import Pagination from "../../components/Pagination";
// const LIMIT = 4;
// const initialQuery: filters = {};
// const viewClasses = () => {
//   const [upcoming, setUpcoming] = useState(true);
//   const [cursor, setCursor] = useState<undefined | string>(undefined);
//   const router = useRouter();
//   const { category, difficulty, search, page } = router.query as filters;
//   // USEINFINITEQUERY NOT ON TRPC??
//   const { data: classData, isLoading } = trpc.class.viewAll.useQuery(
//     { category, difficulty, search, limit: LIMIT, cursorId: cursor, upcoming },
//     {
//       refetchOnWindowFocus: false,
//     }
//   );
//   const { data: sesh } = useSession();
//   const [queryString, setQueryString] = useState(initialQuery);
//   const handleLoadMore = () => {
//     setCursor(classData?.nextCursor);
//   };
//   // const pastClasses = classData?.items.filter((c) => {
//   //   return c.date < currDate;
//   // });
//   // const upcomingClasses = classData?.items.filter((c) => {
//   //   return c.date >= currDate;
//   // });
//   return (
//     <>
//       <Sidebar
//         queryString={queryString}
//         setQueryString={setQueryString}
//         category={category}
//         difficulty={difficulty}
//         search={search}
//       />
//       <SearchBar
//         setQueryString={setQueryString}
//         search={search}
//         queryString={queryString}
//       />
//       <div className="mt-4 flex justify-center">
//         <button
//           onClick={() => {
//             setCursor(undefined);
//             setUpcoming(false);
//           }}
//           className={`${
//             !upcoming ? "bg-slate-400" : "bg-slate-200 hover:bg-slate-300"
//           } rounded-l-full border-r border-black  p-2`}
//         >
//           Previous Classes
//         </button>
//         <button
//           onClick={() => {
//             setCursor(undefined);
//             setUpcoming(true);
//           }}
//           className={`${
//             upcoming ? "bg-slate-400" : "bg-slate-200 hover:bg-slate-300"
//           } rounded-r-full p-2 `}
//         >
//           Upcoming Classes
//         </button>
//       </div>
//       {isLoading && <img src="loader.svg" alt="" className="ml-[200px]" />}
//       <div className="ml-[200px] grid grid-cols-5 gap-6 p-6">
//         {upcoming
//           ? classData?.items.map((c) => {
//               return <ClassCard key={c.id} data={c} />;
//             })
//           : classData?.items.map((c) => {
//               return <ClassCard key={c.id} data={c} />;
//             })}
//       </div>
//       <button className="ml-[400px]">Prev Page</button>
//       {classData?.nextCursor && (
//         <button onClick={handleLoadMore} className="ml-[400px]">
//           Next Page
//         </button>
//       )}
//     </>
//   );
// };

const LIMIT = 10;
const initialQuery: filters = {};
const viewClasses = () => {
  const [upcoming, setUpcoming] = useState(true);
  const router = useRouter();
  const { category, difficulty, search, page } = router.query as filters;
  // USEINFINITEQUERY NOT ON TRPC??
  const { data: classData, isLoading } = trpc.class.getAllClass.useQuery(
    { category, difficulty, search, limit: LIMIT, upcoming, page },
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data: sesh } = useSession();
  const [queryString, setQueryString] = useState(initialQuery);
  // const pastClasses = classData?.items.filter((c) => {
  //   return c.date < currDate;
  // });
  // const upcomingClasses = classData?.items.filter((c) => {
  //   return c.date >= currDate;
  // });
  const handlePageChange = (direction: number) => {
    if (direction === 0) {
      if (classData) {
        if (
          Number(page) === Math.ceil(classData.count / LIMIT) ||
          classData.count <= LIMIT
        ) {
          return;
        }
      }
      router.push({
        pathname: "/viewclasses",
        query: { ...queryString, page: page ? Number(page) + 1 : 2 },
      });
    } else {
      if (Number(page) === 1 || page == undefined) {
        return;
      }
      router.push({
        pathname: "/viewclasses",
        query: { ...queryString, page: Number(page) - 1 },
      });
    }
  };
  return (
    <>
      <Sidebar
        queryString={queryString}
        setQueryString={setQueryString}
        category={category}
        difficulty={difficulty}
        search={search}
      />
      <SearchBar
        setQueryString={setQueryString}
        search={search}
        queryString={queryString}
        route={"/viewclasses"}
      />
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => {
            setUpcoming(false);
            router.push({
              pathname: "/viewclasses",
              query: { ...queryString, page: 1 },
            });
          }}
          className={`${
            !upcoming ? "bg-slate-400" : "bg-slate-200 hover:bg-slate-300"
          } rounded-l-full border-r border-black  p-2`}
        >
          Previous Classes
        </button>
        <button
          onClick={() => {
            setUpcoming(true);
            router.push({
              pathname: "/viewclasses",
              query: { ...queryString, page: 1 },
            });
          }}
          className={`${
            upcoming ? "bg-slate-400" : "bg-slate-200 hover:bg-slate-300"
          } rounded-r-full p-2 `}
        >
          Upcoming Classes
        </button>
      </div>
      {isLoading && <img src="loader.svg" alt="" className="mx-auto mt-4" />}
      <div className="ml-[200px] grid grid-cols-5 gap-6 p-6">
        {upcoming
          ? classData?.items.map((c) => {
              return <ClassCard key={c.id} data={c} />;
            })
          : classData?.items.map((c) => {
              return <ClassCard key={c.id} data={c} />;
            })}
      </div>
      <Pagination
        handlePageChange={handlePageChange}
        count={classData?.count}
        page={page}
        LIMIT={LIMIT}
      />
    </>
  );
};

export default viewClasses;
