"use client";

import type React from "react";

import { LogIn, SearchIcon, Settings } from "lucide-react";
import { useState } from "react";
import { useConvexAuth } from "convex/react";
import { useSettings } from "@/hooks/use-settings";
import { Spinner } from "./spinner";
import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";

interface SearchProps {
  onSearch: (query: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const settings = useSettings()

  const { isAuthenticated, isLoading } = useConvexAuth()

  return (
    <div className="flex space-x-2">
      {isLoading && <Spinner />}
      {!isAuthenticated && !isLoading && (
        <>
          <SignInButton mode="modal">
            <Button variant="outline">Log in icon={<LogIn size={18} />}</Button>
          </SignInButton>
        </>
      )}
      {isAuthenticated && !isLoading && (
        <>
          {" "}
          <div className="relative w-64">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search by title, content, or tags..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            />
            <div className="absolute left-3 top-2.5 text-gray-400 cuser-pointer">
              <SearchIcon size={16} />
            </div>
          </div>
          <button className=" cursor-pointer" onClick={settings.onOpen}>
            <Settings size={20} />
          </button>
        </>
      )}
    </div>
  );
}
