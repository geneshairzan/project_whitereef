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

export default function NoParser({ data, onComplete }) {
  const [isUploaded, setisUploaded] = useState(false);
  async function upload(params) {
    let res = await fetcher({
      url: "user/reportparser",
      method: "post",
      multipart: true,
      data: {
        file: data?.file,
        notes: "need to parse",
      },
    });
    setisUploaded(true);
  }

  function isCsv(datatype) {
    return ["csv", "xls", "xlsx"].includes(datatype);
  }
  return (
    <UI.Col pt={3} alignItems="center" spacing={1} flexGrow={1}>
      <UI.Text variant="h6" bold color="primary.main">
        Sorry for inconveniance
      </UI.Text>
      {!isCsv(data.type) && (
        <UI.Col spacing={1}>
          <UI.Text variant="body1">
            Hi, it seems Smarti can't read your Bank Statement yet. We will review & analyze the file and get back to
            you.
          </UI.Text>

          <UI.Button fullWidth variant="outlined" onClick={upload}>
            Upload your document
          </UI.Button>
          <UI.Text variant="body1">In the meantime, please try to upload your statement in csv format.</UI.Text>
          <UI.Button fullWidth variant="outlined" onClick={onComplete}>
            Upload using csv
          </UI.Button>
        </UI.Col>
      )}
      {isCsv(data.type) && (
        <UI.Text variant="body1">
          Hi, there's something wrong with the upload csv/xls/xlsx. Please make sure you're following{" "}
          <UI.Text
            variant="body1"
            color="primary.dark"
            component="a"
            href="/smarti template.csv"
            target="_blank"
            rel="noopener noreferrer"
            bold
          >
            this
          </UI.Text>{" "}
          file.
        </UI.Text>
      )}
      {/* <UI.Text variant="body1" align="center">
        You can try to upload using another file, or we can help you prepare the reader by uploading the sample document
      </UI.Text> */}

      {isUploaded && (
        <UI.Modal open={true}>
          <UI.Col
            sx={{
              bgcolor: "white",
              width: "80%",
              height: 480,
              p: 2,
              borderRadius: 2,
            }}
            center
            spacing={1}
          >
            <UI.Text variant="h5" align="center" bold color="primary.main">
              File Submitted
            </UI.Text>
            <UI.Text variant="body1" align="center">
              Your file being reviewed.
              <br /> we will sent notification to your email once the process complete.
              <br /> this process takes 2 x 24 hr
            </UI.Text>
            <UI.Button variant="outlined" fullWidth onClick={onComplete}>
              Close
            </UI.Button>
          </UI.Col>
        </UI.Modal>
      )}
    </UI.Col>
  );
}
