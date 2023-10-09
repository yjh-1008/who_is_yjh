import { User } from "@/models/user";
import { DocumentSnapshot } from "firebase-admin/firestore";
import {
  deleteDoc,
  doc,
  serverTimestamp,
  DocumentReference,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
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
    readonly summary: string,
    readonly userRef: DocumentReference,
    readonly createdAt?: Date | undefined,
    readonly updatedAt?: Date | undefined,
    public userSnapshot?: DocumentSnapshot<User> | undefined,
    public postContent?: string | undefined
  ) {}

  toJSON() {
    return {
      title: this.title,
      summary: this.summary,
      userRef: this.userRef,
      createdAt: this.createdAt || serverTimestamp(),
      updatedAt: this.updatedAt || serverTimestamp(),
    };
  }

  remove(id: string) {
    const ref = doc(db, "documents", id);
    return deleteDoc(ref);
  }
}

export class PostContent {
  constructor(readonly no: number, readonly content: string) {
    this.no = no;
    this.content = content;
  }

  toJSON() {
    return {
      no: this.no,
      content: this.content,
    };
  }
}
