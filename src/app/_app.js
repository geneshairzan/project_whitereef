import React, { useState, useEffect } from "react";

import Context from "@context/app";
// import useauth from "@context/reducer/useauth";
// import useapp from "@context/reducer/useapp";
// import ThemeProvider from "@context/theme";
// import AppMiddleware from "@/component/middleware/AppMiddleware";
// import { useRouter } from "next/router";
// import UI from "@gh/ui";
// import { Snackbar, Alert } from "@mui/material";

// import SmartiLayout from "@/component/SuperLayoutSmarti";

export default function MyApp({ Component, pageProps }) {
  return (
    <Context.Provider value={{}}>
      <Component {...pageProps} key={loc?.asPath} />
    </Context.Provider>
  );
}
