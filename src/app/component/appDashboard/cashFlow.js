import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Form from "@gh/form";
import Icon from "@gh/icon";
import Pie from "@gh/chart/pie";
import { mapper } from "@gh/chart/_mapper";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import h from "@gh/helper";
import useTrans from "@/component/appTransaction/hook";
import { useRouter } from "next/router";
import IncomeExpenseRecent from "@/component/appDashboard/incomeExpense";
import NoData from "@/component/appDashboard/nodata";
import BalanceCashflow from "@/component/appDashboard/balance";
import Budgeting from "@/component/appDashboard/budgeting";
import AseetList from "@/component/appDashboard/aseetList";
import Context from "@context/app";
import Filter from "@/component/appTransaction/filter";
import Link from "next/link";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import RecentTransaction from "@/component/appDashboard/recentTransaction";
import DetailCashflow from "./detailCashflow";

export default function App({ raw, stats }) {
  const { auth } = React.useContext(Context);
  const [onDetail, setonDetail] = useState(false);

  let value = stats?.income - stats?.expense || 0;

  return (
    <UI.Row justifyContent="space-between">
      <UI.Text variant="h6" bold>
        Cashflow for {h.date.todayMonthName}
      </UI.Text>
      <UI.Row alignItems="center" component={Link} href="/stats" spacing={0.5}>
        <UI.Text variant="h6" color={value < 0 ? "fireBrick" : "success"}>
          {h.curr.format(value)}
        </UI.Text>
        <KeyboardDoubleArrowRightIcon sx={{ color: "grey" }} />
      </UI.Row>
    </UI.Row>
  );
}
{
  /* <DetailCashflow raw={raw} stats={stats} /> */
}
