import React from "react";

interface instructorCardProps {
  data: {
    name: string | null;
    id: string;
    image: string | null;
  };
}

const InstructorCard: React.FC<instructorCardProps> = ({ data }) => {
  const { id: instructorId, name, image } = data;
  return (
    <div className="flex h-[200px] w-[200px] flex-col items-center justify-center gap-2 rounded-lg bg-slate-200">
      <img src={image ?? "default"} alt="" />
      <p className="text-lg font-bold">{name}</p>
    </div>
  );
};

export default InstructorCard;
