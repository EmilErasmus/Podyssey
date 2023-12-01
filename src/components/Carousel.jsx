/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/autoplay'; 
import "../styles/Carousel.css";

SwiperCore.use([Pagination, Navigation, Autoplay]);

export default function Carousel(props) {
  const [randomCards, setRandomCards] = useState([]);

  useEffect(() => {
    // Select five random cards when the component mounts or when props.cards changes
    const shuffledCards = props.cards.sort(() => Math.random() - 0.5);
    const selectedCards = shuffledCards.slice(0, 5);
    setRandomCards(selectedCards);
  }, [props.cards]);

  return (
    <Swiper
      pagination={{ clickable: true }}
      navigation
      autoplay={{ delay: 4000 }}
      speed={2000} 
      className="mySwiper"
      loop={true}
      spaceBetween={10}
    >
      {randomCards.map((card, index) => (
                  <SwiperSlide key={index}>
                  <div className="carousel">{card}</div>
                </SwiperSlide>
      ))}
    </Swiper>
  );
}


{/* <SwiperSlide key={index}>
<div className="carousel">{card}</div>
</SwiperSlide> */}