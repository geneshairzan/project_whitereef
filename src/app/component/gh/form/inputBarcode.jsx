import React, { useState } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
// import QrReader from "react-qr-scanner";
import { QrScanner as QrReader } from "@yudiel/react-qr-scanner";
import { Switch } from "@mui/material";

import Label from "./label";

export default function App({ onChange, triggerEl, noLabel = false, size, ...props }) {
  const [onScan, setonScan] = useState(false);
  const [isFront, setisFront] = useState(false);

  function handleScan(res) {
    if (res) {
      onChange(res);
      setonScan(false);
    }
  }
  return (
    <UI.Col>
      {!noLabel && <Label label={props.label} tip={props?.tip} />}
      <UI.Row width="100%">
        {triggerEl || (
          <UI.IconButton onClick={() => setonScan(true)}>
            <Icon.Qrscan
              sx={{
                fontSize: size,
              }}
            />
          </UI.IconButton>
        )}
      </UI.Row>
      <UI.Modal open={onScan} onClose={() => setonScan(false)}>
        {/* <QrReader onError={(err) => console.log(err)} onScan={handleScan} /> */}
        <UI.Col sx={{ width: "100vw", height: "100dvh" }} bgcolor="black">
          <UI.Row justifyContent="flex-end">
            <Switch
              checked={isFront}
              onChange={(e) => setisFront(!isFront)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </UI.Row>
          <QrReader
            containerStyle={{ width: "100vw", height: "100dvh" }}
            constraints={{
              facingMode: !isFront && "environment",
            }}
            onDecode={handleScan}
          />
        </UI.Col>
      </UI.Modal>
    </UI.Col>
  );
}
