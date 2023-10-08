import { Content } from "@/utils/types";
import {
  FirestoreDataConverter,
  doc,
  setDoc,
  Timestamp,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
const converter: FirestoreDataConverter<Content> = {
  toFirestore(model: Content) {
    return {
      title: model.title,
      content: model.content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  },
  fromFirestore(snapshot: any) {
    const data = snapshot.data();
    return new Content(
      data.title,
      data.content,
      data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
      data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : undefined
    );
  },
};

export const setPost = (post: Content) => {
  const ref = doc(db, "documents", post.title).withConverter(converter);
  return setDoc(ref, post);
};

export const getPost = () => {
  const ref = collection(db, "documents").withConverter(converter);
  const q = query(ref);
  return getDocs(q);
};

export const updatePost = (id: string, content: string) => {
  const ref = doc(db, "documents", id).withConverter(converter);
  return updateDoc(ref, { content: content, updateAt: new Date() });
};
