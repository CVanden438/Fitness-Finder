import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";

const classComments = ({ classId }: { classId: string }) => {
  const [input, setInput] = useState("");
  const { data: sesh } = useSession();
  const addComment = trpc.class.addComment.useMutation({});
  const { data: comments, refetch } = trpc.class.getComments.useQuery(
    { classId },
    { refetchOnWindowFocus: false }
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sesh) {
      signIn();
    }
    await addComment.mutateAsync({ text: input, classId });
    refetch();
    setInput("");
  };
  return (
    <div className="pl-6">
      <form
        action="submit"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="w-[400px]"
      >
        <textarea
          name="comment"
          id="comment"
          rows={2}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="w-full"
        ></textarea>
        <button
          type="submit"
          className="mr-0 ml-auto block bg-slate-600 text-white"
        >
          Add Comment
        </button>
      </form>
      <div className="mt-4 h-[260px] w-[400px] overflow-y-auto">
        {comments?.length === 0
          ? "Be the first to leave a comment!"
          : comments?.map((comm) => {
              return (
                <div
                  key={comm.id}
                  className="overflow-auto border-b bg-slate-100"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={comm.user.image ? comm.user.image : "default"}
                        alt="User Image"
                        className="h-[20px] rounded-full"
                      />
                      <p>{comm.user.name}</p>
                    </div>
                    <p>{comm.createdAt.toISOString().slice(0, 10)}</p>
                  </div>
                  <p>{comm.text}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default classComments;
