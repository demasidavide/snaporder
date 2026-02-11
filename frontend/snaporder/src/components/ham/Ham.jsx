import { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import List from "@mui/material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

export default function Ham() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem>
          <ListItemButton
          
          >
            <AccountCircleIcon></AccountCircleIcon>
            Account
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton
          onClick={()=> navigate('/create')}
          >
            <MenuBookIcon></MenuBookIcon>
            Gestisci Menu
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <SettingsIcon></SettingsIcon>
            Impostazioni
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <DataUsageIcon></DataUsageIcon>
            Dati
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <MenuRoundedIcon
        className="menu"
        onClick={toggleDrawer(true)}
      ></MenuRoundedIcon>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
