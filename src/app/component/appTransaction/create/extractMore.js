import React from "react";

import UI from "@gh/ui";

import { Menu } from "@mui/material";

export default function App({ setonMenuOpen, onMenuOpen, setonDetail }) {
  return (
    <Menu anchorEl={onMenuOpen.pos} open={Boolean(onMenuOpen)} onClick={() => setonMenuOpen(false)}>
      <UI.Col
        onClick={() =>
          setonDetail({
            data: onMenuOpen.target,
            type: "edit",
          })
        }
        sx={{
          width: 160,
          px: 2,
          py: 1,
        }}
      >
        <UI.Text variant="body2">Edit</UI.Text>
      </UI.Col>
      <UI.Col
        onClick={() =>
          setonDetail({
            data: onMenuOpen.target,
            type: "split",
          })
        }
        sx={{
          width: 130,
          px: 2,
          py: 1,
        }}
      >
        <UI.Text variant="body2">Split Transcation</UI.Text>
      </UI.Col>
    </Menu>
  );
}
