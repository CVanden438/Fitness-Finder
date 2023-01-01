import { NextPage } from "next";
import router from "next/router";
import React, { useState } from "react";
interface propType {
  setQueryString: React.Dispatch<React.SetStateAction<filters>>;
  queryString: filters;
}
const initialQuery: filters = {};
const categories: categoriesArr = [
  "General Fitness",
  "Weights",
  "Dance",
  "Yoga",
];
const difficulties: difficultiesArr = ["Beginner", "Intermediate", "Advanced"];
const sidebar: React.FC<propType> = ({ queryString, setQueryString }) => {
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
    });
    setQueryString(initialQuery);
  };
  return (
    <div className="fixed flex h-screen w-[200px] flex-col bg-slate-400">
      <p className="bg-slate-600 text-white">Category</p>
      <ul>
        {categories.map((c) => {
          return (
            <li
              key={c}
              onClick={() => {
                handleClick("category", c);
              }}
              className="bg-slate-50 hover:cursor-pointer hover:bg-slate-200"
            >
              {c}
            </li>
          );
        })}
      </ul>
      <p className="bg-slate-600 text-white">Difficulty</p>
      <ul>
        {difficulties.map((d) => {
          return (
            <li
              key={d}
              onClick={() => {
                handleClick("difficulty", d);
              }}
              className="bg-slate-50 hover:cursor-pointer hover:bg-slate-200"
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
        className="bg-slate-500"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default sidebar;
