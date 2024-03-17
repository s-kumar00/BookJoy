import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai";

const BookDetails = ({ item }) => {
  const [count, setCount] = useState(0);
  const [isHeartRed, setIsHeartRed] = useState(false);

  const handleHeart = () => {
    setIsHeartRed(!isHeartRed);
  };

  const handleMinus = () => {
    count == 0 ? setCount(0) : setCount(count - 1);
  };

  const handlePlus = () => {
    const max = 3;
    count < max ? setCount(count + 1) : setCount(max);
  };

  const backgroundImageUrl = item.imageURL;

  return (
    <div className="w-80 bg-gray-100 shadow-md rounded-md">
      <div
        className="h-48 w-full bg-gray-900 flex flex-col justify-between p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      >
        <div>
          <button
            onClick={handleHeart}
            className="text-white text-2xl w-3 rounded-full"
          >
            {isHeartRed ? <FaHeart className="text-red-700" /> : <FaHeart />}
          </button>
        </div>
        <div>
          <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
            available
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col items-center">
        <p className="text-gray-400 font-light text-xs text-center">
          {item.category}
        </p>
        <h1 className="text-gray-800 text-center mt-1">{item.bookTitle}</h1>
        <p className="text-center text-gray-800 mt-1">€{item.price}</p>
        <div className="inline-flex items-center mt-2">
          <button
            onClick={handleMinus}
            className="bg-white text-2xl rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
          >
            <HiMiniMinusSmall />
          </button>
          <div className="bg-gray-100 border-t border-b border-gray-200 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
            {count}
          </div>
          <button
            onClick={handlePlus}
            className="bg-white text-2xl rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
          >
            <GoPlus />
          </button>
        </div>
        <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
          Add to order
          <AiOutlineShoppingCart className="text-2xl ml-3" />
        </button>
      </div>
    </div>
  );
};

export default BookDetails;
