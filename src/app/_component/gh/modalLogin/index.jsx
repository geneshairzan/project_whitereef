import React, { useEffect, useState } from "react";

import UI from "@/app/_component/gh/ui";
import Icon from "@/app/_component/gh/icon";
import Context from "@/app/_component/context/app";
import { Tabs, Tab, Menu, MenuItem, Drawer, IconButton } from "@mui/material";

import Login from "./_login";
import Register from "./_register";
import MenuList from "@/component/app/_menuRenderer";
import h from "@/app/_component/gh/helper";

export default function App({ grey = false, auth, extraMenu, El }) {
  const { app } = React.useContext(Context);
  const [modalOpen, setmodalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = (path) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    !modalOpen && app.set("forcelogin", false);
  }, [auth.user]);

  return (
    <>
      {El && <El onClick={(e) => (auth?.user ? setAnchorEl(e.currentTarget) : setmodalOpen(true))} />}
      {/* <UI.IconButton color="pwhite" onClick={(e) => (auth?.user ? setAnchorEl(e.currentTarget) : setmodalOpen(true))}>
        {auth?.user ? <Icon.Menu /> : <Icon.Person />}
      </UI.IconButton> */}
      <Drawer anchor={"bottom"} open={Boolean(anchorEl)} onClose={handleClose}>
        <UI.Col width="100vw" py={3} justifyContent="space-between" height="100%">
          <UI.Row px={2} justifyContent="space-between">
            <UI.Col>
              <UI.Text variant="h5" bold color="primary.main">
                SMARTI
              </UI.Text>
              <UI.Text variant="caption" color="grey">
                v.{h.date.format_build(process.env.BUILD_TIMESTAMP)}
              </UI.Text>
            </UI.Col>
            <UI.Row justifyContent="space-between" alignItems="flex-start" spacing={1}>
              <UI.Col alignItems="flex-end">
                <UI.Text variant="body1">Hi, {auth?.user?.name}</UI.Text>
                <UI.Text variant="caption" color="grey">
                  {auth?.user?.email}
                </UI.Text>
                <UI.Text variant="body2" color="primary">
                  {auth?.user?.role_name}
                </UI.Text>
              </UI.Col>
              <UI.Col
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "primary.main",
                  borderRadius: "50%",
                  color: "white",
                  fontSize: 24,
                }}
                center
              >
                {auth?.user?.name?.[0]}
              </UI.Col>
            </UI.Row>
          </UI.Row>
          <MenuList onClick={handleClose} />
        </UI.Col>
      </Drawer>
      <UI.Modal open={modalOpen || app.forcelogin ? true : false} onClose={() => !onPasscode && setmodalOpen(false)}>
        <AuthForm />
      </UI.Modal>
    </>
  );
}

export function AuthForm({ sx, ...props }) {
  const [value, setvalue] = useState(0);
  const [onPasscode, setonPasscode] = useState(false);
  useEffect(() => {
    value == 0 && setonPasscode(false);
  }, [value]);

  return (
    <UI.Col center width="100%" p={2} maxWidth={480}>
      <UI.Col
        sx={{
          width: "100%",
          bgcolor: "red",

          pt: 2,
          pb: 5,
          px: 2,
          borderRadius: 2,
          ...sx,
        }}
      >
        <Tabs value={value} onChange={(e, v) => setvalue(v)} variant="fullWidth">
          <Tab label="Sign In" />
          <Tab label="Register" />
        </Tabs>
        {value == 0 && (
          <Login
            // onLogged={() => setmodalOpen(false)}
            onLogged={() => {}}
            onPasscode={setonPasscode}
          />
        )}
        {value == 1 && (
          <Register
            //  onLogged={() => setmodalOpen(false)}
            onLogged={() => {}}
            onPasscode={setonPasscode}
            onSignin={() => setvalue(0)}
          />
        )}
      </UI.Col>
    </UI.Col>
  );
}
