// "use client";

// import type React from "react";

// import { LogIn, SearchIcon, Settings } from "lucide-react";
// import { useState } from "react";
// import { useConvexAuth } from "convex/react";
// import { useSettings } from "@/hooks/use-settings";
// import { Spinner } from "./spinner";
// import { SignInButton } from "@clerk/clerk-react";
// import { Button } from "./ui/button";

// interface SearchProps {
//   onSearch: (query: string) => void;
// }

// export function Search({ onSearch }: SearchProps) {
//   const [query, setQuery] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setQuery(value);
//     onSearch(value);
//   };

//   const settings = useSettings()

//   const { isAuthenticated, isLoading } = useConvexAuth()

//   return (
//     <div className="flex space-x-2">
//       {isLoading && <Spinner />}
//       {!isAuthenticated && !isLoading && (
//         <>
//           <SignInButton mode="modal">
//             <Button variant="outline">Log in icon={<LogIn size={18} />}</Button>
//           </SignInButton>
//         </>
//       )}
//       {isAuthenticated && !isLoading && (
//         <>
//           {" "}
//           <div className="relative w-64">
//             <input
//               type="text"
//               value={query}
//               onChange={handleChange}
//               placeholder="Search by title, content, or tags..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
//             />
//             <div className="absolute left-3 top-2.5 text-gray-400 cuser-pointer">
//               <SearchIcon size={16} />
//             </div>
//           </div>
//           <button className=" cursor-pointer" onClick={settings.onOpen}>
//             <Settings size={20} />
//           </button>
//         </>
//       )}
//     </div>
//   );
// }


"use client";

import type React from "react";
import { LogIn, SearchIcon, Settings } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSettings } from "@/hooks/use-settings";
import { useConvexAuth } from "convex/react";
import { Spinner } from "./spinner";
import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";

interface SearchProps {
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
}

export function Search({
  onSearch = () => {},
  autoFocus = false,
}: SearchProps) {

  const settings = useSettings()

  const { isAuthenticated, isLoading } = useConvexAuth()

  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex  space-x-1">
      {isLoading && <Spinner />}
      {!isAuthenticated && !isLoading && (
        <>
          <SignInButton mode="modal">
            <Button variant="outline">Log in{<LogIn size={18} />}</Button>
          </SignInButton>
        </>
      )}
      {isAuthenticated && !isLoading && (
        <>
          <div className="relative flex flex-row w-64">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search by title, content, or tags..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <SearchIcon size={16} />
            </div>
            <button className=" cursor-pointer" onClick={settings.onOpen}>
              <Settings size={20} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
