import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../../utils/trpc";
import ClassCard from "../../../components/classCard";
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
    <div className="p-6">
      <button onClick={() => refetch()}>Load Classes</button>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {classData &&
          classData.map((c) => {
            return <ClassCard key={c.id} data={c} />;
          })}
      </div>
    </div>
  );
};

export default InstructorPage;
