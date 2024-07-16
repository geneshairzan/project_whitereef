import React, { useState } from "react";

import UI from "@/app/_component/gh/ui";

export default function Social() {
  return (
    <UI.Row
      sx={{
        position: "absolute",
        bottom: 0,
        p: 5,
        zIndex: 5,
        width: "100vw",
        bgcolor: "primary.logodark",
      }}
      spacing={5}
    >
      <UI.Row spacing={1} alignItems="center">
        <img
          src={"/img/toped-icon.png"}
          style={{
            height: "36px",
            width: "auto",
            objectFit: "contain",
          }}
        />
        <UI.Text variant="h6" color="white">
          whitereefltd
        </UI.Text>
      </UI.Row>

      <UI.Row spacing={1} alignItems="center">
        <img
          src={"/img/ig-icon.png"}
          style={{
            height: "36px",
            width: "auto",
            objectFit: "contain",
          }}
        />
        <UI.Text variant="h6" color="white">
          @whitereefltd
        </UI.Text>
      </UI.Row>
    </UI.Row>
  );
}
