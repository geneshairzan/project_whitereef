import { useState, useEffect } from "react";

export default function useAuth() {
  const [data, setdata] = useState({ isLoading: false });

  function get(target) {
    return data[target];
  }

  function set(target, value) {
    setdata({ ...data, [target]: value });
  }

  function setOnLoading() {
    setdata({ ...data, isLoading: true });
  }

  function setOffLoading() {
    setdata({ ...data, isLoading: false });
  }

  function closeSnack() {
    setdata({ ...data, snack: null });
  }

  return {
    ...data,
    set,
    get,
    setOnLoading,
    setOffLoading,
    closeSnack,
  };
}
