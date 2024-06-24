import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Pie from "@gh/chart/pie";
import { mapper } from "@gh/chart/_mapper";
import h from "@gh/helper";
import useTrans from "@/component/appTransaction/hook";
import { useRouter } from "next/router";
import { Tabs, Tab } from "@mui/material";
import TRender, { HeaderRender } from "@/component/appTransaction/render";

export default function Top3({ data, category }) {
  return (
    <UI.Col width="100%" justifyContent="space-between">
      <UI.Col spacing={0.5}>
        {data
          ?.sort(h.trans.sortDateDsc)
          .slice(0, 3)
          .map((d, ix) => (
            <UI.Col
              key={ix}
              sx={{
                py: 1,
                borderBottom: "1px solid lightGrey",
                alignItems: "center",
              }}
            >
              <TRender
                data={{
                  ...d,
                  date: d.date,
                  detail: d.detail,
                  category: d.category_id ? category.find((dx) => dx.id == d.category_id)?.name : "-",
                  amount: d.amount,
                }}
              />
            </UI.Col>
          ))}
      </UI.Col>
    </UI.Col>
  );
}
