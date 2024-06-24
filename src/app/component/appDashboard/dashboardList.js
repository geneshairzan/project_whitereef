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

export default function DashboardList({ label, value }) {
  return (
    <UI.Row justifyContent="space-between">
      <UI.Text variant="body2">{label}</UI.Text>
      <UI.Text variant="body2">{h.curr.format(value || 0)}</UI.Text>
    </UI.Row>
  );
}
