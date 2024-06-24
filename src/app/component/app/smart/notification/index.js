import React, { useEffect, useState } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import { Checkbox } from "@mui/material";

import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import h from "@gh/helper";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function App({ log }) {
  const [open, setopen] = useState(false);
  const [markread, setmarkread] = useState(true);

  async function handleClose(params) {
    if (markread) {
      await fetcher({ url: "log", method: "post", data: { action: "markread" } });
      log.reload();
    }
    setopen(false);
  }

  useEffect(() => {
    open && log.reload();
  }, [open]);

  return (
    <>
      <UI.IconButton onClick={() => setopen(true)} sx={{ zIndex: 99 }}>
        <Badge badgeContent={log?.get()?.filter((d) => !d.is_read)?.length} color="error">
          <NotificationsIcon color="smart" />
        </Badge>
      </UI.IconButton>
      {open && (
        <UI.Modal open={open} onClose={handleClose}>
          <UI.Col alignItems="flex-end" width="100%" height="100%">
            <UI.Col
              sx={{
                width: { xs: "90vw", md: "40vw" },
                height: "100%",
                bgcolor: "smartSecondary.dark",
                p: 3,
                justifyContent: "space-between",
              }}
            >
              <UI.Text variant="h6" color="white" pb={2}>
                Notification Center
              </UI.Text>
              <UI.Col
                sx={{
                  flexGrow: 1,
                }}
                spacing={2}
              >
                {log?.get()?.map((d, ix) => (
                  <LogCard d={d} key={ix} />
                ))}
              </UI.Col>
              <UI.Row justifyContent="space-between">
                <UI.Row alignItems="center">
                  <Checkbox checked={markread} onClick={() => setmarkread(!markread)} />
                  <UI.Text variant="body1">mark as read ?</UI.Text>
                </UI.Row>
                <UI.IconButton
                  onClick={handleClose}
                  sx={{
                    bgcolor: "white",
                  }}
                >
                  <ArrowForwardIcon
                    sx={{
                      color: "smart.main",
                    }}
                  />
                </UI.IconButton>
              </UI.Row>
            </UI.Col>
          </UI.Col>
        </UI.Modal>
      )}
    </>
  );
}

function LogCard({ d }) {
  return (
    <UI.Col>
      <UI.Row spacing={1} alignItems="center">
        <UI.Col
          sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: d.is_read ? "smartSecondary.dark" : "error.main" }}
        />

        <UI.Text variant="body1" color="smart.main">
          {d?.title}
        </UI.Text>
      </UI.Row>
      <UI.Col pl="16px">
        <UI.Text variant="caption" color="smart.main">
          {h.date.format(d?.date)}
        </UI.Text>
        <UI.Text variant="body1" color="smart.text">
          {d?.body}
        </UI.Text>
      </UI.Col>
    </UI.Col>
  );
}
