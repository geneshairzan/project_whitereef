import { Autocomplete, MenuItem, Stack, TextField } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import Context from "@context/app";
import Label from "./label";

export default function InputData({ dataId, url, noLabel = false, ...props }) {
  const { app } = useContext(Context);
  const [datas, setDatas] = useState();
  const [inputValue, setInputValue] = useState("");

  async function fetchData() {
    let res = await app.fetch({
      url: url,
      method: "get",
    });
    setDatas(res);
  }

  useEffect(() => {
    if (url == "condition") {
      setDatas(["Bad", "Good", "Excellent"]);
    } else {
      fetchData();
    }
  }, []);

  return (
    <Stack spacing={0.5} width={props.fullWidth ? "100%" : "auto"}>
      {datas && (
        <>
          {!noLabel && <Label label={props.label} tip={props.tip} />}
          <Autocomplete
            freeSolo
            onInputChange={(e, newInputValue) => {
              setInputValue(newInputValue);
            }}
            onChange={(e, newValue) => {
              newValue &&
                props.onChange({
                  target: {
                    value: newValue.id,
                    name: props?.name,
                  },
                });
            }}
            value={datas.find((d) => d.id == dataId) || null}
            inputValue={inputValue}
            options={datas}
            // getOptionLabel={(option) => option.id}
            getOptionLabel={(option) => {
              return `${option?.name} (${option?.email})`;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                name={props.name}
                type={props.type || "text"}
                inputProps={{
                  ...params?.inputProps,
                  autoComplete: "new-password",
                  bgcolor: "white.main",
                  pl: props.InputProps && 0.5,
                }}
                error={props.error}
                helperText={props.helperText}
              />
            )}
            renderOption={(props, option) => (
              <MenuItem value={option} {...props}>
                {`${option?.name} (${option?.email})`}
              </MenuItem>
            )}
            sx={{
              width: "100%",
              "& .MuiFormHelperText-root": {
                position: "absolute",
                bottom: -16,
              },
            }}
          />
        </>
      )}
    </Stack>
  );
}
