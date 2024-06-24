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
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import UsePwm from "@/component/app/smart/helper/usePwm";

const config = {
  width: 36,
  widthModifier: 0.6,
};

const PrettoSlider = styled(Slider)({
  zIndex: 2,
  position: "relative",
  // color: "#d6974d",
  width: config.width * config.widthModifier,
  // height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: config.width,
    width: config.width,
    // backgroundColor: "#fff",
    // border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&::before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

export default function MasterSlide({ onRoomChange, data }) {
  function getValue() {
    if (!data.state) return 0;
    if (data.state_value == 0) return "-";
    return data.state_value == 100 ? "M" : data.state_value;
  }

  return (
    <UI.Col
      center
      sx={{
        width: 36,
        position: "absolute",
        right: { xs: 16, md: "5vw" },
        top: { xs: "20%", md: "calc(30vh)" },
      }}
      spacing={2}
    >
      <UI.Col
        onClick={(e) => onRoomChange({ state: !data.state, state_value: data.state_value, action: "toggle" })}
        center
        sx={{
          bgcolor: data.state ? "smart.main" : "smartSecondary.main",
          borderRadius: "50%",
          width: config.width,
          height: config.width,
          flexShrink: 0,
        }}
      >
        <Icon.Light sx={{ color: data.state ? "smart.dark" : "smart.main" }} />
      </UI.Col>

      <UI.Col
        alignItems="center"
        sx={{
          height: 120,
          pb: "32px",
          pt: 1,
          overflow: "visible",
        }}
      >
        <PrettoSlider
          disabled={!data.state}
          color={"smartSecondary"}
          slots={{ thumb: CustomSliderThumb }}
          value={data.state ? data.state_value : 0}
          // onChange={(e) => room.set({ ...room.v, value: e.target.value })}
          onChange={(e) => onRoomChange({ state: data.state, state_value: e.target.value, action: "pwm" })}
          orientation="vertical"
          // color={on ? "smartSecondary" : "primary"}
          // valueLabelDisplay="auto"
          // aria-label="pretto slider"
        />
        <UI.Col
          // onClick={room.toggle}
          alignItems="center"
          justifyContent="flex-end"
          sx={{
            bgcolor: data?.state ? "smartSecondary.main" : "grey",
            borderRadius: "0 0 32px 32px",
            width: config.width * config.widthModifier,
            height: 58,
            flexShrink: 0,
            position: "absolute",
            bottom: "-16px",
            zIndex: 1,
          }}
        >
          <UI.Text variant="caption" color="white" pb={0.5} bold>
            {getValue()}
          </UI.Text>
        </UI.Col>
      </UI.Col>
    </UI.Col>
  );
}

function CustomSliderThumb(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <UI.Col
        center
        sx={{
          borderRadius: "50%",
          width: "100%",
          height: "100%",
          bgcolor: !props.ownerState.disabled ? "smart.main" : "grey",
        }}
      >
        {props.ownerState.disabled ? (
          "-"
        ) : (
          <ArrowDropUpIcon
            sx={{
              fontSize: 48,
              color: "smartSecondary.main",
            }}
          />
        )}
      </UI.Col>
    </SliderThumb>
  );
}
