import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { trpc } from "../../../utils/trpc";

enum difficultyColour {
  beginner = "bg-green-500",
  intermediate = "bg-orange-500",
  advanced = "bg-red-500",
}

const index = () => {
  const [hasJoined, setHasJoined] = useState(false);
  const { data: sesh } = useSession();
  const { classpage } = useRouter().query as {
    classpage: string;
  };
  const { data: classData, isLoading } = trpc.class.getSingleClass.useQuery(
    { classId: classpage },
    {
      refetchOnWindowFocus: false,
      onSuccess: (classData) => {
        if (classData) {
          for (let i of classData.participant) {
            if (i.user.id === sesh?.user?.id) {
              setHasJoined(true);
            }
          }
        }
      },
    }
  );
  const addParticipant = trpc.class.addParticipant.useMutation({});
  if (!classData || isLoading) {
    return <p>Loading...</p>;
  }
  const {
    capacity,
    category,
    date,
    description,
    difficulty,
    duration,
    host,
    id,
    price,
    time,
    title,
    _count,
    participant,
  } = classData;
  const handleJoinClass = async (id: string) => {
    for (let i of classData.participant) {
      if (i.user.id === sesh?.user?.id) {
        console.log("already signed up");
        return;
      }
    }
    try {
      await addParticipant.mutateAsync({ classId: id });
      setHasJoined(true);
    } catch (error) {
      console.log("Error Message:", error);
    }
  };
  return (
    <div className="flex w-[80%] gap-10 p-10">
      <div className="flex flex-col gap-2">
        <img
          src={host.image ? host.image : "default"}
          alt="hostImage"
          className="w-10"
        />
        <p>Capacity: {capacity}</p>
        <p>{category}</p>
        <p>{date}</p>
        <p>Description: {description}</p>
        <p
          className={`${
            difficultyColour[difficulty as keyof typeof difficultyColour]
          }`}
        >
          {difficulty}
        </p>
        <p>Duration: {duration}</p>
        <p>Host Name: {host.name}</p>
        <p>Price: {price}</p>
        <p>{time}</p>
        <p>Title: {title}</p>
        <p>Participants: {_count.participant}</p>
        <button
          onClick={() => handleJoinClass(id)}
          className="bg-slate-600 text-white"
        >
          {hasJoined ? "Class Joined!" : "Join Class"}
        </button>
      </div>
      <div className="">
        <p>Interested Users:</p>
        {participant?.map((p) => {
          return <p key={p.user.id}>{p.user.name}</p>;
        })}
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
export default index;
