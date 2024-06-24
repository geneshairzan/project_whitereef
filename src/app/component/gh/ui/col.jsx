import { Stack } from "@mui/material";

export default function App({ center, ...props }) {
  return (
    <Stack direction={"column"} alignItems={center ? "center" : ""} justifyContent={center ? "center" : ""} {...props}>
      {props.children}
    </Stack>
  );
}
