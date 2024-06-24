import React from "react";
import UI from "@gh/ui";

export default function Layout(props) {
  return (
    <UI.Row
      sx={{
        height: 64,
        bgcolor: "primary.main",
        // pb: "32px",
        p: 2,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <UI.Text variant="h4" bold color="white">
        MONIPOCKET
      </UI.Text>
    </UI.Row>
  );
}
