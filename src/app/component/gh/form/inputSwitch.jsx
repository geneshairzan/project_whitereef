import * as React from "react";
import Switch from "@mui/material/Switch";
import Label from "./label";
import { TextField, Stack } from "@mui/material";

export default function ControlledSwitches(props) {
  const handleChange = (event) => {
    props.onChange({
      target: {
        name: props.name,
        value: event.target.checked,
      },
    });
  };

  return (
    <Stack direction={"row"} justifyContent={"space-between"} width={props.width || "100%"}>
      <Label label={props.label} tip={props.tip} />
      <Switch checked={props.value || false} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />
    </Stack>
  );
}
