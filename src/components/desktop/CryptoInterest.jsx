import { Chip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router";


const CryptoInterest = () => {
  const nav = useNavigate();

  const { theme } = useSelector((state) => state.themeReducer)
  const [tags, setTags] = useState([
    'Technology',
    'Innovation',
    'Finance',
    'News',
    'LifeStyle',
    'Entertainment',
    'Sports',
    'Arts',
    'Education',
    'Travel',
  ])


  const chipSelectionHandler = (chip) => {
    nav(`/trends/category/${chip}`)
  }

  return (
    <>
      <Stack
        alignItems={"center"}
        py="2em"
        px={6}
        mt={8}
        spacing={3}
        id="chooseyourointerest"
      >
        <Typography 
          sx={{  fontSize: { lg: "4rem", xs: "1.5rem",  },
          fontWeight: { xs: "500" },
          whiteSpace:"nowrap"}}
          color={theme === 'black' ? '#E4E4E4' : ''}
        >
          Choose Your Interest
        </Typography>
        <Stack
          display={"flex"}
          direction={"row"}
          gap={"2em"}
          width={"100%"}
          overflow={"auto"}
        >
          {
            tags?.map((tag) => {
              return (
                <Chip
                  label={tag}
                  sx={{ width: "200px", fontFamily: "Inter", bgcolor: theme === 'black' ? '#F3F3F3' : '' , color: theme === 'black' ? '#000000' : '' }}
                  onClick={() => chipSelectionHandler(tag)}
                />
              )
            })
          }
        </Stack>
      </Stack>
    </>
  );
};

export default CryptoInterest;
