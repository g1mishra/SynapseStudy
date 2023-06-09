"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ActiveLinkProps {
  href: string;
  className?: string;
  children: (isActive: boolean) => React.ReactNode;
}

const ActiveLink = ({ href, className = "", children }: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link className={className} href={href}>
      {children(isActive)}
    </Link>
  );
};

export default ActiveLink;
