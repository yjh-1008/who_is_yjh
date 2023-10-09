import {
  FirestoreDataConverter,
  collection,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { PostContent } from "@/utils/types";
import { db } from "@/utils/firebase";
export const converter: FirestoreDataConverter<PostContent> = {
  toFirestore(model: PostContent) {
    return model.toJSON();
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return new PostContent(data.no, data.content);
  },
};

export const getPostContents = async (id: string) => {
  const ref = collection(db, "documents", id, "contents").withConverter(
    converter
  );
  console.log(ref);
  const q = query(ref, orderBy("no"));
  return await getDocs(q);
};
