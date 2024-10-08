import { Stack } from "@mui/material";
import React from "react";
import CryptoInterest from "./CryptoInterest";
import CryptoNews from "./CryptoNews";
import CryptoNewsFeed from "./CryptoNewsFeed";
import HeroSection from "./HeroSection";
import { useSelector } from 'react-redux'

const DesktopComponent = () => {
  const { theme } = useSelector((state) => state.themeReducer)

  return (
    <Stack
      bgcolor={ theme === 'black' ? '#27374D' : ''}
    >
      <HeroSection />
      <CryptoNews />
      <CryptoInterest />
      <CryptoNewsFeed />
    </Stack>
  );
};

export default DesktopComponent;
