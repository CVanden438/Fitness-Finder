import React from "react";

const InstructorModal = () => {
  return (
    <div className="fixed top-0 left-0 flex h-full w-full justify-center bg-black/50 pt-40">
      <form
        className="flex h-[200px] w-[400px] flex-col rounded-lg bg-slate-50 p-2"
        action="submit"
      >
        <label htmlFor="text">Enter Bio:</label>
        <textarea id="text" placeholder="enter bio..." />
        <button className="mx-auto w-1/2 rounded-lg bg-slate-600 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default InstructorModal;
