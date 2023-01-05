import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../../utils/trpc";
import ClassCard from "../../../components/classCard";
const index = () => {
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
    <div className="pt-20 pl-20">
      <button onClick={() => refetch()}>Load Classes</button>
      <div className="grid grid-cols-5 gap-4">
        {classData &&
          classData.map((c) => {
            return <ClassCard key={c.id} data={c} />;
          })}
      </div>
    </div>
  );
};

export default index;
