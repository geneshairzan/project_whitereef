import { Stack, Typography, Box, Button, Grid } from "@mui/material";

import React from "react";

import UI from "@gh/ui";
import { datas } from "./_data_recent";

export default function CRecentProejct({ isPrinting = false, onScroll }) {
  return (
    <UI.Row
      onScroll={onScroll}
      center
      flexWrap="wrap"
      width="100%"
      overflow={"auto"}
      height="100%"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
      alignItems="flex-start"
      justifyContent="flex-start"
      alignContent={{ xs: "flex-start", md: "center" }}
    >
      {datas.map((d, ix) => (
        <Stack key={ix} width={{ xs: "100%", md: "calc(50% - 16px)" }} flexShrink={0} my={1} mx={{ xs: 0, md: 1 }}>
          <Card
            year={d.year}
            title={d.title}
            subtitle={d.subtitle}
            sector={d.sector}
            stacks={d.stacks}
            modules={d.modules}
            link={d.link}
          />
        </Stack>
      ))}
    </UI.Row>
  );
}

function Card(props) {
  return (
    <UI.Row spacing={1}>
      <UI.Col center bgcolor="cv.blue">
        <Typography
          variant="subtitle1"
          textAlign="left"
          color={"white"}
          component="span"
          sx={{
            px: 1,
          }}
        >
          {props.year}
        </Typography>
      </UI.Col>
      <UI.Col>
        <UI.Text variant="body2" color={"white"}>
          {props.title}
        </UI.Text>
        <UI.Text variant="caption" color={"#efdb69"} mt={"-4px"}>
          {props.subtitle}
        </UI.Text>
      </UI.Col>
    </UI.Row>
  );
}
