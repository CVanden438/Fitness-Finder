import Link from "next/link";
import React from "react";
import { RouterOutputs } from "../utils/trpc";
import Hover from "./ui/Hover";

type instructorCardProps =
  RouterOutputs["user"]["getAllInstructors"]["items"][number];

const InstructorCard: React.FC<{ data: instructorCardProps }> = ({ data }) => {
  const { id: instructorId, name, image, bio, _count } = data;
  return (
    <article className="flex flex-col items-center justify-center gap-2 p-2 outline outline-1">
      <Link href={`/instructor/${instructorId}`} className="relative">
        <img src={image ?? "default"} alt="" className="rounded-full" />
        <Hover text="Go To Page" />
      </Link>
      <p className="text-lg font-bold">{name}</p>
      <p className="h-24 overflow-y-auto">{bio}</p>
      <p>Total Classes: {_count?.classes}</p>
    </article>
  );
};

export default InstructorCard;
