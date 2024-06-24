import { Typography, Stack, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import UI from "@/app/_component/gh/ui";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function App(props) {
  // if (!props.label) return;
  return (
    <Stack direction={"row"} spacing={1} alignItems="center" width={props.width} flexShrink={0} pl={props.pl}>
      <UI.Button
        variant={filter?.period?.id == ix ? "contained" : "outlined"}
        size="small"
        onClick={() => handleFilter("period", d)}
        key={d}
        sx={{
          flexGrow: 1,
        }}
      >
        {d.label}
      </UI.Button>
    </Stack>
  );
}
