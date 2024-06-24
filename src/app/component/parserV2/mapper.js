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
import ExtractEditForm from "@/component/appTransaction/create/transcationForm";
import ExtractSplitForm from "@/component/appTransaction/create/extractSplit";
import { useFormik } from "formik";

export default function ImportRender({
  data,
  parser,
  category,
  onPage,
  account,
  balance,
  onCategoryRefetch,
  onBalanceChange,
  activeStep,
  // localData,
  // setlocalData,
}) {
  const isManual = !data.length;
  const { auth } = React.useContext(Context);
  const [onDetail, setonDetail] = useState();
  const [onMenuOpen, setonMenuOpen] = useState(false);
  const [hasBackdated, sethasBackdated] = useState(false);
  const [hasBackdatednotify, sethasBackdatednotify] = useState(false);
  const [hadDusplicate, sethadDusplicate] = useState(false);
  const [hasnotify, sethasnotify] = useState(false);
  const [localData, setlocalData] = useState([]);

  const handleClose = () => setonDetail();

  async function dataCheck(payload) {
    let res = await fetcher({
      url: "user/transaction/check",
      method: "post",
      data: payload,
    });
    sethadDusplicate(res.data?.isDuplicate);
  }

  function handleDataselect(_tid) {
    let temp = localData;
    let target = temp.find((d) => d._tid == _tid);
    target.selected = !target?.selected;
    setlocalData([...temp]);
  }

  function handleCheckAll(value) {
    let temp = localData.map((d) => ({
      ...d,
      input: {
        ...d.input,
        selected: value,
      },
    }));
    setlocalData([...temp]);
  }

  async function handleSubmit() {
    let payload = localData
      .filter((d) => d.selected)
      .map(({ selected, _tid, ...rest }) => ({ ...rest, date: new Date(rest.date) }));
    let res = await fetcher({
      url: "user/transaction",
      method: "post",
      data: {
        meta: {
          navigator: navigator.userAgent,
          loc: auth?.user.loc,
          account_id: account?.id,
          sum: payload.reduce((a, b) => a + parseInt(b.amount), 0),
          updated_at: hasBackdated
            ? account?.updated_at
            : payload.reduce((a, b) => (a > new Date(b.date) ? a : new Date(b.date)), null),
        },
        discrepancy: getDiscrepancy(),
        data: payload,
        account: {
          ...account,
          last_balance: getEndBalance(),
        },
      },
    });
    res?.data && onPage(2);
  }

  function handleCommit(candidate) {
    let temp = localData;
    let index = temp.findIndex((d) => d._tid == candidate[0]._tid);
    temp.splice(index, 1, ...candidate);
    setlocalData([...temp]);
    setonDetail();
  }

  function handleAdd(candidate) {
    let temp = localData;
    setlocalData([...temp, ...candidate]);
  }

  function getStartBalance() {
    return balance?.start != "?"
      ? balance?.start
      : balance?.end - localData.filter((d) => d.selected).reduce((a, b) => a + b?.amount, 0);
  }

  function calcEndBalance() {
    return balance?.start + localData?.filter((d) => d.selected).reduce((a, b) => a + b?.amount, 0);
  }

  function getEndBalance() {
    if (hasBackdated) return account.last_balance;
    return balance?.end == "?" ? calcEndBalance() : balance?.end;
  }

  function getDiscrepancy() {
    if (balance?.end == "?") return 0;
    let selected = localData.filter((d) => d.selected).reduce((a, b) => a + parseInt(b?.amount), 0);
    // let all = localData.reduce((a, b) => a + b?.amount, 0);
    return balance?.end - selected - getStartBalance();
  }

  useEffect(() => {
    let dataprep = data.map((d, ix) => ({
      ...parser?.getInput(d.data, category, data),
      _tid: ix,
    }));

    if (account?.updated_at) {
      let latestTransactionDate = dataprep.reduce((a, b) => (a > new Date(b.date) ? a : new Date(b.date)), null);
      if (latestTransactionDate < new Date(account.updated_at)) {
        sethasBackdated(true);
      }
    }
    data?.length && setlocalData(dataprep);
    dataCheck(dataprep);
  }, [data]);

  return (
    <UI.Col
      sx={{
        overflow: "auto",
        flexGrow: 1,
      }}
    >
      <UI.Row
        justifyContent="space-between"
        sx={{
          bgcolor: "primary.main",
          py: 0.5,
          pr: 5,
          pl: 1,
        }}
      >
        <UI.Text variant="body1" color="white">
          Start Balance
        </UI.Text>
        <UI.Text variant="body1" color="white">
          {h.curr.format(getStartBalance())}
        </UI.Text>
      </UI.Row>
      <HeaderRender
        sx={{
          pr: 5,
          pl: 1,
        }}
      />
      <UI.Col
        sx={{
          position: "relative",
          maxHeight: "calc(100% - 32px) ",
          overflow: "auto",
          flexGrow: 1,
          borderBottom: "1px solid lightGrey",
          boxShadow: "0 2px 12px -2px rgba(0,0,0,.2)",
        }}
      >
        {localData?.sort(h.trans.sortDateAsc).map((d, ix) => (
          <UI.Row
            key={ix}
            spacing={0.5}
            sx={{
              py: 1,
              borderBottom: "1px solid lightGrey",
              alignItems: "center",
            }}
          >
            {/* <Form.Checkbox disabled={d?.isSplitParent} value={d?.selected} onChange={() => handleDataselect(d._tid)} /> */}
            <UI.Col
              sx={{
                flexGrow: 1,
                width: "200px",
                flexShrink: 0,
              }}
            >
              <TRender
                onChange={() => handleDataselect(d._tid)}
                checked={d?.selected}
                isSplitParent={d?.isSplitParent}
                data={{
                  ...d,
                  date: d.date,
                  detail: d.detail,
                  category: d.category_id ? category?.find((dx) => dx.id == d.category_id)?.name : "-",
                  amount: d.amount,
                }}
              />
            </UI.Col>
            <UI.Col px={1} center>
              <UI.Button
                fullWidth={false}
                sx={{
                  p: 0,
                  height: 18,
                  width: 18,
                  minWidth: "unset",
                }}
                variant="outlined"
                onClick={(e) => setonMenuOpen({ pos: e.currentTarget, target: d })}
              >
                <Icon.More
                  sx={{
                    fontSize: 12,
                  }}
                />
              </UI.Button>
            </UI.Col>
          </UI.Row>
        ))}
        {isManual && (
          <ManualInsert
            category={category}
            onCommit={handleAdd}
            lastIdx={localData?.length}
            onCategoryRefetch={onCategoryRefetch}
          />
        )}
      </UI.Col>

      <UI.Row
        justifyContent="space-between"
        sx={{
          bgcolor: "primary.light",
          py: 0.5,
          pr: 5,
          pl: 1,
        }}
      >
        <UI.Text variant="body1" color="black">
          Discrepancy
        </UI.Text>
        <UI.Text variant="body1" color="black">
          {h.curr.format(getDiscrepancy())}
        </UI.Text>
      </UI.Row>
      <UI.Row
        justifyContent="space-between"
        sx={{
          bgcolor: "primary.main",
          py: 0.5,
          pr: 0,
          pl: 1,
        }}
      >
        <UI.Text variant="body1" color="white">
          End Balance
        </UI.Text>
        <EndBalanceRender
          value={h.curr.format(getEndBalance())}
          onChange={onBalanceChange}
          editAble={balance.end != "?"}
        />
      </UI.Row>
      <UI.Row justifyContent="space-between" pt={2}>
        <UI.Button onClick={() => onPage(0)} variant="outlined">
          Back
        </UI.Button>
        <Recap
          onCommit={handleSubmit}
          data={localData.filter((d) => d.selected)}
          balance={{
            start: getStartBalance(),
            discrepancy: getDiscrepancy(),
            end: getEndBalance(),
          }}
        />
      </UI.Row>
      <ExtractMore onMenuOpen={onMenuOpen} setonMenuOpen={setonMenuOpen} setonDetail={setonDetail} />
      {onDetail?.type == "edit" && (
        <ExtractEditForm
          handleClose={handleClose}
          onDetail={onDetail?.data || null}
          category={category}
          data={data}
          onCommit={handleCommit}
          onCategoryRefetch={onCategoryRefetch}
        />
      )}
      {onDetail?.type == "split" && (
        <ExtractSplitForm
          handleClose={handleClose}
          onDetail={onDetail?.data}
          category={category}
          data={data}
          onCommit={handleCommit}
        />
      )}
      {hasBackdated && !hasBackdatednotify && activeStep == 1 && (
        <BackdateWarning
          onClose={() => {
            sethasBackdatednotify(true);
          }}
        />
      )}
      {hadDusplicate && !hasnotify && activeStep == 1 && (
        <DuplicateWarning
          onClose={() => {
            sethadDusplicate(false);
            sethasnotify(true);
          }}
        />
      )}
    </UI.Col>
  );
}

