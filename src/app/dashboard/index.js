import React, { useState } from "react";

import Image from "next/image";
import UI from "@/app/_component/gh/ui";
import Icon from "@/app/_component/gh/icon";
import Footer from "@/app/_component/footer";
import { Slider } from "./_slider";
// import Social from "./_social";

export default function Home() {
  const [active, setactive] = useState(0);
  return (
    <UI.Col
      sx={{
        flexGrow: 1,
        bgcolor: "#191d26",
        width: "100vw",
        position: "relative",
        height: "150dvh",
        overflow: "auto",
      }}
    >
      <Menus active={active} setactive={setactive} />
      <UI.Col
        sx={{
          position: "relative",
          zIndex: 1,
          maxHeight: 920,
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        {active == 0 && <Slider.Additive />}
        {active == 1 && <Slider.Tester />}
      </UI.Col>
      <Footer />
    </UI.Col>
  );
}

function Menus({ active, setactive }) {
  return (
    <UI.Row
      sx={{
        justifyContent: "space-between",
      }}
    >
      <UI.Row
        spacing={3}
        sx={{
          px: 3,
          alignItems: "center",
          bgcolor: "#191d26",
        }}
      >
        <Card
          label="Additive"
          desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
          onClick={() => setactive(0)}
          active={active == 0}
        />
        <Card
          label="Water Test Kit"
          desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
          onClick={() => setactive(1)}
          active={active == 1}
        />
      </UI.Row>
      <UI.Col center p={3}>
        <img
          src={"/img/logo-blank.png"}
          style={{
            height: "80px",
          }}
        />
      </UI.Col>
    </UI.Row>
  );
}

function Card({ label, desc, active, onClick }) {
  return (
    <UI.Col
      onClick={onClick}
      sx={{
        width: 280,
        height: 90,
        // p: 2,
        color: active ? "black" : "grey",
        borderBottom: "4px solid",
        borderColor: active ? "primary.main" : "grey",
      }}
    >
      <UI.Text variant="h6" bold color={active ? "white" : "grey"}>
        {label}
      </UI.Text>
      <UI.Text variant="body2" color={active ? "white" : "grey"}>
        {desc}
      </UI.Text>
    </UI.Col>
  );
}
