import { Grid } from "@mui/material";
import React, { useState } from "react";
import CryptoNewsFeedCard from "../cards/CryptoNewsFeedCard";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { getAllPosts, getFilterPosts } from "../../store/post/actions";
import axios from "../../axios/AxiosConfig";


const CryptoNewsFeed = () => {
  const { theme } = useSelector((state) => state.themeReducer)
  const [travelData, setTravelData] = useState([])
  const [artsData, setArtsData] = useState([])
  const [technologiesData, setTechnologiesData] = useState([])
  const [innovationData, setinnovationData] = useState([])
  const [financeData, setFinanceData] = useState([])
  const [newsData, setnewsData] = useState([])
  const [sso, setSso] = useState(['Travel', 'Arts', 'Technology', 'Innovation', 'Finance', 'News'])
  const dispatch = useDispatch()
  const { allPosts, technologyBlogs,
    InnovationBlogs,
    financeBlogs,
    newsBlogs,
    artsBlogs,
    tag1Blogs, } = useSelector((state) => state?.post);
  const [page,setPage] =useState(1)
  const [size,setSize] =useState(4)
  useEffect(() => {
    const requests = sso.map((s) => {
      return axios.get(`/user/filterBlogs?filter=["${s}"]&page=${page}&size=${size}`)
    })
    
    Promise.all(requests).then(([travelRes, artsRes, technologiesRes, innovationRes, financeRes, newsRes]) => {
      setTravelData(travelRes?.data?.data?.data)
      setArtsData(artsRes?.data?.data?.data)
      setTechnologiesData(technologiesRes?.data?.data?.data)
      setinnovationData(innovationRes?.data?.data?.data)
      setFinanceData(financeRes?.data?.data?.data)
      setnewsData(newsRes?.data?.data?.data)

    }).catch((err) => {
      console.log('this is the error: ', err)
    })
  }, [dispatch])

  // useEffect(() => {
    
  //   dispatch(getFilterPosts({
  //     tag: 'Innovation'
  //   }))
  // }, [dispatch])
  // useEffect(() => {
    
  //   dispatch(getFilterPosts({
  //     tag: 'News'
  //   }))

  // }, [dispatch])
  // useEffect(() => {
  //   dispatch(getFilterPosts({
  //     tag: 'Finance'
  //   }))
  // }, [dispatch])
  // useEffect(() => {
  //   dispatch(getFilterPosts({
  //     tag: 'Travel'
  //   }))
  // }, [dispatch])
  // useEffect(() => {
  //   dispatch(getFilterPosts({
  //     tag: 'Arts'
  //   }))
  // }, [dispatch])
  
  return (
    <Grid container xs={12} my={"2em"} px={6} spacing={2}>
      <Grid item xs={12} md={6} lg={4}>
        <CryptoNewsFeedCard
          underlineStyle={"always"} 
          part={1} 
          posts={travelData?.slice(0,4)} 
          tag="Travel" 
          bgaColor={theme === 'black' ? "#9DB2BF": ""} 
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CryptoNewsFeedCard
          part={2}
          underlineStyle={"none"}
          headingColor={"black"}
          bgaColor={
            "linear-gradient(359.36deg, #7ED4F7 0.48%, rgba(126, 212, 247, 0) 99.39%)"
          }
          posts={artsData?.slice(0,4)} 
          tag="Arts" 
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CryptoNewsFeedCard 
          underlineStyle={"always"} 
          part={3}
          posts={technologiesData?.slice(0,4)} 
          tag="Technologies" 
          bgaColor={theme === 'black' ? "#9DB2BF": ""} 
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CryptoNewsFeedCard 
          underlineStyle={"always"} 
          part={4}
          posts={innovationData?.slice(0,4)} 
          tag="Innovations" 
          bgaColor={theme === 'black' ? "#9DB2BF": ""} 
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CryptoNewsFeedCard
          headingColor={"black"}
          underlineStyle={"none"}
          bgaColor={"linear-gradient(359.36deg, #1E1E1E 0.48%, #FFFFFF 99.39%)"}
          textColor={"white"}
          part={5}
          posts={financeData?.slice(0,4)}
          tag="Finance"
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <CryptoNewsFeedCard 
          underlineStyle={"always"} 
          part={6}
          posts={newsData?.slice(0,4)} 
          tag="News" 
          bgaColor={theme === 'black' ? "#9DB2BF": ""}
        />
      </Grid>
    </Grid>
  );
};

export default CryptoNewsFeed;
