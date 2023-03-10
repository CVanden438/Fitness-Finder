import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

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
        className=" h-[41px] w-[300px] rounded-l-lg border border-black bg-slate-50 pl-2"
      />
      <button>
        <Image
          src="/search.svg"
          alt=""
          height={40}
          width={40}
          className="rounded-r-lg border-t border-r border-b border-black bg-slate-400 p-2 hover:bg-slate-500"
        />
      </button>
      {search && (
        <button onClick={handleCancel} className="absolute translate-x-[110px]">
          <Image src="/x.svg" height={17} width={17} alt="" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
