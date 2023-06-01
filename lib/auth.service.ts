import { ID } from "appwrite";
import appwriteSDKProvider from "./appwrite.client";

const { account } = appwriteSDKProvider;

export function registerUser(email: string, password: string, name: string): Promise<any> {
  return account.create(ID.unique(), email, password, name);
}

export function loginUser(email: string, password: string): Promise<any> {
  return account.createEmailSession(email, password);
}

export function getCurrentUser(): Promise<any> {
  return account.get();
}

export function logoutUser(): Promise<any> {
  return account.deleteSession("current");
}

export function loginWithGoogle(): void | URL {
  return account.createOAuth2Session("google");
}
