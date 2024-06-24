import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Pie from "@gh/chart/pie";
import { mapper } from "@gh/chart/_mapper";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import h from "@gh/helper";

const defaultPeriod = { id: 0, label: "This Month", month: h.date.todayMonth, year: h.date.todayYear };

export default function App(props) {
  console.log();
  const [data, setdata] = useState();
  // const data = useFetch({ url: "record" });
  const [stats, setstats] = useState({});
  const [filter, setfilter] = useState({
    search: "",
    period: props?.fperiod || defaultPeriod, // 0: this month, 1: this year, 2 : all
  });

  async function refetch() {
    setdata(null);
    let res = await fetcher({
      url: `user/transaction?p=${filter?.period?.id}`,
    });
    setdata(res.data);
  }

  useEffect(() => {
    refetch();
  }, [filter.period]);

  useEffect(() => {
    if (data?.length) {
      let buffer = data.filter(searchFilter).filter(categoryFilter).filter(minFilter).filter(maxFilter);
      let is = mapper.IS(buffer);
      setstats({
        expense: Math.abs(is?.expense),
        income: Math.abs(is?.income),
        expenseList: buffer.filter((d) => d?.amount < 0),
        incomeList: buffer.filter((d) => d?.amount > 0),
      });
    }
  }, [data, filter]);

  function searchFilter(d) {
    return (
      d.detail.toLowerCase().includes(filter.search.toLowerCase()) ||
      d.category?.name?.toLowerCase().includes(filter.search.toLowerCase())
    );
  }

  function categoryFilter(d) {
    return filter?.category_id ? d.category_id == filter?.category_id : true;
  }

  function minFilter(d) {
    return filter?.min ? d.amount > filter?.min : true;
  }

  function maxFilter(d) {
    return filter?.max ? d.amount < filter?.max : true;
  }

  function periodFilter(d) {
    if (filter.period.id == 0) {
      return (
        h.date.onWhichMonthOfYear(d.date) == filter.period.month && h.date.onWhichOfYear(d.date) == filter.period.year
      );
    }
    if (filter.period.id == 1) {
      return h.date.onWhichOfYear(d.date) == filter.period.year;
    }
  }

  function nextPeriod() {
    if (filter.period.id == 0) {
      let nextPeriod = filter.period.month + 1;
      let currentYear = filter.period.year;
      setfilter({
        ...filter,
        period: {
          ...filter.period,
          month: nextPeriod == 12 ? 0 : nextPeriod,
          year: nextPeriod == 12 ? currentYear + 1 : currentYear,
        },
      });
    }

    if (filter.period.id == 1) {
      let currentYear = filter.period.year;
      setfilter({
        ...filter,
        period: {
          ...filter.period,
          year: currentYear + 1,
        },
      });
    }
  }

  function prevPeriod() {
    if (filter.period.id == 0) {
      let nextPeriod = filter.period.month - 1;
      let currentYear = filter.period.year;

      setfilter({
        ...filter,
        period: {
          ...filter.period,
          month: nextPeriod < 0 ? 11 : nextPeriod,
          year: nextPeriod < 0 ? currentYear - 1 : currentYear,
        },
      });
    }

    if (filter.period.id == 1) {
      let currentYear = filter.period.year;
      setfilter({
        ...filter,
        period: {
          ...filter.period,
          year: currentYear - 1,
        },
      });
    }
  }

  function getFilterState() {
    if (filter.period.id == 0) return `(${h.date.monthListShort[filter.period.month]})`;
    if (filter.period.id == 1) return `(${filter.period.year})`;
    if (filter.period.id == 2) return `(All Time)`;
    if (filter.period.id == 3) return `(${filter.period.period_start} - ${filter.period.period_end})`;
    return "";
  }

  return {
    data: data?.filter(searchFilter).filter(categoryFilter).filter(minFilter).filter(maxFilter).filter(periodFilter),
    stats,
    filter,
    setfilter,
    refetch,
    getFilterState,
    prevPeriod,
    nextPeriod,
  };
}
