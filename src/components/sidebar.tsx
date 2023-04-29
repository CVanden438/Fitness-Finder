import { NextPage } from "next";
import router from "next/router";
import React, { useState } from "react";
interface propType {
  setQueryString: React.Dispatch<React.SetStateAction<filters>>;
  queryString: filters;
  category?: string;
  difficulty?: string;
  search?: string;
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
const initialQuery: filters = {};
const categories: categoriesArr = [
  "General Fitness",
  "Weights",
  "Dance",
  "Yoga",
];
const difficulties: difficultiesArr = ["Beginner", "Intermediate", "Advanced"];
const Sidebar: React.FC<propType> = ({
  queryString,
  setQueryString,
  category,
  difficulty,
  search,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const handleClick = (filterType: string, param: string) => {
    router.push({
      pathname: "/viewclasses",
      query: { ...queryString, [filterType]: param },
    });
    setQueryString({ ...queryString, [filterType]: param });
  };
  const handleClearFilters = () => {
    router.push({
      pathname: "/viewclasses",
      query: search ? { search: search } : {},
    });
    search
      ? setQueryString({ ...initialQuery, search: search })
      : setQueryString({ ...initialQuery });
  };
  return (
    <div
      className={`${
        isSidebarOpen ? "flex" : "hidden sm:flex"
      } fixed z-10 h-screen w-full flex-col items-center bg-gray-900 sm:w-[200px]`}
    >
      <p className="mt-2 w-4/5 rounded-lg bg-slate-900 text-center text-lg font-bold outline outline-1">
        Category
      </p>
      <ul className={`mt-2  flex w-full flex-col items-center gap-2`}>
        {categories.map((c) => {
          return (
            <li
              key={c}
              onClick={() => {
                handleClick("category", c);
              }}
              className={`w-3/4 rounded-lg text-center hover:cursor-pointer hover:outline hover:outline-2 ${
                category === c
                  ? "bg-slate-800 outline outline-2"
                  : "bg-slate-700"
              }`}
            >
              {c}
            </li>
          );
        })}
      </ul>
      <p className="mt-2 w-4/5 rounded-lg bg-slate-900 text-center text-lg font-bold outline outline-1">
        Difficulty
      </p>
      <ul className={`mt-2 flex w-full flex-col items-center gap-2`}>
        {difficulties.map((d) => {
          return (
            <li
              key={d}
              onClick={() => {
                handleClick("difficulty", d);
              }}
              className={`w-3/4 rounded-lg text-center hover:cursor-pointer hover:outline hover:outline-2 ${
                difficulty === d
                  ? "bg-slate-800 outline outline-2"
                  : "bg-slate-700"
              }`}
            >
              {d}
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          handleClearFilters();
        }}
        className="mt-4 w-4/5 rounded-lg bg-slate-900 text-lg font-bold outline outline-2 hover:outline-4"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Sidebar;
