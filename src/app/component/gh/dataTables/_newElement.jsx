import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Context from "@context/app";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
export default function DefaultNewElement(props) {
  const { app } = React.useContext(Context);
  return (
    <UI.Button
      LinkComponent={Link}
      href={props.to || "#"}
      startIcon={<AddIcon />}
      sx={{
        width: "120px",
        borderRadius: "100px",
      }}
    >
      {props.label}
    </UI.Button>
  );
}
