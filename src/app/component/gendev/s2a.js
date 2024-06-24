import { Stack, Typography } from "@mui/material";
import Card from "./pCard";

const data = [
  {
    s: "ACP",
    l: "Advance Company Profile",
    desc: "To achieve an outstanding first impression on prospective customers, it is essential to create a company profile design. A company profile is considered as an essential tool for any type of business and can be used as an effective marketing tool to attract new customers as well as investors",
  },
  {
    s: "HRIS",
    l: "Human Resource Integrated System",
    desc: "HRIS provide centralized database services that stores employee & applicant tracking functions. Essensial feature such as profiling, historical personal information, onboarding,compensation and benefits choices, time-tracking, and more which will optimize the business operation. HRIS can also act as hub and colaborative tools to handle scalled project.",
  },
  {
    s: "CRM",
    l: "Customer Relation Management",
    desc: "CRM service is one of the most advance sales & marketing tools in corporate arsenal. It is more than a contact management system. Well configurated CRM with full feature, allows sales reps & marketing team build strategic marketing solution to secure pottential customer & revenue growth ",
  },
  {
    s: "AM",
    l: "Asset Management",
    desc: "Asset management ensure the organization track & monitoring their assets. It can tell where the assets are located, how they are used, and changes were made to them. The data from the asset management solution can ensure that asset recovery will lead to better returns .",
  },
  {
    s: "MSI",
    l: "Microservice & Integration",
    desc: "Ingration & communication betweed deployed aplication and enviroment mostly hardly to achive. Microservices provide solution which work independently of one another but remain loosely connected and isolated. Unlike the monolithic style, the microservices approach to software development allows for better scalability. ",
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
        <img src={"/assets/img/illustration/business.svg"} alt="" className="img-contain" />
      </Stack>

      <Stack spacing={2}>
        <Stack>
          <Typography variant="h3" color="#ffa229">
            Bussiness Essencial Solution
          </Typography>
          <Typography variant="body" color="white">
            providing prelimenary assesment to provide precise solution.
          </Typography>
        </Stack>
        <Card data={data} />
      </Stack>
    </Stack>
  );
}
