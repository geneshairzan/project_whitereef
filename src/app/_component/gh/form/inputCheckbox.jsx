import * as React from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Stack, Checkbox } from "@mui/material";

export default function RadioButtonsGroup({
  label,
  disabled,
  defaultChecked = false,
  onChange,
  value,
  name,
  sx,
  color,
}) {
  return (
    <FormControlLabel
      disabled={disabled}
      control={
        <Checkbox
          checked={value ? true : false}
          color={color}
          sx={{
            ...sx,
          }}
        />
      }
      label={label}
      onChange={(e) =>
        onChange({
          target: {
            name: name,
            value: e.target.checked,
          },
        })
      }
      sx={{
        m: !label && 0,
      }}
    />
  );
}
