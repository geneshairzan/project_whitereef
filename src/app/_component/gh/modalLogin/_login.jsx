import React, { useState } from "react";

import UI from "@/app/_component/gh/ui";
import Icon from "@/app/_component/gh/icon";
import h from "@/app/_component/gh/helper";
import Badge from "@mui/material/Badge";
import Context from "@/app/_component/context/app";
import { Tabs, Tab, Menu, MenuItem } from "@mui/material";
import Form from "@/app/_component/gh/form";

import { useFormik } from "formik";
import * as yup from "yup";
import Google from "./_google";
import LoginForget from "./_loginForget";
import { fetcher } from "@/app/_component/gh/helper/useFetch";

export default function App({ onLogged, onPasscode }) {
  const [err, seterr] = useState();
  const { auth, app } = React.useContext(Context);
  const [onForget, setonForget] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      let res = await fetcher({
        url: `auth/signin`,
        method: "post",
        data: values,
      });
      if (res?.data?.id) {
        auth.signin(res.data);
        onLogged(true);
      } else {
        seterr("Authentication Failed");
      }
    },
  });

  if (onForget) return <LoginForget onLogged={onLogged} onPasscode={onPasscode} />;

  return (
    <UI.Col spacing={2} minHeight={400}>
      <UI.Col center pt={3}>
        <Icon.Person
          sx={{
            fontSize: 48,
            color: "primary.main",
          }}
        />
        <UI.Text variant="h4" bold>
          Sign In
        </UI.Text>
      </UI.Col>
      <Form.Text label="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
      <Form.Text
        label="password"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />

      <UI.Row justifyContent="space-between">
        <UI.Text
          variant="body2"
          color="error"
          sx={{
            minHeight: 23,
          }}
        >
          {err}
        </UI.Text>
        <UI.Text
          onClick={() => setonForget(true)}
          variant="body2"
          align="right"
          sx={{
            color: "primary.main",
            "&:hover": {
              color: "primary.dark",
            },
          }}
        >
          forget password ?
        </UI.Text>
      </UI.Row>

      <UI.Button onClick={formik.handleSubmit}>Signin</UI.Button>
      <Google onLogged={onLogged} />
    </UI.Col>
  );
}
