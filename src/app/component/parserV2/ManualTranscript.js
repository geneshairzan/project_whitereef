import React, { useState, useEffec, useRef } from "react";
import { PdfDocument } from "@pomgui/pdf-tables-parser";
import UI from "@gh/ui";
import Form from "@gh/form";
import Icon from "@gh/icon";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Context from "@context/app";
import Papa from "papaparse";
import AddInputAccount from "@/component/appTransaction/create/addInputAccount";

export default function App({ userAccount, data, onChange, bank, onNext }) {
  return (
    <UI.Col spacing={1} flexGrow={1} justifyContent="space-between">
      <UI.Col>
        <UI.Text variant="body1" pb={2}>
          your about to manualy insert your transaction. please select which account where transaction assosiate with
        </UI.Text>
        <AddInputAccount
          userAccount={userAccount}
          value={data?.account}
          onChange={onChange}
          banks={bank.get()}
          onCreate={userAccount.reload}
        />
      </UI.Col>
      <UI.Row justifyContent="flex-end">
        <UI.Button disabled={!data?.account} onClick={onNext}>
          Continue
        </UI.Button>
      </UI.Row>
    </UI.Col>
  );
}
