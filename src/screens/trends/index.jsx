import React, {useEffect, useState} from 'react';
import { Stack } from "@mui/system";
import { Typography, Grid, Avatar, Divider, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTrendingPosts, clearState } from '../../store/trending_blogs/actions'
import { getFilterPosts } from '../../store/post/actions'
import CryptoNewsCard from "../../components/cards/CryptoNewsCard";
import { useLocation, useNavigate } from 'react-router'
import { HtmlRenderer } from '../../utils/defaultRender/index'
import blogImg from "../../assets/images/blogImg.jpeg"
import { Button } from 'react-scroll';
import { Margin } from '@mui/icons-material';


const TrendsPage = () => {
  const location  = useLocation()
  const nav = useNavigate();
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.themeReducer);
  const { trending_blogs } = useSelector((state) => state.trendingPost);
  const { categoryBlogs } = useSelector((state) => state.post);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const parser = new DOMParser();

  const fetchNewData = async(number)=>{
    window.scrollTo(0, 0);
    setPage(page+number);
    if(maxPages>=page){
      console.log(maxPages);
      if(location.pathname.split('/')[2] === 'category'){
        // dispatch(clearState())
        dispatch(getFilterPosts({
          tag: location.pathname.split('/')[3],
          page:page,
          size:10
        }))
        setMaxPages(categoryBlogs?.pages)
      }else {
        // dispatch(clearState())
        dispatch(getTrendingPosts({
          page:page,
          size:10
        }))
        setMaxPages(trending_blogs?.pages)
      }
    }
  }
  useEffect(() => {
    if(maxPages>=page){
    console.log(page)
      if(location.pathname.split('/')[2] === 'category'){
        // dispatch(clearState())
        dispatch(getFilterPosts({
          tag: location.pathname.split('/')[3],
          page:page,
          size:10
        }))
        if(trending_blogs.count>10){
          setMaxPages(categoryBlogs?.pages)
        }else{
          setMaxPages(0)
        }
      }else {
        // dispatch(clearState())
        dispatch(getTrendingPosts({
          page:page,
          size:10
        }))
        if(trending_blogs.count>10){
          setMaxPages(trending_blogs?.pages)
        }else{
          setMaxPages(0)
        }
      }
    }
  }, [page])
  return (
    <Stack px={6} pb={6} bgcolor={ theme === 'black' ? '#27374D' : ''}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        pb={"66px"}
        pr={3}
        id="cryptocurrencynews"
        style={{justifyContent: 'center', marginBottom: '2rem'}}
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
          { location.pathname.split('/')[2] === 'category' ? location.pathname.split('/')[3]  : "Latest Trends"} 
        </Typography>
      </Stack>
        <Grid container spacing={3} style={{display: 'flex', justifyContent: 'center' }}>
          {location.pathname.split('/')[2] === 'category' ?
            categoryBlogs?.data?.map((trend) => {
              // Parse the HTML string into a document object
              const doc = parser.parseFromString(trend.description, 'text/html');
              const imageElement = doc.querySelector('img');
              const imageSrc = imageElement ? imageElement.getAttribute('src') : '';
              return (
                <Stack px={"20%"} onClick={() => nav(`/blogs/${trend?.id}`)}  pb={3} spacing={3} bgcolor= { theme === 'black' ? '#27374D' : ''} style={{width: '100%', cursor: 'pointer'}}>
                  <Grid sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Stack>
                      <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={trend?.User?.avatar} />
                    </Stack>
                    <Stack>
                      <Typography color={theme === 'black' ? '#E4E4E4' : ''}>
                        {trend?.User?.displayName}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography sx={{ fontSize: "12px" }} variant="p" color={theme === 'black' ? '#E4E4E4' : ''}>
                        {trend?.time || "5"} min
                      </Typography>
                    </Stack>
                  </Grid>
                  <Stack py={'1rem'} style={{width: '85%'}}>
                    <Typography
                      sx={{
                        fontSize: { lg: "1.3rem", xs: "20px" },
                      }}
                      variant="p"
                      color={theme === 'black' ? '#E4E4E4' : ''}
                    >
                        <Grid container spacing={8}>
                          <Grid item xs={12} sm={10} md={10}>
                            <strong>
                              {trend?.title}
                            </strong>
                            <HtmlRenderer htmlString={trend?.description.length > 400 ? trend?.description.slice(0, 400) + '...' : trend?.description} />  
                          </Grid>
                          <Grid item xs={12} sm={1} md={1}>
                            <img width={200} src={imageSrc?imageSrc:blogImg}/>
                          </Grid>
                        </Grid>             
                    </Typography>
                  </Stack>
                  <Divider />
                </Stack>
              )
            })
          :
            trending_blogs?.data?.map((trend) => {
              // Parse the HTML string into a document object
              const doc = parser.parseFromString(trend.description, 'text/html');
              const imageElement = doc.querySelector('img');
              const imageSrc = imageElement ? imageElement.getAttribute('src') : '';
              return (
                <Stack px={"20%"} onClick={() => nav(`/blogs/${trend?.id}`)}  pb={3} spacing={3} bgcolor= { theme === 'black' ? '#27374D' : ''} style={{width: '100%', cursor: 'pointer'}}>
                  <Grid sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Stack>
                      <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={trend?.User?.avatar} />
                    </Stack>
                    <Stack>
                      <Typography color={theme === 'black' ? '#E4E4E4' : ''}>
                        {trend?.User?.displayName}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography sx={{ fontSize: "12px" }} variant="p" color={theme === 'black' ? '#E4E4E4' : ''}>
                        {trend?.time} min
                      </Typography>
                    </Stack>
                  </Grid>
                  <Stack py={'1rem'} style={{width: '85%'}}>
                    <Typography
                      sx={{
                        fontSize: { lg: "1.3rem", xs: "20px" },
                      }}
                      variant="p"
                      color={theme === 'black' ? '#E4E4E4' : ''}
                    >
                        <Grid container spacing={8}>
                          <Grid item xs={12} sm={10} md={10}>
                            <strong>
                              {trend?.title}
                            </strong>
                            <HtmlRenderer htmlString={trend?.description.length > 400 ? trend?.description.slice(0, 400) + '...' : trend?.description} />  
                          </Grid>
                          <Grid item xs={12} sm={1} md={1}>
                            <img width={150} src={imageSrc?imageSrc:blogImg}/>
                          </Grid>
                        </Grid>             
                    </Typography>
                  </Stack>
                  <Divider />
                </Stack>
              )
            })
          }
          {(trending_blogs?.data.length>0)?
            <>
              {page>1?
                <button 
                  style={{
                    width:"100px", height:"40px", 
                    margin:"10px", borderRadius:"10px", 
                    backgroundColor:"black", color:"white",
                    cursor:"pointer"
                  }} 
                  onClick={()=>fetchNewData(-1)}>
                    Previous
                  </button>
                  :<></>
              }
              {(maxPages>=(page+1))?
                <button 
                  style={{
                    width:"100px", height:"40px", 
                    margin:"10px", borderRadius:"10px", 
                    backgroundColor:"black", color:"white",
                    cursor:"pointer"
                  }} 
                  onClick={()=>fetchNewData(1)}>
                    Next
                </button>
                :<></>
              }
            </>
            :
            <></>
          }
        </Grid>
    </Stack>
  )

}

export default TrendsPage;