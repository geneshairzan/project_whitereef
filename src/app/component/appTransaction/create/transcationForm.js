import React, { useEffect, useState, useEffec, useRef } from "react";

import { PdfDocument } from "@pomgui/pdf-tables-parser";
import UI from "@gh/ui";
import Form from "@gh/form";
import Icon from "@gh/icon";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Context from "@context/app";
import { Pagination, Menu, MenuItem } from "@mui/material";
import h from "@gh/helper";
import { debounce } from "lodash";
import _ from "lodash";
import AdjustIcon from "@mui/icons-material/Adjust";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import QuickAllocation from "@/component/appTransaction/create/quickCategory";

import TRender, { HeaderRender } from "@/component/appTransaction/render";
import ExtractMore from "@/component/appTransaction/create/extractMore";

export default function App({
  handleClose,
  onDetail,
  category,
  data,
  onCommit,
  disabledEditAmount = false,
  tid,
  onCategoryRefetch,
}) {
  const defaultValue = {
    _tid: tid,
    date: new Date(),
    detail: "",
    amount: 0,
    // category_id: 1,
    selected: 1,
  };

  const [buffer, setbuffer] = useState(onDetail || defaultValue);
  const [onNewAllocation, setonNewAllocation] = useState(false);

  function handleChange(e) {
    let temp = buffer;
    temp[e.target] = e.value;
    setbuffer({ ...temp });
  }

  function isValid() {
    return buffer?.category_id && buffer?.detail;
  }

  useEffect(() => {
    let selected_category = category.find((d) => d.id == buffer?.category_id);

    if (selected_category?.group_id == 1) {
      setbuffer({ ...buffer, amount: -buffer.amount });
    } else {
      setbuffer({ ...buffer, amount: Math.abs(buffer.amount) });
    }
  }, [buffer?.amount, buffer.category_id]);

  return (
    <UI.Modal open={true} bottom>
      <UI.Stack
        sx={{
          bgcolor: "white",
          justifySelf: "end",
          // height: "40dvh",
          width: "100%",
          borderRadius: "8px 8px 0 0",
          p: 2,
        }}
        spacing={3}
      >
        <UI.Col spacing={1}>
          <UI.Row justifyContent="space-between" alignItems="center">
            <UI.Text variant="h6" bold>
              {onDetail ? "Edit" : "Add"} Transcation
            </UI.Text>
            <UI.IconButton onClick={handleClose}>
              <Icon.Close />
            </UI.IconButton>
          </UI.Row>
          <Form.Date
            label="transaction date"
            value={h.date.format(buffer?.date)}
            prefix=""
            suffix=""
            name="curr"
            onChange={(v) => handleChange({ target: "date", value: v.target.value })}
            sx={{
              "& input": {
                color: data?.amount < 0 && "fireBrick",
              },
            }}
          />
          <Form.Text
            label="Description"
            value={buffer?.detail}
            prefix="IDR"
            suffix=""
            name="curr"
            onChange={(v) => handleChange({ target: "detail", value: v.target.value })}
            sx={{
              "& input": {
                color: data?.amount < 0 && "fireBrick",
              },
            }}
          />

          <UI.Col alignItems="flex-end">
            <Form.Category
              fullWidth
              options={category?.sort((a, b) => (a.group_id < b.group_id ? 1 : -1))}
              label="category"
              value={buffer?.category_id}
              name="category_id"
              onChange={(e, v) => {
                handleChange({ target: "category_id", value: v.id });
              }}
            />
            <UI.Button variant="text" size="small" onClick={() => setonNewAllocation(true)}>
              new category
            </UI.Button>
          </UI.Col>

          <Form.Currency
            label="Amount"
            disabled={disabledEditAmount}
            rightAlign
            value={buffer?.amount || null}
            prefix="IDR"
            suffix=""
            name="curr"
            onChange={(v) => handleChange({ target: "amount", value: Math.abs(parseInt(v.target.value)) })}
            sx={{
              "& input": {
                color: buffer?.amount < 0 && "fireBrick",
              },
            }}
          />

          {onNewAllocation && (
            <QuickAllocation
              hasCallback
              onClose={() => setonNewAllocation(false)}
              onCategoryRefetch={() => {
                setonNewAllocation(false);
                onCategoryRefetch();
              }}
            />
          )}
        </UI.Col>
        <UI.Button
          disabled={!isValid()}
          onClick={() => {
            onCommit([buffer]);
            setbuffer(defaultValue);
          }}
        >
          Save
        </UI.Button>
      </UI.Stack>
    </UI.Modal>
  );
}
