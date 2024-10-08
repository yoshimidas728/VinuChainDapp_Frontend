import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CryptoNewsCard from "../cards/CryptoNewsCard";
import "../../utils/css/styles.css";
import { Button, IconButton } from "@mui/material";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CryptoNewsCarousal = ({ trendingBlogs }) => {
  const slider = React.useRef(null);
  const settings = {
    centerMode: false,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,

    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }, {
        breakpoint: 600,
        settings: {
       
         slidesToShow: 1,
        }
       },
       {
        breakpoint: 320,
        settings: {
      
         slidesToShow: 1,
        }
      },
    ],
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <Slider {...settings} ref={slider}>
          {
            trendingBlogs?.data?.map((blog, index) => {
              return (
                <div key={index} style={{ backgroundColor: "white" }}>
                  <CryptoNewsCard blog={blog}/>
                </div>
              )
            })
          }
        </Slider>
        <IconButton
          sx={{
            position: "absolute",
            top: "0",
            right: "-40px",
            bottom: "0",
            mt: "auto",
            mb: "auto",
            // height: "3em",
            borderRadius: "10px",
          }}
          onClick={() => slider?.current?.slickNext()}
        >
          <IoIosArrowForward />
        </IconButton>
        <IconButton
          sx={{
            position: "absolute",
            top: "0",
            left: "-40px",
            bottom: "0",
            mt: "auto",
            mb: "auto",
            height: "3em",
            borderRadius: "10px",
          }}
          onClick={() => slider?.current?.slickPrev()}
        >
          <IoIosArrowBack />
        </IconButton>
      </div>
    </>
  );
};

export default CryptoNewsCarousal;
