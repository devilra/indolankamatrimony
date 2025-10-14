"use client";

import React from "react";
import Slider from "react-slick";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Parterns = () => {
  // 🧠 Dummy Data with Picsum Photos
  const profiles = [
    {
      id: 1,
      name: "S.Vignesh",
      degree: "B.E, MBA",
      year: "2018",
      image: "https://picsum.photos/400/500?random=1",
    },
    {
      id: 2,
      name: "B.Saipriya",
      degree: "Science, LLB",
      year: "2017",
      image: "https://picsum.photos/400/500?random=2",
    },
    {
      id: 3,
      name: "S.Vaisali",
      degree: "B.Sc, Bio tech",
      year: "2016",
      image: "https://picsum.photos/400/500?random=3",
    },
    {
      id: 4,
      name: "I.Sutharsan",
      degree: "B.B.A",
      year: "2015",
      image: "https://picsum.photos/400/500?random=4",
    },
    {
      id: 5,
      name: "M.Yamini",
      degree: "B.Com",
      year: "2019",
      image: "https://picsum.photos/400/500?random=5",
    },
    {
      id: 6,
      name: "R.Karthik",
      degree: "B.Tech, IT",
      year: "2018",
      image: "https://picsum.photos/400/500?random=6",
    },
    {
      id: 7,
      name: "P.Janani",
      degree: "M.Sc, Chemistry",
      year: "2016",
      image: "https://picsum.photos/400/500?random=7",
    },
    {
      id: 8,
      name: "D.Santhosh",
      degree: "B.E, Mech",
      year: "2017",
      image: "https://picsum.photos/400/500?random=8",
    },
    {
      id: 9,
      name: "A.Preethi",
      degree: "BCA",
      year: "2020",
      image: "https://picsum.photos/400/500?random=9",
    },
    {
      id: 10,
      name: "N.Arun",
      degree: "MCA",
      year: "2019",
      image: "https://picsum.photos/400/500?random=10",
    },
  ];

  // ⚙️ React Slick Settings
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    speed: 500,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   speed: 2000,
  //   autoplaySpeed: 2000,
  //   cssEase: "linear",
  // };

  return (
    <div className="pb-10 mx-auto">
      {/* 🔍 Search Box */}
      <div className="mb-8  max-w-6xl mx-auto">
        <InputGroup>
          <InputGroupInput
            className="border border-neutral-400 py-5 rounded-lg w-full"
            placeholder="Search by ID or Name"
          />
        </InputGroup>
      </div>

      {/* 🖼️ Carousel */}
      <div className="slider-container hidden md:hidden lg:block overflow-hidden">
        <Slider {...settings}>
          {profiles.map((profile) => (
            <div key={profile.id} className="px-3 pb-10">
              <div className="bg-white  shadow-md  text-center pb-4 hover:shadow-lg  duration-300">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-50 object-cover rounded"
                />
                <h3 className="text-xl font-semibold text-brown-800 mt-3">
                  {profile.name}
                </h3>
                <p className="text-neutral-600">{profile.degree}</p>
                <p className="text-neutral-600">{profile.year}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="slider-container md:block lg:hidden overflow-hidden">
        <Slider
          centerMode={true}
          infinite={true}
          centerPadding="30px"
          slidesToShow={2}
        >
          {profiles.map((profile) => (
            <div key={profile.id} className="px-1 md:px-3 pb-10">
              <div className="bg-white  shadow-md  text-center pb-4 hover:shadow-lg  duration-300">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-30  object-cover rounded"
                />
                <h3 className="text-[15px] font-semibold text-brown-800 mt-3">
                  {profile.name}
                </h3>
                <p className="text-neutral-600 text-[15px]">{profile.degree}</p>
                <p className="text-neutral-600 text-[15px]">{profile.year}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Parterns;
