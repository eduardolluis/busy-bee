import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";

// email and password sign up
export async function signUpWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  return await createUserWithEmailAndPassword(auth, email, password);
}

// google sign 

export async function signUpWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
}
