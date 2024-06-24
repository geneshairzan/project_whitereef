import React from "react";
import UI from "@gh/ui";
import Header from "./header";
import Menu from "./Menu";
import Context from "@context/app";

export default function Layout(props) {
  const { auth } = React.useContext(Context);

  return (
    <UI.Col
      sx={{
        flex: 1,
        height: "100dvh",
        overflow: "auto",
        // pb: "32px",
      }}
    >
      <Header />
      <UI.Row
        sx={{
          flex: 1,
        }}
      >
        <Menu />
        <UI.Col
          p={3}
          sx={{
            width: "100%",
          }}
        >
          <UI.Text variant="body1" align="right">
            Hi, {auth.user.name}
          </UI.Text>
          {props.children}
        </UI.Col>
      </UI.Row>
    </UI.Col>
  );
}
