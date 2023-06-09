import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SynapseStudy - Collaborative Online Learning Platform",
  description:
    "SynapseStudy - Collaborative online learning platform for virtual study groups",
  authors: [{ name: "Jeevan Kumar", url: "https://g1mishra.dev" }],
  openGraph: {
    type: "website",
    title: "SynapseStudy - Collaborative Online Learning Platform",
    description:
      "SynapseStudy - Collaborative online learning platform for virtual study groups",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
