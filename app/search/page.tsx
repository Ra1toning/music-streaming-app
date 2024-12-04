'use client'
import { useState } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle the search logic here
    console.log("Searching for:", query);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl text-white mb-4">Search</h1>
      \
    </div>
  );
};

export default SearchPage;
