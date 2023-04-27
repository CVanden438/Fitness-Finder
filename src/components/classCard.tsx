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

enum difficultyColour {
  beginner = "bg-green-500",
  intermediate = "bg-orange-500",
  advanced = "bg-red-500",
}
const ClassCard: React.FC<{ data: classCardProps }> = (props) => {
  // const addParticipant = trpc.class.addParticipant.useMutation({});
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
    <article
      // style={{
      //   backgroundImage:
      //     "url(https://images.unsplash.com/photo-1552196563-55cd4e45efb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80)",
      // }}
      className="flex flex-col gap-y-4 bg-slate-900 bg-cover p-2 outline outline-2 outline-yellow-500"
    >
      <div className="flex items-center gap-x-2 ">
        <Link href={`/instructor/${hostId}`}>
          <Tooltip text="View Page">
            <img
              src={image ? image : "default"}
              alt="test"
              className="rounded-full hover:outline hover:outline-2"
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
      <p>Price: {price === 0 ? "FREE" : `£${price}`}</p>
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
        className="rounded-lg bg-slate-800 text-center outline outline-2 hover:outline-4"
      >
        View Class
      </Link>
    </article>
  );
};

export default ClassCard;
