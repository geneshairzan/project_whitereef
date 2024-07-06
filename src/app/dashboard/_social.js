import React, { useState } from "react";

import Image from "next/image";
import UI from "@/app/_component/gh/ui";
import Icon from "@/app/_component/gh/icon";
import { Slider } from "./_slider";

export default function Social() {
  return (
    <UI.Row
      sx={{
        position: "absolute",
        bottom: 0,
        p: 5,
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
        <UI.Text variant="h6" bold>
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
        <UI.Text variant="h6" bold>
          @whitereefltd
        </UI.Text>
      </UI.Row>
    </UI.Row>
  );
}
