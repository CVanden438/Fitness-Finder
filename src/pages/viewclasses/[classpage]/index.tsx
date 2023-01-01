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
    <div className="flex justify-center ">
      <div className="mt-10 flex w-1/2 rounded-lg border border-black bg-slate-50 p-10 shadow-lg">
        <div className="flex w-3/4 flex-col gap-2 border-r-[1px] border-black pr-6">
          <div className="flex gap-6 border-b border-black pb-2">
            <img
              src={host.image ? host.image : "default"}
              alt="hostImage"
              className="w-14 rounded-full"
            />
            <div className="">
              <p className="text-xl font-bold">{host.name}</p>
              <p className="text-xl font-medium">{title}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p>{category}</p>
            <p
              className={`${
                difficultyColour[difficulty as keyof typeof difficultyColour]
              } pl-2 pr-2 text-white`}
            >
              {difficulty}
            </p>
          </div>
          <p>Description: {description}</p>
          <p>Duration: {duration} minutes</p>
          <p>Price: £{price}</p>
          <div className="flex items-center gap-1">
            <p>
              {_count.participant}/{capacity}
            </p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="person_icon"
              className="h-[20px] w-[20px]"
            />
          </div>
          <div className="flex items-center gap-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/55/55281.png"
              alt="calander_icon"
              className="h-[20px] w-[20px] object-contain"
            />
            <p>{date}</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3917/3917267.png"
              alt="clock_icon"
              className="h-[20px] w-[20px] object-contain"
            />
            <p>{time}</p>
          </div>
          <button
            onClick={() => handleJoinClass(id)}
            className="bg-slate-600 text-white"
          >
            {hasJoined ? "Class Joined!" : "Join Class"}
          </button>
        </div>
        <div className="pl-6">
          <p>Interested Users:</p>
          {participant?.map((p) => {
            return <p key={p.user.id}>{p.user.name}</p>;
          })}
        </div>
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
