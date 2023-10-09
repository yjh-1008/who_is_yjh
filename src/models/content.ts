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
      data.title,
      data.content,
      data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
      data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : undefined
    );
  },
};

const textsToChunks = (str: string) => {
  return str.match(/.{1,10}/g) || [];
};

export const setPost = async (title: string, text: string, user: User) => {
  // const store = useStore();
  // console.log(user);
  // const user = store.getters.getAuthState;
  if (!user) throw new Error("error!");
  const batch = writeBatch(db);
  const userRef = doc(db, "users", user.uid);
  const id = titleToId(title);
  const chunks = textsToChunks(text);
  const content = new Content(title, text, userRef);
  const postRef = doc(db, "documents", id).withConverter(converter);
  batch.set(postRef, content);
  chunks.forEach((c, i) => {
    const ref = doc(collection(db, "documents", id, "contents")).withConverter(
      postConverter
    );
    batch.set(ref, new PostContent(i, c));
  });
  return await batch.commit();
};

export const getPosts = () => {
  const ref = collection(db, "documents").withConverter(converter);
  const q = query(ref);
  return getDocs(q);
};

export const updatePost = (id: string, content: string) => {
  const ref = doc(db, "documents", id).withConverter(converter);
  return updateDoc(ref, { content: content, updateAt: new Date() });
};

export const getPost = async (id: string) => {
  console.log(id);
  const ref = doc(db, "documents", id).withConverter(converter);
  const contentSnapshot = await getDoc(ref);
  const content = contentSnapshot.data();
  if (!content) throw Error("post not exist");
  const postContentSnpashot = await getPostContents(id);
  const postContents = postContentSnpashot.docs.map((d) => d.data().content);
  content.postContent = postContents.join("");
  return content;
};
