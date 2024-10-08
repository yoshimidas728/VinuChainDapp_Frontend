/* eslint-disable no-restricted-globals */
import {
  Stack,
  ToggleButton,
  Typography,
  Chip,
  Button,
  CardContent,
  CardMedia,
  CardActions,
  Card,
  Input,
} from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import SmsIcon from "@mui/icons-material/Sms";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import React, { useEffect, useState } from "react";
import { padding } from "@mui/system";
import { useNavigate } from "react-router";
import { getLikePost, likePost, createNewComment, getPostsComments, clearState } from "../../store/post/actions";
import { getSinglePost } from "../../store/trending_blogs/actions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from '../../axios/AxiosConfig'
import { HtmlRenderer } from '../../utils/defaultRender/index'

const BlogsScreen = () => {
  const [selected, setSelected] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { likes, loading, comments, likesDetails } = useSelector((state) => state.post);
  const { single_trending_post, single_trending_post_related_posts } = useSelector((state) => state.trendingPost);
  const  user  = useSelector((state) => state?.auth?.user);  
  const [totalLike, setTotalLike] = useState();
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [ comment, setComment ] = useState('')
  const [postId, setPostId] = useState(location.pathname.split('/')[2])
  const { theme } = useSelector((state) => state.themeReducer);
  const { profile } = useSelector((state) => state.profileReducer);

  let url =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTODgikvgcP-cKJ4XFH0nO-OaFPzVNKT9kzjg&usqp=CAU";
  const data = [
    {
      title: "Mega design",
      count: "232",
      img: "https://vitejs.dev/og-image.png",
    },
    {
      title: "Vite ethics",
      count: "232",
      img: "https://vitejs.dev/og-image.png",
    },
    {
      title: "Structure",
      count: "232",
      img: "https://vitejs.dev/og-image.png",
    },
    {
      title: "Vite design",
      count: "232",
      img: "https://vitejs.dev/og-image.png",
    },
  ];

  const handleButtonClick = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setComment('');
  };

  useEffect(() => {
    // dispatch(clearState())
    dispatch(getPostsComments({postId}));
    dispatch(getLikePost(postId));
    const id = localStorage.getItem("id");
    console.log(likesDetails);
    console.log(id)
    if(id){
      console.log("in")
      likesDetails.forEach(likedetails => {
        if(likedetails.UserId==id){
            setSelected(true);
            console.log("running",likedetails.UserId===id)
        }
      });
    }
  }, []);

  useEffect(() => {
    if (likes) {
      
      setTotalLike(likes);
    }
  }, [likes]);

  useEffect(() => {
    // dispatch(clearState())
    dispatch(getSinglePost({query: postId}));
  }, [])

  // const addRewardhandler = () => {
  //   if(user){
  //     axios.post(`/impression`, {
  //       PostId: location.pathname.split('/')[2],
  //       UserId: user.id
  //     }).then((res) => {
  //       toast.success('Impression Created')
  //     }).catch((err) => {
  //       if(err?.response?.data?.error){
  //       }
  //     })
  //   }else {
  //     toast.error('Please Login First')
  //   }
  // }

  const impressionsHandler = (interval) => {
    clearInterval(interval)
    axios.post(`/impression`, {
      PostId: location.pathname.split('/')[2],
      UserId: user.id
    }).then(() => {
      toast.success('Impression Created')
      return;
    }).catch(() => {
      return
    })
  }

  useEffect(() => {
    let first = false;
    let interval;
    console.log(user);
    if(!first && user){
      interval = setInterval(() => {
        first = true
        impressionsHandler(interval)
      }, (single_trending_post?.time > 5 ? (((parseInt(single_trending_post?.time)) / 3 ) * 60 * 1000) : parseInt(single_trending_post?.time) * 60))
    }
  }, [])

  const handleLike = () => {
    const payload = {
      postid: postId,
    };
    dispatch(likePost(payload));
    setSelected(!selected);
  };

  const handleReplyHandler = () => {
    dispatch(createNewComment({
      postid: postId,
      description: comment
    }))
    handleCloseDrawer();
  }

  const addToClipBoardHandler = () => {
    navigator.clipboard.writeText(window.location.toString())
    toast.success('Link Copied Successfully')
  }
  console.log(single_trending_post);

  return (
    <>
      <Stack px={"20%"} py={"3em"} pb={3} spacing={3} bgcolor= { theme === 'black' ? '#27374D' : ''} >
          <Typography
            sx={{
              fontSize: { lg: "3rem", xs: "20px" },
            }}
            variant="h3"
            fontFamily={"Inter"}
            fontWeight={"bold"}
            color={theme === 'black' ? '#E4E4E4' : ''}
          >
            {single_trending_post?.title}
          </Typography>
        <Grid sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Stack>
            <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={single_trending_post.User?.avatar || url} />
          </Stack>
          <Stack>
            <Typography variant="h6" color={theme === 'black' ? '#E4E4E4' : ''}>
              {single_trending_post.User?.displayName||"Rumbi"} &nbsp;
              {/* <span>
                <Chip
                  label="Follow "
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                />
              </span>{" "} */}
            </Typography>
            <Typography sx={{ fontSize: "12px" }} variant="p" color={theme === 'black' ? '#E4E4E4' : ''}>
              {single_trending_post?.time || "5"} min read .&nbsp; May 10
            </Typography>
          </Stack>
        </Grid>
        <Stack
          direction={"row"}
          borderTop={"1px solid gray"}
          borderBottom={"1px solid gray"}
          justifyContent={"end"}
        >
          <Stack alignItems={"center"}>
            <ToggleButton
              value="check"
              selected={selected}
              onChange={() => {
                handleLike();
              }}
              sx={{
                border: "none !important",
                borderRadius: "50px !important",

                ":hover": {
                  bgcolor: "white",
                  color: "red",
                },
                "&.Mui-selected, &.Mui-selected:hover": {
                  color: "white",
                  backgroundColor: "white",
                },
              }}
            >
              <FavoriteIcon
                sx={{
                  fill: selected ? "red" : "currentcolor",
                  color: theme === 'black' ? '#E4E4E4' : ''
                }}
              />
            </ToggleButton>
            <Typography color={theme === 'black' ? '#E4E4E4' : ''}>{totalLike}</Typography>
          </Stack>
          <ToggleButton
            sx={{
              border: "none !important",
              borderRadius: "50px !important",
              color: theme === 'black' ? '#E4E4E4' : '',

              ":hover": {
                bgcolor: theme === 'black' ? '#27374D' : "white",
                color: "blue",
              },
              "&.Mui-selected, &.Mui-selected:hover": {
                color: "white",
                backgroundColor: "white",
              },
            }}
            onClick={() => addToClipBoardHandler()}
          >
            <ShareIcon />
          </ToggleButton>
          <ToggleButton
            onClick={handleButtonClick}
            sx={{
              border: "none !important",
              borderRadius: "50px !important",
              color: theme === 'black' ? '#E4E4E4' : '',

              ":hover": {
                bgcolor: theme === 'black' ? '#27374D' : "white",
                color: "green",
              },
              "&.Mui-selected, &.Mui-selected:hover": {
                color: "white",
                backgroundColor: "white",
              },
            }}
          >
            <SmsIcon />
          </ToggleButton>
        </Stack>
        <Stack>
          <Drawer
            PaperProps={{
              sx: {
                width: 250, // Set the desired width here
                padding: "20px",
              },
            }}
            anchor="right"
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="text"
              label="What are your thoughts ?"
              name="name"
              autoComplete="name"
              onChange={(e) => setComment(e.target.value)}
              autoFocus
            />
            <hr />
            <Grid sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Stack>
                <Avatar
                  sx={{ width: 56, height: 56 }}
                  alt="Remy Sharp"
                  src={url}
                />
              </Stack>
              <Stack>
                <Typography variant="h6">Chris </Typography>
                <Typography sx={{ fontSize: "12px" }} variant="p">
                  5 days ago
                </Typography>
              </Stack>
            </Grid>
            <Typography
              fontFamily={"Inter"}
              sx={{ fontSize: "12px", textAlign: "start", marginTop: "1rem" }}
            >
              Lorem ipsum may be used as a placeholder before final copy is
              available.
            </Typography>
            <Stack
              sx={{
                display: "-webkit-inline-box",
                justifyContent: "space-between",
              }}
            >
              <div>
                <ThumbUpIcon />
              </div>

              <Typography sx={{ cursor: "pointer" }} variant="p" onClick={() => handleReplyHandler()}>
                Reply
              </Typography>
            </Stack>
          </Drawer>
        </Stack>
        { !token && (
          <Stack alignItems={"center"}>
            <Button
              onClick={() => nav("/login")}
              variant="outlined"
              sx={{ width: "fit-content" }}
            >
              Sign In to Leave a Comment
            </Button>
          </Stack>
        )
        }
        <Stack>
          {/* <div style={{display: 'block', textAlign: 'end'}}>
            <Button
                sx={{
                  borderRadius: "15px",
                  color: "white",
                  bgcolor: "black",
                  ":hover": {
                    bgcolor: "white",
                    color: "red",
                  },
                }} 
                onClick={addRewardhandler}
              >
                Add Reward
              </Button>
          </div> */}
          {single_trending_post?.image && ( <>
            <img src={single_trending_post?.image} style={{height: '35rem', width: 'auto'}} />
          </>)}
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography fontFamily={"Inter"} mt={3}  color={theme === 'black' ? '#E4E4E4' : ""}>
              <HtmlRenderer htmlString={single_trending_post?.description || ""} />
            </Typography>
          </div>
        </Stack>
        <Stack>
          <Typography variant="h5" fontFamily={"Inter"} fontWeight={"bold"} color={theme === 'black' ? '#E4E4E4' : ""}>
            Thank You
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          gap={".5em"}
          flexWrap={"wrap"}
        >
          {
            single_trending_post?.tags?.map((tag) => {
              return (
                <Chip
                  label={tag}
                  sx={{
                    width: "fit-content",
                    backgroundColor: "black",
                    color: "white",
                    fontFamily: "Inter",
                    fontWeight: "bold",
                  }}
                />
              )
            })
          }
        </Stack>
        <Stack
        >
          <Typography variant="h5" fontFamily={"Inter"} fontWeight={"bold"} color={theme === 'black' ? '#E4E4E4' : ""}>
            Comments
          </Typography>
          <div>
            {
              comments?.map((comment) => {
                if(comment?.User){
                  return (
                    <div style={{marginTop: '2rem', paddingLeft: '2rem'}}>
                      <Grid sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <Stack>
                          <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={comment?.User?.avatar} />
                        </Stack>
                        <Stack>
                          <Typography variant="p" fontFamily={"Inter"} fontWeight={"bold"} color={theme === 'black' ? '#E4E4E4' : ""}>
                            {comment?.User?.displayName}
                          </Typography>
                        </Stack>

                      </Grid>
                      <Typography>
                        {comment?.description}
                      </Typography>
                    </div>
                  )
                }
              })
            }
          </div>
        </Stack>
        <Grid
          md={12}
          mb={3}
          sx={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            mx: { lg: "3rem", md: "2rem", xs: "3rem" },
            borderTop:{xs:"1em"}
          }}
        >
          {single_trending_post_related_posts?.map((item) => {
            return (
              <Card sx={{ maxWidth: 300 }} onClick={() =>window.location.reload(nav(`/blogs/${item?.id}`))}>
                <CardMedia
                  sx={{ height: 140, width:300 }}
                  image={item?.image || "https://source.unsplash.com/random/200x200"}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title?.slice(0, 40) + '...' || ""}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {/* {item?.description?.slice(0, 150) + '...'} */}
                    <HtmlRenderer htmlString={item?.description?.slice(0, 40) + '...' || ""} />

                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Grid>
      </Stack>
    </>
  );
};

export default BlogsScreen;
