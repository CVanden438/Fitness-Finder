import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import XIcon from "../icons/XIcon";

const initialQuery: filters = {};

interface props {
  setQueryString: React.Dispatch<React.SetStateAction<filters>>;
  search?: string;
  queryString: filters;
  route: string;
}
const SearchBar: React.FC<props> = ({
  setQueryString,
  search,
  queryString,
  route,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const search = searchInput;
    // setQueryString(initialQuery);
    router.push({
      pathname: route,
      query: { ...queryString, search },
    });
    setQueryString({ ...queryString, search: search });
  };
  const handleCancel = () => {
    setSearchInput("");
    router.push({
      pathname: route,
      query: { ...queryString, search: undefined },
    });
    setQueryString({ ...queryString, search: undefined });
  };
  return (
    <form
      action="submit"
      className="relative flex w-full items-center justify-center pt-6 sm:pl-[200px]"
      onSubmit={(e) => {
        handleSearch(e);
      }}
    >
      <input
        type="text"
        id="search"
        placeholder="search instructors..."
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        className=" border-1 h-[41px] w-[300px] rounded-l-lg border border-yellow-400 bg-black pl-2 focus:border-2  focus:border-yellow-500 focus:outline-none"
      />
      <button className="h-[41px] rounded-r-lg border-t border-r border-b border-yellow-400 bg-slate-700 p-1  hover:bg-slate-800">
        {/* <Image
          src="/search.svg"
          alt=""
          height={40}
          width={40}
          className=" rounded-r-lg border-t border-r border-b border-yellow-500 bg-slate-700 p-2 hover:bg-slate-800"
        /> */}
        <SearchIcon height={35} width={35} classNames="" />
      </button>
      {search && (
        <button
          onClick={handleCancel}
          className="absolute translate-x-[110px] "
        >
          {/* <Image src="/x.svg" height={17} width={17} alt="" /> */}
          <XIcon height={30} width={30} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
