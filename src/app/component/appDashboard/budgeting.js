import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import Pie from "@gh/chart/pie";
import { mapper } from "@gh/chart/_mapper";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import h from "@gh/helper";
import useTrans from "@/component/appTransaction/hook";
import { useRouter } from "next/router";
import { Tabs, Tab } from "@mui/material";
import TRender, { HeaderRender } from "@/component/appTransaction/render";
import RecentTransaction from "@/component/appDashboard/recentTransaction";
import BudgetBar from "@/component/appDashboard/budgetBar";
import Line from "@gh/chart/line";
import BudgetChart from "@gh/chart/BudgetChart";
import Link from "next/link";

export default function BugetSum({ category, budget }) {
  const trans = useTrans({ fperiod: { id: 1, year: h.date.todayYear } });

  const [onDetail, setonDetail] = useState();

  let groupCatagory = h.groupByKeyToArr(
    category?.filter((d) => d.user_id && d.budget_id),
    "budget_id"
  );

  let groupTrans = h.groupByKeyToArr(
    trans?.data?.filter((d) => d.category_id),
    "category_id"
  );

  function getAmount(d) {
    let categoryList = groupCatagory.find((dx) => dx.key == d.id)?.data;
    if (!categoryList) return 0;
    let amount = groupTrans
      .find((dx) => dx.key == categoryList.find((dxx) => dxx.budget_id == d.id)?.id)
      ?.data?.filter((dx) => {
        if (d.period == 1) return true;
        return h.date.onWhichMonthOfYear(dx.date) == h.date.todayMonth;
      })
      .reduce((a, b) => a + b.amount, 0);
    return amount || 0;
  }

  function getDetailData(budget) {
    let categoryArray = budget.category.map((d) => d.id);
    let dataArray = trans?.data.filter((d) => categoryArray.includes(d.category_id));
    return dataArray;
  }

  return (
    <UI.Col width="100%" flexGrow={1}>
      <UI.Text variant="h6" bold pb={1}>
        Budget
      </UI.Text>
      {!budget?.length && (
        <UI.Col center spacing={2} flexGrow={1}>
          <UI.Text variant="body1">You dont have any budget listed</UI.Text>
          <UI.Button variant="outlined" component={Link} href="/budget">
            Add Budget
          </UI.Button>
        </UI.Col>
      )}

      <UI.Col spacing={3}>
        {budget.map((d) => (
          <BudgetBar
            period={d.period}
            color={d?.color}
            key={d.id}
            max={d.amount}
            label={d.name}
            // value={getAmount(d)}
            value={Math.abs(getAmount(d))}
            onDetail={() =>
              setonDetail({
                budget: d,
                data: getDetailData(d),
              })
            }
          />
        ))}
      </UI.Col>
      {onDetail && (
        <UI.Modal open={true} bottom>
          <UI.Col
            sx={{
              minHeight: "100dvh",
              bgcolor: "white",
              width: "100%",
            }}
          >
            <UI.Col
              justifyContent="space-between"
              alignItems="center"
              sx={{
                bgcolor: onDetail?.budget.color,
              }}
            >
              <UI.Col
                spacing={1}
                sx={{
                  height: "25dvh",
                  p: 1,
                  width: "100%",
                }}
              >
                <UI.Row alignItems="center" width="100%">
                  <UI.IconButton onClick={() => setonDetail()}>
                    <Icon.Back
                      sx={{
                        color: "white",
                      }}
                    />
                  </UI.IconButton>
                  <UI.Text variant="h4" bold color="white">
                    Budget Detail
                  </UI.Text>
                </UI.Row>
                <UI.Col center spacing={1} width="100%" pt={2}>
                  <UI.Text variant="h5" color="white" align="center" bold>
                    {onDetail.budget.name}
                  </UI.Text>
                  <UI.Text variant="body1" color="white" align="center">
                    ({onDetail.budget.period == 0 ? "monthly budget" : "annuall budget"})
                  </UI.Text>
                </UI.Col>
              </UI.Col>
            </UI.Col>
            <UI.Col
              sx={{
                p: 2,
              }}
            >
              {onDetail.budget.period == 0 && <DetailMonthly data={onDetail} />}
              {onDetail.budget.period == 1 && <DetailAnnual data={onDetail} />}
              <UI.Text variant="hb" pt={2} bold>
                Transaction List
              </UI.Text>
              <UI.Col
                spacing={1}
                sx={{
                  flex: 1,
                  maxHeight: "50dvh",
                  overflow: "scroll",
                }}
              >
                {onDetail?.data.map((d) => (
                  <TRender
                    data={{
                      ...d,
                      date: d.date,
                      detail: d.detail,
                      category: d.category_id ? category.find((dx) => dx.id == d.category_id)?.name : "-",
                      amount: d.amount,
                    }}
                  />
                ))}
              </UI.Col>
            </UI.Col>
          </UI.Col>
        </UI.Modal>
      )}
    </UI.Col>
  );
}

