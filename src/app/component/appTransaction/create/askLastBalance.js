import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import Form from "@gh/form";
import Parser from "@/component/parserV2";
import { meta } from "@/component/parserV2/_meta";
import useFetch, { fetcher } from "@gh/helper/useFetch";

import Collapse from "@mui/material/Collapse";

import { useFormik } from "formik";

export default function NewAccount({ onChange }) {
  const formik = useFormik({
    initialValues: { last_balance: null },
    validationSchema: null,
    onSubmit: async (payload, action) => {
      onChange(parseInt(payload.last_balance));
    },
  });

  return (
    <UI.Modal open={true} bottom>
      <UI.Col sx={{ bgcolor: "white", width: "100%", p: 2 }} spacing={1}>
        <UI.Col spacing={0.5}>
          <UI.Text variant="h6" bold color="primary.main">
            Important
          </UI.Text>
          <UI.Text variant="body1">we cannot detect your last balance of this account.</UI.Text>
          <UI.Text variant="body1">Please enter your last balance to continue the import process</UI.Text>
        </UI.Col>
        <Form.Currency
          prefix=""
          suffix=""
          label="Last Balance"
          value={formik.values?.last_balance}
          onChange={(e) => formik.setFieldValue("last_balance", parseInt(e.target.value))}
        />
        <UI.Button disabled={formik.values?.last_balance < 1} onClick={formik.handleSubmit}>
          Submit
        </UI.Button>
      </UI.Col>
    </UI.Modal>
  );
}
