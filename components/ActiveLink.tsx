"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface ActiveLinkProps extends LinkProps {
  href: string;
  className?: string;
  children: (isActive: boolean) => React.ReactNode;
}

const ActiveLink = ({ href, children, ...props }: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href) || pathname === href;

  return (
    <Link {...props} href={href}>
      {children(isActive)}
    </Link>
  );
};

export default ActiveLink;
