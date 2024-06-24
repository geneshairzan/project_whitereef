import { Stack } from "@mui/material";

export default function App({ center, ...props }) {
  return (
    <Stack direction={"row"} alignItems={center ? "center" : ""} justifyContent={center ? "center" : ""} {...props}>
      {props.children}
    </Stack>
  );
}
