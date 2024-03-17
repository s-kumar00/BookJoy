import React, { useEffect, useState } from "react";
import SwiperImg from "./SwiperImg";
import axios from "axios";

const Home = () => {
  const [bookData, setBookData] = useState([]);
  useEffect(() => {
    const fetchInfo = async () => {
      const response = await axios.get("http://localhost:8000/books");
      setBookData(response.data);
    };
    fetchInfo();
  }, []);

  return (
    <>
      <SwiperImg books={bookData} />
    </>
  );
};

export default Home;
