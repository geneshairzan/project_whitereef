import React, { useState, useEffect } from "react";
import UI from "@gh/ui";

import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Stack, Checkbox } from "@mui/material";
import Label from "./label";

export default function RadioButtonsGroup({ noLabel = false, options = [], value = [], ...props }) {
  function handleChange(id) {
    let ix = value.indexOf(id);
    if (ix >= 0) {
      let temp = value;
      temp.splice(ix, 1);
      props.onChange({
        target: {
          name: props.name,
          value: [...temp],
        },
      });
    } else {
      props.onChange({
        target: {
          name: props.name,
          value: [...value, id],
        },
      });
    }
  }
  return (
    <UI.Col>
      {!noLabel && <Label label={props.label} tip={props.tip} />}
      {options.map((d, ix) => (
        <FormControlLabel
          key={ix}
          control={<Checkbox checked={value.includes(d.value) ? true : false} />}
          onChange={() => handleChange(d.value)}
          label={d.name}
          sx={
            {
              // m: !label && 0,
            }
          }
        />
      ))}
    </UI.Col>
  );
}
