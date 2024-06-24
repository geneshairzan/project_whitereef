import React, { useState } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";

import Context from "@context/app";

import ModalLogin from "@gh/modalLogin";
import Link from "next/link";

import { AppBar } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import BarChartIcon from "@mui/icons-material/BarChart";
import AppsIcon from "@mui/icons-material/Apps";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const iconStyle = { fontSize: 24, color: "white" };

export default function MenuBar({ grey = false, AppBarHeight }) {
  const { auth } = React.useContext(Context);

  return (
    <UI.Row
      sx={{
        position: "fixed",
        bottom: 0,
        width: "calc(100vw - 16px)",
        bgcolor: "primary.main",
        justifyContent: "space-between",
        p: 1,
        height: AppBarHeight || "64px",
        flexShrink: 0,
        // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, .1)",
        m: 1,
        borderRadius: 32,
      }}
    >
      <UI.Row
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        sx={{
          position: "relative",
        }}
      >
        <MenuBarIcon label="Home" icon={<AccountBalanceIcon sx={iconStyle} />} to="/dashboard" />
        <MenuBarIcon label="Goals" icon={<PendingActionsIcon sx={iconStyle} />} to="/plan" />
        <UI.Col position="relative" center width="20%" flexShrink={0} component={Link} href="/transaction/create">
          <UI.Col
            sx={{
              position: "relative",
              // top: -24,
              bgcolor: "#fafafa",
              borderRadius: "50%",
            }}
          >
            <Icon.Plus
              sx={{
                fontSize: 72,
                color: "success.main",
              }}
            />
          </UI.Col>
        </UI.Col>
        <MenuBarIcon label="Records" icon={<FormatListBulletedIcon sx={iconStyle} />} to="/transaction" />

        {/* <MenuBarIcon label="More" icon={<AppsIcon sx={iconStyle} />} /> */}
      </UI.Row>
      <ModalLogin
        auth={auth}
        // setmodalOpen={() => {}}
        El={(param) => <MenuBarIcon label="More" icon={<AppsIcon sx={iconStyle} {...param} />} />}
      />
    </UI.Row>
  );
}

function MenuBarIcon({ label, icon, to = "#", ...props }) {
  return (
    <UI.Col
      {...props}
      center
      width="20%"
      component={Link}
      href={to}
      pt={"4px"}
      sx={{
        flexGrow: 0,
        flexShrink: 0,
      }}
    >
      {icon}
      <UI.Text variant="caption" color="white" mt="2px">
        {label}
      </UI.Text>
    </UI.Col>
  );
}
