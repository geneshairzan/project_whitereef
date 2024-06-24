import UI from "@gh/ui";
import h from "@gh/helper";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
export default function App({ label, max, value, onDetail }) {
  function getPercentage(params) {
    let val = value / max;
    if (val < 0) return "0 %";
    if (val > 1) return "+ 100 %";
    return val.toFixed(2) * 100 + "%";
  }

  return (
    <UI.Col>
      <UI.Row justifyContent="space-between" alignItems="flex-end">
        <UI.Text variant="body1" bold color="primary.main" capitalize>
          {label}
        </UI.Text>
        <UI.Text variant="body2">{h.curr.format(max)}</UI.Text>
      </UI.Row>
      <UI.Row justifyContent="space-between" spacing={0.5} alignItems="center">
        <UI.Col
          sx={{
            border: "1px solid black",
            borderColor: "primary.main",
            height: 24,
            borderRadius: 4,
            width: "100%",
            overflow: "hidden",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <UI.Col
            sx={{
              // border: "1px solid black",
              height: 22,
              borderRadius: 4,
              position: "absolute",
              zIndex: 1,
              width: (value / max > 1 ? 1 : value / max) * 100 + "%",
              bgcolor: "primary.light",
            }}
          ></UI.Col>
          <UI.Row justifyContent="space-between">
            <UI.Text
              variant="body2"
              sx={{
                pt: "2px",
                px: 2,
                zIndex: 2,
              }}
            >
              {h.curr.format(value)}
            </UI.Text>

            <UI.Text
              variant="body1"
              sx={{
                px: 2,
                zIndex: 2,
              }}
              bold
            >
              {getPercentage()}
            </UI.Text>
          </UI.Row>
        </UI.Col>
        <UI.IconButton onClick={onDetail}>
          <KeyboardDoubleArrowRightIcon />
        </UI.IconButton>
      </UI.Row>
    </UI.Col>
  );
}
