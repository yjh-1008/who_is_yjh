import { Content, Dp, PostContent } from "@/utils/types";
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
  setDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "@/utils/firebase";
import { converter as postConverter } from "@/models/postContent";
import { getPostContents } from "@/models/postContent";
const titleToId = (text: string) => {
  // eslint-disable-next-line no-useless-escape
  const ptrn = /[\{\}\[\]?.,:;\)*~'!^\_+<>@\#$%&\\\=\(\`\")]/gi;

  return text.replace(ptrn, "").split(" ").join("-");
};

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
      data.uendDtti instanceof Timestamp ? data.uendDtti.toDate() : undefined,
      data.id
    );
  },
};

const textsToChunks = (str: string) => {
  const chunks = [];
  const tmps = [];
  const lines = str.split("\n");
  for (const line of lines) {
    tmps.push(line);
    const joinStr = tmps.join("\n");
    if (joinStr.length < 1000) continue;
    chunks.push(joinStr);
    tmps.splice(0, tmps.length);
  }
  if (tmps.length) chunks.push(tmps.join("\n"));
  return chunks;
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
  const batch = writeBatch(db);
  const userRef = doc(db, "users", user.uid);
  const id = titleToId(title);
  const chunks = textsToChunks(content);
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
  setDoc(postRef, project);
  // postRef = doc(db, "projects", id).withConverter(converter)
  // batch.set(postRef, project);
  // const sn = await getPostContents(title);
  // sn.docs.forEach((d) => batch.delete(d.ref));
  // chunks.forEach((c, i) => {
  //   const ref = doc(
  //     collection(db, "projects", title, "contents")
  //   ).withConverter(postConverter);
  //   batch.set(ref, new PostContent(i, c));
  // });
  // await batch.commit();
  return id;
};

export const getPosts = <T>(qs: T[]) => {
  const ref = collection(db, "projects").withConverter(converter);
  let q;
  if (qs !== undefined)
    q = query(ref, orderBy("sttDtti"), startAfter(qs[qs.length - 1]), limit(2));
  else q = query(ref, orderBy("sttDtti"), limit(6));
  return getDocs(q);
};

export const getFilterContents = (tp: string, val: string) => {
  const ref = collection(db, "documents").withConverter(converter);
  const q = query(ref, where(tp, "==", val));
  return getDocs(q);
};
