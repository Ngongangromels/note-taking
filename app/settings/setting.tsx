"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

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
            <button
              onClick={() => setTheme("light")}
              className={`flex items-center w-full p-3 rounded-lg ${
                theme === "light"
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Sun size={20} className="mr-3" />
              <span className="dark:text-white">Light</span>
            </button>

            <button
              onClick={() => setTheme("dark")}
              className={`flex items-center w-full p-3 rounded-lg ${
                theme === "dark"
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Moon size={20} className="mr-3" />
              <span className="dark:text-white">Dark</span>
            </button>

            <button
              onClick={() => setTheme("system")}
              className={`flex items-center w-full p-3 rounded-lg ${
                theme === "system"
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Monitor size={20} className="mr-3" />
              <span className="dark:text-white">System</span>
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium mb-4 dark:text-white">About</h2>
            <p className="text-gray-600 dark:text-gray-400">Notes App v1.0.0</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              A simple note-taking application built with Next.js and Tailwind
              CSS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
