import { User } from "@/models/user";
import { DocumentSnapshot, Timestamp } from "firebase-admin/firestore";
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

export interface Pofol {
  readonly title: string;
  readonly content: string;
  readonly tumbnail: string;
  readonly userRef: DocumentReference;
  readonly sttDtti: Date;
  readonly endDtti?: Date;
  readonly id: string;
  readonly githubLink: string;
  readonly tags: string[];
}

export interface record {
  readonly title: string;
  readonly content: string;
  readonly tumbnail: string;
  readonly userRef: DocumentReference;
  readonly sttDtti: Date;
  readonly endDtti?: Date;
  readonly id: string;
}

export class Record {
  constructor(
    readonly title: string,
    readonly content: string,
    readonly tumbnail: string,
    readonly userRef: DocumentReference,
    readonly sttDtti: Date,
    readonly endDtti: Date,
    readonly id: string,
    public userSnapshot?: DocumentSnapshot<User> | undefined
  ) {}

  toJSON() {
    return {
      title: this.title,
      content: this.content,
      tumbnail: this.tumbnail,
      userRef: this.userRef,
      sttDtti: this.sttDtti || serverTimestamp(),
      endDtti: this.endDtti || serverTimestamp(),
      id: this.id,
    };
  }

  remove(id: string) {
    const ref = doc(db, "documents", id);
    return deleteDoc(ref);
  }
}

export class Dp {
  constructor(
    readonly title: string,
    readonly content: string,
    readonly tumbnail: string,
    readonly githubLink: string,
    readonly tags: string[],
    readonly userRef: DocumentReference,
    readonly sttDtti: Date,
    readonly endDtti: Date,
    readonly id?: string,
    public userSnapshot?: DocumentSnapshot<User> | undefined
  ) {}

  toJSON() {
    return {
      title: this.title,
      content: this.content,
      tumbnail: this.tumbnail,
      tags: this.tags,
      githubLink: this.githubLink,
      userRef: this.userRef,
      sttDtti: this.sttDtti || serverTimestamp(),
      endDtti: this.endDtti || serverTimestamp(),
      id: this.id,
    };
  }

  remove(id: string) {
    const ref = doc(db, "documents", id);
    return deleteDoc(ref);
  }
}

export class Content {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly summary: string,
    readonly tumbnail: string,
    readonly category: string,
    readonly tags: string[],
    readonly userRef: DocumentReference,
    readonly createdAt?: Date | undefined,
    readonly updatedAt?: Date | undefined,
    public userSnapshot?: DocumentSnapshot<User> | undefined,
    public postContent?: string | undefined
  ) {}

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      summary: this.summary,
      tumbnail: this.tumbnail,
      category: this.category,
      tags: this.tags,
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

export class ContentImage {
  constructor(
    readonly name: string,
    readonly size: number,
    readonly userRef: DocumentReference,
    readonly createdAt?: Date | undefined
  ) {}

  toJSON() {
    return {
      name: this.name,
      size: this.size,
      userRef: this.userRef,
      createdAt: this.createdAt || serverTimestamp(),
    };
  }
}

export interface AlDialog {
  state: boolean;
  title: string;
  content: string;
}
