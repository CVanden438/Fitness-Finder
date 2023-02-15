import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { trpc } from "../../../utils/trpc";
import ClassComments from "../../../components/classComments";
import Tooltip from "../../../components/ui/Tooltip";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
enum difficultyColour {
  beginner = "bg-green-500",
  intermediate = "bg-orange-500",
  advanced = "bg-red-500",
}

const ClassPage: NextPage = () => {
  const [hasJoined, setHasJoined] = useState(false);
  const { data: sesh } = useSession();
  const router = useRouter();
  const { classpage } = router.query as {
    classpage: string;
  };
  const {
    data: classData,
    isLoading,
    refetch,
  } = trpc.class.getSingleClass.useQuery(
    { classId: classpage },
    {
      refetchOnWindowFocus: false,
      onSuccess: (classData) => {
        if (classData) {
          for (const i of classData.participant) {
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
    if (!sesh) {
      signIn();
    }
    for (const i of classData.participant) {
      if (i.user.id === sesh?.user?.id) {
        console.log("already signed up");
        return;
      }
    }
    try {
      await addParticipant.mutateAsync({ classId: id });
      setHasJoined(true);
      refetch();
    } catch (error) {
      console.log("Error Message:", error);
    }
  };
  return (
    <>
      <Head>
        <title>Fitness Finder - Class</title>
        <meta name="description" content="Fitness Finder" />
        <link rel="icon" href="/fficon.png" />
      </Head>
      <body className="relative flex justify-center pt-6">
        <button
          onClick={() => router.back()}
          className="absolute left-10 h-12 w-12"
        >
          <BiArrowBack className="h-12 w-12" />
        </button>
        <div className="mt-16 mb-4 flex w-4/5 flex-col rounded-lg border border-black bg-slate-300 p-6 shadow-lg md:mt-10 md:flex-row">
          <div className="flex w-full flex-col gap-2 border-b border-black pb-4 md:w-1/2 md:border-b-0 md:border-r-[1px] md:pr-6">
            <div className="flex gap-6 border-b border-black pb-2">
              <Link href={`/instructor/${host.id}`}>
                <img
                  src={host.image ? host.image : "default"}
                  alt="hostImage"
                  className="rounded-full"
                  height={56}
                  width={56}
                />
              </Link>
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
                } rounded-lg pl-2 pr-2 text-white`}
              >
                {difficulty}
              </p>
            </div>
            <p>Description: {description}</p>
            <p>Duration: {duration} minutes</p>
            <p>Price: {price === 0 ? "FREE" : `£ ${price}`}</p>
            <div className="flex items-center gap-1">
              <p>
                {_count.participant}/{capacity}
              </p>
              <Image
                src="/personicon.png"
                alt="person_icon"
                // className="h-[20px] w-[20px]"
                width={16}
                height={16}
              />
            </div>
            <div className="flex items-center gap-4">
              <Image
                // src="https://cdn-icons-png.flaticon.com/512/55/55281.png"
                src="/calandericon.png"
                alt="calander_icon"
                width={20}
                height={20}
                // className="h-[20px] w-[20px] object-contain"
              />
              <p>{date}</p>
              <Image
                src="/clockicon.png"
                alt="clock_icon"
                // className="h-[20px] w-[20px] object-contain"
                height={20}
                width={20}
              />
              <p>{time}</p>
            </div>
            <button
              onClick={() => handleJoinClass(id)}
              className="rounded-lg bg-slate-600 text-white"
            >
              {hasJoined ? "Class Joined!" : "Join Class"}
            </button>
            <p>Interested Users:</p>
            <div className="flex">
              {participant?.map((p) => {
                return (
                  // <div
                  //   className="group relative inline-block hover:cursor-pointer"
                  //   key={p.user.id}
                  // >
                  //   <img
                  //     src={p.user.image ? p.user.image : "default"}
                  //     className="h-[20px] rounded-full"
                  //   ></img>
                  //   <p className="z-100 invisible absolute bg-black text-white group-hover:visible">
                  //     {p.user.name}
                  //   </p>
                  // </div>
                  <Tooltip text={p.user.name} key={p.user.id}>
                    <img
                      src={p.user.image || "default"}
                      className="h-[20px] rounded-full"
                    ></img>
                  </Tooltip>
                );
              })}
            </div>
          </div>
          <ClassComments classId={id} />
        </div>
      </body>
    </>
  );
};
// export const getServerSideProps: GetServerSideProps = async (
//   ctx: GetServerSidePropsContext
// ) => {
//   const session = await getServerAuthSession(ctx);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// };
export default ClassPage;
