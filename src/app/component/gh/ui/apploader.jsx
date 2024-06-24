import UI from "@gh/ui";
import CircularProgress, { circularProgressClasses } from "@mui/material/CircularProgress";

export default function App({ size = 70, modal = false, msg, flexGrow = 0 }) {
  if (!modal) return <Loader flexGrow={flexGrow} />;

  return (
    <UI.Modal open={modal} onClose={() => {}}>
      <UI.Stack
        flexGrow={1}
        height="100dvh"
        width={"100vw"}
        alignItems={"center"}
        justifyContent={"center"}
        spacing={2}
      >
        <Loader />
        <UI.Text variant="body1" color="white.main">
          {msg}
        </UI.Text>
      </UI.Stack>
    </UI.Modal>
  );
}

function Loader({ size = 70, modal = false, msg, flexGrow }) {
  return (
    <UI.Col center flexGrow={flexGrow}>
      <UI.Stack
        style={{
          position: "relative",
        }}
      >
        <CircularProgress
          variant="determinate"
          size={size}
          value={100}
          sx={{
            color: "#FFFBFD",
          }}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          size={size}
          color="secondary"
          sx={{
            // color: "#E10446",
            animationDuration: "550ms",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
        />
        <UI.Text variant="body1">{msg}</UI.Text>
      </UI.Stack>
    </UI.Col>
  );
}
