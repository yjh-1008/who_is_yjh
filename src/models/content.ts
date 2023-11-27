import { Content, PostContent } from "@/utils/types";
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
import { converter as postConverter } from "@/models/postContent";
import { getPostContents } from "@/models/postContent";
const titleToId = (text: string) => {
  // eslint-disable-next-line no-useless-escape
  const ptrn = /[\{\}\[\]?.,:;\)*~'!^\_+<>@\#$%&\\\=\(\`\")]/gi;

  return text.replace(ptrn, "").split(" ").join("-");
};

const converter: FirestoreDataConverter<Content> = {
  toFirestore(model: Content, options?: SetOptions) {
    if (options) return Object.assign(model, { updatedAt: serverTimestamp() });
    return model.toJSON();
  },
  fromFirestore(snapshot: any) {
    const data = snapshot.data();
    return new Content(
      data.id,
      data.title,
      data.summary,
      data.tumbnail,
      data.category,
      data.tags,
      data.userRef,
      data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
      data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : undefined
    );
  },
};

const textsToChunks = (str: string) => {
  const chunks = [];
  const tmps = [];
  console.log(str);
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

export const setPost = async (
  title: string,
  text: string,
  tumbnail: string,
  category: string,
  tags: string[],
  user: User
) => {
  if (!user) throw new Error("error!");
  const batch = writeBatch(db);
  const userRef = doc(db, "users", user.uid);
  const id = titleToId(title);
  const chunks = textsToChunks(text);
  const content = new Content(
    id,
    title,
    text,
    tumbnail,
    category,
    tags,
    userRef
  );
  const postRef = doc(db, "documents", id).withConverter(converter);
  batch.set(postRef, content);
  const sn = await getPostContents(id);
  sn.docs.forEach((d) => batch.delete(d.ref));
  chunks.forEach((c, i) => {
    const ref = doc(collection(db, "documents", id, "contents")).withConverter(
      postConverter
    );
    batch.set(ref, new PostContent(i, c));
  });
  await batch.commit();
  return id;
};

export const getPosts = (start: number) => {
  const ref = collection(db, "documents").withConverter(converter);
  const q = query(ref, orderBy("createdAt"), startAt(start), limit(6));
  return getDocs(q);
};

// export const getPostsLength = () => {
//   const ref = collection(db, "documents").withConverter(converter);
//   const q = query(ref, orderBy("createdAt"), startAt(start), limit(6));
//   return getDocs(q);
// };

export const getFilterContents = (tp: string, val: string) => {
  const ref = collection(db, "documents").withConverter(converter);
  const q = query(ref, where(tp, "==", val));
  return getDocs(q);
};

export const updatePost = async (
  id: string,
  title: string,
  content = "",
  tags: string[],
  category: string
) => {
  const ref = doc(db, "documents", id).withConverter(converter);
  const batch = writeBatch(db);
  const sn = await getPostContents(id);
  sn.docs.forEach((d) => batch.delete(d.ref));
  const chunks = textsToChunks(content);
  console.log(chunks);
  chunks.forEach((c, i) => {
    const ref = doc(collection(db, "documents", id, "contents")).withConverter(
      postConverter
    );
    batch.set(ref, new PostContent(i, c));
  });
  await batch.commit();
  return updateDoc(ref, {
    title: title,
    updateAt: new Date(),
    tags: tags,
    category: category,
  });
};

export const getPost = async (id: string) => {
  console.group(id);
  const ref = doc(db, "documents", id).withConverter(converter);
  const contentSnapshot = await getDoc(ref);

  const content = contentSnapshot.data();
  if (!content) throw Error("post not exist");
  const postContentSnpashot = await getPostContents(id);
  const postContents = postContentSnpashot.docs.map((d) => d.data().content);
  content.postContent = postContents.join("");
  return content;
};

export const deleteContent = async (id: string) => {
  const batch = writeBatch(db);
  const sn = await getPostContents(id);
  console.log(id);
  // sn.docs.forEach((d) => batch.delete(d.ref));
  // batch.delete(doc(db, "documents", id));
  // return await batch.commit();
};
