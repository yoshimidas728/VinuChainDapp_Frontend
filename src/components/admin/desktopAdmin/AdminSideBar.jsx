import { Badge } from "@mui/base";
import {
  Card,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { sideBarList } from "../../../common/data";

const AdminSideBar = () => {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const handlePath = (path) => {

    if (token) {
      console.log(path);
      nav(path);
    }
  };
  return (
    <>
      <Card sx={{ height: "80vh", borderRadius: "25px" }} elevation={5}>
        <Stack
          sx={{ backgroundColor: "#ffffff" }}
          
        >
          <Drawer
            sx={{
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                position: "inherit",
                borderRight: "0px",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <List>
              {sideBarList.map(({ icon, text, path }, index) => (
                <ListItem
                  key={text}
                  sx={{
                    paddingY: "8px",
                    paddingX: "8px",
                    display: text === "Logout" && !token ? "none" : "inherit",
                  }}
                >
                  <ListItemButton
                    sx={{ marginInlineStart: 1, marginInlineEnd: 1 }}
                    onClick={() => handlePath(path)}
                    className={
                      path === location.pathname
                        ? "sidebarStyle"
                        : "sidebarUnstyle"
                    }
                  >
                    <ListItemIcon
                      sx={{
                        color: path === location.pathname ? "black" : "#98A3B3",
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Stack>
      </Card>
    </>
  );
};

export default AdminSideBar;
