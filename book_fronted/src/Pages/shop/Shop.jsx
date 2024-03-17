import { Link } from "react-router-dom";
import AllData from "../../productData/AllData";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BookDetails from "../../popupComp/BookDetails";
import { FaHeart } from "react-icons/fa";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/books");
      setItems(response.data);
      setVisibleItems(response.data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const loadMoreItems = () => {
    const nextItems = items.slice(visibleItems.length, visibleItems.length + 4);
    setVisibleItems([...visibleItems, ...nextItems]);
    setShowBlogPopup(false);
  };

  const handleBookCategory = async (category) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/books?category=${category}`
      );
      setItems(response.data);
      setVisibleItems(response.data.slice(0, 4));
    } catch (error) {
      console.error("Error fetching books by category:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="ml-6">
        <div className="gap-6 flex justify-center">
          {AllData.map((item, index) => (
            <div key={index} className="flex flex-col items-center mt-6">
              <Link onClick={() => handleBookCategory(item.title)}>
                <div className="w-20 h-20 rounded-full bg-white shadow-lg overflow-hidden flex items-center justify-center mb-2">
                  <img src={item.img} className="w-full h-full object-cover" />
                </div>
              </Link>
              <div className="text-center">{item.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-center h-full gap-8 mt-3.5 overflow-y-auto">
        <div>
          <div className="flex flex-wrap items-start justify-center gap-8 mt-5">
            {visibleItems.map((item) => (
              <div key={item._id}>
                <BookDetails item={item} key={item._id} />
              </div>
            ))}
          </div>
          <div className="mt-6">
            {items.length > visibleItems.length && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded -mt-10"
                onClick={loadMoreItems}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shop;