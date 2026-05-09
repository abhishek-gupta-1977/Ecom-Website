import { Swiper, SwiperSlide } from "swiper/react";
import slides from "../assets/slides.js";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "./ui/button.js";

const Hero = () => {
  return (
    <section className="text-[#111827]  relative min-h-screen ">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        loop={true}
        pagination={{ clickable: true }}
        className="absolute inset-0 -z-10"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {slide.type === "image" ? (
              <img
                src={slide.src}
                alt={`slide-${index}`}
                className="w-full h-screen object-cover"
              />
            ) : (
              <video
                src={slide.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-screen object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute top-0 right-0 z-10 bg-black/10 min-h-screen w-full flex  justify-center">
        <div className="text-white mt-20 text-center">
          <h1 className="text-9xl font-light text-[#111827]-400 mb-6">
            Top Fashion Brands
          </h1>

          <p className="text-3xl mt-60 text-[#64748B]">
            Premium designer clothes crafted just for you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
