import * as React from "react";
import { Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Label from "./label";
import h from "@gh/helper";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerText({
  disablePast = false,
  showplaceholder = false,
  clearable = false,
  noLabel = false,
  error = false,
  placeholder,
  ...props
}) {
  return (
    <Stack spacing={0.5} width={props.fullWidth ? "100%" : "auto"}>
      {!noLabel && <Label label={props.label} tip={props.tip} />}
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          {...props}
          onChange={(v) =>
            props.onChange({
              target: {
                value: h.date.format(v),
                name: props?.name,
              },
            })
          }
          slotProps={{
            textField: {
              error: error,
              placeholder: placeholder,
              helperText: props.helperText,
            },
          }}
          value={props?.value ? h.date.preformat(props.value) : null}
          label=""
          // inputFormat="DD MMM YYYY"
          format="DD MMM YYYY"
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
