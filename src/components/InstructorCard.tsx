import Link from "next/link";
import React from "react";
import Hover from "./ui/Hover";
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
      <Link href={`/instructor/${instructorId}`} className="relative">
        <img src={image ?? "default"} alt="" />
        <Hover text="Go To Page" />
      </Link>
      <p className="text-lg font-bold">{name}</p>
    </div>
  );
};

export default InstructorCard;
