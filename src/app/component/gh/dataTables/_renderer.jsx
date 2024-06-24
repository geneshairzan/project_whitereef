import UI from "@gh/ui";
import h from "@gh/helper";

const config = {
  firstColWidth: 300,
  rowHeight: 40,
  minCellWidth: 200,
};

export default function RenderChild({ type, value, width, El, row }) {
  if (type == "el")
    return (
      <UI.Col flexGrow={1}>
        <El value={value} row={row} />
      </UI.Col>
    );

  if (type == "html")
    return (
      <UI.Col ml={2} maxHeight={config.rowHeight - 8} mt={-2} overflow="hidden">
        <UI.TextHTML data={value} />
      </UI.Col>
    );

  if (type == "elipsis")
    return (
      <UI.Row position="relative" width="100%" alignItems="center">
        <UI.Row position="absolute" width="100%">
          <UI.TextOverflow tip={value}>
            <UI.Elipsis variant="body2">{value}</UI.Elipsis>
          </UI.TextOverflow>
        </UI.Row>
      </UI.Row>
    );

  if (type == "chiparray") return <ChipArray data={value} />;
  if (type == "array") return <StdArray data={value} />;
  if (type == "chip")
    return (
      <UI.Row>
        <UI.Chip label={value || "-"} color={h.getChipColor(value)} />
      </UI.Row>
    );
  if (type == "datetime")
    return (
      <UI.Text variant="body2" align="left">
        {h.date.format_time(value)}
      </UI.Text>
    );
  if (type == "date")
    return (
      <UI.Text variant="body2" align="left">
        {h.date.format(value)}
      </UI.Text>
    );
  if (type == "amount")
    return (
      <UI.Text
        variant="body2"
        align="right"
        sx={{
          width: "100%",
          color: value < 0 ? "fireBrick" : "black",
        }}
      >
        {h.curr.format(value)}
      </UI.Text>
    );
  if (type == "currsplit")
    return (
      <UI.Row justifyContent="space-between" width="100%">
        <UI.Text variant="body2" align="left">
          {value.split(" ")[0]}
        </UI.Text>
        <UI.Text
          variant="body2"
          align="left"
          // sx={{
          //   fontFamily: "Helvetica",
          // }}
        >
          {value.split(" ")[1]}
        </UI.Text>
      </UI.Row>
    );
  return (
    <UI.Text variant="body2" align="left">
      {value}
    </UI.Text>
  );
}

function ChipArray({ data }) {
  if (!data) return "";
  return (
    <UI.Row flexWrap="wrap" p={1} alignItems="center">
      {data.data.map((d, ix) => (
        <UI.Chip label={d.name} key={ix} m={0.2} />
      ))}
      {data.type == 1 && (
        <UI.Col center bgcolor="chipError.main" borderRadius={"4px"} px={0.5} py={0}>
          <UI.Text variant="caption" color="error.main" my={"-3px"}>
            popup
          </UI.Text>
        </UI.Col>
      )}
    </UI.Row>
  );
}
function StdArray({ data }) {
  if (!data) return "";
  return (
    <UI.Row flexWrap="wrap" alignItems="center" bgcolor="d.a" height="100%">
      {data.map((d, ix) => (
        <UI.Chip label={d} key={ix} m={0.2} />
      ))}
    </UI.Row>
  );
}
