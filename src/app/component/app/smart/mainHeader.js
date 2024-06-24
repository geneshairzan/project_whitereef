import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Notification from "@/component/app/smart/notification";
import Profile from "@/component/app/smart/profile";

export default function MainNav({ pages, activepage, setactivepage, log }) {
  return (
    <UI.Row
      sx={{ position: "absolute", left: 0, height: 48 }}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      // bgcolor="red"
    >
      <Profile />
      <UI.Text variant="h4" bold sx={{ color: "white" }}>
        Smart's Home
      </UI.Text>
      <Notification log={log} />
    </UI.Row>
  );
}
