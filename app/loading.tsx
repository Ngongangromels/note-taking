import { Spinner } from "@/components/spinner";

export default function Loading() {
  return (
    <div>
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 dark:text-gray-400">
                    <Spinner />
                  </p>
                </div>
              </div>
  );
}
