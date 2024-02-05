import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UserPlaceHolder from '../assets/Images/UserPlaceHolder.jpg'
import carpenter from '../assets/Images/carpenter.jpg'
import welding from '../assets/Images/welding.jpg'
import construction from '../assets/Images/Construction.jpg'
import LeftArrow from '../assets/Images/LeftArrow.png'
import RightArrow from '../assets/Images/RightArrow.png'

function Photos() {
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <img id='Arrows' src={LeftArrow} alt="prevArrow" {...props} />
      );
    
      const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <img id='Arrows'  src={RightArrow} alt="nextArrow" {...props} />
      );
      var settings = {
        dots: true,
        infinite: true,
        centerPadding: "60px",
        centerMode: true,
        className:'center',
        speed: 500,
        slidesToShow: 3,
        slidesToScroll:1,
        initialSlide: 0,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 1000,
        pauseOnHover: true,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
  return (
    <div className='mt-5'>
        <h1 className="text-2xl font-bold">Photos</h1>
        <div className='h-auto px-7 max-sm:px-0 mt-10 '>
      <Slider {...settings}>
        <div>
        <div className="rounded-lg  h-72 w-72 max-[1260px]:w-52 max-[1200px]:h-52 max-[637px]:w-36 0 max-[637px]:h-36 bg-cover" style={{backgroundImage:`url(${welding})`}} ></div>
        </div>
        <div>
        <div className="rounded-lg  h-72 w-72  max-[1260px]:w-52 max-[1200px]:h-52 max-[637px]:w-36 0 max-[637px]:h-36 bg-cover" style={{backgroundImage:`url(${carpenter})`}} ></div>
        </div>
        <div>
        <div className="rounded-lg  h-72 w-72  max-[1260px]:w-52 max-[1200px]:h-52 max-[637px]:w-36 0 max-[637px]:h-36 bg-cover" style={{backgroundImage:`url(${construction})`}} ></div>
        </div>
        <div>
        <div className="rounded-lg h-72 w-72  max-[1260px]:w-52 max-[1200px]:h-52 max-[637px]:w-36 0 max-[637px]:h-36 bg-cover" style={{backgroundImage:`url(${welding})`}} ></div>
        </div>
        <div>
        <div className="rounded-lg  h-72 w-72 max-[1260px]:w-52 max-[1200px]:h-52 max-[637px]:w-36 0 max-[637px]:h-36 bg-cover" style={{backgroundImage:`url(${construction})`}} ></div>
        </div>
        <div>
        <div className="rounded-lg  h-72 w-72 max-[1260px]:w-52 max-[1200px]:h-52 max-[637px]:w-36 0 max-[637px]:h-36 bg-cover" style={{backgroundImage:`url(${carpenter})`}} ></div>
        </div>
        <div>
        <div className="rounded-lg  h-72 w-72  max-[1260px]:w-52 max-[1200px]:h-52 max-[637px]:w-36 0 max-[637px]:h-36 bg-cover" style={{backgroundImage:`url(${UserPlaceHolder})`}} ></div>
        </div>
        </Slider>
        </div>
        </div>
        
  )
}

export default Photos