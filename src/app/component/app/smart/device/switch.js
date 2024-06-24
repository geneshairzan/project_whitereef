import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import UseVal from "@/component/app/smart/helper/useVal";
import { grad } from "@/component/app/smart/data";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CircularProgress from "@mui/material/CircularProgress";

export default function App({ D, onClick, onloading, maxTreshold = 10 }) {
  const [interval, setinterval] = useState(-1);
  const intervalRef = React.useRef(null);
  const [onPressed, setonPressed] = useState(false);

  const startCountUp = () => {
    setinterval(0);
    setonPressed(true);
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setinterval((p) => p + 1);
    }, 100);
  };

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setonPressed(false);
    }
  };

  useEffect(() => {
    interval == maxTreshold && setonPressed(false);
  }, [interval]);

  useEffect(() => {
    if (!onPressed && interval >= 0) {
      onClick(interval);
      setonPressed(false);
      setinterval(-1);
    }
  }, [onPressed]);

  return (
    <UI.Col
      onTouchStart={startCountUp}
      onTouchEnd={stopCounter}
      onMouseDown={startCountUp}
      onMouseUp={stopCounter}
      onMouseLeave={stopCounter}
      alignItems="center"
      // onClick={onClick}
      sx={{
        justifyContent: { xs: "space-between", md: "flex-start" },
        overflow: "hidden",
        height: { xs: 72, md: 180 },
        m: 1,
        borderRadius: 3,
        p: 1,
        px: 1.5,
        ...grad,
        "& p": {
          userSelect: "none",
          WebkitUserSelect: "none",
          msUserSelect: "none",
        },
      }}
    >
      {/* <div
      onTouch
      ></div> */}
      <UI.Stack
        direction={{ xs: "row", md: "column" }}
        sx={{
          flexGrow: 1,
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: { xs: "space-between", md: "flex-start" },
          position: "relative",
        }}
        width="100%"
        spacing={2}
        // bgcolor={"red"}
      >
        <UI.Col
          sx={{
            // justifyContent: "space-between",
            justifyContent: "space-between",
            height: "100%",
            order: { xs: 1, md: 2 },
            pt: { xs: 0, md: 1 },
            width: "calc(100% - 36px)",
          }}
        >
          <UI.Text
            color="smart.text"
            sx={{
              typography: { xs: "body1", md: "h5" },
              // order: { xs: 1, md: 2 },
            }}
          >
            {D.name || "Switch"} {D.access_id == 1 && "*"}
          </UI.Text>
          <UI.Text
            variant="body2"
            color="smart.textdark"
            sx={{
              typography: { xs: "body2", md: "body1" },
              // order: { xs: 2, md: 1 },
            }}
          >
            {"Active until 06.00"}
          </UI.Text>
        </UI.Col>
        <UI.Col
          center
          sx={{
            flexShrink: 0,
            width: { xs: 72, md: 110 },
            height: { xs: 72, md: 110 },
            bgcolor: D.state == "on" ? "smart.main" : "unset",
            // bgcolor: "red",
            border: "2px solid",
            borderColor: D.state == "on" ? "smart.main" : "smartSecondary.main",
            borderRadius: "50%",
            pl: "2px",
            pt: "2px",
            order: { xs: 2, md: 1 },
            // position: { xs: "relative", md: "absolute" },
            position: "absolute",
            bottom: { xs: 0, md: -24 },
            right: { xs: -32, md: -24 },
            top: { xs: -8, md: "unset" },
          }}
        >
          {onloading ? (
            <CircularProgress color={D.state != "on" ? "smart" : "smartSecondary"} />
          ) : (
            <WbSunnyIcon
              sx={{
                color: D?.state != "on" ? "smart.main" : "black",
                fontSize: { xs: 32, md: 48 },
              }}
            />
          )}
        </UI.Col>
      </UI.Stack>
    </UI.Col>
  );
}
