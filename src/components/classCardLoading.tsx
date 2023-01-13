import React from "react";

const ClassCardLoading = () => {
  return (
    <div className="flex h-[218px] animate-pulse flex-col gap-y-4 rounded-md border border-black bg-slate-100 p-1 shadow-lg shadow-gray-400 hover:bg-slate-200 lg:w-[250px]">
      <div className="grid grid-cols-3">
        <div className="h-10 w-10 rounded-full bg-slate-500"></div>
        <div className="col-span-1 -ml-6 flex flex-col justify-around">
          <div className=" h-2 rounded bg-slate-500"></div>
          <div className=" h-2 rounded bg-slate-500"></div>
        </div>
      </div>
      <div className=" h-2 rounded bg-slate-500"></div>
      <div className=" h-2 rounded bg-slate-500"></div>
      <div className=" h-2 rounded bg-slate-500"></div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-2 rounded bg-slate-500"></div>
        <div className="col-span-1 h-2 rounded bg-slate-500"></div>
        <div className="h-2 rounded bg-slate-500"></div>
        <div className="invisible col-span-2 h-2 rounded bg-slate-500"></div>
        <div className="col-span-3 h-4 rounded bg-slate-500"></div>
      </div>
    </div>
  );
};

export default ClassCardLoading;
