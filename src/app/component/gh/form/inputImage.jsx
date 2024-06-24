import UI from "@gh/ui";
import { Card, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import Label from "./label";
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';

export default function InputImage({
  size,
  hint,
  existingThumbnail,
  resultFile,
  disk = "sectorimage",
  defaultUrl,
  error,
  helperText,
  sx,
  noLabel = false,
  ...props
}) {
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  useEffect(() => {
    resultFile(file || null);
  }, [file]);

  return (
    <UI.Col width={props.fullWidth ? "100%" : "auto"}>
      {!noLabel && <Label label={props.label} tip={props.tip} />}
      <UI.Col spacing={0.5} width={props.fullWidth ? "100%" : "auto"} center={props.center}>
        <Card
          sx={{
            width: size,
            height: size,
            borderRadius: "50%",
            border: !existingThumbnail && error ? "1px solid red" : "1px solid #eeeeee",
            backgroundColor: "#f5f5f5",
            boxShadow: 0,
            ...sx,
          }}
        >
          <UI.Stack width={"100%"} height={"100%"}>
            <input
              ref={inputRef}
              accept="image/*"
              style={{ display: "none" }}
              multiple
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <UI.IconButton
              disableRipple
              onClick={() => inputRef.current.click()}
              sx={{
                width: "100%",
                height: "100%",
                padding: 0,
              }}
            >
              {file || existingThumbnail ? (
                <img
                  height={"100%"}
                  width={"100%"}
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : existingThumbnail ? `${import.meta.env.VITE_BEURL}/api/file/${disk}/${existingThumbnail}`
                        : ImageRoundedIcon
                  }
                />
              ) : (
                <ImageRoundedIcon sx={{ width: "50%", height: "50%" }} />
              )}
            </UI.IconButton>
          </UI.Stack>
        </Card>
        {!existingThumbnail && error && helperText && (
          <UI.Text align="center" variant="caption" color="red" sx={{ fontWeight: 200 }}>
            {helperText}
          </UI.Text>
        )}
      </UI.Col>
    </UI.Col>
  );
}
