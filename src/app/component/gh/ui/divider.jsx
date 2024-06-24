import UI from "@gh/ui";

export default function App({ width, color }) {
  return (
    <UI.Col
      sx={{
        borderTop: `1px solid ${color || "black"}`,
        width: width || "100px",
      }}
    />
  );
}
