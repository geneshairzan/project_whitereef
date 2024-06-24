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

import TRender, { HeaderRender } from "@/component/appTransaction/render";
import ExtractMore from "@/component/appTransaction/create/extractMore";
import ExtractEditForm from "./transcationForm";

export default function App({ handleClose, onDetail, category, data, onCommit }) {
  const [buffer, setbuffer] = useState([{ ...onDetail, isSplitParent: true, selected: false }]);
  const [onAdd, setonAdd] = useState(false);
  function handleCommit() {
    onCommit(buffer);
  }
  function handleAdd(input) {
    setbuffer([...buffer, { ...input[0], isSplitChild: true, _tid: onDetail?._tid + "-" + buffer?.length }]);
    setonAdd(false);
  }

  function getDiscrepancy() {
    let parentSum = buffer[0].amount;
    let childSum = buffer.filter((d, ix) => ix > 0).reduce((a, b) => a + b.amount, 0);

    return parentSum - childSum;
  }

  function handleDelete(tix) {
    let temp = buffer;
    temp.splice(tix, 1);
    setbuffer([...temp]);
  }

  return (
    <UI.Modal open={true} onClose={handleClose} bottom>
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
              Split Transcation
            </UI.Text>
            <UI.IconButton onClick={handleClose}>
              <Icon.Close />
            </UI.IconButton>
          </UI.Row>

          {buffer.map((d, ix) => (
            <React.Fragment key={ix}>
              {ix == 0 && <UI.Text variant="body1">Orignal Transction</UI.Text>}
              <UI.Col
                sx={{
                  p: 1,
                  border: "1px solid grey",
                  borderRadius: 2,
                  bgcolor: ix == 0 && "primary.light",
                }}
              >
                <TRender
                  onDelete={ix > 0 ? () => handleDelete(ix) : null}
                  data={{
                    ...d,
                    category: d.category_id ? category.find((dx) => dx.id == d.category_id)?.name : "-",
                  }}
                />
              </UI.Col>
              {ix == 0 && <UI.Text variant="body1">Split Transction</UI.Text>}
            </React.Fragment>
          ))}

          {getDiscrepancy() != 0 && (
            <UI.Col
              sx={{
                p: 1,
                border: "1px solid grey",
                borderRadius: 2,
                height: 48 + 12,
              }}
              onClick={() => setonAdd(true)}
              spacing={0.5}
              center
            >
              <Icon.Plus />
              <UI.Text variant="body1">Add Split Transaction</UI.Text>
            </UI.Col>
          )}

          {onAdd && (
            <ExtractEditForm
              handleClose={() => setonAdd(false)}
              category={category}
              onCommit={handleAdd}
              onDetail={{
                ...buffer[0],
                category: buffer[0].category_id ? category.find((dx) => dx.id == buffer[0].category_id)?.name : "-",
                detail: "",
                isSplitParent: false,
                selected: true,
                amount: getDiscrepancy(),
              }}
              // data={data}
              // handleSave={handleSave}
              // handleChange={handleChange}
            />
          )}
        </UI.Col>

        <UI.Col spacing={1} pb={1}>
          {buffer?.length > 1 && getDiscrepancy() != 0 && (
            <UI.Col>
              <UI.Text variant="body2" color="error.main">
                you cannot save split while has discrepancy
              </UI.Text>
              <UI.Row justifyContent="space-between">
                <UI.Text variant="body1">discrepancy</UI.Text>
                <UI.Text variant="body1">{h.curr.format(getDiscrepancy())}</UI.Text>
              </UI.Row>
            </UI.Col>
          )}
          <UI.Button disabled={getDiscrepancy() != 0} onClick={handleCommit}>
            Save
          </UI.Button>
        </UI.Col>
      </UI.Stack>
    </UI.Modal>
  );
}
