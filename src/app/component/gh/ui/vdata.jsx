import UI from "@gh/ui";

export default function Vdata({ label, value }) {
  return (
    <UI.Col>
      <UI.Text variant="h6" bold color="primary.main" capitalize>
        {label}
      </UI.Text>
      <UI.Text variant="body1">{value}</UI.Text>
    </UI.Col>
  );
}
