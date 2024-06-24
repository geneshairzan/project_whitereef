import { Stack, Typography } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import UI from "@gh/ui";

export default function App(props) {
  return (
    <UI.Col center height={"100%"} direction={{ xs: "column", md: "row" }}>
      <Stack
        width={{ xs: 300, md: "50vw" }}
        height={300}
        position={{ xs: "relative", md: "relative" }}
        left={{ xs: -80 }}
        // top={{ xs: -30 }}
        justifyContent="center"
      >
        <img src={"/assets/img/illustration/set.svg"} alt="" className="img-contain" />
      </Stack>
      <Stack pl={{ xs: "70px" }} mt={{ xs: "" }}>
        <Typography variant="h1" color="white">
          GENDEV
        </Typography>
        <Typography variant="h5" color="#ffa229">
          FULLSTACK APP DEV.
        </Typography>
        <Typography variant="body2" color="white">
          Assesing, architechting, developing, and implementing a solution that you needed for your problem.
          <Typography variant="span" color="#ffa229">
            {` Indeed, what is your current problem ?. `}
          </Typography>
          <br />
          <br /> Please dont tell me that your profit is not high enough, either something like low customer
          Satisfaction. Thats just an indication of your problem.
          <br />
          <br />
          <Typography variant="span" color="#ffa229">
            {` so, what is your problem ?. `}
          </Typography>
          <br />
          let us help you, and we can take-off from there <FlightTakeoffIcon fontSize="small" />
        </Typography>
      </Stack>
    </UI.Col>
  );
}
