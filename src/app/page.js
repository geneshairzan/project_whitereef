"use client";

import Image from "next/image";
import UI from "@gh/ui";

export default function Home() {
  return (
    <UI.Col
      sx={{
        width: "100vw",
        height: "100dvh",
        bgcolor: "#191d26",
      }}
      center
    >
      <img
        src={"/img/logo.svg"}
        style={{
          width: "300px",
        }}
      />
    </UI.Col>
  );
}
