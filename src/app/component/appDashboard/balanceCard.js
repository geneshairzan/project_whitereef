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

import RecentTransaction from "@/component/appDashboard/recentTransaction";
import DashboardList from "./dashboardList";
import AccountChart from "@gh/chart/accountChart";

import { meta } from "@/component/parserV2/_meta";

export default function App({ data }) {
  const [onDetail, setonDetail] = useState(false);
  const { auth } = React.useContext(Context);

  return (
    <UI.Col>
      <UI.Col
        onClick={() => setonDetail(true)}
        justifyContent="space-between"
        sx={{
          height: 140,
          borderRadius: 5,
          bgcolor: "#17a369",
          p: 2,
        }}
      >
        <UI.Text variant="h4" color="white" bold>
          Hi, {auth?.user?.name.split(" ")[0]}
        </UI.Text>

        <UI.Col>
          <UI.Text variant="body1" bold color="white">
            Your total balance
          </UI.Text>
          <UI.Text variant="h5" color="white">
            {h.curr.format(data?.account?.reduce((a, b) => a + parseInt(b.last_balance), 0))}
          </UI.Text>
        </UI.Col>
      </UI.Col>

      <UI.Col pt={2}>
        <UI.Text variant="h6" bold>
          My Accounts
        </UI.Text>

        <UI.Col center>
          <UI.Row
            spacing={2}
            sx={{
              overflow: "auto",
              pb: 1,
              width: "calc(100% + 32px)",
              pl: 2,
            }}
          >
            {data?.account
              ?.sort((a, b) => (a.last_balance < b.last_balance ? 1 : -1))
              .slice(0, 5)
              ?.map((d, ix) => (
                <AccountCard d={d} key={ix} />
              ))}
            {/* <AccountChart data={data?.account} /> */}
            {/* <UI.Col width="40%" alignItems="flex-end">
            </UI.Col> */}
          </UI.Row>
        </UI.Col>
      </UI.Col>
    </UI.Col>
  );
}

function AccountCard({ d }) {
  let bankmeta = meta.find((dx) => dx.id == d.bank_id);
  return (
    <UI.Col
      sx={{
        height: 90,
        width: 140,
        flexShrink: 0,
        p: 1,
        borderRadius: 2,
        bgcolor: bankmeta.getColor(),
      }}
      justifyContent="space-between"
    >
      <UI.Col>
        <UI.Text variant="body1" color="white">
          {d.name}
        </UI.Text>
        <UI.Text variant="body2" color="white">
          {`**** ` + d.account_no?.slice(-4)}
        </UI.Text>
      </UI.Col>
      <UI.Text variant="body2" bold color="white">
        {h.curr.format(d.last_balance)}
      </UI.Text>
    </UI.Col>
  );
}
