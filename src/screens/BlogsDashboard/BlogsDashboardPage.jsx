import React, { useEffect,useState }  from 'react';
import { Stack } from "@mui/system";
import { Typography, Grid, Divider, Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getOwnPost, deleteOwnPost, editOwnPost } from '../../store/dashboard/actions';
import {useNavigate } from "react-router";
import { HtmlRenderer } from '../../utils/defaultRender/index'
import axios from "../../axios/AxiosConfig";

export const BlogsDashboard = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.themeReducer);
  const { blogs } = useSelector((state) => state.dashboardReducer);
  const [userDetails, setUserDetails] = useState({
    id:"",
    firstName:"",
    lastName:"",
    displayName:"",
    avatar:"",
  });
  useEffect(() => {
    dispatch(getOwnPost())
    const id = localStorage.getItem("id");
    axios.get('http://182.176.170.176:2500/api/v1/user/getuser?id='+id)
      .then(response => {
        // Handle the successful response here
        console.log(response.data.data); // For example, log the response data
        // You can perform any additional logic here based on the response
        const userData = response.data.data;
        setUserDetails({
          id:userData.id,
          firstName:userData.firstName,
          lastName:userData.lastName,
          displayName:userData.displayName,
          avatar:userData.avatar,
        });
      })
      .catch(error => {
        // Handle errors here if the request fails
        console.error('Error:', error);
    });
  }, [])

  const deletePostHandler = (id) => {
    dispatch(deleteOwnPost({id}))
    dispatch(getOwnPost())
  }
  
  const editPostHandler = (id) => {
    dispatch(editOwnPost({id}))
    nav(`/story/${id}`)
  }
  console.log(blogs[0]);
  return (
    <Stack px={6} pb={6} bgcolor={ theme === 'black' ? '#27374D' : ''}>
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      pb={"66px"}
      pr={3}
      id="cryptocurrencynews"
    >
      <Typography
        sx={{
          fontSize: { lg: "3rem", xs: "1.5rem",  },
          fontWeight: { xs: "500" },
          whiteSpace:"nowrap" 
        }}
        color={theme === 'black' ? '#E4E4E4' : ''}
        fontFamily={"Inter"}
      >
        Your Blogs
      </Typography>
    </Stack>
      <Grid container spacing={3}>
        {
          blogs?.map((trend) => {
            return (
              <Stack px={"20%"}  pb={3} spacing={3} bgcolor= { theme === 'black' ? '#27374D' : ''} style={{width: '100%', cursor: 'pointer'}}>
                <Grid sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Stack>
                    <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={userDetails.avatar?userDetails.avatar:(trend.image)} />
                  </Stack>
                  <Stack>
                    <Typography 
                      sx={{
                        fontSize: { lg: "1.3rem", xs: "20px" },
                      }}
                      variant="p"
                      fontWeight={"bold"}
                      color={theme === 'black' ? '#E4E4E4' : ''}
                      onClick={() => nav(`/blogs/${trend.id}`)}
                    >
                      {trend?.title}
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography sx={{ fontSize: "12px" }} variant="p" color={theme === 'black' ? '#E4E4E4' : ''}>
                      {trend?.time} min
                    </Typography>
                  </Stack>
                  <Stack style={{display: 'flex', flexDirection: 'row', marginLeft: 'auto'}}>
                    <Button style={{marginRight: '1rem'}} variant="outlined" color="error" onClick={() => deletePostHandler(trend?.id)}>Delete</Button>
                    <Button variant="outlined" onClick={() => editPostHandler(trend?.id)}>Edit</Button>
                  </Stack>
                </Grid>
                <Stack py={'1rem'}>
                  <Typography
                      sx={{
                        fontSize: { lg: "1rem", xs: "20px" },
                      }}
                      variant="p"
                      fontFamily={"Inter"}
                      pt={'12px'}
                      color={theme === 'black' ? '#E4E4E4' : ''}
                      onClick={() => nav(`/blogs/${trend.id}`)}
                    >
                      <HtmlRenderer htmlString={trend?.description.slice(0, 400) + '...' || trend?.description} />
                    </Typography>
                </Stack>
                <Divider />
              </Stack>
            )
          })
        }
      </Grid>
  </Stack>
  )
}