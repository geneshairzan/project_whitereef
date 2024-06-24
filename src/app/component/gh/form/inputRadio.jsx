import * as React from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Stack, Typography } from "@mui/material";
import Label from "./label";

export default function RadioButtonsGroup({
  noLabel,
  label,
  options = [],
  onChange,
  value,
  name,
  row = true,
  ...props
}) {
  return (
    <Stack spacing={0.5}>
      {!noLabel && <Label label={label} tip={props.tip} />}
      <RadioGroup row={row} onChange={onChange} value={value} name={name}>
        {options.map((d) => (
          <FormControlLabel key={d.value} value={d.value} control={<Radio />} label={d.name} />
        ))}
      </RadioGroup>
    </Stack>
  );
}
