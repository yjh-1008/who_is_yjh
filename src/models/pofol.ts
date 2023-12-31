import {
  FirestoreDataConverter,
  Timestamp,
  collection,
  setDoc,
  doc,
} from "firebase/firestore";
import { ContentImage } from "@/utils/types";
import { db } from "@/utils/firebase";
import { User } from "firebase/auth";
import useStorage from "@/composable/useStorage";
const { uploadFile, imageCompress, getURL } = useStorage();
export const converter: FirestoreDataConverter<ContentImage> = {
  toFirestore(model: ContentImage) {
    return model.toJSON();
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return new ContentImage(
      data.name,
      data.size,
      data.userRef,
      data.createAt instanceof Timestamp ? data.createAt.toDate() : undefined
    );
  },
};
export const getProfile = async (firebaseUser: User) => {
  if (!firebaseUser) throw Error("user not exist");
  const userRef = doc(db, "users", firebaseUser.uid);
  const imageRef = doc(collection(db, "profile")).withConverter(converter);
  return await getURL("profile/pofol.pdf");
};
