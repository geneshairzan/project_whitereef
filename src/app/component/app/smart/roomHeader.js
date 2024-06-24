import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Icon from "@gh/icon";
import Bgimg from "@/component/app/smart/roomBg";
import ChairIcon from "@mui/icons-material/Chair";

import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useRouter } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { glass } from "@/component/app/smart/data";
import RoomDetail from "./roomDetail";

export default function MainNav({ data, isOwner }) {
  const loc = useRouter();
  return (
    <UI.Row
      sx={{
        position: { xs: "absolute", md: "fixed" },
        height: 48,
        px: { xs: 2, md: "15vw" },
        zIndex: 99,
        width: "100%",
        // bgcolor: "red"
        left: 0,
      }}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <UI.Button
        color="smart"
        startIcon={<Icon.Back />}
        onClick={() => loc.push("/home")}
        spacing={0}
        bgcolor="grey"
        sx={{
          borderRadius: 32,
          textTransform: "none",
          ...glass,
          fontSize: { xs: 16, md: 32 },
          color: "white",
          textTransform: "capitalize",
        }}
      >
        {data?.get()?.name}
      </UI.Button>
      {isOwner && <RoomDetail data={data} />}
    </UI.Row>
  );
}
