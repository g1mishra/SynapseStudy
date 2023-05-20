import { Client } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_APPWRITE_ENDPOINT || "")
  .setProject(process.env.NEXT_APPWRITE_PROJECT_ID || "");

export default client;
