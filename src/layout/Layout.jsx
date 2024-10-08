import { Stack } from "@mui/system";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Stack>
      <Header />
      {children}
      <Footer />
    </Stack>
  );
};

export default Layout;
