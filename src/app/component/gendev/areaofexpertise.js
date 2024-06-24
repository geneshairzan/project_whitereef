import { Stack, Typography } from "@mui/material";

import React from "react";

// import imghtml from "assets/img/html-5.svg";
// import imgcss from "assets/img/css.svg";
// import imgphp from "assets/img/php.svg";

// import imgnodejs from "assets/img/nodejs.svg";
// import imgexpressjs from "assets/img/expressjs.svg";
// import imgLaravel from "assets/img/laravel.svg";

// import imgreact from "assets/img/react2.svg";
// import imgjavascript from "assets/img/javascript.svg";
// import imgmaterial from "assets/img/material-ui.svg";
// import imgbootstrap5 from "assets/img/bootstrap5.svg";
// import imgAws from "assets/img/aws.png";

// import imgmysql from "assets/img/mysql.svg";
// import imgmangodb from "assets/img/mangodb.svg";

import IconButton from "@mui/material/IconButton";
import UI from "@gh/ui";

const data = [
  {
    name: "imghtml",
    path: "/assets/img/html-5.svg",
  },

  {
    name: "imgcss",
    path: "/assets/img/css.svg",
  },
  {
    name: "imgphp",
    path: "/assets/img/php.svg",
  },
  {
    name: "imgnodejs",
    path: "/assets/img/nodejs.svg",
  },
  {
    name: "imgexpressjs",
    path: "/assets/img/expressjs.svg",
  },
  {
    name: "imgjavascript",
    path: "/assets/img/javascript.svg",
  },
  {
    name: "imgbootstrap5",
    path: "/assets/img/bootstrap5.svg",
  },
  {
    name: "imgmysql",
    path: "/assets/img/mysql.svg",
  },
  {
    name: "imgmangodb",
    path: "/assets/img/mangodb.svg",
  },
  {
    name: "imgAws",
    path: "/assets/img/aws.png",
  },

  ,
];

export default function App(props) {
  return (
    <Stack position="relative" justifyContent={"center"} height={"100%"}>
      <Saoe />
      <Tstack />
    </Stack>
  );
}

function Saoe() {
  const size = 64;
  return (
    <Stack direction="column" justifyContent="space-between" alignItems="center" width={"100%"} mt={"60px"}>
      <Stack direction="row" justifyContent="space-evenly" width="100%">
        <IconButton>
          <Stack width={size} height={size} className="center">
            <img src={"assets/img/react2.svg"} alt="" className="img-fill" />
          </Stack>
        </IconButton>

        <IconButton>
          <Stack width={size} height={size} className="center">
            <img src={"assets/img/laravel.svg"} alt="" className="img-fill" />
          </Stack>
        </IconButton>

        <IconButton>
          <Stack width={size} height={size} className="center">
            <img src={"assets/img/material-ui.svg"} alt="" className="img-fill" />
          </Stack>
        </IconButton>
      </Stack>
    </Stack>
  );
}

function Tstack({ isPrinting = false }) {
  return (
    <UI.Col center position={"relative"} width="100%" mt={5} className="center">
      <UI.Col center bgcolor="#ffa229" width={48} height={48} borderRadius="50%" top="-32px" position={"absolute"}>
        <Typography variant="h1" color="white">
          +
        </Typography>
      </UI.Col>
      <Stack className="center" py={2} borderRadius={"4px"} bgcolor="#1c4670">
        <UI.Row justifyContent="space-evenly" alignItems="center" flexWrap={"wrap"} width="100%">
          {data.map((d, ix) => (
            <UI.Col
              center
              key={ix}
              sx={{
                flexShrink: 0,
                bgcolor: "white",
                borderRadius: "50%",
                width: 64,
                height: 64,
                overflow: "hidden",
                m: "2px",
                border: "4px solid white",
              }}
            >
              <img
                src={d.path}
                alt=""
                style={{
                  height: "auto",
                  width: "auto",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </UI.Col>
          ))}
        </UI.Row>
      </Stack>
    </UI.Col>
  );
}
