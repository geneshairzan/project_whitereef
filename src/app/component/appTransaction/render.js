import React, { useEffect, useState, useEffec, useRef } from "react";

import { PdfDocument } from "@pomgui/pdf-tables-parser";
import UI from "@gh/ui";
import Form from "@gh/form";
import Icon from "@gh/icon";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Context from "@context/app";
import { Pagination, Checkbox } from "@mui/material";
import h from "@gh/helper";
import { debounce, parseInt } from "lodash";
import _ from "lodash";
import AdjustIcon from "@mui/icons-material/Adjust";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export function HeaderRender(props) {
  return (
    <UI.Row
      justifyContent="space-between"
      sx={{
        pl: props.pl,
        ...props.sx,
        borderBottom: "1px solid grey",
        borderTop: "1px solid grey",
        alignItems: "center",
        py: 0.5,
        boxShadow: "0 2px 12px -2px rgba(0,0,0,.2)",
        width: "100%",
        left: "-16px",
        alignSelf: "center",
      }}
    >
      <UI.Text variant="subtitle1" bold color="primary.main">
        Detail
      </UI.Text>
      <UI.Text variant="body1" bold color="primary.main">
        Amount
      </UI.Text>
    </UI.Row>
  );
}

export default function DataRender({ data, isSplitParent, checked, onChange, onDelete }) {
  return (
    <UI.Col flexGrow={1} width="100%" pl={1}>
      <UI.Row spacing={0} alignItems="flex-end">
        {onChange && (
          <Checkbox
            onChange={onChange}
            disabled={isSplitParent}
            checked={Boolean(checked)}
            sx={{
              p: 0,
              pr: 0.5,
            }}
          />
        )}
        <UI.Text variant="body2" width={64} bold color="primary.main" flexShrink={0}>
          {h.date.formatImport(data.date)}
        </UI.Text>
        <UI.Col flexGrow={1}>
          <UI.Elipsis variant="body2">{data.detail}</UI.Elipsis>
        </UI.Col>
        {onDelete && (
          <Icon.Close
            onClick={onDelete}
            sx={{
              fontSize: 18,
              color: "error.main",
            }}
          />
        )}
      </UI.Row>
      <UI.Row justifyContent="space-between" alignItems="flex-end">
        <UI.Text
          variant="body1"
          sx={{
            border: "1px solid grey",
            px: 1,
            borderRadius: 1,
            bgcolor: isSplitParent && "secondary.light",
          }}
        >
          {isSplitParent ? "Splited" : data.category}
        </UI.Text>
        <UI.Text variant="subtitle1">{h.curr.format(parseFloat(data.amount), 2)}</UI.Text>
      </UI.Row>
    </UI.Col>
  );
}
