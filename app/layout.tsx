import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Toast from "@/components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SynapseStudy - Collaborative Online Learning Platform",
  description: "SynapseStudy - Collaborative online learning platform for virtual study groups",
  authors: [{ name: "Jeevan Kumar", url: "https://g1mishra.dev" }],
  openGraph: {
    type: "website",
    title: "SynapseStudy - Collaborative Online Learning Platform",
    description: "SynapseStudy - Collaborative online learning platform for virtual study groups",
    images: [
      "https://cloud.appwrite.io/console/project-6487ff1a54c5fa1557a7/storage/bucket-assets/file-648aa9eb048925bfad0e",
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toast />
        {children}
      </body>
    </html>
  );
}
