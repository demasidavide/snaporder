import { useState } from "react";

export function useAlertError() {
  const [alertError, setAlertError] = useState({
    open: false,
    message: "",
  });

  const handleAlertError = (message) => {
    setAlertError({ open: true, message: message });
    setTimeout(() => setAlertError({ open: false, message: "" }), 3000);
  };

  return { alertError,setAlertError,handleAlertError };
}
