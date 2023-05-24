import { Account, Client as Appwrite, Databases } from "appwrite";
import { Server } from "../utils/config";

interface AppwriteSDK {
  sdk: any;
  provider: () => any;
}

const appwriteSDK: AppwriteSDK = {
  sdk: null,

  provider: () => {
    if (appwriteSDK.sdk) {
      return appwriteSDK.sdk;
    }
    const appwrite = new Appwrite();
    appwrite.setEndpoint(Server.endpoint).setProject(Server.project);
    const account = new Account(appwrite);
    const database = new Databases(appwrite);

    appwriteSDK.sdk = { account, database };
    return appwriteSDK.sdk;
  },
};

const appwriteSDKProvider = appwriteSDK.provider();

export default appwriteSDKProvider
