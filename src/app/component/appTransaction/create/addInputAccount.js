import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import Form from "@gh/form";
import Parser from "@/component/parserV2";
import { meta } from "@/component/parserV2/_meta";
import useFetch, { fetcher } from "@gh/helper/useFetch";

import { useFormik } from "formik";

export default function App({ userAccount, value, onChange, banks, onCreate, createAble = true }) {
  function getOptions() {
    if (value?.id == -1) {
      return [...userAccount.get(), value];
    }
    return userAccount.get();
  }
  return (
    <UI.Row alignItems="center" justifyContent="space-between">
      <UI.Row>
        <UI.Text variant="body1" width={90}>
          Account
        </UI.Text>
        <UI.Tip tip="lorem" leaveTouchDelay={-1} title=" Lorem ipsum dolor sit amet consectetur, adipisicing elit." />
      </UI.Row>

      <UI.Col spacing={0.5}>
        <Form.SelectObj options={getOptions()} value={value} onChange={onChange} />
        {createAble && <NewAccount banks={banks} onCreate={onCreate} />}
      </UI.Col>
    </UI.Row>
  );
}

function NewAccount({ banks, onCreate }) {
  const [onModal, setonModal] = useState(false);
  const formik = useFormik({
    initialValues: { name: "", digit: "", bank_id: "", last_balance: 0 },
    validationSchema: null,
    onSubmit: async (payload, action) => {
      let res = await fetcher({
        url: "user/account",
        method: "post",
        data: {
          slug: payload.slug,
          bank_id: payload.bank.id,
          last_balance: parseInt(payload.last_balance),
          name: payload.name,
          account_no: payload.digit,
        },
      });
      action.resetForm();
      setonModal(false);
      onCreate();
    },
  });

  useEffect(() => {
    formik.setFieldValue("slug", formik.values?.bank?.name + "-" + formik.values?.digit);
  }, [formik.values]);

  return (
    <UI.Row alignItems="center" spacing={0.5} justifyContent="flex-end">
      <UI.Text variant="body2" onClick={() => setonModal(true)}>
        + New Account
      </UI.Text>
      {onModal && (
        <UI.Modal open={true} bottom>
          <UI.Col sx={{ bgcolor: "white", width: "100%", p: 2 }} spacing={1}>
            <UI.Row justifyContent="space-between">
              <UI.Text variant="h6" bold color="primary.main">
                New Account
              </UI.Text>
              <UI.IconButton onClick={() => setonModal(false)}>
                <Icon.Close />
              </UI.IconButton>
            </UI.Row>
            <Form.Text
              label="Account Name"
              value={formik.values?.name}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
            />
            <Form.Text
              label="Account number"
              value={formik.values?.digit}
              onChange={(e) => formik.setFieldValue("digit", e.target.value)}
            />
            <Form.SelectObj
              value={formik.values?.bank}
              label="bank"
              placeholder="bank"
              options={banks.filter((d) => d.id != 1)}
              onChange={(e) => formik.setFieldValue("bank", e.target.value)}
            />
            <Form.Currency
              suffix=""
              label="Initial Balance"
              value={formik.values?.last_balance}
              onChange={(e) => formik.setFieldValue("last_balance", e.target.value)}
            />
            <UI.Button onClick={formik.handleSubmit}>Submit</UI.Button>
            {/* {formik.values?.slug} */}
          </UI.Col>
        </UI.Modal>
      )}
    </UI.Row>
  );
}
