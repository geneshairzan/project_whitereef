import UI from "@/app/_component/gh/ui";

export default function NoList({ extra }) {
  return (
    <UI.Col pt={3} center spacing={1} flexGrow={1}>
      <UI.Text variant="body1">no record found</UI.Text>
      {extra}
    </UI.Col>
  );
}
