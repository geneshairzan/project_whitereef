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
import DetailCashflow from "./detailCashflow";
import DashboardList from "./dashboardList";
import AccountChart from "@gh/chart/accountChart";
import Link from "next/link";

export default function App({ stats, account, raw }) {
  const [open, setopen] = useState("Total Balance");

  function handleOpen(target) {
    setopen(target == open ? null : target);
  }

  return (
    <UI.Col spacing={1} pb={2}>
      <MoreaAble
        open={open}
        label="Total Balance"
        value={h.curr.format(account?.reduce((a, b) => a + b?.last_balance, 0))}
        onClick={() => handleOpen("Total Balance")}
        detail={
          <UI.Col pr={3} pt={2}>
            <UI.Row spacing={2}>
              <UI.Col width="60%">
                {account
                  ?.sort((a, b) => (a.last_balance < b.last_balance ? 1 : -1))
                  .slice(0, 5)
                  ?.map((d, ix) => (
                    <DashboardList key={ix} label={d.name} value={d.last_balance} />
                  ))}
                <UI.Row justifyContent="flex-end">
                  {account?.length > 5 && (
                    <UI.Button variant="text" size="small">
                      More
                    </UI.Button>
                  )}
                </UI.Row>
              </UI.Col>
              <UI.Col width="40%" alignItems="flex-end">
                <AccountChart data={account} />
              </UI.Col>
            </UI.Row>
          </UI.Col>
        }
      />

      <MoreaAble
        open={open}
        label="Cash Flow"
        value={h.curr.format(stats?.income - stats?.expense || 0)}
        onClick={() => handleOpen("Cash Flow")}
        detail={<DetailCashflow raw={raw} stats={stats} />}
      />
    </UI.Col>
  );
}

function MoreaAble({ label, value, onClick, open, detail }) {
  return (
    <UI.Col>
      <UI.Row justifyContent="space-between" onClick={onClick}>
        <UI.Text variant="body1" bold>
          {label}
        </UI.Text>
        <UI.Row spacing={0.5}>
          <UI.Text variant="body1">{value}</UI.Text>
          {open == label ? <ExpandLess /> : <ExpandMore />}
        </UI.Row>
      </UI.Row>
      <Collapse in={open == label} timeout="auto" unmountOnExit>
        {detail}
      </Collapse>
    </UI.Col>
  );
}
