import { Stack, Typography } from "@mui/material";
import Card from "./pCard";

const data = [
  {
    s: "ASM",
    l: "Employee Assessment & Experience",
    desc: "Employee assessments are performance appraisals or reviews used to evaluate employees performance and productivity. These tests assess personality, aptitude and skills. An old man says 'You need the right man in a right place'",
  },
  {
    s: "LMS",
    l: "Learning Management System",
    desc: "Training & Enableblement improves efficiency and productivity of employees. Well trained employees show both quantity and quality performance. Proven study shows less recovery cost if employees are properly trained. Avoid unnececary repetiting training thru well implemented artificial traning procedure to achive same result",
  },

  {
    s: "VRT",
    l: "Business Virtualization and Simplification",
    desc: "Enable virtualized environment in business are able to provision for new resources, and streamline routine business processes much quicker than in a traditional set up. This strengthens the organization and makes it responsive to environmental changes.",
  },
  {
    s: "sAPI",
    l: "Social API",
    desc: "Connecting the Application with social media platform (Whatsup, Instagram, Facebook) to manage and automate handfull task & operation",
  },
];

export default function App(props) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      width="100%"
      height={"100%"}
      spacing={3}
      alignItems="center"
      justifyContent={"flex-start"}
      pt={"32px"}
    >
      <Stack width={240} flexGrow={0} flexShrink={0}>
        <img src={"/assets/img/illustration/simulation.svg"} alt="" className="img-contain" />
      </Stack>

      <Stack spacing={2}>
        <Stack>
          <Typography variant="h3" color="#ffa229">
            Business Digitalization
          </Typography>
          <Typography variant="body" color="white">
            Digitalize traditional business process to enhance productivity
          </Typography>
        </Stack>
        <Card data={data} />
      </Stack>
    </Stack>
  );
}
