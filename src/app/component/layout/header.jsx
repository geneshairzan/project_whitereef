import React, { useState } from "react";

import UI from "@gh/ui";

import Context from "@context/app";

import ModalLogin from "@gh/modalLogin";
import Link from "next/link";

import { AppBar } from "@mui/material";

export default function App({ grey = false, AppBarHeight }) {
  const { auth } = React.useContext(Context);
  return (
    <UI.Row
      sx={{
        bgcolor: "primary.main",
        justifyContent: "space-between",
        px: 2,
        py: 1,
        height: AppBarHeight || "64px",
        flexShrink: 0,
      }}
    >
      <UI.Row spacing={2} justifyContent="space-between" alignItems="center" width="100%">
        <ModalLogin auth={auth} setmodalOpen={() => {}} />
        <UI.Col component={Link} href="/" color="white">
          Financial Planner
        </UI.Col>
      </UI.Row>
    </UI.Row>
  );
}
