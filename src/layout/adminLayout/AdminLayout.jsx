import { Stack, Typography } from "@mui/material";
import React from "react";
import AdminSideBar from "../../components/admin/desktopAdmin/AdminSideBar";

const AdminLayout = ({ children }) => {
  return (
    <Stack minHeight={"80vh"} py={"2em"} direction={"row"}>
      <Stack width={"20%"} px={2} display={{ xs: "none", md: "inherit" }}>
        <AdminSideBar />
      </Stack>
      <Stack flexGrow={1} alignItems={"center"}>
        <Typography variant="h4">Welcome to Admin Dashboard</Typography>
        {children}
      </Stack>
    </Stack>
  );
};

export default AdminLayout;
