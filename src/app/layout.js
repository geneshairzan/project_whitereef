"use client";
import { Inter } from "next/font/google";
import "./global.css";
import Stack from "@mui/material/Stack";

import Context from "@/app/_component/context/app";
// import useauth from "@context/reducer/useauth";
// import useapp from "@context/reducer/useapp";
import ThemeProvider from "@context/theme";
// import AppMiddleware from "@component/middleware/AppMiddleware";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Context.Provider value={{}}>
          <ThemeProvider>
            <Theming>{children}</Theming>
          </ThemeProvider>
        </Context.Provider>
      </body>
    </html>
  );
}

function Theming({ children }) {
  const pathname = usePathname();

  return (
    <Stack
      sx={{
        height: "100dvh",
        alignItems: "center",
      }}
    >
      {/* {pathname != "/" && <Header />} */}
      <Stack
        sx={{
          flexGrow: 1,
          overflow: "auto",
          minHeight: 960,
          // maxWidth: 1280,
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
}

function Header() {
  return (
    <Stack
      sx={{
        p: 2,
        height: 120,
        maxHeight: 120,
        flexGrow: 0,
      }}
    >
      <img
        src={"/img/logo.svg"}
        style={{
          height: "100%",
          objectFit: "contain",
        }}
      />
    </Stack>
  );
}
