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
        <div className="text-white mt-24 sm:mt-32 lg:mt-20 text-center px-4 sm:px-6">
  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-light mb-6">
    Top Fashion Brands
  </h1>

  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mt-10 sm:mt-20 lg:mt-60 text-[#64748B] max-w-4xl mx-auto">
    Premium designer clothes crafted just for you.
  </p>
</div>
      </div>
    </section>
  );
};

export default Hero;
