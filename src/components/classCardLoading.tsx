import React from "react";

const ClassCardLoading = () => {
  return (
    <article className="flex h-[264px] animate-pulse flex-col gap-y-4 bg-gray-900 p-1">
      <div className="grid grid-cols-3">
        <div className="h-10 w-10 rounded-full bg-slate-700"></div>
        <div className="col-span-1 -ml-6 flex flex-col justify-around">
          <div className=" h-2 rounded bg-slate-700"></div>
          <div className=" h-2 rounded bg-slate-700"></div>
        </div>
      </div>
      <div className=" h-2 rounded bg-slate-700"></div>
      <div className=" h-2 rounded bg-slate-700"></div>
      <div className=" h-2 rounded bg-slate-700"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-2 rounded bg-slate-700"></div>
        <div className="col-span-1 h-2 rounded bg-slate-700"></div>
        <div className="h-2 rounded bg-slate-700"></div>
        <div className="invisible col-span-2 h-2 rounded bg-slate-700"></div>
        <div className="col-span-3 h-4 rounded bg-slate-700"></div>
      </div>
    </article>
  );
};

export default ClassCardLoading;
