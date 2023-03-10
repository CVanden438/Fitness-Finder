import React from "react";
import { NextPage } from "next";
import { RouterOutputs, trpc } from "../utils/trpc";
import Link from "next/link";
import Tooltip from "./ui/Tooltip";
import Image from "next/image";
interface classCardProps {
  id: string;
  host: {
    image: string | null;
    name: string | null;
    id: string;
  };
  capacity: number;
  category: string;
  date: string;
  difficulty: string;
  price: number;
  title: string;
  description: string;
  _count: {
    participant: number;
  };
}
// type classCardData = Omit<RouterOutputs["class"]["viewAll"], "count">["items"][number];

enum difficultyColour {
  beginner = "bg-green-500",
  intermediate = "bg-orange-500",
  advanced = "bg-red-500",
}
const ClassCard: React.FC<{ data: classCardProps }> = (props) => {
  const addParticipant = trpc.class.addParticipant.useMutation({});
  const {
    id,
    capacity,
    category,
    difficulty,
    price,
    title,
    description,
    date,
    host: { image, name: hostName, id: hostId },
    _count,
  } = props.data;
  return (
    <div className="flex flex-col gap-y-2 rounded-md border border-black bg-slate-100 p-1 shadow-lg shadow-gray-400 hover:bg-slate-200">
      <div className="flex items-center gap-x-2">
        <Link href={`/instructor/${hostId}`}>
          <Tooltip text="View Page">
            <img
              src={image ? image : "default"}
              alt="test"
              className="rounded-full"
              height={40}
              width={40}
              loading="lazy"
            />
          </Tooltip>
        </Link>
        <div className="">
          <p className="font-bold">{hostName}</p>
          <p className="font-semibold">{title}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p>{category}</p>
        <p
          className={`${
            difficultyColour[difficulty as keyof typeof difficultyColour]
          } rounded-lg pl-1 pr-1 text-white`}
        >
          {difficulty}
        </p>
      </div>
      <p className="truncate text-gray-600">{description}</p>
      <p>Price: {price === 0 ? "FREE" : `??${price}`}</p>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <p>
            {_count.participant}/{capacity}
          </p>
          <Image src="/personicon.png" alt="icon" height={10} width={13} />
        </div>
        <p>{date}</p>
      </div>
      {/* <button onClick={() => addParticipant.mutateAsync({ classId: id })}>
        Join Class
      </button> */}
      <Link
        href={`/viewclasses/${id}`}
        className="rounded-lg bg-slate-700 text-center text-white"
      >
        View Class
      </Link>
    </div>
  );
};

export default ClassCard;
