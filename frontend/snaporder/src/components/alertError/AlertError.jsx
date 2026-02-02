import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./AlertConfirm.css";
import * as React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertConfirm({ open, onClose, message }) {

  return (
    <Dialog
      className="dialog-alert-confirm"
      open={open}
      slots={{
        transition: Transition,
      }}
      keepMounted
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert variant="filled" severity="success">
          {message}
        </Alert>
      </Stack>
    </Dialog>
  );
}
