import React, { useState } from "react";

export default function name(initialState = { state: false, value: 0 }) {
  const [value, setValue] = useState(initialState);

  return {
    v: value,
    set: setValue,
    setOff: () => setValue({ ...value, state: false }),
    setOn: () => setValue({ ...value, state: true }),
    toggle: () => setValue({ ...value, state: !value.state }),
  };
}
