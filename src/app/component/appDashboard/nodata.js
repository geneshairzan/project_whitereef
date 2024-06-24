import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Pie from "@gh/chart/pie";
import { mapper } from "@gh/chart/_mapper";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import h from "@gh/helper";
import useTrans from "@/component/appTransaction/hook";
import { useRouter } from "next/router";
import { Tabs, Tab } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
export default function NoData(params) {
  const [onOpen, setonOpen] = useState(true);
  const loc = useRouter();

  return (
    <UI.Modal open={onOpen} center spacing={2}>
      <UI.Col
        sx={{
          bgcolor: "white",
          p: 2,
          borderRadius: 2,
          m: 2,
        }}
        spacing={2}
      >
        <UI.Text variant="h2" align="center" bold color="primary.main">
          Welcome Aboard
        </UI.Text>
        <Sample />
        <Sample />
        <Sample />

        <UI.Col
          sx={{
            p: 2,
            border: "1px solid grey",
            borderRadius: 2,
          }}
          spacing={1}
        >
          <UI.Text variant="body1">
            You don't have any data in Smarti yet. <br /> Please import your bank statements or create new records
          </UI.Text>
          <UI.Button onClick={() => loc.push("/transaction/import")}>Import Transaction</UI.Button>
          <UI.Button variant="text" onClick={() => setonOpen(false)}>
            later
          </UI.Button>
        </UI.Col>
      </UI.Col>
    </UI.Modal>
  );
}

function Sample(params) {
  return (
    <UI.Row spacing={2} alignItems="center">
      <Skeleton
        variant="circular"
        width={64}
        height={64}
        sx={{
          flexShrink: 0,
        }}
      />
      <UI.Text variant="body1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis voluptatum mollitia reprehenderit voluptate
        deleniti aperiam quisquam fuga.
      </UI.Text>
    </UI.Row>
  );
}
