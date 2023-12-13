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
const { uploadFile, imageCompress } = useStorage();
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
export const setImage = async (file: File, firebaseUser: User) => {
  if (!firebaseUser) throw Error("user not exist");
  const userRef = doc(db, "users", firebaseUser.uid);
  const imageRef = doc(collection(db, "images")).withConverter(converter);
  const originPath = `images/${imageRef.id}/origin`;

  await uploadFile(originPath, file);
  const tumbnailPath = `images/${imageRef.id}/tumbnail`;
  const tumbnailFile = await imageCompress(file);
  await uploadFile(tumbnailPath, tumbnailFile);
  const contentImage = new ContentImage(file.name, file.size, userRef);
  await setDoc(imageRef, contentImage);
  return imageRef.id;
};

export const setProjectImage = async (file: File, firebaseUser: User) => {
  if (!firebaseUser) throw Error("user not exist");
  const userRef = doc(db, "users", firebaseUser.uid);
  const imageRef = doc(collection(db, "images")).withConverter(converter);
  const originPath = `project/images/${imageRef.id}/origin`;

  await uploadFile(originPath, file);
  const tumbnailPath = `project/images/${imageRef.id}/tumbnail`;
  const tumbnailFile = await imageCompress(file);
  await uploadFile(tumbnailPath, tumbnailFile);
  const contentImage = new ContentImage(file.name, file.size, userRef);
  await setDoc(imageRef, contentImage);
  return imageRef.id;
};

export const setRecordImage = async (file: File, firebaseUser: User) => {
  if (!firebaseUser) throw Error("user not exist");
  const userRef = doc(db, "users", firebaseUser.uid);
  const imageRef = doc(collection(db, "images")).withConverter(converter);
  const originPath = `record/images/${imageRef.id}/origin`;

  await uploadFile(originPath, file);
  const tumbnailPath = `record/images/${imageRef.id}/tumbnail`;
  const tumbnailFile = await imageCompress(file);
  await uploadFile(tumbnailPath, tumbnailFile);
  const contentImage = new ContentImage(file.name, file.size, userRef);
  await setDoc(imageRef, contentImage);
  return imageRef.id;
};
