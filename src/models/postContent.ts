import {
  FirestoreDataConverter,
  collection,
  query,
  getDocs,
  orderBy,
  getCountFromServer,
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

export const getPostLength = async () => {
  const ref = collection(db, "documents").withConverter(converter);
  return (await getCountFromServer(ref)).data().count;
};

export const getPostContents = async (id: string) => {
  const ref = collection(db, "documents", id, "contents").withConverter(
    converter
  );
  const q = query(ref, orderBy("no"));
  return await getDocs(q);
};
