import React from "react";
import Slider from "react-slick";
import SmallCards from "../cards/SmallCards";
import "../../utils/css/styles.css";
import { Button, IconButton } from "@mui/material";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SamllCardsC = ({ trendingBlogs }) => {
  const slider = React.useRef(null);
  const settings = {
    centerMode: false,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3 ,

    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 980,
        settings: {

          slidesToShow: 1,
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
      <div 
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gap: '1rem',
          overflow: 'auto',
          paddingBottom: '1rem',
        }}
      >
        <IconButton
          sx={{
            position: "inherit",
            top: "0",
            left: "-40px",
            bottom: "0",
            mt: "auto",
            mb: "auto",
            // height: "3em",
            borderRadius: "10px",
          }}
          onClick={() => slider?.current?.slickPrev()}
        >
          <IoIosArrowBack />
        </IconButton>
        <Slider {...settings} ref={slider}>
          {
            trendingBlogs?.map((blog, index) => {
              return (
                <div key={index}>
                  <SmallCards blog={blog}/>
                </div>
              )
            })
          }
        </Slider>
        <IconButton
          sx={{
            position: "inherit",
            top: "0",
            right: "-40px",
            bottom: "0",
            mt: "auto",
            mb: "auto",
            borderRadius: "10px",
          }}
          onClick={() => slider?.current?.slickNext()}
        >
          <IoIosArrowForward />
        </IconButton>
      </div>
    </>
  );
};

export default SamllCardsC;
