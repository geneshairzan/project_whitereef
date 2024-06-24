import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Bgimg from "@/component/app/smart/roomBg";
import ChairIcon from "@mui/icons-material/Chair";

import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

export default function MainNav({ pages, activepage, setactivepage }) {
  return (
    <UI.Col
      center
      sx={{
        position: "absolute",
        bottom: { xs: "24px", md: 36 },
        width: { xs: "100%", md: "40%" },
        zIndex: 99,
      }}
    >
      <UI.Row
        sx={{
          position: "relative",
          bgcolor: "smartSecondary.main",
          p: 1,
          borderRadius: "64px",
          justifyContent: { xs: "space-between", md: "center" },
          border: { xs: "none", md: "8px solid" },
          borderColor: { xs: "black", md: "smartSecondary.dark" },
        }}
        spacing={2}
      >
        {pages?.map((d, ix) => (
          <RoomNavBtn key={ix} D={d} onClick={() => setactivepage(ix)} label={d.label} active={activepage == ix} />
        ))}
      </UI.Row>
    </UI.Col>
  );
}

function RoomNavBtn({ D, active, onClick }) {
  return (
    <UI.Row
      onClick={onClick}
      sx={{
        spacing: 1,
        py: 2,
        px: active ? 5 : 0,
        width: active ? 120 : 48,
        height: 48,
        borderRadius: "30px",
        bgcolor: active ? "menu.active" : "menu.inactive",
        color: !active ? "menu.active" : "menu.inactive",
        fontWeight: "bold",
      }}
      center
    >
      {active ? D.label : <D.Icon />}
    </UI.Row>
  );
}
