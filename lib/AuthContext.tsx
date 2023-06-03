"use client";

// import Cookies from "js-cookie";
// import JWT, { JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, logoutUser } from "./auth.service";

// const { account } = appwriteSDKProvider;

// Create the authentication context
export const AuthContext = createContext(
  {} as {
    currentUser: any;
    loading: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
  }
);

// Create the AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function doAuth() {
      // const token = Cookies.get("token");

      // if (!token) {
      //   setLoading(false);
      //   return;
      // }

      // // Perform authentication request using the token
      // if (token) {
      //   const decoded = JWT.decode(token) as JwtPayload;
      //   if (decoded && decoded.exp) {
      //     const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      //     const timeRemaining = expirationTime - Date.now();
      //     const threshold = 15 * 60 * 1000; // 15 minutes threshold
      //     console.log(timeRemaining, threshold, token);

      //     if (timeRemaining < threshold) {
      //       // Token is close to expiration, refresh it
      //       const refreshedJWT = await account.createJWT(); // Refresh the JWT
      //       Cookies.set("token", refreshedJWT.jwt); // Update the JWT in cookies
      //     }
      //   }
      // }

      // Set the currentUser state based on the response
      const user = await getCurrentUser();
      setCurrentUser(user);
      setLoading(false);
    }
    doAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Perform login request and obtain the token
    // Set the token in cookies and setCurrentUser state
    await loginUser(email, password);
    // const { jwt } = await account.createJWT();
    // Cookies.set("token", jwt);
    const user = await getCurrentUser();
    setCurrentUser(user);
    router.push("/dashboard");
  };

  const logout = async () => {
    // Clear the token from cookies and setCurrentUser state
    await logoutUser();
    setCurrentUser(null);
    // Cookies.remove("token");
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
