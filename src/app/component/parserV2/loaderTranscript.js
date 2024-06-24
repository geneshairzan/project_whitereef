import React, { useState, useEffec, useRef } from "react";
import { PdfDocument } from "@pomgui/pdf-tables-parser";
import UI from "@gh/ui";
import Form from "@gh/form";
import Icon from "@gh/icon";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Context from "@context/app";
import Papa from "papaparse";

export default function App({ onData, url = "parser/pdf" }) {
  const handleFileChange = async (e) => {
    if (!e?.target) onData();
    if (e?.target?.files) {
      let ext = e?.target?.files[0].name.split(".")[1].toLowerCase();

      if (ext == "pdf") {
        let res = await fetcher({
          url: url,
          method: "post",
          multipart: true,
          data: {
            file: e?.target?.files[0],
          },
        });
        res?.data && onData({ vraw: res.data, file: e?.target?.files[0], name: e?.target?.files[0].name, type: ext });
      } else if (["csv", "xls", "xlsx"].includes(ext)) {
        Papa.parse(e.target.files[0], {
          complete: function (results) {
            onData({
              name: e?.target?.files[0]?.name || "filename",
              vraw: results.data,

              type: ext,
            });
          },
        });
      } else {
        onData({ vraw: [], file: e?.target?.files[0], name: e?.target?.files[0].name, type: ext });
      }
    }
  };

  return (
    <UI.Col spacing={1}>
      <UI.FormLabel
        label="Select Data Source"
        // tip={"Lorem ipsum dolor sit amet consectetur, adipisicing elit."}
        help="/help"
      />
      <UI.Text variant="body2">
        You can automatically import from your bank mutation, transcript, or bulk upload using our CSV template. Lorem
        ipsum dolor sit amet consectetur, adipisicing elit.
      </UI.Text>
      <UI.Text
        variant="body2"
        color="primary.dark"
        component="a"
        href="/smarti template.csv"
        target="_blank"
        rel="noopener noreferrer"
        bold
      >
        Download CSV template here
      </UI.Text>
      <Form.File value={handleFileChange} multi={false} onReset={onData} />
    </UI.Col>
  );
}
