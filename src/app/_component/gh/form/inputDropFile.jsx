import React, { useState } from "react";
import UI from "@/app/_component/gh/ui";

const fileTypes = ["JPG", "PNG", "GIF"];

// drag drop file component
export default function DragDropFile({ multi = false, ref, ...props }) {
  function handleFile(files) {
    props.value(files);
  }

  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef = React.useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e);

      // multi ? handleFile(e.dataTransfer.files) : handleFile([e.dataTransfer.files[0]]);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <UI.Stack
      component={"form"}
      sx={{
        height: "400px",
        position: "relative",
      }}
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      ref={ref}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={multi}
        onChange={handleChange}
        style={{
          display: "none",
        }}
      />
      <UI.Stack
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          height: "100%",
          display: "flex",

          alignItems: "center",

          justifyContent: "center",
          border: "2px dashed #cbd5e1",
          borderRadius: "1rem",

          bgcolor: "#f8fafc",
        }}
        // htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : ""}
      >
        <UI.Stack spacing={1}>
          <img src={"/assets/img/app/file-attach.svg"} style={{ height: 96 }} />
          <UI.Text variant="body1" align="center">
            Silahkan drag / pilih file dengan format <br />
            *.pdf *.csv *.xls *.xlsx
          </UI.Text>

          <UI.Button onClick={onButtonClick}>Upload a file</UI.Button>
        </UI.Stack>
      </UI.Stack>
      {dragActive && (
        <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>
      )}
    </UI.Stack>
  );
}
