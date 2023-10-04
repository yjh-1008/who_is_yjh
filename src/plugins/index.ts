import { db } from "@/plugins/initAdmin";
import * as functions from "firebase-functions";
import { createUser, deleteUser } from "@/models/user";
export const userCreated = functions.auth.user().onCreate((user) => {
  console.log(user);
  return createUser(user);
});

export const userDeleted = functions.auth.user().onDelete((user) => {
  console.log(user);
  return deleteUser(user);
});
