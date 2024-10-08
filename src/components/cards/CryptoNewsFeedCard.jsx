import { Container, Typography, Link, Grid, Stack } from "@mui/material";
import React from "react";
import feedImage from "../../assets/images/feedImage.svg";
import AdSense from 'react-adsense';
import { useNavigate } from "react-router";
import { HtmlRenderer } from '../../utils/defaultRender/index'

const CryptoNewsFeedCard = ({
  bgaColor,
  textColor,
  underlineStyle,
  headingColor,
  posts,
  part,
  tag
}) => {
  const nav = useNavigate();
  let RandomPosition= Math.floor(Math.random() * 3);
  return (
    <Stack
      sx={{
        background: bgaColor,
        borderRadius: 6
      }}
      p={[1,2,2,2]}
      spacing={4}
      color={textColor}
      width={["100%", "100%", "400px"]}
    >
      <Link
        component="text"
        sx={{ cursor: "pointer" }}
        underline={underlineStyle}
        textAlign={{ xs: "center", md: "start" }}
        color={headingColor}
      >
        {tag}
      </Link>
      <Grid container xs={12} gap={2}>
        {
          posts?.length > 0 && posts.map((post, index) => {
            if(index<3){
              if(index===RandomPosition){
                return (
                  <>
                  <Grid item xs={12}>
                    <Stack direction={"column"} height={"100%"} >
                      <Stack
                        className="border"
                        direction={"row"}
                        spacing={1}
                        height={"100%"}
                        justifyContent={"space-between"}
                      >
                        <AdSense.Google
                          client='ca-pub-7292810486004926'
                          slot='7806394673'
                          style={{width: 500, height: 100, float: 'left'}}
                          layout='in-article'
                          format='somethibg ekse '
                        />
                      </Stack>
                    </Stack>
                  </Grid>
                  
              <Grid item xs={12}>
                <Stack direction={"column"} height={"100%"} >
                  <Stack
                    direction={"row"}
                    spacing={1}
                    height={"100%"}
                    justifyContent={"space-between"}
                  >
                    <Stack style={{cursor: 'pointer'}} onClick={() => nav(`/blogs/${post?.id}`)}>
                      <Typography 
                        sx={{
                          fontSize: { xs: "1rem", sm: "1rem", md: "1rem" },
                          fontWeight: 'bold',
                          fontFamily:"Inter",
                          lineHeight:"16.94px",
                        }}  
                        width={["100%","100%","400px"]}
                      >
                        {post?.title}
                      </Typography>
                      <Typography fontFamily={"Inter"} lineHeight={"16.94px"}>
                        {/* {post?.description?.slice(0, 150)} */}
                        <div style={{display:"flex", flexWrap:"wrap"}}>
                          <HtmlRenderer htmlString={post?.description?.slice(0, 150) || ""} />

                        </div>
                      </Typography>
                      <Typography fontFamily={"Inter"}> {post?.User.displayName}</Typography>
                    </Stack>
                    <img src={post?.image} style={{height: '4rem', width: 'auto'}} />
                  </Stack>
                </Stack>
              </Grid>
                  </>
                )
              }
            return (
              <Grid item xs={12}>
                <Stack direction={"column"} height={"100%"} >
                  <Stack
                    direction={"row"}
                    spacing={1}
                    height={"100%"}
                    justifyContent={"space-between"}
                  >
                    <Stack style={{cursor: 'pointer'}} onClick={() => nav(`/blogs/${post?.id}`)}>
                      <Typography 
                        sx={{
                          fontSize: { xs: "1rem", sm: "1rem", md: "1rem" },
                          fontWeight: 'bold',
                          fontFamily:"Inter",
                          lineHeight:"16.94px",
                        }}  
                        width={["100%","100%","400px"]}
                      >
                        {post?.title}
                      </Typography>
                      <Typography fontFamily={"Inter"} lineHeight={"16.94px"}>
                        {/* {post?.description?.slice(0, 150)} */}
                        <div style={{display:"flex", flexWrap:"wrap"}}>
                          <HtmlRenderer htmlString={post?.description?.slice(0, 150) || ""} />

                        </div>
                      </Typography>
                      <Typography fontFamily={"Inter"}> {post?.User.displayName}</Typography>
                    </Stack>
                    <img src={post?.image} style={{height: '4rem', width: 'auto'}} />
                  </Stack>
                </Stack>
              </Grid>
            )
            }
          })
        }
      </Grid>
    </Stack>
  );
};

export default CryptoNewsFeedCard;
