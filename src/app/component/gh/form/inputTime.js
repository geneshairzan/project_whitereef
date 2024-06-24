import * as React from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import Label from "./label";
import { Stack } from "@mui/material";
import h from "@gh/helper";

import dayjs from "dayjs";

export default function BasicTimePicker({
  disablePast = false,
  showplaceholder = false,
  clearable = false,
  noLabel = false,
  error = false,
  onChange,
  ...props
}) {
  return (
    <Stack spacing={0.5} width="100%">
      {!noLabel && <Label label={props.label} tip={props.tip} />}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          fullWidth
          renderInput={(params) => <TextField {...params} fullWidth />}
          onChange={onChange}
          value={props?.value || null}
        />
      </LocalizationProvider>
    </Stack>
  );
}
