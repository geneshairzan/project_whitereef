import UI from "@gh/ui";
import Icon from "@gh/icon";
import Link from "next/link";

export default function Vdata({ label, to }) {
  return (
    <UI.Row alignItems="center" spacing={1}>
      <UI.IconButton LinkComponent={Link} href={to}>
        <Icon.Back
          sx={{
            fontSize: 32,
          }}
        />
      </UI.IconButton>
      <UI.Text variant="h4" bold color="primary.main" capitalize>
        {label}
      </UI.Text>
    </UI.Row>
  );
}