function EndBalanceRender({ value, onChange, editAble }) {
  const [onEditEndBalance, setonEditEndBalance] = useState(false);
  const [balance, setbalance] = useState(value);

  useEffect(() => {
    setbalance(value);
  }, [value]);

  return (
    <UI.Row
      spacing={1}
      alignItems="center"
      sx={{
        pr: !editAble ? 5 : 0,
      }}
    >
      {!onEditEndBalance && (
        <>
          <UI.Text variant="body1" color="white">
            {value}
          </UI.Text>
          {editAble && (
            <UI.Col center width={32} pb={"2px"} onClick={() => setonEditEndBalance(true)}>
              <Icon.Edit sx={{ color: "white", fontSize: 16 }} />
            </UI.Col>
          )}
        </>
      )}
      {onEditEndBalance && (
        <>
          <Form.Currency
            noLabel
            value={balance}
            name="curr"
            onChange={(e) => setbalance(parseInt(e.target.value))}
            color="pwhite"
            prefix=""
            suffix=""
            size="small"
            sx={{
              bgcolor: "white",
              input: {
                py: 0,
              },
            }}
          />
          <UI.Col
            center
            width={32}
            pb={"2px"}
            onClick={() => {
              onChange(balance);
              setonEditEndBalance(false);
            }}
          >
            <Icon.Send sx={{ color: "white", fontSize: 16 }} />
          </UI.Col>
        </>
      )}
    </UI.Row>
  );
}

