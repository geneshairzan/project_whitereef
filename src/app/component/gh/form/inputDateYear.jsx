import * as React from "react";
import { TextField, Typography, Stack, InputAdornment, IconButton } from "@mui/material";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Label from "./label";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import h from "@gh/helper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerText({ disablePast = false, noLabel = false, clearAble = false, ...props }) {
  return (
    <Stack spacing={1} width={props.fullWidth ? "100%" : "auto"}>
      {!noLabel && <Label label={props.label} tip={props.tip} />}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          {...props}
          onChange={(v) =>
            props.onChange({
              target: {
                value: v,
                name: props?.name,
              },
            })
          }
          views={["year"]}
          value={props.value || null}
          label=""
          disablePast={disablePast}
          inputFormat="yyyy"
          closeOnSelect
          sx={{
            bgcolor: "white.main",
            "& .MuiFormHelperText-root": {
              position: "absolute",
              bottom: -16,
            },
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
}