function DetailMonthly({ data }) {
  let todayWeek = h.date.onWhichWeekOfMonth(new Date());
  // let todayWeek = 3;

  let totalWeek = h.date.getWeekOfMonth(h.date.todayYear, h.date.todayMonth);
  let dataset = [...Array(totalWeek)].map((d, ix) => {
    return data.data
      .filter((dx) => h.date.onWhichWeekOfMonth(new Date(dx.date)) == ix + 1)
      .reduce((a, b) => a + Math.abs(b?.amount), 0);
  });

  function getDataset(raw, canNull) {
    return raw.reduce((accumulator, currentValue, index) => {
      if (index === 0) {
        accumulator.push(currentValue);
      } else {
        const previousValue = accumulator[index - 1];
        const sum = previousValue + currentValue;
        accumulator.push(sum);
      }
      return accumulator;
    }, []);
  }

  function getProjection(calcSet) {
    // console.log(calcSet, calcSet[todayWeek - 1]);
    let incremental = calcSet[todayWeek - 1] / todayWeek;
    // console.log(incremental);
    let remap = Array(totalWeek)
      .fill(0)
      .map((d, ix) => {
        if (ix < todayWeek - 1) return null;
        else if (ix == todayWeek - 1) return calcSet[todayWeek - 1];
        else return incremental;
      });
    // console.log(remap);
    // console.log(getDataset(remap, true));
    return {
      label: "projection",
      data: getDataset(remap).map((d) => (d <= 0 ? null : Math.abs(d))),
      borderColor: "#fa6831",
      borderDash: [10, 10],
      borderWidth: 1,
    };
  }
  const datax = {
    labels: [...Array(totalWeek)].map((d, ix) => `W${ix + 1}`),
    datasets: [
      {
        label: "progress",
        data: getDataset(dataset).map((d, ix) => {
          if (ix + 1 > todayWeek) return null;
          return d <= 0 ? null : Math.abs(d);
        }),
        borderColor: "#17a369",
      },
      getProjection(getDataset(dataset)),
    ],
  };
  function renderSummary() {
    let sum = dataset.reduce((a, b) => a + b, 0);
    if (sum < data.budget.amount) {
      return "Good Work! your on budget, keep it up !";
    } else {
      return "Wooopps! seems you overdo your budget";
    }
  }

  return (
    <UI.Col spacing={2}>
      <UI.Text variant="body2" italic align="left">
        * This data represent your total spending per weekly basis
      </UI.Text>
      <BudgetChart data={datax} budget={data.budget.amount} todayWeek={"W" + todayWeek} />

      <UI.Text
        variant="body1"
        align="center"
        sx={{
          border: "2px solid",
          borderColor: "primary.main",
          color: "primary.main",
          borderRadius: 5,
          p: 1,
          bgcolor: "primary.light",
        }}
        bold
      >
        {renderSummary()}
      </UI.Text>
    </UI.Col>
  );
}

function DetailAnnual({ data }) {
  let todayMonth = new Date().getMonth() + 1;

  let totalMonth = 12;
  let dataset = [...Array(totalMonth)].map((d, ix) => {
    return data.data.filter((dx) => h.date.onWhichMonthOfYear(dx.date) == ix).reduce((a, b) => a + b?.amount, 0);
  });

  function getDataset(raw) {
    return raw.reduce((accumulator, currentValue, index) => {
      if (index === 0) {
        accumulator.push(currentValue);
      } else {
        const previousValue = accumulator[index - 1];
        const sum = previousValue + currentValue;
        accumulator.push(sum);
      }
      return accumulator;
    }, []);
  }

  function getProjection(calcSet) {
    let incremental = calcSet[todayMonth - 1] / todayMonth;
    let remap = Array(totalMonth)
      .fill(0)
      .map((d, ix) => {
        if (ix < todayMonth - 1) return null;
        else if (ix == todayMonth - 1) return calcSet[todayMonth - 1];
        else return incremental;
      });
    return {
      label: "projection",
      data: getDataset(remap).map((d) => (d <= 0 ? null : Math.abs(d))),
      borderColor: "#fa6831",
      borderDash: [10, 10],
      borderWidth: 1,
    };
  }
  const datax = {
    labels: [...Array(totalMonth)].map((d, ix) => `M${ix + 1}`),
    datasets: [
      {
        label: "progress",
        data: getDataset(dataset).map((d, ix) => (ix > todayMonth - 1 ? null : Math.abs(d))),
        borderColor: "#17a369",
      },
      getProjection(getDataset(dataset)),
    ],
  };
  function renderSummary() {
    let sum = dataset.reduce((a, b) => a + b, 0);
    if (sum < data.budget.amount) {
      return "Good Work! your on budget, keep it up !";
    } else {
      return "Wooopps! seems you overdo your budget";
    }
  }

  return (
    <UI.Col spacing={2}>
      <UI.Text variant="body2" italic align="left">
        * This data represent your total spending per monthly basis
      </UI.Text>
      <BudgetChart data={datax} budget={data.budget.amount} todayWeek={"M" + todayMonth} />

      <UI.Text
        variant="body1"
        align="center"
        sx={{
          border: "2px solid",
          borderColor: "primary.main",
          color: "primary.main",
          borderRadius: 5,
          p: 1,
          bgcolor: "primary.light",
        }}
        bold
      >
        {renderSummary()}
      </UI.Text>
    </UI.Col>
  );
}
