import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import Form from "@gh/form";
import Pie from "@gh/chart/pie";
import { mapper } from "@gh/chart/_mapper";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import h from "@gh/helper";
import useTrans from "@/component/appTransaction/hook";
import TRender, { HeaderRender } from "@/component/appTransaction/render";
import { useRouter } from "next/router";
import { Menu, Fade, MenuItem } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function Filter({ filter, setfilter, category, noSearch = false, asIcon = false, transHook }) {
  let monthList = h.date.monthListShort;
  const [onMonth, setonMonth] = useState(false);
  const periods = [
    { id: 0, label: "This Month" },
    { id: 1, label: "Annual" },
    { id: 2, label: "All Time" },
    { id: 3, label: "Custom" },
  ];
  const [onFilter, setonFilter] = useState(false);

  function handleFilter(target, value) {
    setfilter({ ...filter, period: { ...filter.period, [target]: value } });
  }

  function handleFilterMonth(value) {
    setfilter({ ...filter, period: { ...filter.period, month: value, id: 0 } });
    setonMonth();
  }

  console.log(transHook);
  return (
    <UI.Row justifyContent="space-between">
      {!noSearch && (
        <Form.Text
          noLabel
          placeholder="search"
          size="small"
          sx={{ height: "12px" }}
          value={filter?.search}
          onChange={(e) => handleFilter("search", e.target.value)}
        />
      )}

      {asIcon && (
        <UI.IconButton onClick={() => setonFilter(true)}>
          <Icon.Filter />
        </UI.IconButton>
      )}
      {!asIcon && (
        <UI.Row alignItems="center" justifyContent="center" width="100%" spacing={3}>
          <UI.IconButton onClick={() => transHook.prevPeriod()} disabled={filter.period.id > 1}>
            <ArrowBackIosNewIcon />
          </UI.IconButton>
          <UI.Col center>
            <UI.Text variant="h5" bold onClick={() => setonFilter(true)}>
              {filter.period?.id == 0 && monthList[filter.period.month]}
              {/* {filter.period?.id == 1 && filter.period.year} */}
              {filter.period?.id == 2 && "All Time"}
              {filter.period?.id == 3 && `${filter.period.period_start} - ${filter.period.period_end}`}
            </UI.Text>
            <UI.Text variant={filter.period?.id == 1 ? "h5" : "body2"} bold onClick={() => setonFilter(true)}>
              {filter.period.year}
            </UI.Text>
          </UI.Col>
          <UI.IconButton onClick={() => transHook.nextPeriod()} disabled={filter.period.id > 1}>
            <ArrowForwardIosIcon />
          </UI.IconButton>
        </UI.Row>
      )}

      <UI.Modal open={onFilter} bottom onClose={() => setonFilter(false)}>
        <UI.Col sx={{ bgcolor: "white", width: "100%", p: 2 }}>
          <UI.Row justifyContent="space-between" alignItems="center">
            <UI.Text variant="h6" bold color="primary.main">
              Filter
            </UI.Text>
            <UI.IconButton onClick={() => setonFilter(false)}>
              <Icon.Close />
            </UI.IconButton>
          </UI.Row>

          <UI.Col spacing={1}>
            <UI.Col>
              <UI.FormLabel label="Period" />
              <UI.Row justifyContent="space-between" spacing={1}>
                {periods.map((d, ix) => (
                  <UI.Button
                    variant={filter?.period.id == ix ? "contained" : "outlined"}
                    size="small"
                    onClick={(e) => (ix == 0 ? setonMonth(e) : handleFilter("id", ix))}
                    key={d}
                    sx={{
                      width: "25%",
                      flexGrow: 1,
                    }}
                  >
                    {ix == 0 ? monthList[filter.period.month] : d.label}
                  </UI.Button>
                ))}
              </UI.Row>
              {filter?.period?.id == 3 && (
                <UI.Row spacing={2}>
                  <Form.Date
                    placeholder="start date"
                    value={filter?.period_start || null}
                    onChange={(e) => handleFilter("period_start", e.target.value)}
                  />
                  <Form.Date
                    placeholder="end date"
                    value={filter?.period_end || null}
                    onChange={(e) => handleFilter("period_end", e.target.value)}
                  />
                </UI.Row>
              )}
            </UI.Col>

            <Form.Category
              fullWidth
              options={category?.sort((a, b) => (a.group_id < b.group_id ? 1 : -1))}
              label="category"
              value={filter.category_id}
              name="category_id"
              onChange={(e, v) => handleFilter("category_id", v.id)}
            />
            <UI.Col>
              <UI.FormLabel label={"Amount"} />
              <UI.Row spacing={1}>
                <Form.Currency
                  noLabel
                  placeholder="Min"
                  suffix=""
                  prefix=""
                  value={filter?.min}
                  onChange={(e) => handleFilter("min", parseInt(e.target.value))}
                />
                <Form.Currency
                  noLabel
                  placeholder="Max"
                  suffix=""
                  prefix=""
                  value={filter?.max}
                  onChange={(e) => handleFilter("max", parseInt(e.target.value))}
                />
              </UI.Row>
            </UI.Col>
          </UI.Col>
        </UI.Col>

        <Menu anchorEl={onMonth} open={Boolean(onMonth)} onClose={() => setonMonth()}>
          <UI.Row maxWidth={220} flexWrap="wrap">
            {monthList.map((d, ix) => (
              <UI.Button key={ix} variant="text" onClick={() => handleFilterMonth(ix)}>
                {d}
              </UI.Button>
            ))}
          </UI.Row>
          {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        </Menu>
      </UI.Modal>
    </UI.Row>
  );
}
