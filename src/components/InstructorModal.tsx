import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { trpc } from "../utils/trpc";
interface props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InstructorModal: React.FC<props> = ({ setIsModalOpen }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const { data: sesh } = useSession();
  const makeInstructor = trpc.user.makeInstructor.useMutation({});
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sesh && sesh.user?.role === "INSTRUCTOR") {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }
    makeInstructor.mutateAsync();
    setInput("");
    setIsModalOpen(false);
  };
  return (
    <div className="fixed top-0 left-0 flex h-full w-full justify-center bg-black/50 pt-40">
      <form
        className="flex h-fit w-[400px] flex-col gap-2 rounded-lg bg-slate-50 p-2"
        action="submit"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex items-center justify-between">
          <label htmlFor="text">Enter Bio:</label>
          <IoClose
            onClick={() => {
              setIsModalOpen(false);
            }}
            className="hover:cursor-pointer"
            color="red"
            size="25px"
          />
        </div>
        <textarea
          id="text"
          rows={4}
          placeholder="enter bio..."
          className="p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          disabled={error}
          className="mx-auto w-1/2 rounded-lg bg-slate-600 text-white disabled:bg-slate-400"
        >
          Submit
        </button>
        {error && <p>Already an instructor!</p>}
      </form>
    </div>
  );
};

export default InstructorModal;
