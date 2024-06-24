import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Label from "../label";
import UI from "@gh/ui";

export default function Grouped({ options, noLabel, value, onChange, size, inline = false, ...props }) {
  const inlineStyle = {
    // p: 0,
    // height: 24,
    minWidth: 130,
    // "& .MuiInputBase-input": {
    //   p: 0,
    // },
  };
  return (
    <UI.Col width={!inline && "100%"} spacing={0.5}>
      {!noLabel && <Label label={props.label} tip={props.tip} />}
      <Autocomplete
        fullWidth={!inline}
        value={options?.find((d) => d.id == value) || null}
        options={options}
        onChange={onChange}
        groupBy={(option) => option.group?.name}
        getOptionLabel={(option) => option?.name}
        ListboxProps={{
          sx: {
            "& .MuiAutocomplete-option": {
              minHeight: 0,
              height: inline ? 20 : 24,
              py: 2,
            },
          },
        }}
        sx={{
          "& .MuiInputBase-root": inline && inlineStyle,
        }}
        renderGroup={(params) => (
          <UI.Col
            key={params.key}
            sx={{
              borderBottom: "1px solid lightGrey",
            }}
          >
            <UI.Text
              variant="subtitle1"
              bold
              color="primary.dark"
              sx={{
                bgcolor: "primary.light",
                px: 2,
                py: 0.5,
              }}
            >
              {params.group}
            </UI.Text>
            {params.children}
          </UI.Col>
        )}
        renderInput={(params) => (
          <TextField
            // size={"small"}
            {...params}
            placeholder="Categories"
          />
        )}
      />
    </UI.Col>
  );
}
