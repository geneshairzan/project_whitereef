"use client";
import React, { useState } from "react";

import Image from "next/image";
import UI from "@/app/_component/gh/ui";
import Icon from "@/app/_component/gh/icon";
import Header from "@/app/_component/header";
import { Slider } from "./_slider";
import Link from "next/link";

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
    >
      <Header label="White Reef Additive" />
      <UI.Col bgcolor="primary.main">
        <UI.Col py={3} px={5}>
          <UI.Text variant="body1" color="white" sx={{ maxWidth: "50vw" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis voluptatum mollitia reprehenderit
            voluptate deleniti aperiam quisquam fuga, numquam accusantium necessitatibus, enim sit quibusdam nostrum
            itaque? Iure deserunt quasi deleniti enim?
          </UI.Text>
          <Menus active={active} setactive={setactive} />
        </UI.Col>
        <UI.Col spacing={3} bgcolor="white" py={3} px={5}>
          {active == 0 && <Slider.KH />}
          {active == 1 && <Slider.CA />}
          {active == 2 && <Slider.MG />}
          <UI.Button
            LinkComponent={Link}
            href="/"
            variant="outlined"
            startIcon={<Icon.Back />}
            sx={{
              width: 120,
            }}
          >
            Back
          </UI.Button>
        </UI.Col>
      </UI.Col>
    </UI.Col>
  );
}

function Menus({ active, setactive }) {
  return (
    <UI.Row
      spacing={3}
      sx={{
        alignItems: "center",
        py: 3,
      }}
    >
      <Card
        label="KH Alkalinity"
        desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
        onClick={() => setactive(0)}
        active={active == 0}
      />
      <Card
        label="Calcium"
        desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
        onClick={() => setactive(1)}
        active={active == 1}
      />
      <Card
        label="Magnesium"
        desc="Lorem ipsum dolor sit amet consectetur, adipisicing elit."
        onClick={() => setactive(2)}
        active={active == 2}
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
        color: active ? "black" : "grey",
        borderBottom: "4px solid",
        borderColor: active ? "white" : "grey",
      }}
    >
      <UI.Text variant="h6" bold={active} color={active ? "white" : "grey"}>
        {label}
      </UI.Text>
      <UI.Text variant="body2" color={active ? "white" : "grey"}>
        {desc}
      </UI.Text>
    </UI.Col>
  );
}
