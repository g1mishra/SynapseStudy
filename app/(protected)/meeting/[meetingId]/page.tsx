"use client";

import { useEffect } from "react";
import Meeting from "./Meetings";

export default function Page({ params: { id } }: { params: { id: string } }) {
  useEffect(() => {
    // <a
    //   aria-label="Jitsi Meet Logo, links to  Homepage"
    //   class="watermark leftwatermark"
    //   href="https://jitsi.org"
    //   target="_new"
    // >
    //   <div
    //     class="watermark leftwatermark"
    //     style='background-image: url("images/watermark.svg"); max-width: 140px; max-height: 70px; position: static;'
    //   ></div>
    // </a>;
  }, [id]);
  if (id === "1234") {
    return <Meeting />;
  } else {
    return (
      <main className="h-screen w-full">
        <div className="flex flex-col items-center justify-center">
          <h1>Link is not valid</h1>
        </div>
      </main>
    );
  }
}
