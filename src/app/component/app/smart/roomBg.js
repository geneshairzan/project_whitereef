import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Fade from "@mui/material/Fade";
export default function App({ src }) {
  const [buffer, setbuffer] = useState(src);

  useEffect(() => {
    setbuffer();
  }, [src]);

  useEffect(() => {
    !buffer && setbuffer(src);
  }, [buffer]);

  if (!buffer) return;
  return (
    <Fade
      in={true}
      timeout={700}
      sx={{
        backgroundColor: "red",
      }}
    >
      <div>
        <UI.Col
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            backgroundColor: "#1e1e1e",
            left: 0,
            top: 0,
          }}
        >
          <UI.Img
            src={buffer}
            alt=""
            style={{
              height: "100%",
              objectFit: "cover",
              opacity: 0.8,
            }}
          />
        </UI.Col>
      </div>
    </Fade>
  );
}
