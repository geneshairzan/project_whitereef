import React, { useEffect } from "react";
import { useRouter } from "next/router";
import P404 from "../../pages/404";
import PAuth from "../../pages/auth";
import { nav, extra } from "@/component/app/_nav";
import Context from "@/app/_component/context/app";
import MainLayout from "../layout";
import SuperLayout from "@/component/SuperLayoutSmarti";
import { navReducer } from "./client";

export default function AppMiddleware({ children }) {
  const router = useRouter();
  const { auth } = React.useContext(Context);

  useEffect(() => {
    if (auth?.user?.id && auth?.user?.role_id > 1 && router.asPath == "/") {
      router.push("/dashboard");
    }
    if (auth?.user?.role_id == 1 && !router.asPath.includes("super")) {
      router.push("/super");
    }
  }, [auth?.user]);

  // return;

  function isAllowed(params) {
    return true;
    // if (
    //   router.pathname == "/" ||
    //   allowedModel.includes(router.asPath) ||
    //   // allowedModel.map((d) => d.replaceAll("/", "")).includes(router?.query?.model) ||
    //   allowedModel.map((d) => d.replaceAll("/", "")).includes(router.asPath.split("/")[1]) ||
    //   router.asPath.includes("/home") ||
    //   router.asPath.includes("/family") ||
    //   router.asPath.includes("/p/")
    // ) {
    //   return true;
    // }
    return false;
  }
  if (!isAllowed()) return <P404 />;
  if (!auth?.user?.id) return <PAuth />;
  return <Layout>{children}</Layout>;
}

function Layout({ children }) {
  const router = useRouter();

  if (router?.asPath.includes("super")) return <SuperLayout>{children}</SuperLayout>;
  return <MainLayout>{children}</MainLayout>;
}
