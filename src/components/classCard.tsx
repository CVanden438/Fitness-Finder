import React from "react";
import { NextPage } from "next";
import { trpc } from "../utils/trpc";
import Link from "next/link";
interface classCardProps {
  data: {
    participant?: {
      user: {
        name: string | null;
      };
    }[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    host: {
      image: string | null;
      name: string | null;
    };
    userId: string;
    capacity: number;
    category: string;
    date: string;
    difficulty: string;
    duration: number;
    price: number;
    time: string;
    title: string;
    description: string;
    _count: {
      participant: number;
    };
  };
}

enum difficultyColour {
  beginner = "bg-green-500",
  intermediate = "bg-orange-500",
  advanced = "bg-red-500",
}
const classCard: NextPage<classCardProps> = ({ data }) => {
  const addParticipant = trpc.class.addParticipant.useMutation({});
  const {
    id,
    createdAt,
    updatedAt,
    capacity,
    category,
    difficulty,
    duration,
    price,
    time,
    title,
    description,
    date,
    host: { image, name: hostName },
    _count,
  } = data;
  return (
    <div className=" flex h-[300px] w-[250px] flex-col gap-y-2 border border-black bg-neutral-100 p-1">
      <div className="flex gap-x-2">
        <img
          src={image ? image : "default"}
          alt="test"
          className="aspect-square w-[40px] rounded-full"
        />
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
          } pl-1 pr-1 text-white`}
        >
          {difficulty}
        </p>
      </div>
      <p className="bg-neutral-50 text-gray-600">{description}</p>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <p>
            {_count.participant}/{capacity}
          </p>
          <img src="personicon.png" alt="icon" className="h-4" />
        </div>
        <p>{date}</p>
      </div>
      {/* <button onClick={() => addParticipant.mutateAsync({ classId: id })}>
        Join Class
      </button> */}
      <Link
        href={`/viewclasses/${id}`}
        className="bg-slate-700 text-center text-white"
      >
        View Class
      </Link>
    </div>
  );
};

export default classCard;
