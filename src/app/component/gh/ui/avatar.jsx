import UI from "@gh/ui";

export default function App({ src, ...props }) {
  return (
    <UI.Stack borderRadius={"50%"} overflow="hidden" height={props.w || 128} width={props.w || 128}>
      <img
        src={src}
        alt=""
        style={{
          objectFit: "contain",
        }}
      />
    </UI.Stack>
  );
}
