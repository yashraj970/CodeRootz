import React, { useState, useEffect } from "react";
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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    console.log(storedRole, "storedRole");
    if (storedRole) {
      setRole(JSON.parse(storedRole));
    }
  }, []);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const getNavLinks = () => {
    if (!role) return [];
    return navLinks.filter((link) => role.menus.includes(link.title));
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
        {getNavLinks().map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              textDecoration: "none",
              color: "#FFFFFF",
            }}
          >
            <ListItem key={link.title} disablePadding>
              <ListItemButton>
                <ListItemText primary={link.title} />
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
    title: "Menu 1",
    path: "/menu1",
  },
  { title: "Menu 2", path: "/menu2" },
  { title: "Menu 3", path: "/menu3" },
  { title: "Menu 4", path: "/menu4" },
  { title: "Menu 5", path: "/menu5" },
];
