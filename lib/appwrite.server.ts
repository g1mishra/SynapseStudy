import { Server } from "../utils/config";

import * as sdk from "node-appwrite";

const client = new sdk.Client();

client
  .setEndpoint(Server.endpoint) // Your API Endpoint
  .setProject(Server.project) // Your project ID
  .setKey(Server.documentReadKey); // Your secret API key

export default client;
