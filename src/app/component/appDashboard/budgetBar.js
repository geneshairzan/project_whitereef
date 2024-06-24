import UI from "@gh/ui";
import h from "@gh/helper";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export default function App({ label, max, value, onDetail, color, period }) {
  function getPercentage(params) {
    let val = value / max;
    if (val < 0) return "0 %";
    if (val > 1) return "+ 100 %";
    return val.toFixed(2) * 100 + "%";
  }
  return (
    <UI.Col
      sx={{
        // bgcolor: "primary.dark",
        bgcolor: color || "success.main",
        borderRadius: 5,
        "*": {
          color: "white",
        },
      }}
    >
      <UI.Col
        sx={{
          px: 2,
          py: 1,
          height: 120,
        }}
      >
        <UI.Row justifyContent="space-between" alignItems="center">
          <UI.Text variant="h6" bold>
            {label}
          </UI.Text>
          <UI.IconButton onClick={onDetail}>
            <KeyboardDoubleArrowRightIcon />
          </UI.IconButton>
        </UI.Row>

        <UI.Col pt={2}>
          <UI.Row justifyContent="space-between" alignItems="flex-end">
            <UI.Text variant="body1">Allocation</UI.Text>
            <UI.Text variant="body1">{h.curr.format(max)}</UI.Text>
          </UI.Row>

          <UI.Row justifyContent="space-between" alignItems="flex-end">
            <UI.Text variant="body1">{period == 1 ? "Annual Used" : "Monthly Used"}</UI.Text>
            <UI.Text variant="body1">{h.curr.format(value)}</UI.Text>
          </UI.Row>
        </UI.Col>
      </UI.Col>

      <UI.Row justifyContent="space-between" spacing={0.5} alignItems="center" position="relative" height={24}>
        <UI.Col
          sx={{
            border: "4px solid black",
            borderColor: "#f2f2f2",
            position: "absolute",

            height: 36,
            // bgcolor: "#e4eef5",
            bgcolor: "primary.light",
            borderRadius: 5,
            width: "100%",
            overflow: "hidden",
            justifyContent: "center",
          }}
        >
          <UI.Col
            sx={{
              // border: "1px solid black",
              height: 36,
              borderRadius: 7,
              position: "absolute",
              zIndex: 1,
              width: (value / max > 1 ? 1 : value / max) * 100 + "%",
              minWidth: "15%",
              bgcolor: "primary.dark",
            }}
          >
            <UI.Row alignItems="center" justifyContent="flex-end" height="100%">
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
        </UI.Col>
      </UI.Row>
    </UI.Col>
  );
}
