import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { trpc } from "../../utils/trpc";
import ClassCard from "../../components/ClassCard";
import InstructorModal from "../../components/InstructorModal";
import Head from "next/head";
const currDate = new Date().toISOString().slice(0, 10);
const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: sesh } = useSession();
  if (!sesh) {
    return <p className="pt-20">Loading...</p>;
  }
  const { data: classData, refetch } = trpc.class.getClassByUser.useQuery(
    {
      id: sesh?.user?.id as string,
    },
    { refetchOnWindowFocus: false }
  );
  // const makeInstructor = trpc.user.makeInstructor.useMutation({});
  // const handleMakeInstructor = () => {
  //   if (sesh.user?.role === "INSTRUCTOR") {
  //     return;
  //   }
  //   makeInstructor.mutateAsync();
  //   refetch();
  // };
  const pastClasses = classData?.filter((c) => {
    return c.class.date < currDate;
  });
  const upcomingClasses = classData?.filter((c) => {
    return c.class.date >= currDate;
  });
  return (
    <>
      <Head>
        <title>Fitness Finder - Profile</title>
        <meta name="description" content="Fitness Finder" />
        <link rel="icon" href="/fficon.png" />
      </Head>
      <div className="pt-6 pl-10 pr-10">
        {isModalOpen && (
          <InstructorModal setIsModalOpen={setIsModalOpen} refetch={refetch} />
        )}
        <section className="flex justify-between">
          <p>Role: {sesh.user?.role}</p>
          <button
            className="rounded-lg bg-slate-300 pl-2 pr-2 hover:bg-slate-500 hover:text-white"
            onClick={() => {
              // handleMakeInstructor();
              setIsModalOpen(true);
            }}
          >
            {sesh.user?.role === "INSTRUCTOR"
              ? "UPDATE BIO"
              : "BECOME INSTRCUTOR"}
          </button>
        </section>
        <section className="border-b border-black">
          <p className="text-xl font-bold">Upcoming Events:</p>
          <div className="grid grid-cols-1 gap-10 pt-4 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {upcomingClasses &&
              upcomingClasses.map((c) => {
                return <ClassCard key={c.class.id} data={c.class} />;
              })}
          </div>
        </section>
        <section className="pt-6">
          <p className="text-xl font-bold">Past Events:</p>
          <div className="grid grid-cols-1 gap-10 pt-4 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {pastClasses &&
              pastClasses.map((c) => {
                return <ClassCard key={c.class.id} data={c.class} />;
              })}
          </div>
        </section>
      </div>
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
export default ProfilePage;
