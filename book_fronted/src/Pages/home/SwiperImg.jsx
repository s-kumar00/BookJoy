import React, { useEffect, useState } from "react";
import Book1 from "../../assets/book2.jpg";
import Vector from "../../assets/blue-pattern.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";

const SwiperImg = ({ books }) => {
  const [imageId, setImageId] = React.useState(Book1);
  const [title, setTitle] = React.useState("Welcome to my book store !...");
  const [authorName, setAuthorName] = useState("");

  const bgImage = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
  };
  const handleSwiper = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/book/${id}`);
      const bookData = await response.data;
      setImageId(bookData.imageURL);
      setTitle(bookData.bookTitle);
      setAuthorName(bookData.authorName);
    } catch (e) {
      console.log("error;");
    }
  };

  return (
    <>
      <div
        className="min-h-[600px] sm:min-h-[685px] bg-gray-100 flex justify-center items-center duration-200 "
        style={bgImage}
      >
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text content section */}
            <div
              data-aos-once="true"
              className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1"
            >
              <h1
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-once="true"
                className="text-5xl sm:text-6xl lg:text-7xl font-bold"
              >
                {title}
                <p className="bg-clip-text bg-gradient-to-b from-primary text-right text-sm to-secondary text-red-700">
                  {authorName}
                </p>
              </h1>
              <div>
                <button className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full bg-gray-500">
                  Order Now
                </button>
              </div>
            </div>
            {/* Image section */}
            <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 ">
              <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center">
                <img
                  data-aos="zoom-in"
                  data-aos-once="true"
                  src={imageId}
                  alt="biryani img"
                  className="w-[400px] h-[400px] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto"
                />
              </div>
              <div className="flex lg:flex-col lg:top-1/3 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute -bottom-[40px] lg:-right-1 bg-gray-150 rounded-full">
                <Swiper
                  direction="vertical"
                  effect={"coverflow"}
                  slidesPerView={3}
                  spaceBetween={30}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    pauseOnMouseEnter: true,
                  }}
                  modules={[EffectCoverflow, Pagination, Autoplay]}
                >
                  {books.map((item) => (
                    <SwiperSlide
                      key={item._id}
                      className="max-w-[100px] h-[100px] object-contain inline-block hover:scale-110 duration-200 cursor-pointer"
                    >
                      <img
                        src={books.length !== 0 ? item.imageURL : Book1}
                        onClick={() => handleSwiper(item._id)}
                        alt="book1"
                        className="max-w-[100px] h-[100px] object-contain inline-block hover:scale-110 duration-200 cursor-pointer"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwiperImg;
