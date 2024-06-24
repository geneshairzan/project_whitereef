import { Typography, Stack, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import UI from "@/app/_component/gh/ui";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function App(props) {
  // if (!props.label) return;
  return (
    <Stack direction={"row"} spacing={1} alignItems="center" width={props.width} flexShrink={0} pl={props.pl}>
      <Typography
        color="primary.dark"
        fontWeight={"bold"}
        variant="body2"
        pt={"2px"}
        sx={{
          textTransform: "capitalize",
        }}
      >
        {props.label}
      </Typography>
      {props.help && (
        <UI.Row component="a" href={props.help} target="_blank" rel="noopener noreferrer">
          <HelpOutlineIcon
            sx={{
              color: "primary.main",
              fontSize: 20,
            }}
          />
        </UI.Row>
      )}

      {props.tip && <UI.Tip tip={props.tip} />}
    </Stack>
  );
}
