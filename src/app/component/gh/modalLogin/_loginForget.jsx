import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import Badge from "@mui/material/Badge";
import Context from "@context/app";
import { Tabs, Tab, Menu, MenuItem } from "@mui/material";
import Form from "@gh/form";

import { useFormik } from "formik";
import * as yup from "yup";

import { PasscodeForm, NewPassword } from "./_register";
import LockResetIcon from "@mui/icons-material/LockReset";
import { fetcher } from "@gh/helper/useFetch";

export default function App({ onLogged, onPasscode }) {
  const [refemail, setrefemail] = useState();
  const [step, setstep] = useState(1);
  const [passcode, setpasscode] = useState();

  useEffect(() => {
    step == 2 && onPasscode(true);
  }, [step]);

  function addStep() {
    setstep((p) => p + 1);
  }

  return (
    <UI.Col center spacing={1} pt={3}>
      <LockResetIcon
        sx={{
          fontSize: 48,
          color: "primary.main",
        }}
      />
      <UI.Text variant="h4" center bold align="center">
        Forget password
      </UI.Text>
      {step == 1 && <Mainform onComplete={addStep} refemail={setrefemail} />}
      {step == 2 && (
        <PasscodeForm
          refemail={refemail}
          onDone={(v) => {
            setstep(v?.step);
            setpasscode(v?.passcode);
          }}
        />
      )}
      {step == 3 && <NewPassword onLogged={onLogged} passcode={passcode} refemail={refemail} />}
    </UI.Col>
  );
}

function Mainform(props) {
  const { auth, app } = React.useContext(Context);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      let res = await fetcher({
        url: `auth/forget`,
        method: "post",
        data: values,
      });
      props.onComplete();
      props.refemail(formik.values.email);
    },
  });

  return (
    <UI.Stack center spacing={2}>
      <UI.Text variant="body2" align="center">
        please enter your email to recover your newpassword
      </UI.Text>
      <Form.Text name="email" value={formik.values.email} onChange={formik.handleChange} />
      <UI.Button onClick={formik.handleSubmit}>Recover</UI.Button>
    </UI.Stack>
  );
}
