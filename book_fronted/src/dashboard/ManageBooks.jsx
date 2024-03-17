import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { TbPointFilled } from "react-icons/tb";
import {
  Card,
  Typography,
  CardBody,
  IconButton,
} from "@material-tailwind/react";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageBooks = () => {
  const TABLE_HEAD = [
    "",
    "Book Name",
    "Author Name",
    "Category",
    "Amount",
    "Edit",
    "Manage",
  ];

  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/books")
      .then((res) => res.json())
      .then((data) => setAllBooks(data));
  }, []);
  const handleDelete = (btn, book_id) => {
    const bookElement = btn.closest("tr");

    swal({
      title: "Are you sure?",
      text: "Do you want to delete this book!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:8000/book/${book_id}`, {
          method: "DELETE",
        })
          .then((result) => {
            bookElement.parentNode.removeChild(bookElement);
            toast.success("Book Deleted Successfully", {
              position: "top-right",
              autoClose: 1000,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  const util = () => {
    handleDelete(document.getElementById("book_delete"));
  };

  return (
    <>
      <div className="px-4 my-12 ml-12 ">
        <h2 className="mb-8 text-3xl font-bold text-black">
          Manage your Books
        </h2>
        <Card className="lg:w-[1000px] bg-transparent">
          <CardBody className="px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr className=" text-black font-bold">
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-700 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="p-4">
                {/* {
                allBooks.map((book, index) => <tbody className="p-4" key={book._id}></tbody>)
                } */}
                {allBooks.map((book) => (
                  <tr key={book._id} id={book._id} className="text-black">
                    <td className="pl-4 t">
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          <TbPointFilled />
                        </Typography>
                      </div>
                    </td>
                    <td className="pl-4">
                      <div className="flex items-center gap-3">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-bold"
                        >
                          {book.bookTitle}
                        </Typography>
                      </div>
                    </td>
                    <td className="pl-6">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {book.authorName}
                      </Typography>
                    </td>
                    <td className="pl-6">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {book.category}
                      </Typography>
                    </td>
                    <td className="pl-6">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {book.price}
                      </Typography>
                    </td>
                    <td className="pl-2">
                      <IconButton variant="text">
                        <Link to={`/admin/dashboard/edit/${book._id}`}>
                          <PencilIcon className="h-4 w-4 " />
                        </Link>
                      </IconButton>
                    </td>
                    <td className="pl-3">
                      {/* <IconButton variant="text"> */}
                      <input type="hidden" value={book._id} />
                      {/* {console.log(document.getElementById("book_id"))} */}
                      <TrashIcon
                        className="h-6 cursor-pointer rounded-3xl"
                        onClick={() =>
                          handleDelete(
                            document.getElementById(book._id),
                            book._id
                          )
                        }
                      />
                      {/* </IconButton> */}
                      {/* <ToastContainer /> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default ManageBooks;
