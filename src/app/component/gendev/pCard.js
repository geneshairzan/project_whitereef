import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import UI from "@gh/ui";

export default function App({ data }) {
  const [active, setactive] = useState(0);
  return (
    <>
      <UI.Row center direction={"row"} justifyContent="space-between" spacing={2}>
        {data.map((d, ix) => (
          <UI.Col
            center
            key={ix}
            width={"100%"}
            height="50px"
            border={"1px solid "}
            borderRadius="8px"
            className="center"
            onClick={() => setactive(ix)}
            bgcolor={ix == active && "#fde89a"}
            borderColor={ix == active ? "#1c4670" : "white"}
          >
            <Typography
              variant="caption"
              color={ix == active ? "#1c4670" : "white"}
              fontWeight={ix == active ? "bold" : "normal"}
            >
              {d.s}
            </Typography>
          </UI.Col>
        ))}
      </UI.Row>
      <UI.Col minHeight={90}>
        <Typography variant={"caption"} color="white">
          <Typography color="#ffa229" component="span">
            {`${data[active].l} `}
          </Typography>
          {data[active].desc}
        </Typography>
      </UI.Col>
    </>
  );
}
