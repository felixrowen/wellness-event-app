import { EVENT_CATEGORY } from "@/types";

export const CATEGORY_IMAGES: Record<EVENT_CATEGORY, string> = {
  [EVENT_CATEGORY.HEALTH_SCREENING]:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
  [EVENT_CATEGORY.MENTAL_WELLNESS]:
    "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop",
  [EVENT_CATEGORY.FITNESS_EXERCISE]:
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop",
  [EVENT_CATEGORY.DIET_NUTRITION]:
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop",
  [EVENT_CATEGORY.WORK_LIFE_BALANCE]:
    "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800&auto=format&fit=crop",
  [EVENT_CATEGORY.HEALTH_TALK_EDUCATION]:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
};

export const getCategoryImage = (category: EVENT_CATEGORY): string => {
  return (
    CATEGORY_IMAGES[category] ||
    CATEGORY_IMAGES[EVENT_CATEGORY.HEALTH_TALK_EDUCATION]
  );
};

export const getCategoryLabel = (category: number): string => {
  const categoryLabels: Record<number, string> = {
    1: "Health Screening",
    2: "Mental Wellness",
    3: "Fitness & Exercise",
    4: "Diet & Nutrition",
    5: "Work-Life Balance",
    6: "Health Talk & Education",
  };

  return categoryLabels[category];
};