function Recap({ onCommit, data, balance }) {
  const [onRecap, setonRecap] = useState(false);
  return (
    <UI.Col>
      <UI.Button onClick={() => setonRecap(true)}>Use This Dataset</UI.Button>
      <UI.Modal open={onRecap} bottom>
        <UI.Col
          sx={{
            width: "100%",
            bgcolor: "white",
            p: 2,
          }}
          spacing={1}
        >
          <UI.Text variant="h6" bold color="primary.main">
            Import Summary
          </UI.Text>
          <UI.Text variant="body1">
            you're about to import {data?.filter((d) => d.selected).length} transaction{" "}
          </UI.Text>
          <SumaryDetail label="Start balance" value={balance.start} />
          <SumaryDetail label="Total Transcation" value={data.reduce((a, b) => a + b?.amount, 0)} />
          <SumaryDetail label="Discrepancy" value={balance.discrepancy} />
          <UI.Divider width="100%" />

          <SumaryDetail label="End balance" value={balance.end} />
          <UI.Text variant="body2">* Discrepancy transaction will put as "untrack transaction" in your record </UI.Text>
          <UI.Row spacing={2}>
            <UI.Button fullWidth onClick={() => setonRecap(false)} variant="outlined">
              return
            </UI.Button>
            <UI.Button
              fullWidth
              onClick={() => {
                onCommit();
                setonRecap(false);
              }}
            >
              Continue
            </UI.Button>
          </UI.Row>
        </UI.Col>
      </UI.Modal>
    </UI.Col>
  );
}

function SumaryDetail({ label, value }) {
  return (
    <UI.Row justifyContent="space-between">
      <UI.FormLabel label={label} />
      <UI.Text variant="body1">{h.curr.format(value)}</UI.Text>
    </UI.Row>
  );
}

function ManualInsert({ category, onCommit, lastIdx, onCategoryRefetch }) {
  const [onForm, setonForm] = useState(false);

  return (
    <UI.Col>
      <UI.Row
        onClick={() => setonForm(true)}
        center
        spacing={0.5}
        sx={{
          height: 64,
          border: "1px solid grey",
          borderRadius: 2,
          mt: 1,
        }}
      >
        <Icon.Plus
          sx={{
            color: "success.main",
          }}
        />
        <UI.Text variant="body1"> New Transaction</UI.Text>
      </UI.Row>
      {onForm && (
        <ExtractEditForm
          tid={lastIdx + 1}
          handleClose={() => setonForm(false)}
          category={category}
          onCommit={(v) => {
            onCommit(v);
            setonForm(false);
          }}
          onCategoryRefetch={onCategoryRefetch}
        />
      )}
    </UI.Col>
  );
}

function DuplicateWarning({ onClose }) {
  return (
    <UI.Modal open={true}>
      <UI.Col
        sx={{ bgcolor: "white", width: "calc(100% - 32px)", p: 2, minHeight: 300, borderRadius: 2 }}
        spacing={2}
        center
      >
        <UI.Text variant="h6" bold color="primary.main">
          Attention
        </UI.Text>
        <UI.Text variant="body1">
          We detect multiple records which the same details (amount, description, date & time) in Smarti. There is a
          possibility of data duplicates, please recheck your detail carefully.
        </UI.Text>
        <UI.Button onClick={onClose}>I Understand</UI.Button>
      </UI.Col>
    </UI.Modal>
  );
}

function BackdateWarning({ onClose }) {
  return (
    <UI.Modal open={true}>
      <UI.Col
        sx={{ bgcolor: "white", width: "calc(100% - 32px)", p: 2, minHeight: 300, borderRadius: 2 }}
        spacing={2}
        center
      >
        <UI.Text variant="h6" bold color="primary.main">
          Attention
        </UI.Text>
        <UI.Text variant="body1" align="center">
          We detect Backdate transaction. we will use your account last balance as end balance value
        </UI.Text>

        <UI.Button onClick={onClose}>I Understand</UI.Button>
      </UI.Col>
    </UI.Modal>
  );
}
