import React, { useState } from "react";

import { TextField, Stack, InputAdornment } from "@mui/material";
import Label from "./label";
import Menu from "@mui/material/Menu";
import { TwitterPicker } from "react-color";

export default function App({ noLabel = false, grow = false, ...props }) {
  const [onOpen, setonOpen] = useState(false);
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
        InputProps={{
          endAdornment: props.value && (
            <InputAdornment position="end">
              <Stack
                sx={{
                  bgcolor: props.value,
                  width: 24,
                  height: 24,
                  borderRadius: 1,
                }}
              />
            </InputAdornment>
          ),
        }}
        label=""
        type={props.type || "text"}
        value={props.value || ""}
        placeholder={props.placeholder || props.label || props.name}
        error={props.error ? true : false}
        helperText={props.helperText}
        onClick={(e) => setonOpen(e.currentTarget)}
      />

      <Menu
        id="basic-menu"
        anchorEl={onOpen}
        open={Boolean(onOpen)}
        onClose={() => setonOpen()}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <TwitterPicker
          colors={[
            "#FF6900",
            "#FCB900",
            // "#7BDCB5",
            "#00D084",
            // "#8ED1FC",
            "#0693E3",
            // "#ABB8C3",
            "#EB144C",
            "#F78DA7",
            "#9900EF",
          ]}
          onChange={(e) => {
            props.onChange(e.hex);
            setonOpen();
            console.log(e.hex);
          }}
        />
      </Menu>
    </Stack>
  );
}
