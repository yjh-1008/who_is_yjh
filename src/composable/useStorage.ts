import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/utils/firebase";
import { confirmPasswordReset } from "firebase/auth";
// import imageCompression from "browswer-image-compression";

export default () => {
  const uploadFile = (path: string, file: File) => {
    const storageRef = ref(storage, path);
    return uploadBytes(storageRef, file);
  };

  const getURL = (path: string) => {
    const storageRef = ref(storage, path);
    return getDownloadURL(storageRef);
  };
  return { uploadFile, getURL };
};
