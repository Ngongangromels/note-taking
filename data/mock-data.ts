import type { Note, Tag } from "@/type";

// Données de démonstration pour les tags
export const TAGS: Tag[] = [
  { id: "cooking", name: "Cooking" },
  { id: "dev", name: "Dev" },
  { id: "fitness", name: "Fitness" },
  { id: "health", name: "Health" },
  { id: "personal", name: "Personal" },
  { id: "react", name: "React" },
  { id: "recipes", name: "Recipes" },
  { id: "shopping", name: "Shopping" },
  { id: "travel", name: "Travel" },
  { id: "typescript", name: "TypeScript" },
];

// Données de démonstration pour les notes
export const NOTES: Note[] = [
  {
    id: "react-performance",
    title: "React Performance Optimization",
    content: `Key performance optimization techniques:

1. Code Splitting
- Use React.lazy() for route-based splitting
- Implement dynamic imports for heavy components

2. Memoization
- useMemo for expensive calculations
- useCallback for function props
- React.memo for component optimization

3. Virtual List Implementation
- Use react-window for long lists
- Implement infinite scrolling

TODO: Benchmark current application and identify bottlenecks`,
    tags: ["Dev", "React"],
    lastEdited: "29 Oct 2024",
  },
  {
    id: "japan-travel",
    title: "Japan Travel Planning",
    content: "Planning details for Japan trip...",
    tags: ["Travel", "Personal"],
    lastEdited: "28 Oct 2024",
  },
  {
    id: "pasta-recipes",
    title: "Favorite Pasta Recipes",
    content: "Collection of pasta recipes...",
    tags: ["Cooking", "Recipes"],
    lastEdited: "27 Oct 2024",
  },
  {
    id: "workout-plan",
    title: "Weekly Workout Plan",
    content: "Weekly workout schedule...",
    tags: ["Dev", "React"],
    lastEdited: "25 Oct 2024",
  },
  {
    id: "meal-prep",
    title: "Meal Prep Ideas",
    content: "Meal preparation ideas for the week...",
    tags: ["Cooking", "Health", "Recipes"],
    lastEdited: "12 Oct 2024",
  },
  {
    id: "reading-list",
    title: "Reading List",
    content: "Books to read...",
    tags: ["Personal", "Dev"],
    lastEdited: "05 Oct 2024",
  },
  {
    id: "fitness-goals",
    title: "Fitness Goals 2025",
    content: "Fitness goals for the upcoming year...",
    tags: ["Fitness", "Health", "Personal"],
    lastEdited: "22 Sep 2024",
  },
];
