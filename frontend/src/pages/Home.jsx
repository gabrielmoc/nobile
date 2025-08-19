import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import banner1 from '../assets/banner1.svg';
import banner2 from '../assets/banner2.svg';
import banner3 from '../assets/banner3.svg';
import banner4 from '../assets/banner4.svg';

import '../styles/Home.css';

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="home-container">
      <Slider {...settings}>
        <div>
          <a href="#">
            <img src={banner1} alt="Banner 1" className="banner-img" />
          </a>
        </div>
        <div>
          <a href="#">
            <img src={banner2} alt="Banner 2" className="banner-img" />
          </a>
        </div>
        <div>
          <a href="#">
            <img src={banner3} alt="Banner 3" className="banner-img" />
          </a>
        </div>
        <div>
          <a href="#">
            <img src={banner4} alt="Banner 4" className="banner-img" />
          </a>
        </div>
      </Slider>
    </div>
  );
};

export default Home;