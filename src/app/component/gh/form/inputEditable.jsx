import React, { useState } from "react";

import { TextField, Stack, InputAdornment } from "@mui/material";
import UI from "@gh/ui";
import Icon from "@gh/icon";

export default function App({ value, onChange, row, ...props }) {
  const [onEdit, setonEdit] = useState(false);
  const [local, setlocal] = useState(value);

  function handleChange() {
    onChange(local, row);
  }
  return (
    <>
      {!onEdit && (
        <UI.Row alignItems="center" justifyContent="space-between" onClick={() => setonEdit(true)}>
          {value}
          <UI.IconButton>
            <Icon.Edit
              sx={{
                fontSize: 12,
              }}
            />
          </UI.IconButton>
        </UI.Row>
      )}
      {onEdit && (
        <TextField
          // {...props}
          sx={{
            ...props.sx,
            "& .MuiFormHelperText-root": {
              position: "absolute",
              bottom: -16,
            },
          }}
          value={local}
          onChange={(e) => setlocal(e.target.value)}
          inputProps={{
            sx: {
              bgcolor: "white.main",
              pl: props.InputProps && 0.5,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <UI.Button variant="text" onClick={handleChange}>
                  save
                </UI.Button>
              </InputAdornment>
            ),
          }}
          label=""
          onBlur={handleChange}
          type={props.type || "text"}
          error={props.error ? true : false}
          helperText={props.helperText}
        />
      )}
    </>
  );
}
