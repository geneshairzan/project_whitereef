import React, { useState, useEffect } from "react";

import UI from "@gh/ui";
import Form from "@gh/form";
import Parser from "@/component/parserV2";
import { meta } from "@/component/parserV2/_meta";
import useFetch, { fetcher } from "@gh/helper/useFetch";

import Collapse from "@mui/material/Collapse";

import { Accordion, AccordionDetails, AccordionSummary, Stepper, Step, StepLabel } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useRouter } from "next/router";

export default function InputMethod({ onChange, active }) {
  const addMethod = ["Smart Import", "Manual", "Bank Direct"];

  return (
    <>
      <UI.FormLabel label="  Source File" />
      <UI.Row spacing={2} pb={2}>
        {addMethod.map((d, ix) => (
          <UI.Col
            key={ix}
            onClick={() => onChange(ix)}
            center
            sx={{
              flexGrow: 1,
              height: 48,
              width: `${100 / addMethod.length}%`,
              border: "1px solid black",
              borderRadius: 2,
              borderWidth: active == ix ? 2 : 1,
              borderColor: active == ix ? "primary.dark" : "black",
              bgcolor: active == ix ? "primary.light" : "none",
            }}
          >
            <UI.Text variant="body2" align="center" bold={active == ix}>
              {d}
            </UI.Text>
          </UI.Col>
        ))}
      </UI.Row>
    </>
  );
}
