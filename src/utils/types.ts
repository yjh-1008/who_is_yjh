import {
  FirestoreDataConverter,
  doc,
  setDoc,
  Timestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
//메인화면 요약 카드 타입
export interface HomeContentType {
  readonly title: string;
  readonly content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
export class Content {
  constructor(
    readonly title: string,
    readonly content: string,
    readonly createdAt?: Date | undefined,
    readonly updatedAt?: Date | undefined
  ) {
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }
}

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
