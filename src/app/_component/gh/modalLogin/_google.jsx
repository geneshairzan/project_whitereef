import React, { useState, useEffect } from "react";

import UI from "@/app/_component/gh/ui";
import Icon from "@/app/_component/gh/icon";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";

import useFetch from "@/app/_component/gh/helper/useFetch";

import Context from "@/app/_component/context/app";

export default function Google({ onLogged }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH}>
      <CustomLogin onLogged={onLogged} />
    </GoogleOAuthProvider>
  );
}

function CustomLogin({ onLogged }) {
  const { auth, app } = React.useContext(Context);
  const data = useFetch();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      let res = await data.fetch({
        url: "auth/sociallogin",
        method: "post",
        data: { access_token: tokenResponse.access_token },
      });
      if (res?.id) {
        auth.signin(res);
        onLogged();
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <>
      <UI.Button startIcon={<Icon.Google />} variant="outlined" onClick={login}>
        Sign in with google
      </UI.Button>
    </>
  );
}
