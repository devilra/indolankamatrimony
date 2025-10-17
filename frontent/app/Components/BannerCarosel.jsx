import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DynamicImageCarousel.css";

const image_data = [
  { id: 1, url: "/banner/b1.webp", alt: "Image 1" },
  { id: 2, url: "/banner/b5.jpg", alt: "Image 2" },
  { id: 3, url: "/banner/b6.jpg", alt: "Image 3" },
  { id: 4, url: "/banner/b4.jpg", alt: "Image 3" },
];

function BannerCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {image_data.map((image) => (
          <div key={image.id} className="slide-item-wrapper">
            <img
              src={image.url}
              alt={image.alt}
              className="carousel-image object-cover object-top-shifted "
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BannerCarousel;
