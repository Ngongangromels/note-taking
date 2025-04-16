import { TagIcon } from "lucide-react";

interface TagProps {
  name: string;
  size?: "sm" | "md";
  icon?: boolean;
}

export function Tag({ name, size = "sm", icon = false }: TagProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded
        ${size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"}
        bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200
      `}
    >
      {icon && <TagIcon size={14} className="mr-1.5" />}
      {name}
    </span>
  );
}
