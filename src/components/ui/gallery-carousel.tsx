"use client";
import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { Autoplay, Pagination, A11y } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

type GalleryCarouselProps = {
  gallery: string[];
};

function GalleryCarousel({ gallery }: GalleryCarouselProps) {
  return (
    <div className="h-[302px] w-full bg-primary-50 rounded-xl flex items-center justify-center">
      {!gallery.length ? (
        <div className="h-[302px] w-full relative rounded-xl shadow-md">
          <Image
            className="w-full h-full object-cover rounded-xl"
            fill
            src="/images/no_image_placeholder.png"
            alt="pitch"
          />
        </div>
      ) : (
        <Swiper
          modules={[Pagination, A11y, Autoplay]}
          slidesPerView={1}
          autoplay
          pagination={{
            clickable: true,
            renderBullet: (index, className) => {
              return (
                '<span class="' +
                className +
                " " +
                "!w-[30px] !h-2.5 !rounded-[8px]  mx-1 transition-transform duration-300 transform hover:scale-110" +
                (className.includes("swiper-pagination-bullet-active")
                  ? "!bg-blue-500"
                  : "") +
                '">' +
                "</span>"
              );
            },
          }}
          className="w-full"
        >
          {gallery.map((image, index) => (
            <SwiperSlide className="select-none" key={`${index}`}>
              <div className="h-[302px] w-full relative rounded-xl">
                <Image
                  className="w-full h-full object-cover rounded-xl"
                  fill
                  src={image}
                  alt="pitch"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}

export default GalleryCarousel;
