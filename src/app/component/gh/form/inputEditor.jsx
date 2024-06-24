import React, { useState, useEffect } from "react";
import UI from "@component/gip-ui";
import { Editor, SelectionState } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import Label from "./label";

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function App(props) {
  const [state, setstate] = useState(EditorState.createEmpty());

  function toHtml(es) {
    return draftToHtml(convertToRaw(es.getCurrentContent())); // added
  }
  useEffect(() => {
    if (!props.value || toHtml(state) === props.value) return;
    setstate(EditorState.push(state, ContentState.createFromBlockArray(htmlToDraft(props.value || ""))));
  }, [props.value]);

  function handleChange(raw) {
    setstate(raw);
    if (props.value !== toHtml(raw)) {
      props.onChange(draftToHtml(convertToRaw(raw.getCurrentContent())));
    }
  }

  return (
    <UI.Stack
      position={"relative"}
      spacing={1}
      width={props.fullWidth ? "100%" : "auto"}
      // mt={props.mt}
      minHeight={200}
      overflow="auto"
      flexGrow={1}
    >
      <Label tip={props.tip} label={props.label} />

      <UI.Stack
        sx={{
          flexGrow: 1,
          overflow: "auto",
          border: props.error ? "1px solid red" : "1px solid #c4c4c4",
          position: "relative",
          minHeight: "200px",
          bgcolor: "white.main",
          "& .rdw-editor-wrapper": {
            position: "relative",
          },
          "& .rdw-editor-toolbar": {
            position: "sticky",
            top: 0,
            bgcolor: "white.main",
            display: "flex",
            flexDirection: "row",
            borderBottom: "1px solid #c4c4c4",
          },
          "& .rdw-inline-wrapper": {
            display: "flex",
            py: 1,
            px: 1,
            flexDirection: "row",
          },

          "& .rdw-list-wrapper": {
            display: "flex",
            py: 1,
            px: 1,
            flexDirection: "row",
          },
          "& .rdw-option-wrapper": {
            width: 24,
            height: 24,
            // border: props.error ? "1px solid red" : "1px solid #c4c4c4",
            // border: "1px solid red.main",
            mx: 0.5,
            display: "flex",
            borderRadius: "4px",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              bgcolor: "#d1ebff",
            },
          },
          "& .rdw-editor-main": {
            p: 2,
          },
          "& .public-DraftEditorPlaceholder-hasFocus": {
            display: "none",
          },
          "& .public-DraftEditorPlaceholder-root": {
            color: "#C8C8C8",
          },
        }}
      >
        <Editor
          editorState={state}
          onEditorStateChange={handleChange}
          placeholder={props.label}
          toolbar={{
            options: ["inline", "list"],
            inline: { options: ["bold", "italic", "underline"] },

            list: {
              // inDropdown: false,
              // className: undefined,
              // component: undefined,
              // dropdownClassName: undefined,
              options: ["unordered", "ordered"],
              // unordered: { icon: unordered, className: undefined },
              // ordered: { icon: ordered, className: undefined },
              // indent: { icon: indent, className: undefined },
              // outdent: { icon: outdent, className: undefined },
            },
          }}
        />
      </UI.Stack>
      <UI.Text
        variant="caption"
        color="error"
        minHeight={props.errMinHeight || 100}
        sx={{
          position: "absolute",
          // bottom: -18,
          pl: 2,
        }}
      >
        {props.helperText}
      </UI.Text>
    </UI.Stack>
  );
}
