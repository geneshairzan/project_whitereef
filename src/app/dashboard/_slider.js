"use client";

import Image from "next/image";
import UI from "@/app/_component/gh/ui";
import Icon from "@/app/_component/gh/icon";
import Link from "next/link";

export const Slider = {
  Additive,
  Tester,
};

const cardStyle = {
  maxWidth: "50%",
  // pl: 5,
  p: 5,
  // position: "absolute",
  // bottom: "0",
  // color: "#e3e3e3",
};

function Additive() {
  return (
    <UI.Col
      sx={{
        position: "relative",
        flexGrow: 1,
      }}
      spacing={5}
    >
      <UI.Col
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100%",
          zIndex: -1,
        }}
      >
        <img
          src="/asset/additive.webp"
          alt=""
          style={{
            objectFit: "cover",
            height: "100%",
            // position: "absolute",
            objectPosition: "bottom",
          }}
        />
      </UI.Col>

      <UI.Col sx={cardStyle} spacing={2}>
        <UI.Text variant="h2" bold color="primary.dark">
          White Reef <br /> Additive
        </UI.Text>

        <UI.Text variant="body1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis voluptatum mollitia reprehenderit voluptate
          deleniti aperiam quisquam fuga, numquam accusantium necessitatibus, enim sit quibusdam nostrum itaque? Iure
          deserunt quasi deleniti enim?.
        </UI.Text>
        <UI.Button
          LinkComponent={Link}
          href="/product/additive"
          sx={{
            width: 160,
            alignSelf: "flex-end",
          }}
        >
          Explore
        </UI.Button>
      </UI.Col>
    </UI.Col>
  );
}

function Tester() {
  return (
    <UI.Col
      sx={{
        flexGrow: 1,
        height: "100%",
        // bgcolor: "#191d26",
      }}
      spacing={5}
    >
      <UI.Col sx={cardStyle} spacing={2}>
        <UI.Text variant="h2" bold>
          White Reef <br /> Water Test Kit
        </UI.Text>

        <UI.Text variant="body1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis voluptatum mollitia reprehenderit voluptate
          deleniti aperiam quisquam fuga, numquam accusantium necessitatibus, enim sit quibusdam nostrum itaque? Iure
          deserunt quasi deleniti enim?
        </UI.Text>
        <UI.Button
          LinkComponent={Link}
          href="#"
          sx={{
            width: 160,
            alignSelf: "flex-end",
          }}
        >
          Explore
        </UI.Button>
      </UI.Col>
    </UI.Col>
  );
}
