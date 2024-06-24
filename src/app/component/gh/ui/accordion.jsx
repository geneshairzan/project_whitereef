import UI from "@gh/ui";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function App({ isExpanded = false, title, content, onChange, small = false }) {
  return (
    <Accordion
      disableGutters={true}
      expanded={isExpanded ? true : false}
      onChange={() => onChange(title)}
      sx={{
        width: "100%",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={
          small
            ? {
                minHeight: 0,
                height: "32px",
              }
            : {}
        }
      >
        {typeof title == "object" ? title : <Typography>{title}</Typography>}
      </AccordionSummary>
      <AccordionDetails>{typeof content == "object" ? content : <Typography>{content}</Typography>}</AccordionDetails>
    </Accordion>
  );
}
