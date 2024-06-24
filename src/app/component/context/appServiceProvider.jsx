import Context from "./app";
import ThemeProvider from "./theme";
import useauth from "./reducer/useauth";
import useapp from "./reducer/useapp";
import React, { useState } from "react";

export default function App(props) {
  const app = useapp({});
  const auth = useauth();

  return (
    <Context.Provider
      value={{
        auth,
        app,
      }}
    >
      <ThemeProvider>{props.children}</ThemeProvider>
    </Context.Provider>
  );
}
