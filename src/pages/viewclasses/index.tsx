import React, { useState } from "react";
import { trpc } from "../../utils/trpc";
import { Class } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next/types";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { useSession } from "next-auth/react";
import ClassCard from "../../components/classCard";
import Link from "next/link";
import { useRouter } from "next/router";

interface filters {
  category?: string;
  difficulty?: string;
}
const initialQuery: filters = {};
const viewClasses = () => {
  const router = useRouter();
  const { category, difficulty } = router.query as filters;
  const { data: classData, isLoading } = trpc.class.viewAll.useQuery(
    { category, difficulty },
    { refetchOnWindowFocus: false }
  );
  const { data: sesh } = useSession();
  const [queryString, setQueryString] = useState(initialQuery);
  if (isLoading || !classData) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className=" grid grid-cols-5 p-10">
        {classData.map((c) => {
          return <ClassCard key={c.id} data={c} />;
        })}
      </div>
      <button
        onClick={() => {
          router.push({
            pathname: "/viewclasses",
            query: { ...queryString, category: "weights" },
          });
          setQueryString({ ...queryString, category: "weights" });
        }}
      >
        Test Category
      </button>
      <button
        onClick={() => {
          router.push({
            pathname: "/viewclasses",
            query: { ...queryString, difficulty: "advanced" },
          });
          setQueryString({ ...queryString, difficulty: "advanced" });
        }}
      >
        Test Difficulty
      </button>
      <button
        onClick={() => {
          router.push({
            pathname: "/viewclasses",
          });
          setQueryString(initialQuery);
        }}
      >
        Clear Filters
      </button>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default viewClasses;
