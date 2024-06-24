import React from "react";

import { TextField, Stack } from "@mui/material";
import Label from "./label";

export default function App({ noLabel = false, grow = false, ...props }) {
  return (
    <Stack spacing={0.5} width={props.fullWidth ? "100%" : "auto"} flexGrow={grow}>
      {!noLabel && <Label label={props.label || props.name} tip={props.tip} />}
      <TextField
        {...props}
        sx={{
          ...props.sx,
          "& .MuiFormHelperText-root": {
            position: "absolute",
            bottom: -16,
          },
        }}
        inputProps={{
          sx: {
            bgcolor: "white.main",
            // pl: props.InputProps && 0.5,
          },
        }}
        label=""
        type={props.type || "text"}
        value={props.value || ""}
        placeholder={props.placeholder || props.label || props.name}
        error={props.error ? true : false}
        helperText={props.helperText}
      />
    </Stack>
  );
}
