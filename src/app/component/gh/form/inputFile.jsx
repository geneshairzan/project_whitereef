import React, { useState } from "react";
import UI from "@gh/ui";
import Icon from "@gh/icon";

const fileTypes = ["JPG", "PNG", "GIF"];

// drag drop file component
export default function DragDropFile({ multi = false, onReset = () => {}, ...props }) {
  const [fileMeta, setfileMeta] = useState();

  function handleFile(files) {
    let ext = files?.target?.files[0].name.split(".")[1].toLowerCase();

    props.value(files);
    setfileMeta({ name: files?.target?.files[0]?.name, ext: ext });
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
    onReset();
    setfileMeta();
    props.value();
    inputRef.current.value = "";
    inputRef.current.click();
  };

  return (
    <UI.Stack
      component={"form"}
      sx={{
        position: "relative",
      }}
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
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
      {!fileMeta?.name && (
        <UI.Stack
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          sx={{
            flexGrow: 1,
            // height: "400px",
            display: "flex",
            alignItems: "center",

            justifyContent: "center",
            border: "2px dashed #cbd5e1",
            borderRadius: "1rem",
            p: 2,
            bgcolor: "#f8fafc",
          }}
          // htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <UI.Stack spacing={1}>
            <img src={"/assets/img/app/file-attach.svg"} style={{ height: 96 }} />
            <UI.Text variant="body1" align="center">
              Please drag and drop / or select file with format <br />
              *.pdf *.csv *.xls *.xlsx
            </UI.Text>

            <UI.Button onClick={onButtonClick}>Upload a file</UI.Button>
          </UI.Stack>
        </UI.Stack>
      )}
      {dragActive && (
        <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>
      )}

      {fileMeta?.name && (
        <UI.Row
          onClick={onButtonClick}
          alignItems="center"
          sx={{
            alignItems: "center",
            border: "1px solid grey",
            borderRadius: 2,
            p: 1,
            // bgcolor: "red",
            zIndex: 2,
            "&:hover": {
              bgcolor: "primary.light",
            },
          }}
        >
          <img
            src={fileMeta?.ext == "pdf" ? `/assets/img/file/icon pdf.svg` : "/assets/img/file/icon xls.svg"}
            alt=""
            style={{
              height: "32px",
              marginRight: "6px",
            }}
          />
          <UI.Text variant="body1">{fileMeta?.name}</UI.Text>
          <UI.Col
            sx={{
              position: "absolute",
              right: 0,
            }}
          >
            <UI.IconButton sx={{ p: 1 }}>
              <Icon.Refresh />
            </UI.IconButton>
          </UI.Col>
        </UI.Row>
      )}
    </UI.Stack>
  );
}
