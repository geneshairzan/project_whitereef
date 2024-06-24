import React, { useEffect } from "react";

import UI from "@gh/ui";
import AuthCode from "react-auth-code-input";
import Label from "./label";

const Passcode = React.forwardRef(({ noLabel, length, onClear, ...props }, ref) => {
  return (
    <UI.Col
      width="max-content"
      sx={{
        "& .vcodeInput": {
          width: 48,
          height: 48,
          fontSize: 24,
          textAlign: "center",
          mr: 2,
        },
        "& .vcodeContainer": {
          display: "flex",
          justifyContent: "space-between",
        },
      }}
    >
      {!noLabel && <Label label={props.label} tip={props.tip} />}
      <AuthCode
        ref={ref}
        length={length}
        allowedCharacters="numeric"
        inputClassName="vcodeInput"
        containerClassName="vcodeContainer"
        {...props}
      />
    </UI.Col>
  );
});

export default Passcode;

// export default function App({ noLabel, length, onClear, ref, ...props }) {
//   return (
//     <UI.Col
//       width="max-content"
//       sx={{
//         "& .vcodeInput": {
//           width: 48,
//           height: 48,
//           fontSize: 24,
//           textAlign: "center",
//           mr: 2,
//         },
//         "& .vcodeContainer": {
//           display: "flex",
//           justifyContent: "space-between",
//         },
//       }}
//     >
//       {!noLabel && <Label label={props.label} tip={props.tip} />}
//       <AuthCode
//         length={length}
//         allowedCharacters="numeric"
//         inputClassName="vcodeInput"
//         containerClassName="vcodeContainer"
//         {...props}
//       />
//     </UI.Col>
//   );
// }
