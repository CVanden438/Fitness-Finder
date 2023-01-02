import React, { useState } from "react";
import { trpc } from "../utils/trpc";

const classComments = ({ classId }: { classId: string }) => {
  const [input, setInput] = useState("");
  const addComment = trpc.class.addComment.useMutation({});
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addComment.mutateAsync({ text: input, classId });
  };
  return (
    <form
      action="submit"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <textarea
        name="comment"
        id="comment"
        cols={30}
        rows={5}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></textarea>
      <button type="submit" className="bg-slate-600 text-white">
        Add Comment
      </button>
    </form>
  );
};

export default classComments;
