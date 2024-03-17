import React, { useState } from "react";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";

const EditBooks = () => {
  const { id } = useParams();
  const {
    bookTitle,
    authorName,
    imageURL,
    bookDescription,
    bookPDFURL,
    price,
  } = useLoaderData();
  // console.log(bookTitle);
  const navigate = useNavigate();

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

  const handleUpdate = (e) => {
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
    // console.log(form);
    swal({
      title: "Are you sure?",
      text: "Do you want to update your book details!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // navigate(<ManageBooks />);
        fetch(`http://localhost:8000/book/${id}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(bookObj),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            toast.success("Book updated Successfully", {
              position: "top-right",
              autoClose: 1000,
            });
            navigate("/admin/dashboard/manage");
          });
      } else {
        swal("Book not updated!");
      }
    });
  };

  return (
    <>
      <div className="px-4 my-12">
        <h2 className="mb-8 ml-2 text-3xl font-bold">Update the book data</h2>
        <form
          onSubmit={handleUpdate}
          className="flex lg:w-[1120px] p-5 flex-wrap flex-col gap-4 border-y-x border-gray-gray-400-100 border-x shadow-md"
        >
          {/* first row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="bookTitle" value="Book Name" />
              </div>
              <TextInput
                className="rounded-lg"
                id="bookTitle"
                type="text"
                placeholder="Book Name"
                required
                defaultValue={bookTitle}
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
                defaultValue={authorName}
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
                defaultValue={imageURL}
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
              defaultValue={bookDescription}
              rows={6}
            />
          </div>

          {/* fourth rows */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="bookPDFURL" value="Book-PDF URL" />
              </div>
              <TextInput
                className="rounded-lg"
                id="bookPDFURL"
                type="text"
                placeholder="bookPDFURL"
                required
                defaultValue={bookPDFURL}
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
                defaultValue={price}
              />
            </div>
          </div>

          <Button type="submit" className="bg-cyan-700 hover:bg-cyan-800">
            Update Book
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditBooks;
