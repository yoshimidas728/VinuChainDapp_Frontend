import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../utils/css/styles.css";
import mainImg1 from '../../assets/images/mainImg1.png'
import mainImg2 from '../../assets/images/mainImg2.png'
import mainImg3 from '../../assets/images/mainImg3.png'
import mainImg4 from '../../assets/images/mainImg4.png'
import mainImg5 from '../../assets/images/mainImg5.png'
import mainImg6 from '../../assets/images/mainImg6.png'
import mainImg7 from '../../assets/images/mainImg7.png'
import mainImg8 from '../../assets/images/mainImg8.png'
import mainImg9 from '../../assets/images/mainImg9.png'
import mainImg10 from '../../assets/images/mainImg10.png'
import { Stack } from "@mui/material";

const HeroSectionCarousal = () => {
  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 3,
    autoplay: true,
    arrows: false,
    centerMode: true,
    centerPadding: "30px",
    speed: 1300,
    infinite: true,
  };
  return (
    <Stack py={4}>
      <Slider {...settings}>
        <Stack>
          <img src={mainImg1} width={"70%"} />
        </Stack>
        <Stack>
          <img src={mainImg2} width={"70%"} />
        </Stack>
        <Stack>
          <img src={mainImg3} width={"70%"} />
        </Stack>
        <Stack>
          <img src={mainImg4} width={"70%"} />
        </Stack>
        <Stack>
          <img src={mainImg5} width={"70%"} />
        </Stack>
        <Stack>
          <img src={mainImg6} width={"70%"} />
        </Stack>
        <Stack>
          <img src={mainImg7} width={"70%"} />
        </Stack>
        <Stack>
          <img src={mainImg8} width={"70%"} />
        </Stack>
        <Stack>
          <img src={mainImg9} width={"70%"} />
        </Stack>
        <Stack>
          <img src={mainImg10} width={"70%"} />
        </Stack>
      </Slider>
    </Stack>
  );
};

export default HeroSectionCarousal;
