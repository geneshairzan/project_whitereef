import UI from "@gh/ui";

export default function NoParser({ extra }) {
  return (
    <UI.Col pt={3} center spacing={1} flexGrow={1}>
      <UI.Text variant="h6" bold color="primary.main">
        Sorry for inconveniance
      </UI.Text>
      <UI.Text variant="body1">This feature still under development</UI.Text>
      <UI.Text variant="body1" align="center">
        {extra}
      </UI.Text>
    </UI.Col>
  );
}
