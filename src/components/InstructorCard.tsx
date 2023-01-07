import Link from "next/link";
import React from "react";
import { RouterOutputs } from "../utils/trpc";
import Hover from "./ui/Hover";

type instructorCardProps =
  RouterOutputs["user"]["viewAllInstructors"]["items"][number];

const InstructorCard: React.FC<{ data: instructorCardProps }> = ({ data }) => {
  const { id: instructorId, name, image, bio, _count } = data;
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-black bg-slate-200 p-2">
      <Link href={`/instructor/${instructorId}`} className="relative">
        <img src={image ?? "default"} alt="" className="rounded-full" />
        <Hover text="Go To Page" />
      </Link>
      <p className="text-lg font-bold">{name}</p>
      <p>{bio}</p>
      <p>Total Classes: {_count?.classes}</p>
    </div>
  );
};

export default InstructorCard;
