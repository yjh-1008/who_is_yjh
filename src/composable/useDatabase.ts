import { database } from "@/utils/firebase";
import { ref, set, get } from "firebase/database";
const categoryRef = ref(database, "site/categories");
const tagsRef = ref(database, "site/tags");

export const useDatabase = () => {
  const setCategoreis = async (categories: string[]) => {
    await set(categoryRef, categories);
  };

  const getCategories = () => {
    return get(categoryRef);
  };
  const setTags = async (tags: string[]) => {
    await set(tagsRef, tags);
  };

  const getTags = () => {
    return get(tagsRef);
  };

  return {
    setCategoreis,
    getCategories,
    setTags,
    getTags,
  };
};
