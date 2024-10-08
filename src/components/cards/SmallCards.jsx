import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";


const SmallCards = ({ blog }) => {
  const { theme } = useSelector((state) => state.themeReducer);

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          bgcolor: theme === 'black' ? '#DEF4FD' : "white",
          px: ["2px","1em"],
          borderRadius: "30px",
          overflow: 'hidden'
        }}
        style = {{ height: '10.5rem' }}
        width={["20rem","15rem","17rem","19rem"]}
      >
        <Stack justifyContent={"space-between"} display={"flex"} flexWrap={"wrap"} overflow={"auto"} >
          <Stack spacing={2} p={2}>
            <Typography
              color={`#${blog?.color}`}
              fontWeight={"bold"}
              fontFamily={"Inter"}
              sx={{
                fontSize: { xs: "small", md: "large" },
              }}
              whiteSpace={"nowrap"}
              display={"flex"}
              flexWrap={"wrap"}
              overflow={"hidden"}
            >
              {blog?.text}
            </Typography>
            <Typography
                fontSize={["12px","15px"]}
            >
              {blog?.description}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};

export default SmallCards;
