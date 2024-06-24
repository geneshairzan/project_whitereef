import { MenuItem, Stack, TextField, Checkbox, Select, ListItemText } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import Context from "@context/app";
import Label from "./label";
import UI from "@gh/ui";
import { fetcher } from "@gh/helper/useFetch";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const filter = createFilterOptions();
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

//.getDay() returns the day number 0 (Sunday) to 6 (Saturday).
const nameOfDays = [
  { id: 0, name: "Sun" },
  { id: 1, name: "Mon" },
  { id: 2, name: "Tue" },
  { id: 3, name: "Wed" },
  { id: 4, name: "Thu" },
  { id: 5, name: "Fri" },
  { id: 6, name: "Sat" },
];

export default function InputData({ dataId, url, noLabel = false, grow, value, onChange, ...props }) {
  const { app } = useContext(Context);

  return (
    <Stack spacing={0.5} width={props.fullWidth ? "100%" : "auto"} flexGrow={grow}>
      {!noLabel && <Label label={props.label} tip={props.tip} />}
      <Autocomplete
        multiple
        value={value || []}
        filterOptions={(options, params) => {
          // <<<--- inject the Select All option
          const filter = createFilterOptions();
          const filtered = filter(options, params);
          return [{ name: "Select All...", all: true }, ...filtered];
        }}
        // onChange={(event, newValue) => { setValue(newValue); }} <<<--- OLD
        onChange={(event, newValue) => {
          if (newValue.find((option) => option.all))
            return onChange(value?.length === nameOfDays.length ? [] : nameOfDays);

          onChange(newValue);
        }}
        options={nameOfDays}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name}
        renderTags={(value, getTagProps) => {
          return (
            <UI.Text variant="body2" pl={1}>
              {/* {value.map((d) => d.name).join(", ")} */}
              {value.length} Day(s) Selected
            </UI.Text>
          );
        }}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              // checked={selected} <<<--- OLD
              checked={option.all ? !!(value?.length === nameOfDays.length) : selected}
            />
            {option.name}
          </li>
        )}
        // style={{ width: 500 }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  );
}
