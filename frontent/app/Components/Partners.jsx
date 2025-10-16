"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../redux/profileSlice";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // ✅ import Skeleton
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Partners = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profile);

  console.log(profiles);

  useEffect(() => {
    if (profiles.length === 0) {
      dispatch(getAllProfiles());
    }
  }, [dispatch, profiles.length]);

  const skeletonArray = Array.from({ length: 4 }); // number of skeleton cards

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Matrimony Profiles
      </h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-6xl mx-auto md:overflow-hidden lg:overflow-visible"
      >
        <CarouselContent>
          {loading
            ? skeletonArray.map((_, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-3">
                    <Card className="shadow-md border border-gray-200 rounded-2xl">
                      <CardContent className="flex flex-col items-center">
                        <Skeleton className="h-[200px] w-full md:h-[250px] lg:h-[220px] rounded-md mb-4" />
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-2/3 mb-1" />
                        <Skeleton className="h-3 w-1/2" />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))
            : profiles?.map((profile) => (
                <CarouselItem
                  key={profile.id}
                  className="md:basis-1/2 lg:basis-1/4"
                >
                  <div className="p-3">
                    <Card className="shadow-md hover:shadow-xl h-[350px] md:h-[400px]  lg:h-[400px] transition-all duration-300 border border-gray-200 rounded-2xl">
                      <CardContent className="">
                        <img
                          //   src={
                          //     profile.image
                          //       ? `${import.meta.env.VITE_API_URL}/${
                          //           profile.image
                          //         }`
                          //       : "https://picsum.photos/150"
                          //   }
                          src="https://picsum.photos/150"
                          alt={profile.pname}
                          className="h-[200px] w-full md:h-[250px] lg:h-[220px] rounded-md object-cover mb-4 border-4 border-gray-100 shadow-sm"
                        />
                        <h3 className="text-lg font-semibold text-gray-800">
                          <strong className="text-black font-bold">
                            Name :{" "}
                          </strong>
                          {profile.pname}
                        </h3>
                        <p className="text-sm py-2 text-gray-600">
                          <strong className="font-bold  text-black">
                            Educations :{" "}
                          </strong>
                          <span className=" text-[12px]">
                            {" "}
                            {profile.education}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          <strong className="text-black font-bold">
                            Joined :{" "}
                          </strong>{" "}
                          {profile.created_day}-{profile.created_month}-
                          {profile.created_year}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default Partners;
