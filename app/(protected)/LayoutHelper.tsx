"use client";
import { useAuth } from "@/hooks/useAuth";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/utils";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Header from "./Header";
import MenuBar from "./MenuBar";
import RenderSidebar from "./RenderSidebar";

export default function LayoutHelper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser, logout } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);
  const matches = useMediaQuery("(min-width: 768px)");
  const [sidebarLevel, setSidebarLevel] = useState(0);

  const isStudyRoom = pathname.includes("/study-rooms");

  const handleMenuIconClick = (name: string) => {
    if (name === "study-rooms") {
      setSidebarLevel(0);
      return;
    }
    setOpenMenu((prev) => !prev);
  };

  return (
    <>
      {matches && <MenuBar logout={logout} />}
      {openMenu ? (
        <>
          <MenuBar logout={logout} handleMenuIconClick={handleMenuIconClick} />
          {isStudyRoom && (
            <RenderSidebar
              sidebarLevel={sidebarLevel}
              setSidebarLevel={setSidebarLevel}
              setOpenMenu={setOpenMenu}
            />
          )}
        </>
      ) : null}

      {matches ? (
        <div className={"w-full bg-black-primary overflow-y-auto"}>{children}</div>
      ) : (
        <div
          className={cn("w-full bg-black-primary overflow-y-auto [&>div]:pt-0 md:[&>div]:pt-8", {
            "whitespace-nowrap w-0": openMenu && isStudyRoom && sidebarLevel > -1,
          })}
          onClick={() => openMenu && setOpenMenu(false)}
        >
          <Header
            className="flex !py-4 px-4 pb-4 max-w-full sticky top-0 z-10 bg-black-primary"
            currentUser={currentUser}
            setOpenMenu={setOpenMenu}
          />
          {children}
        </div>
      )}
    </>
  );
}
