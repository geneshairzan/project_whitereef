import React from "react";
import UI from "@gh/ui";
import { nav } from "./_superNav";
import { useRouter } from "next/router";
import Context from "@context/app";

export default function Layout(props) {
  const router = useRouter();
  const { auth } = React.useContext(Context);

  return (
    <UI.Col
      sx={{
        // height: 64,
        flex: 1,
        maxWidth: 300,
        minWidth: 300,
        bgcolor: "#2a2d2e",
        // pb: "32px",
        justifyContent: "space-between",
        py: 3,
      }}
    >
      <UI.Col
        sx={{
          flexGrow: 1,
        }}
      >
        {nav.map((d) => (
          <UI.ListItemButton
            key={d.path}
            onClick={() => router.push(d.path)}
            sx={{
              color: "white",
              height: 36,
              flex: 0,
            }}
          >
            {d.name}
          </UI.ListItemButton>
        ))}
      </UI.Col>
      <UI.ListItemButton
        onClick={auth.signout}
        sx={{
          flex: 0,
          color: "white",
        }}
      >
        Sign Out
      </UI.ListItemButton>
    </UI.Col>
  );
}
