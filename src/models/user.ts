import {
  FirestoreDataConverter,
  DocumentData,
  FieldValue,
} from "firebase-admin/firestore";
import { UserRecord } from "firebase-admin/auth";
import { createHash } from "crypto";
import { db } from "@/plugins/initAdmin";
export class User {
  constructor(
    readonly email: string,
    readonly displayName: string,
    readonly photoURL: string,
    readonly createdAt?: Date | undefined
  ) {
    this.email = email;
    this.displayName = displayName;
    this.photoURL = photoURL;
    this.createdAt = createdAt;
  }
}
const converter: FirestoreDataConverter<User> = {
  toFirestore(model: User): FirebaseFirestore.DocumentData {
    return {
      email: model.email,
      displayName: model.displayName,
      photoURL: model.photoURL,
      createAt: FieldValue.serverTimestamp(),
    };
  },
  fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): User {
    const data = snapshot.data();
    return new User(data.email, data.displayName, data.photoURL);
  },
};

const collection = db.collection("users").withConverter(converter);

export const createUser = (userRecord: UserRecord) => {
  if (!userRecord.email) throw Error("invalid email");
  const hash = createHash("md5").update(userRecord.uid).digest("hex");
  const photoURL =
    userRecord.photoURL || `https://www.gravatar.com/avatar/${hash}`;
  const user = new User(
    userRecord.email,
    userRecord.displayName || "",
    photoURL
  );
  return collection.doc(userRecord.uid).set(user);
};

export const deleteUser = (userRecord: UserRecord) => {
  return collection.doc(userRecord.uid).delete();
};
