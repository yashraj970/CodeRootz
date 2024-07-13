import React, { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { rootColors } from "../../utilities/Colors/Colors";
import MenuIcon from "@mui/icons-material/Menu";
// import AccountMenu from "../AccountMenu/AccountMenu";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        background: "#1B1B1B",
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {navLinks.map((text, index) => (
          <Link
            key={text.path}
            to={text.path}
            style={{
              textDecoration: "none",
              color: "#FFFFFF",
            }}
          >
            <ListItem key={text?.title} disablePadding>
              <ListItemButton>
                <ListItemText primary={text?.title} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider sx={{ bgcolor: "#FFFFFF" }} />
      <List>
        {["Login", "Signup"].map((text, index) => (
          <Link
            key={index}
            to={text === "Signup" ? "/signup" : "/login"}
            style={{
              textDecoration: "none",
              color: "#FFFFFF",
            }}
          >
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <nav
      style={{
        display: "flex",
        top: 0,
        zIndex: 1000,
        position: "sticky",
        boxSizing: "border-box",
        height: "3rem",
        backgroundColor: rootColors?.grey,
        color: rootColors?.text,
        padding: "10px 34px",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "60px",
          display: { xs: "none", md: "flex" },
        }}
      >
        <Stack>
          <AccountMenu />
        </Stack>
      </Stack> */}
      <Stack onClick={toggleDrawer(true)} sx={{ cursor: "pointer" }}>
        <MenuIcon />
      </Stack>
      <Stack>CodeRootz</Stack>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </nav>
  );
};

export default Navbar;

const navLinks = [
  {
    title: "User Management",
    path: "/usermanagement",
  },
  {
    title: "Role Management",
    path: "/rolemanagement",
  },
  {
    title: "Dummy Menu 1",
    path: "/calllogs",
  },
  { title: "Dummy Menu 2", path: "/contactlist" },

  { title: "Dummy Menu 3", path: "/billing" },
  { title: "Dummy Menu 4", path: "/campaigns" },
  { title: "Dummy Menu 5", path: "/campaigns" },
];
