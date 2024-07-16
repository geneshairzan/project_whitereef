import React, { useState } from "react";
import UI from "@/app/_component/gh/ui";

export default function Home({ label = " White Reef Additive" }) {
  const [active, setactive] = useState(0);
  return (
    <UI.Row
      spacing={2}
      alignItems="flex-end"
      justifyContent="space-between"
      bgcolor="primary.logodark"
      p={2}
      height={120}
    >
      <UI.Text variant="h2" bold color="white">
        {label}
      </UI.Text>
      <img
        src={"/img/logo-blank.png"}
        style={{
          height: "80px",
          objectFit: "contain",
        }}
      />
    </UI.Row>
  );
}
