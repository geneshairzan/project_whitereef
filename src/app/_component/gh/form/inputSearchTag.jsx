import React, { useState } from "react";

import { TextField, InputAdornment } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Label from "./label";
import UI from "@/app/_component/gh/ui";
import Icon from "@/app/_component/gh/icon";

const filter = createFilterOptions();

export default function FreeSoloCreateOption({ name, value, onChange, noLabel, ...props }) {
  const [onNew, setonNew] = useState(false);
  const [newValue, setnewValue] = useState("");

  function handleNewValue(e) {
    onChange([...value.filter((d) => d != newValue), newValue]);
    setonNew(false);
    setnewValue("");
  }

  function handleDelete(target) {
    onChange(value.filter((d) => d != target));
  }

  return (
    <UI.Col>
      {!noLabel && <Label label={props.label} tip={props.tip} />}
      <UI.Row flexWrap="wrap">
        {value?.map((d, ix) => (
          <UI.Row
            key={ix}
            justifyContent="space-between"
            alignItems="center"
            sx={{
              m: 0.5,
              px: 1,
              // width: 120,
              border: "1px solid lightGrey",
              borderRadius: 1,
              // flexShrink: 0,
              overflow: "hidden",
              height: 32,
            }}
            spacing={1}
          >
            <UI.Elipsis variant="body1">{d}</UI.Elipsis>
            <UI.IconButton
              onClick={() => handleDelete(d)}
              sx={{
                p: "2px",
              }}
            >
              <Icon.Close sx={{ fontSize: 16 }} />
            </UI.IconButton>
          </UI.Row>
        ))}
        {onNew ? (
          <TextField
            value={newValue}
            onChange={(e) => setnewValue(e.target.value)}
            onBlur={handleNewValue}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <UI.Button variant="text" onClick={handleNewValue}>
                    save
                  </UI.Button>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <UI.Button onClick={() => setonNew(true)} variant="outlined">
            + Add Tag
          </UI.Button>
        )}
      </UI.Row>
    </UI.Col>
  );
}
