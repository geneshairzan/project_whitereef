import UI from "@gh/ui";
import Form from "@gh/form";
import Icon from "@gh/icon";
import Label from "../label";
import useFetch from "@gh/helper/useFetch";

export default function App({ value = [], ...props }) {
  const schema = useFetch({ url: `schema/${props.name}` });
  // return <>on dev</>;
  return (
    <UI.Stack spacing={2}>
      {!props.noLabel && <Label label={props.label} tip={props.tip} />}
      {value?.map((d) => (
        <UI.Row>
          <Form.Text label={"name"} />
        </UI.Row>
      ))}
      <UI.Button startIcon={<Icon.Plus />} variant={"outlined"}>
        add {props.label}
      </UI.Button>
    </UI.Stack>
  );
}
