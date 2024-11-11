import React from "react";

export default function SearchBar({ query, setQuery }) {
  return (
    <>
      <div className="  h-[10vh] flex justify-center items-center w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[20vw] h-[4vh] rounded-md p-2"
          placeholder="enter your query for image"
        />
      </div>
    </>
  );
}
