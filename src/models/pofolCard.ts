import { Project } from "@/utils/types";
import {
  FirestoreDataConverter,
  doc,
  Timestamp,
  collection,
  query,
  getDocs,
  getDoc,
  writeBatch,
  SetOptions,
  updateDoc,
  serverTimestamp,
  where,
  startAt,
  limit,
  orderBy,
  startAfter,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "@/utils/firebase";

const converter: FirestoreDataConverter<Project> = {
  toFirestore(model: Project, options?: SetOptions) {
    if (options) return Object.assign(model, { updatedAt: serverTimestamp() });
    return model.toJSON();
  },
  fromFirestore(snapshot: any) {
    const data = snapshot.data();
    return new Project(
      data.title,
      data.content,
      data.tumbnail,
      data.tags,
      data.userRef,
      data.sttDtti instanceof Timestamp ? data.sttDtti.toDate() : undefined,
      data.endDtti instanceof Timestamp ? data.endDtti.toDate() : undefined
    );
  },
};

export const getProjects = <T>(qs: T[]) => {
  const ref = collection(db, "projects").withConverter(converter);
  let q;
  if (q !== undefined) {
    q = query(ref, orderBy("sttDtti"), startAfter(qs[qs.length - 1]), limit(2));
  } else q = query(ref, orderBy("sttDtti"), limit(2));
  return getDocs(q);
};
