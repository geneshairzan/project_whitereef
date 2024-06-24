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
import { Menu, Fade } from "@mui/material";

export default function Filter({ filter, setfilter, category, noSearch = false }) {
  const periods = [
    { id: 0, label: "This Month" },
    { id: 1, label: "Annual" },
    { id: 2, label: "All Time" },
    { id: 3, label: "Custom" },
  ];
  const [onFilter, setonFilter] = useState(false);
  function handleFilter(target, value) {
    setfilter({ ...filter, [target]: value });
  }

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
      <UI.IconButton onClick={() => setonFilter(true)}>
        <Icon.Filter />
      </UI.IconButton>

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
                    variant={filter?.period?.id == ix ? "contained" : "outlined"}
                    size="small"
                    onClick={() => handleFilter("period", d)}
                    key={d}
                    sx={{
                      flexGrow: 1,
                    }}
                  >
                    {d.label}
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
      </UI.Modal>
    </UI.Row>
  );
}
