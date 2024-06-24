import { Stack, Typography } from "@mui/material";

import React from "react";

import IconButton from "@mui/material/IconButton";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import Button from "@mui/material/Button";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

export default function App(props) {
  return (
    <Stack position="relative" justifyContent={"center"} height={"100%"}>
      <Typography variant="h1" color="white">
        Reach Me
      </Typography>
      <Stack justifyContent="space-between" alignItems={"flex-start"}>
        <SsocialLink />
        <Tcontact />
        <TcontactKiting />
      </Stack>
    </Stack>
  );
}

function TcontactKiting({ isPrinting = false }) {
  return (
    <Stack direction={"column"} justifyContent="space-between" color="white">
      <Typography variant="caption">mohamadsyifaudin@gmail.com</Typography>
      <Typography variant="caption">+62 819 0733 5224</Typography>
      <Typography variant="caption">Jakarta | Bekasi | Bogor | Indonesia</Typography>
    </Stack>
  );
}

function Tcontact({ isPrinting = false }) {
  return (
    <Stack direction={"column"} justifyContent="space-between" color="white" my={2}>
      <Typography variant="caption">genesha.irzan@gmail.com</Typography>
      <Typography variant="caption">+62 811 995 1112</Typography>
      <Typography variant="caption">Jakarta | Bekasi | Bali | Indonesia</Typography>
    </Stack>
  );
}

function SsocialLink({ isPrinting = false }) {
  return (
    <Stack justifyContent={"space-between"}>
      <Stack direction="row" justifyContent="center" spacing={1} mt={-1} mr={-1}>
        <Stack>
          <IconButton
            target="_blank"
            rel="noreferrer"
            href="https://api.whatsapp.com/send/?phone=+628119951112&app_absent=0"
            size="large"
            sx={{ padding: "4px" }}
          >
            <WhatsAppIcon sx={{ fontSize: "32px", color: "#31bb46" }} />
          </IconButton>
        </Stack>
        <Stack>
          <IconButton
            href="https://github.com/geneshairzan"
            target="_blank"
            rel="noreferrer"
            size="large"
            sx={{ padding: "4px" }}
          >
            <GitHubIcon className="f-white" sx={{ fontSize: "32px" }} />
          </IconButton>
        </Stack>
        <Stack>
          <IconButton
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/geneshairzan/"
            size="large"
            sx={{ padding: "4px" }}
          >
            <LinkedInIcon sx={{ fontSize: "32px", color: "#0961b8" }} />
          </IconButton>
        </Stack>
        <Stack>
          <IconButton
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/geneshairzan/"
            size="large"
            sx={{ padding: "4px" }}
          >
            <InstagramIcon sx={{ fontSize: "32px", color: "#ed781c" }} />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
