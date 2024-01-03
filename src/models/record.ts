import { Record } from "@/utils/types";
import {
  FirestoreDataConverter,
  doc,
  Timestamp,
  collection,
  query,
  getDocs,
  writeBatch,
  SetOptions,
  serverTimestamp,
  limit,
  orderBy,
  startAfter,
  setDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "@/utils/firebase";
const titleToId = (text: string) => {
  // eslint-disable-next-line no-useless-escape
  const ptrn = /[\{\}\[\]?.,:;\)*~'!^\_+<>@\#$%&\\\=\(\`\")]/gi;

  return text.replace(ptrn, "").split(" ").join("-");
};

const converter: FirestoreDataConverter<Record> = {
  toFirestore(model: Record, options?: SetOptions) {
    if (options) return Object.assign(model, { endDtti: serverTimestamp() });
    return model.toJSON();
  },
  fromFirestore(snapshot: any) {
    const data = snapshot.data();
    return new Record(
      data.title,
      data.content,
      data.tumbnail,
      data.githubLink,
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

export const setRecord = async (
  title: string,
  content: string,
  tumbnail: string,
  githubLink: string,
  user: User,
  sttDtti: Date,
  endDtti: Date
) => {
  if (!user) throw new Error("error!");
  const batch = writeBatch(db);
  const userRef = doc(db, "users", user.uid);
  const id = titleToId(title);
  const chunks = textsToChunks(content);
  const project = new Record(
    title,
    content,
    tumbnail,
    githubLink,
    userRef,
    sttDtti,
    endDtti,
    id
  );
  const postRef = doc(db, "record", id).withConverter(converter);
  setDoc(postRef, project);
  return id;
};

export const getRecord = <T>(qs: T[]) => {
  const ref = collection(db, "record").withConverter(converter);
  let q;
  if (qs !== undefined)
    q = query(ref, orderBy("sttDtti"), startAfter(qs[qs.length - 1]), limit(6));
  else q = query(ref, orderBy("sttDtti"), limit(6));

  return getDocs(q);
};
