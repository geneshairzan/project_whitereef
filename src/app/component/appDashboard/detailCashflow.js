import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import Pie from "@gh/chart/pie";
import { mapper } from "@gh/chart/_mapper";
import h from "@gh/helper";
import useTrans from "@/component/appTransaction/hook";
import { useRouter } from "next/router";
import IncomeExpense from "@/component/appDashboard/incomeExpense";
import NoData from "@/component/appDashboard/nodata";
import RecentTransaction from "@/component/appDashboard/recentTransaction";
import Balance from "@/component/appDashboard/balance";

import Collapse from "@mui/material/Collapse";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardList from "./dashboardList";
import CashflowBar from "./cashflowBar";
import CashflowChart from "@gh/chart/cashflowChart";

export default function DetailCashflow({ raw, stats }) {
  const [activeTab, setactiveTab] = React.useState(0);

  return (
    <UI.Col spacing={2}>
      <UI.Col>
        <DashboardList label={"total expense"} value={stats?.expense} />
        <DashboardList label={"total income"} value={stats?.income} />
      </UI.Col>

      <UI.Row spacing={1}>
        <Tab label="Trend" onClick={() => setactiveTab(0)} active={activeTab == 0} />
        <Tab label="Commulative" onClick={() => setactiveTab(1)} active={activeTab == 1} />
      </UI.Row>

      <CashflowChart isCommulative={activeTab == 1} raw={raw?.map((d) => ({ ...d, date: new Date(d.date) }))} />
    </UI.Col>
  );
}

function Tab({ onClick, label, active }) {
  return (
    <UI.Col
      onClick={onClick}
      sx={{
        width: "100%",
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
