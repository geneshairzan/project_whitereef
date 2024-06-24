import React from "react";

import { TextField, Stack, ListItemButton } from "@mui/material";
import Label from "./label";
import { parseInt } from "lodash";

export default function App({ noLabel = false, grow = false, children, options, ...props }) {
  console.log(options);
  return (
    <Stack spacing={0.5} width={props.fullWidth ? "100%" : "auto"} flexGrow={grow}>
      {!noLabel && <Label label={props.label || props.name} tip={props.tip} />}
      <TextField
        select
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
        value={parseInt(props.value) || ""}
        placeholder={props.placeholder || props.label || props.name}
        error={props.error ? true : false}
        helperText={props.helperText}
      >
        {options?.length ? (
          options.map((d) => (
            <ListItemButton variant="body1" value={d?.id}>
              {d.name}
            </ListItemButton>
          ))
        ) : (
          <>
            <ListItemButton variant="body1" value={1}>
              Active
            </ListItemButton>
            <ListItemButton variant="body1" value={2}>
              Inactive
            </ListItemButton>
          </>
        )}
      </TextField>
    </Stack>
  );
}
