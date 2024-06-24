import React, { useState, useEffect } from "react";

import axios from "axios";
import { Md5 } from "ts-md5";
import Context from "@/app/_component/context/app";

import { debounce } from "lodash";

const accX = "w}5opZ%3oIQ6Vq(PUsTL";
const accY = new Date().getTime();

async function parseFormData(raw) {
  var formData = new FormData();

  Object.keys(raw).forEach(function (key) {
    formData.append(key, raw[key]);
  });
  return formData;
}

export const fetcher = async ({ saltY = accY, multipart = false, htoken, ...param }) => {
  const token = htoken || localStorage.getItem("AuthToken");
  try {
    return await axios({
      ...param,
      url: param.url.includes("http") ? param.url : `${process.env.NEXT_PUBLIC_APP_URL}/api/${param.url}`,
      headers: {
        authorization: !param.url.includes("http") && `Bearer ${token}`,
        "Content-Type": multipart ? `multipart/form-data` : "application/json",

        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",

        "access-x": Md5.hashStr(accX + saltY),
        "access-y": saltY,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    return error?.response?.data || error?.code;
  }
};

export default function useFetcher(params) {
  const { app, auth } = React.useContext(Context);
  const [data, setdata] = useState();

  const dfetch = React.useCallback(debounce(fetch, 500), []);

  async function fetch(props) {
    app.setOnLoading();
    let res = await fetcher({
      ...params,
      ...props,
    });
    app.setOffLoading();
    return res?.status == 200 ? res.data : auth?.signout();
  }

  async function prefetch(pre) {
    let data = await fetch(pre);
    setdata(data || []);
  }

  async function reload(callback) {
    setdata();
    await prefetch(params);
    callback && app.set("snack", callback);
  }

  useEffect(() => {
    params?.url && prefetch(params);
  }, []);

  return {
    get: () => data,
    fetch,
    refetch: (props) => fetch(props || params),
    reload,
    prefetch,
    dfetch,
  };
}
