import { useState } from "react";

export function useAlertConfirm() {
  const [alertConfirm, setAlertConfirm] = useState({
    open: false,
    message: "",
  });

  const handleAlertConfirm = (message) => {
    setAlertConfirm({ open: true, message: message });
    setTimeout(() => setAlertConfirm({ open: false, message: "" }), 2000);
  };

  return { alertConfirm,setAlertConfirm,handleAlertConfirm };
}
