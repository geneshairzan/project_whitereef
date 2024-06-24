import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import Notification from "@/component/app/smart/notification";
import Bgimg from "@/component/app/smart/roomBg";
import ChairIcon from "@mui/icons-material/Chair";

import HomeIcon from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";

import { Avatar, Modal } from "@mui/material";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Context from "@context/app";

export default function App(props) {
  const { auth } = React.useContext(Context);
  const [isOpen, setisOpen] = useState(false);
  return (
    <UI.Stack>
      <UI.IconButton
        onClick={() => setisOpen(true)}
        sx={{
          zIndex: 2,
        }}
      >
        <Avatar sx={{ bgcolor: "smart.main" }}>{auth?.user?.name[0].toUpperCase()}</Avatar>
      </UI.IconButton>
      <UI.Modal open={isOpen}>
        <UI.Col center sx={{ width: "100vw", maxWidth: "600px", p: 2 }}>
          <UI.Col
            minHeight={200}
            sx={{ bgcolor: "smart.dark", p: 2, width: "100%", borderRadius: 3 }}
            justifyContent="space-between"
          >
            <UI.Row justifyContent="space-between" alignItems="center">
              <UI.Text id="modal-modal-title" variant="h6" component="h2">
                {`Hi, ${auth?.user?.name}`}
              </UI.Text>
              <UI.Button variant="text" onClick={auth.signout}>
                Signout
              </UI.Button>
            </UI.Row>
            <UI.Row justifyContent="flex-end">
              <UI.Button onClick={() => setisOpen(false)}>Return</UI.Button>
            </UI.Row>
          </UI.Col>
        </UI.Col>
      </UI.Modal>
    </UI.Stack>
  );
}
