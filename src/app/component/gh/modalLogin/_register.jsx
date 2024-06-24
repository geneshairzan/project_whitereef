import React, { useEffect, useState } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import Badge from "@mui/material/Badge";
import Context from "@context/app";
import { Tabs, Tab, Menu, MenuItem } from "@mui/material";
import Form from "@gh/form";

import { useFormik } from "formik";
import * as yup from "yup";

import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AuthCode from "react-auth-code-input";

import { fetcher } from "@gh/helper/useFetch";

export default function Register({ onLogged, onPasscode, onSignin }) {
  const [step, setstep] = useState(1);
  const [refemail, setrefemail] = useState();
  const [passcode, setpasscode] = useState();

  useEffect(() => {
    step == 2 && onPasscode(true);
  }, [step]);

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
          Register
        </UI.Text>
      </UI.Col>
      {step == 1 && <RegisterForm onDone={setstep} onSignin={onSignin} refemail={setrefemail} />}
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

function RegisterForm({ onDone, onSignin, refemail }) {
  const { app } = React.useContext(Context);
  const [err, seterr] = useState();
  const [onloading, setonloading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      setonloading(true);
      let res = await fetcher({
        url: `auth/signup`,
        method: "post",
        data: values,
      });
      setonloading(false);

      if (res?.data?.next == "passcode") {
        onDone(2);
        refemail(formik.values.email);
      } else {
        seterr("this email already registered");
      }
    },
  });
  return (
    <>
      <Form.Text label="full name" name="name" value={formik.values.name} onChange={formik.handleChange} />
      <Form.Text label="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
      <UI.Button onClick={formik.handleSubmit}>{onloading ? <Icon.Loader color="pwhite" /> : "Register"}</UI.Button>
      {err && (
        <UI.Col center>
          <UI.Text variant="body2" color="error">
            {err}
          </UI.Text>
          <UI.Button fullWidth variant="text" onClick={onSignin}>
            Continue to Signin
          </UI.Button>
        </UI.Col>
      )}
    </>
  );
}

export function PasscodeForm({ onDone, refemail }) {
  const AuthInputRef = React.createRef();
  const { app } = React.useContext(Context);
  const [hasResend, sethasResend] = useState(false);
  const [passcode, setpasscode] = useState();
  const [err, seterr] = useState();

  function resendVerification() {
    //code
    seterr(false);
    sethasResend(true);
    reCode();
  }

  async function reCode() {
    let res = await fetcher({
      url: `auth/recode`,
      method: "post",
      data: {
        email: refemail,
      },
    });
  }

  async function doVerification() {
    let res = await fetcher({
      url: `auth/verification`,
      method: "post",
      data: {
        email: refemail,
        passcode: passcode,
      },
    });

    if (res?.data?.id) {
      onDone({ step: 3, passcode: passcode });
    } else {
      seterr("wrong passcode");
      AuthInputRef.current?.clear();
    }
  }

  useEffect(() => {
    if (passcode?.length == 4) {
      doVerification();
    }
  }, [passcode]);

  return (
    <UI.Col center spacing={2}>
      <UI.Text variant="body1" align="center">
        Please enter 4 digit code
        <br />
        that we've sent to your email
      </UI.Text>
      <Form.Passcode length={4} onChange={setpasscode} ref={AuthInputRef} />
      <UI.Text
        variant="body2"
        color="error"
        sx={{
          minHeight: 24,
        }}
      >
        {err}
      </UI.Text>
      <UI.Row spacing={1} center my={1}>
        {!hasResend ? (
          <>
            <UI.Button startIcon={<Icon.Refresh />} variant="outlined" onClick={resendVerification}>
              Resend Verification Code
            </UI.Button>
          </>
        ) : (
          <UI.Text variant="body2" align="center" color="primary">
            Verification Code Sent
          </UI.Text>
        )}
      </UI.Row>
    </UI.Col>
  );
}

export function NewPassword({ onLogged, passcode, refemail }) {
  const { app, auth } = React.useContext(Context);
  const [onloading, setonloading] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      rpwd: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      setonloading(true);

      let res = await fetcher({
        url: `auth/verification`,
        method: "post",
        data: {
          email: refemail,

          passcode: passcode,
          ...values,
        },
      });
      setonloading(false);

      if (res?.data?.id) {
        auth.signin(res.data);
        onLogged(true);
      } else {
        seterr("something wrong");
      }
    },
  });

  return (
    <UI.Col width="100%">
      <UI.Col center spacing={2}>
        <UI.Text variant="body1" align="center">
          Enter new password
        </UI.Text>
        <Form.Text
          type="password"
          label="password"
          fullWidth
          value={formik.values.password}
          name="password"
          onChange={formik.handleChange}
        />
        <Form.Text
          type="password"
          label="re-enter password"
          fullWidth
          value={formik.values.rpwd}
          name="rpwd"
          onChange={formik.handleChange}
        />
        <UI.Button fullWidth onClick={formik.handleSubmit} disabled={formik.values.password != formik.values.rpwd}>
          {onloading ? <Icon.Loader color="pwhite" /> : "Submit"}
        </UI.Button>
      </UI.Col>
    </UI.Col>
  );
}
