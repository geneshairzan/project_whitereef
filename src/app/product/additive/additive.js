"use client";

import Image from "next/image";
import UI from "@/app/_component/gh/ui";
import Icon from "@/app/_component/gh/icon";

export default function Home() {
  return (
    <UI.Col
      sx={{
        flexGrow: 1,
        height: "100%",
        bgcolor: "primary.dark",
      }}
      spacing={5}
    >
      <UI.Text variant="h1" align="center">
        Welcome
      </UI.Text>
      <UI.Text variant="body1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis voluptatum mollitia reprehenderit voluptate
        deleniti aperiam quisquam fuga, numquam accusantium necessitatibus, enim sit quibusdam nostrum itaque? Iure
        deserunt quasi deleniti enim?
      </UI.Text>
      <UI.Text variant="body1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis voluptatum mollitia reprehenderit voluptate
        deleniti aperiam quisquam fuga, numquam accusantium necessitatibus, enim sit quibusdam nostrum itaque? Iure
        deserunt quasi deleniti enim?
      </UI.Text>
      <UI.Text variant="body1">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis voluptatum mollitia reprehenderit voluptate
        deleniti aperiam quisquam fuga, numquam accusantium necessitatibus, enim sit quibusdam nostrum itaque? Iure
        deserunt quasi deleniti enim?
      </UI.Text>
      <UI.Button>Check out </UI.Button>
    </UI.Col>
  );
}
