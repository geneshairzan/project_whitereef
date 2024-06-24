import React, { useEffect, useState, useEffec, useRef } from "react";

import { PdfDocument } from "@pomgui/pdf-tables-parser";
import UI from "@gh/ui";
import Form from "@gh/form";
import Icon from "@gh/icon";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Context from "@context/app";
import { Pagination } from "@mui/material";
import h from "@gh/helper";
import { debounce } from "lodash";
import _ from "lodash";
import AdjustIcon from "@mui/icons-material/Adjust";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import TRender, { HeaderRender } from "@/component/appTransaction/render";
import CategoryForm from "@/pages/category/_form";

export default function QuickAllocation({ onClose, onCategoryRefetch, hasCallback }) {
  return (
    <UI.Modal open={true} bottom onClose={onClose}>
      <UI.Col sx={{ bgcolor: "white", height: "50dvh", width: "100%", p: 2 }}>
        <UI.Row justifyContent="space-between" alignItems="center">
          <UI.Text variant="h6" bold>
            New Category
          </UI.Text>
          <UI.IconButton onClick={onClose}>
            <Icon.Close />
          </UI.IconButton>
        </UI.Row>
        <CategoryForm onCategoryRefetch={onCategoryRefetch} hideTitle hasCallback />
      </UI.Col>
    </UI.Modal>
  );
}
