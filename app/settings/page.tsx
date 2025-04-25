"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle";

export default function SettingsPage() {
  const router = useRouter();
  

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => router.push("/")}
          className="mr-4 text-gray-500 dark:text-gray-400"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold dark:text-white">Settings</h1>
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-medium mb-4 dark:text-white">
            Appearance
          </h2>

          <div className="space-y-2">
            <ModeToggle/>       
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4 dark:text-white">About</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus distinctio, quasi harum voluptatem dolores voluptate mollitia totam adipisci consectetur veniam optio suscipit necessitatibus recusandae neque, id ipsum eum, quisquam maiores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
