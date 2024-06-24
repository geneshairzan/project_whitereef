import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Pie from "@gh/chart/pie";
import { mapper } from "@gh/chart/_mapper";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import h from "@gh/helper";
import useTrans from "@/component/appTransaction/hook";
import { useRouter } from "next/router";
import { Tabs } from "@mui/material";
import TRender, { HeaderRender } from "@/component/appTransaction/render";
import RecentTransaction from "@/component/appDashboard/recentTransaction";

let sample = [
  { id: 1, cat: { id: 0, name: "sasa" } },
  { id: 2, cat: { id: 0, name: "sasa" } },
  { id: 3, cat: { id: 0, name: "gogo" } },
];

export default function Top3({ stats, category, raw, disabledRecent, activeTab }) {
  // const [activeTab, setactiveTab] = React.useState(0);

  return (
    <UI.Col width="100%" justifyContent="space-between">
      {/* <UI.Row spacing={1} py={1}>
        <Tab label="Top Income" onClick={() => setactiveTab(0)} active={activeTab == 0} />
        <Tab label="Top Expense" onClick={() => setactiveTab(1)} active={activeTab == 1} />
        {!disabledRecent && <Tab label="Recent" onClick={() => setactiveTab(2)} active={activeTab == 2} />}
      </UI.Row> */}

      <UI.Col spacing={0.5} overflow="auto" pr={1}>
        {activeTab < 2 &&
          raw
            ?.filter((d) => {
              return activeTab == 0 ? d.amount > 0 : d.amount < 0;
            })
            .sort((a, b) => (activeTab == 0 ? b.amount - a.amount : a.amount - b.amount))
            .slice(0, 10)
            .map((d, ix) => (
              <UI.Col
                key={ix}
                sx={{
                  width: "100%",

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
                    category: d.category_id ? category?.find((dx) => dx.id == d.category_id)?.name : "-",
                    amount: d.amount,
                  }}
                />
              </UI.Col>
            ))}
        {activeTab == 2 && <RecentTransaction data={raw} category={category} />}
      </UI.Col>
    </UI.Col>
  );
}

function Tab({ onClick, label, active }) {
  return (
    <UI.Col
      onClick={onClick}
      sx={{
        flexGrow: 1,
        border: "1px solid black",
        borderRadius: 3,
        height: 24,
        bgcolor: active && "primary.main",
        color: active && "white",
      }}
      center
    >
      <UI.Text variant="body2">{label}</UI.Text>
    </UI.Col>
  );
}
