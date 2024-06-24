import React, { useEffect, useState } from "react";

import { Skeleton, Stack } from "@mui/material";

export default function App({ src, sx, ...props }) {
  const [err, seterr] = useState(false);
  // if (err) return <Skeleton variant="rectangular" width={"100%"} height={"100%"} />;

  return (
    <img
      src={process.env.NEXT_PUBLIC_APP_URL + "/api/file/" + src}
      alt=""
      style={{
        objectFit: "cover",
        width: "100%",
        height: "100%",
        ...sx,
      }}
      onError={(currentTarget) => {
        currentTarget.onerror = null;
        seterr((p) => true);
      }}
    />
  );
}
