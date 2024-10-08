import { Image } from "@mui/icons-material";
import { Chip, Paper, Stack, Typography, Button, Card, CardMedia, CardContent, CardActions } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import blogImg from "../../assets/images/blogImg.jpeg"

const CryptoNewsCard = ({ blog, own, deletePostHandler, editPostHandler }) => {
  const nav = useNavigate();
  
  // Create a new DOMParser instance
  const parser = new DOMParser();
  // Parse the HTML string into a document object
  const doc = parser.parseFromString(blog.description, 'text/html');
  const imageElement = doc.querySelector('img');
  const imageSrc = imageElement ? imageElement.getAttribute('src') : '';
  return (
    <>
      <Card sx={{ bgcolor: "black",  minHeight:320, borderRadius:5 }} onClick={() => nav(`/blogs/${blog.id}`)}>
        <CardMedia
          sx={{ height: 190 }}
          image={imageSrc?imageSrc:blogImg}
          title="blog image"
        />
        <CardContent>
        <Stack  justifyContent={"space-between"} minHeight={130}>
          <Stack spacing={2} >
            <Typography
              color={"white"}
              fontWeight={"bold"}
              fontFamily={"Inter"}
              display="flex"
              flexWrap="wrap"
              sx={{
                fontSize: { xs: "small", md: "large" },
                width:"100%"
              }}
            >
                {blog?.title || "Something Else"}
            </Typography>
            <Stack
              direction={"row"}
              gap={".5em"}
              flexWrap={"wrap"}
            >
              {
                blog?.tags?.map((tag) => {
                  return (
                    <Chip
                      label={tag || "Crypto Boom"}
                      sx={{
                        width: "fit-content",
                        backgroundColor: "white",
                        fontFamily: "Inter",
                        fontWeight: "bold",
                      }}
                    />
                  )
                })
              }
            </Stack>
          </Stack>

          {own && <Stack
            direction={"row"}
            justifyContent={"end"}
            color={"white"}
          >
           <Button style={{marginRight: '1rem'}} variant="outlined" color="error" onClick={() => deletePostHandler(blog.id)}>Delete</Button>
           <Button variant="outlined" onClick={() => editPostHandler(blog.id)}>Edit</Button>
          </Stack>}

          <Typography sx={{ fontSize: "12px"}} textAlign="right" variant="p" color={'#E4E4E4'}>
              {blog?.time || "5"} min
            </Typography>
        </Stack>
        </CardContent>
      </Card>
      
    </>
  );
};

export default CryptoNewsCard;
