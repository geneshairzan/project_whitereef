import React, { useState, useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import UI from "@gh/ui";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
  ({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      // fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  })
);

export default function App(props) {
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => setOpen(false);
  const handleTooltipOpen = () => setOpen(true);
  return (
    <>
      <HtmlTooltip
        leaveDelay={props.leaveDelay || 3000}
        leaveTouchDelay={props.leaveTouchDelay || 1500}
        placement={props.placement || "right"}
        title={
          <React.Fragment>
            <UI.Col
              sx={{
                maxWidth: 200,
              }}
            >
              <UI.Text variant="body2" align="justify">
                {props.tip || props.title}
              </UI.Text>
              <UI.Row justifyContent="flex-end">
                <UI.Button variant="text" size="small" onClick={handleTooltipClose}>
                  close
                </UI.Button>
              </UI.Row>
            </UI.Col>
          </React.Fragment>
        }
        onClose={handleTooltipClose}
        open={open}
        onClick={handleTooltipOpen}
        // slotProps={{
        //   popper: {
        //     modifiers: [
        //       {
        //         name: "offset",
        //         options: {
        //           offset: [0, 0],
        //         },
        //       },
        //     ],
        //   },
        // }}
      >
        <InfoIcon
          sx={{
            bgcolor: "#1D4167",
            color: "#E9F6FB",
            borderRadius: "50%",
            p: 0,
            fontSize: 16,
          }}
        />
      </HtmlTooltip>
    </>
  );
}
