import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import React from "react";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { trpc } from "../../utils/trpc";
import ClassCard from "../../components/classCard";
const index = () => {
  const { data: sesh } = useSession();
  if (!sesh) {
    return <p>Loading...</p>;
  }
  const { data: classData } = trpc.class.getClassByUser.useQuery(
    {
      id: sesh?.user?.id as string,
    },
    { refetchOnWindowFocus: false }
  );
  return (
    <div className="grid grid-cols-5 gap-10 p-10">
      {classData &&
        classData.map((c) => {
          return <ClassCard key={c.class.id} data={c.class} />;
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
export default index;
