import { Stack } from "@mui/system";
import React from "react";
import DesktopAdminComponent from "../../components/admin/desktopAdmin/DesktopAdminComponent";
import DesktopComponent from "../../components/desktop/DesktopComponent";

const DesktopScreen = () => {
  const userRole = localStorage.getItem("role");
  return (
    <Stack>
      {userRole === "admin" ? <DesktopAdminComponent /> : <DesktopComponent />}
    </Stack>
  );
};

export default DesktopScreen;
