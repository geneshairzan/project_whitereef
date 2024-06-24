import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import Card from "./pCard";

const data = [
  {
    s: "DCC",
    l: "Data Crawling & Collection",
    desc: "Collecting & extraction tons of data might take large rosource. Cut loss your budget more than 75% when it can be done automatically.",
  },
  {
    s: "DSS",
    l: "Decicision Support System",
    desc: "DSS providing technology solution using decision logic and statistical data to help managers and operation planners overcome strategic deficiencies to implement streamlined, efficient solutions. This service mainly serve as projection tools for organization.",
  },

  {
    s: "MSI",
    l: "Microservice & Integration",
    desc: "Ingration & communication betweed deployed aplication and enviroment mostly hardly to achive. Microservices provide solution which work independently of one another but remain loosely connected and isolated. Unlike the monolithic style, the microservices approach to software development allows for better scalability. ",
  },
];

export default function App(props) {
  const [active, setactive] = useState(0);
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      width="100%"
      height={"100%"}
      spacing={3}
      alignItems="center"
      justifyContent={"flex-start"}
      pt={"24px"}
    >
      <Stack width={240} flexGrow={0} flexShrink={0}>
        <img src={"assets/img/illustration/data.svg"} alt="" className="img-contain" />
      </Stack>

      <Stack spacing={2}>
        <Stack>
          <Typography variant="h3" color="#ffa229">
            Data Monitoring and Projection
          </Typography>
          <Typography variant="body" color="white">
            Strech your bussiness beyond it limit.
          </Typography>
        </Stack>
        <Card data={data} />
      </Stack>
    </Stack>
  );
}
