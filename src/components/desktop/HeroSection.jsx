import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import HeroSectionCarousal from "../carousal/HeroSectionCarousal";
import desktopBG from "../../assets/images/desktopBG.svg";
import { useSelector } from 'react-redux'
import { useState } from "react";
import SmallCardsC from './SmallCards';
import '../../assets/fonts/ABCSocial.woff2'
import '../../assets/fonts/Inter-roman.woff2'

const HeroSection = () => {
  const { theme } = useSelector((state) => state.themeReducer)

  const [smallCardsText, setSmallCardstext] = useState([
    {
      text: 'Earn Crypto Rewards',
      description: 'Your creativity is valuable, and we believe in rewarding you for sharing your thoughts and ideas with the world.',
      color: '741010'
    },
    {
      text: 'Connect with Ease',
      description: 'Engage in meaningful discussions with fellow writers, and explore captivating content that sparks your curiosity.',
      color: '007AFF'
    },
    {
      text: 'Publishing is Free',
      description: 'No fees, no subscriptions. Just the freedom to express yourself and be heard',
      color: '34C759'
    },
    {
      text: 'Secure Environment',
      description: 'No fees, no subscriptions. Just the freedom to express yourself and be heard.',
      color: '741010'
    },
    {
      text: 'Discover Captivating Content',
      description: 'Explore a world of captivating content across various genres and topics.',
      color: '007AFF'
    },
    {
      text: 'Creative Freedom',
      description: 'Embrace creative freedom without restrictions. Inkspire allows you to express yourself authentically and without limitations.',
      color: '34C759'
    },
  ])

  const [smallCardsHeaadeing, setSmallCardsHeadings] = useState([
    {
      text: 'Empower your voice. Inspire through words.',
      textColor: '#323232',
      subText: 'Start publishing with crypto rewards.',
      subTextColor: '#9F9F9F'
    },
  ])

  return (
    <Stack
      sx={{
        backgroundImage: `url(${desktopBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        objectFit: "cover",
      }}
      pl={[3, 3, 11, 11]}
      pt={[2, 3, 11, 11]}
    >
      <Grid container xs={12} minHeight={"100vh"}>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{
              fontSize: { xs: "2em", sm: "3em", md: "4rem" },
              fontWeight: { xs: "375" },
              fontFamily: "ABCSocial",
            }}
            lineHeight= {["45px","64px","64px","64px"]}
            fontSize={["64px","80px"]}
            mb={[1,1,3,3]}
            color={theme === 'black' ? '#E4E4E4' : ''}
            id="cryptocurrencyworld"
          >
            Unleash your Creative Potential
          </Typography>
          <Typography
            fontWeight={"200"}
            sx={{ fontSize: { lg: "19px", md: "19px",sm:"15px", sx: "10px" } }}
            fontFamily={"InterRoman"}
            color={theme === 'black' ? '#E4E4E4' : ''}
          >
            Join our vibrant community and embark on a rewarding writing journey. Get rewarded as both a writer and reader!
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <HeroSectionCarousal />
        </Grid>
        <Stack style={{}}>
          <Stack>
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.5rem", md: "2rem" },
                fontWeight: { xs: "400" },
                fontFamily: "Josefin Sans",
                lineHeight: "25px",
              }}
              mb={1}
              color={theme === 'black' ? '#E4E4E4' : ''}
              id="cryptocurrencyworld"
            >
              {smallCardsHeaadeing[0].text + " "} 
              <span style={{color: `${smallCardsHeaadeing[0].subTextColor}`}}>
                {smallCardsHeaadeing[0].subText}
              </span>
            </Typography>
          </Stack>
          <Stack style={{paddingTop: '1rem'}}>
            <SmallCardsC trendingBlogs={smallCardsText} />
          </Stack>
        </Stack>
      </Grid>
    </Stack>
  );
};

export default HeroSection;
