import { Autocomplete, MenuItem, Stack, TextField } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import Context from "@context/app";
import Label from "./label";
import { fetcher } from "@gh/helper/useFetch";

export default function InputData({ dataId, url, noLabel = false, ...props }) {
  const { app } = useContext(Context);
  const [datas, setDatas] = useState();

  async function fetchData() {
    let res = await fetcher({
      url: url,
      method: "get",
    });
    res?.data && setDatas(res?.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Stack spacing={0.5} width={props.fullWidth ? "100%" : "auto"}>
      {datas && (
        <>
          {!noLabel && <Label label={props.label} tip={props.tip} />}
          <Autocomplete
            value={datas.find((d) => d.id == props.value)}
            onChange={(_, newValue) =>
              props.onChange({
                target: {
                  value: newValue ? newValue.id : "",
                  name: props?.name,
                },
              })
            }
            inputValue={datas.find((d) => d.id == props.value)?.name || ""}
            options={datas}
            getOptionLabel={(option) => option.name}
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
                {" "}
                {url == "condition" ? option : option?.name}{" "}
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
