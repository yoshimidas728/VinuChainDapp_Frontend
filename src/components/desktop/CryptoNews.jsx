import { Button, Link, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect } from "react";
import CryptoNewsCarousal from "../carousal/CryptoNewsCarousal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import { getTrendingPosts, clearState } from '../../store/trending_blogs/actions'


const CryptoNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { trending_blogs } = useSelector((state) => state.trendingPost);

  const { theme } = useSelector((state) => state.themeReducer);

  useEffect(() => {
    // dispatch(clearState())
    dispatch(getTrendingPosts({
      page:1,
      size:10
  }))
  }, [])


  return (
    <Stack px={6}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        pb={"6px"}
        sx={{
          pr:0
        }}
        pr={3}
        id="cryptocurrencynews"
      >
        <Typography
          sx={{
            fontSize: { lg: "2rem", xs: "1rem",  },
            fontWeight: { xs: "500" },
            whiteSpace:"nowrap" 
          }}
          color={theme === 'black' ? '#E4E4E4' : ''}
          fontFamily={"Inter"}
        >
          Top Picks on Inkspire
        </Typography>
        <Button 
          sx={{ 
            color: theme === 'white' ? "black" : '#E4E4E4', 
            fontFamily: "Inter", 
            whiteSpace:"nowrap", 
            fontSize:{xs:".5rem",  md:"1rem", lg:"1rem"}
          }}
          onClick={() => navigate('/trends')}
        >
          See All
        </Button>
      </Stack>
      <Stack>
        <CryptoNewsCarousal trendingBlogs={trending_blogs}/>
      </Stack>
    </Stack>
  );
};

export default CryptoNews;
