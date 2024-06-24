import UI from "@gh/ui";
import h from "@gh/helper";
import Link from "next/link";

export default function App({ data }) {
  return (
    <UI.Col flexGrow={1}>
      <UI.Text variant="h5" bold>
        Assets
      </UI.Text>

      <UI.Row
        spacing={2}
        sx={{
          width: "100%",
          overflow: "scroll",
          pb: 1,
        }}
      >
        {data.map((d) => (
          <UI.Col
            key={d.id}
            justifyContent="space-between"
            sx={{
              border: "1px solid lightGrey",
              borderRadius: 2,
              // height: 64,
              width: 120,
              overflow: "hidden",
              flexShrink: 0,
              bgcolor: "primary.light",
            }}
          >
            <UI.Col
              sx={{
                // height: 8,
                width: "100%",
                px: 1,
                py: 1,
              }}
            >
              <UI.Elipsis variant="body2">{d.name}</UI.Elipsis>
            </UI.Col>
            <UI.Col
              sx={{
                // height: 8,
                width: "100%",
                px: 1,
                py: 0.5,
              }}
            >
              <UI.Text variant="body1" bold>
                {h.curr.format(d.value)}
              </UI.Text>
            </UI.Col>
          </UI.Col>
        ))}
      </UI.Row>
      {!data?.length && (
        <UI.Col center spacing={2} flexGrow={1}>
          <UI.Text variant="body1">You dont have any registered assets</UI.Text>
          <UI.Button variant="outlined" component={Link} href="asset">
            Add Assets
          </UI.Button>
        </UI.Col>
      )}
    </UI.Col>
  );
}
