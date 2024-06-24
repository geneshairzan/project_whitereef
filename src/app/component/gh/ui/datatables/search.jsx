import { TextField } from "@mui/material";

export default function App({ value, disabled }) {
  return (
    <TextField
      disabled={disabled}
      placeholder="Search"
      onChange={(e) => value(e.target.value)}
      mb={2}
      sx={{
        "& input": {
          // transition: "all 0.5s",
          "&:focus": {
            // minWidth: "300px",
          },
        },
      }}
    />
  );
}
