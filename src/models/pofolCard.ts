import { Dp, ContentImage } from "@/utils/types";
import {
  FirestoreDataConverter,
  doc,
  Timestamp,
  collection,
  query,
  getDocs,
  setDoc,
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
import useStorage from "@/composable/useStorage";
const { uploadFile, imageCompress } = useStorage();
const converter: FirestoreDataConverter<Dp> = {
  toFirestore(model: Dp, options?: SetOptions) {
    if (options) return Object.assign(model, { updatedAt: serverTimestamp() });
    return model.toJSON();
  },
  fromFirestore(snapshot: any) {
    const data = snapshot.data();
    return new Dp(
      data.title,
      data.content,
      data.tumbnail,
      data.githubLink,
      data.tags,
      data.userRef,
      data.sttDtti instanceof Timestamp ? data.sttDtti.toDate() : undefined,
      data.endDtti instanceof Timestamp ? data.endDtti.toDate() : undefined,
      data.id
    );
  },
};
const titleToId = (text: string) => {
  // eslint-disable-next-line no-useless-escape
  const ptrn = /[\{\}\[\]?.,:;\)*~'!^\_+<>@\#$%&\\\=\(\`\")]/gi;

  return text.replace(ptrn, "").split(" ").join("-");
};

export const setProject = async (
  title: string,
  content: string,
  tumbnail: string,
  githubLink: string,
  tags: string[],
  user: User,
  sttDtti: Date,
  endDtti: Date
) => {
  if (!user) throw new Error("error!");
  const userRef = doc(db, "users", user.uid);
  const id = titleToId(title);
  const project = new Dp(
    title,
    content,
    tumbnail,
    githubLink,
    tags,
    userRef,
    sttDtti,
    endDtti,
    id
  );
  const postRef = doc(db, "projects", id).withConverter(converter);
  await setDoc(postRef, project);
  return id;
};

export const getProjects = <T>(qs: T[]) => {
  const ref = collection(db, "projects").withConverter(converter);
  let q;
  if (qs !== undefined) {
    q = query(ref, orderBy("sttDtti"), startAfter(qs[qs.length - 1]), limit(2));
  } else q = query(ref, orderBy("sttDtti"), limit(2));
  return getDocs(q);
};
