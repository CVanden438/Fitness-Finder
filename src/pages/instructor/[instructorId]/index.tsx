import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../../utils/trpc";
import ClassCard from "../../../components/ClassCard";
import Head from "next/head";
const InstructorPage = () => {
  const router = useRouter();
  const { instructorId } = router.query as {
    instructorId: string;
  };
  const { data: classData, refetch } =
    trpc.class.getClassesByInstructor.useQuery(
      {
        id: instructorId,
      },
      { refetchOnWindowFocus: false, enabled: false }
    );
  return (
    <>
      <Head>
        <title>Fitness Finder - Insturctor</title>
        <meta name="description" content="Fitness Finder" />
        <link rel="icon" href="/fficon.png" />
      </Head>
      <div className="p-6">
        <button onClick={() => refetch()}>Load Classes</button>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {classData &&
            classData.map((c) => {
              return <ClassCard key={c.id} data={c} />;
            })}
        </div>
      </div>
    </>
  );
};

export default InstructorPage;
