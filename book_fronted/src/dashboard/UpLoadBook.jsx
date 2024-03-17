import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UpLoadBook = () => {
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Science Fiction",
    "History",
    "Horror",
    "Fantasy",
    "AutoBiography",
    "Travel",
    "Business",
    "Children Books",
    "Religion",
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(
    bookCategories[0]
  );

  const handleChangeSelectedValues = (e) => {
    setSelectedBookCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;
    const price = form.price.value;

    const bookObj = {
      bookTitle,
      authorName,
      imageURL,
      category,
      bookDescription,
      bookPDFURL,
      price,
    };

    fetch("http://localhost:8000/book-uplode", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bookObj),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Book Added Successfully!... ", {
          position: "top-right",
          autoClose: 1000,
        });
        form.reset();
      });
  };

  return (
    <>
      <div className="px-4 my-10">
        <h2 className="mb-8 ml-2 text-3xl font-bold">Upload A book</h2>
        <form
          onSubmit={handleSubmit}
          className="flex lg:w-[1120px] p-5 flex-wrap flex-col gap-4 bg-transparent border-y-x border-gray-gray-400-100 border-x shadow-md"
        >
          {/* first row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2 ">
              <div className="mb-2 block">
                <Label htmlFor="bookTitle" value="Book Name" />
              </div>
              <TextInput
                className="rounded-lg"
                id="bookTitle"
                type="text"
                placeholder="Book Name"
                required
                shadow
              />
            </div>
            <div className="lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="authorName" value="Author Name" />
              </div>
              <TextInput
                className="rounded-lg"
                id="authorName"
                type="text"
                placeholder="Author Name"
                required
                shadow
              />
            </div>
          </div>
          {/* second row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="imageURL" value="Book Image" />
              </div>
              <TextInput
                className="rounded-lg"
                id="imageURL"
                type="text"
                placeholder="Book URL"
                required
                shadow
              />
            </div>
            <div className="lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="inputState" value="Book Category" />
              </div>
              <select
                id="inputState"
                name="categoryName"
                className="w-full rounded-lg"
                value={selectedBookCategory}
                onChange={handleChangeSelectedValues}
              >
                {bookCategories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* third row */}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="bookDescription" value="Book Description" />
            </div>
            <Textarea
              id="bookDescription"
              name="bookDescription"
              placeholder="About Book Description"
              required
              rows={6}
            />
          </div>
          {/* fourth rows */}

          <div className="flex gap-8">
            <div className="lg:w-1/2 ">
              <div className="mb-2 block">
                <Label htmlFor="bookPDFURL" value="Book-PDF URL" />
              </div>
              <TextInput
                className="rounded-lg"
                id="bookPDFURL"
                type="text"
                placeholder="bookPDFURL"
                required
                shadow
              />
            </div>
            <div className="lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="price" value="Book Price" />
              </div>
              <TextInput
                className="rounded-lg"
                id="price"
                type="text"
                placeholder="price"
                required
                shadow
              />
            </div>
          </div>
          <Button type="submit" className="bg-cyan-700 hover:bg-cyan-800">
            Upload Book
          </Button>
        </form>
        {/* <ToastContainer /> */}
      </div>
    </>
  );
};

export default UpLoadBook;
