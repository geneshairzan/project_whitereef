import React, { useState, useEffect } from "react";

import { TextField, Stack, Typography } from "@mui/material";
import Label from "./label";
import _ from "lodash";

export default function App({ initialValue, noLabel = false, ...props }) {
  return (
    <Stack spacing={1} width={props.fullWidth ? "100%" : "auto"}>
      {!noLabel && <Label label={props.label} tip={props.tip} />}
      <TextField
        // {..._.omit(props, ["value"])}
        sx={{
          ...props.sx,
          "& .MuiFormHelperText-root": {
            position: "absolute",
            bottom: -16,
          },
        }}
        inputProps={{
          ...props.InputProps,
          sx: {
            bgcolor: "white.main",
            pl: props.InputProps && 0.5,
          },
        }}
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        label=""
        type={props.type || "text"}
        name={props.name}
        value={props.value || ""}
        onChange={props.onChange}
        placeholder={props.placeholder || props.label}
        error={props.error ? true : false}
        helperText={props.helperText}
      />
    </Stack>
  );
}
