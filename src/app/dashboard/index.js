import React, { useState } from "react";

import Image from "next/image";
import UI from "@/app/_component/gh/ui";
import Icon from "@/app/_component/gh/icon";
import { Slider } from "./_slider";
import Social from "./_social";

export default function Home() {
  const [active, setactive] = useState(0);
  return (
    <UI.Col
      sx={{
        flexGrow: 1,
        height: "100%",
        // bgcolor: "#191d26",
        width: "100vw",
        position: "relative",
      }}
      spacing={5}
    >
      <Menus active={active} setactive={setactive} />
      <UI.Col
        sx={{
          position: "relative",
          // pt: "90px",
          // zIndex: -1,
          // bgcolor: "red",
        }}
      >
        {active == 0 && <Slider.Additive />}
        {active == 1 && <Slider.Tester />}
      </UI.Col>
      <Social />
    </UI.Col>
  );
}

function Menus({ active, setactive }) {
  return (
    <UI.Row
      spacing={3}
      sx={{
        p: 2,
        // position: "absolute",
        // top: 0,
        // left: 0,
        alignItems: "center",
      }}
    >
      <img
        src={"/img/logo.svg"}
        style={{
          height: "90px",

          // objectFit: "contain",
        }}
      />
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
        borderColor: active ? "black" : "grey",
      }}
    >
      <UI.Text variant="h6" bold>
        {label}
      </UI.Text>
      <UI.Text variant="body2">{desc}</UI.Text>
    </UI.Col>
  );
}
