import React from "react";
import { trpc } from "../../utils/trpc";
import { Class } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next/types";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { useSession } from "next-auth/react";
import ClassCard from "../../components/classCard";
const viewClasses = () => {
  const { data: classData, isLoading } = trpc.class.viewAll.useQuery(
    undefined,
    { refetchOnWindowFocus: false }
  );
  const { data: sesh } = useSession();

  if (isLoading || !classData) {
    return <p>Loading...</p>;
  }
  return (
    <div className=" grid grid-cols-5 p-10">
      {classData.map((c) => {
        return <ClassCard key={c.id} data={c} />;
      })}
    </div>
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
