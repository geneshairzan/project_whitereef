import { useState, useEffect } from "react";
import { fetcher } from "@/app/_component/gh/helper/useFetch";

export default function useAuth() {
  const [data, setdata] = useState("loading");

  function signin(res) {
    setdata(res);
    localStorage.setItem("AuthUser", JSON.stringify(res));
    res?.token && localStorage.setItem("AuthToken", res?.token);
  }
  function signout() {
    setdata();
    localStorage.removeItem("AuthUser");
    localStorage.removeItem("AuthToken");
  }

  function locSuccess(position) {
    setdata({ ...data, loc: [position.coords.latitude, position.coords.longitude] });
  }

  function locErr(position) {
    console.log("Geolocation not supported");
  }

  useEffect(() => {
    let cache = getChachedUser();
    if (cache?.id) {
      check();
      // setdata(cache);
    } else {
      signout();
    }
  }, []);

  useEffect(() => {
    //navigator.userAgent
    if (data?.id) {
      navigator?.geolocation && navigator.geolocation.getCurrentPosition(locSuccess, locErr);
    }
  }, [data?.id]);

  async function check() {
    let res = await fetcher({
      url: `auth/me`,
      method: "post",
    });
    res?.data?.id ? signin(res.data) : signout();
  }

  return {
    user: data,
    signin,
    signout,
    check,
  };
}

function getChachedUser() {
  try {
    return JSON.parse(localStorage.getItem("AuthUser"));
  } catch (error) {
    return {};
  }
}
