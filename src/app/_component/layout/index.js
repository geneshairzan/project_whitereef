import React from "react";
import UI from "@/app/_component/gh/ui";
import Context from "@/app/_component/context/app";
import MenuBar from "./menuBarWhite";

export default function Layout(props) {
  const AppBarHeight = 64;
  const { app } = React.useContext(Context);

  return (
    <UI.Col
      sx={{
        height: "100dvh",
        maxHeight: "100dvh",
        width: "100vw",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        bgcolor: "#fafafa",
        // pb: "32px",
      }}
    >
      <UI.Col
        sx={{
          position: "relative",
          width: "100%",
          flexGrow: 1,
          maxHeight: `calc(100% - ${AppBarHeight}px)`,
          overflow: "auto",
          "&>div": {
            p: 2,
          },
        }}
      >
        {props.children}
      </UI.Col>
      <MenuBar AppBarHeight={AppBarHeight} />

      {app?.isLoading == 1 && <UI.Loader modal={true} />}
      {app?.fetcherCallback != null && (
        <UI.FetcherCallback type={app?.fetcherCallback.type} message={app?.fetcherCallback.message} />
      )}
    </UI.Col>
  );
}
