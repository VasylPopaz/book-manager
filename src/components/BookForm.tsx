import { useEffect } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormRegister,
} from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../components";

import type { Book } from "../types";
import { addBook, updateBook } from "../api";
import { bookFormSchema } from "../schemas";
import { checkObjectEquality } from "../helpers";

interface BookFormProps {
  book?: Book;
  toggleModal: () => void;
  onSaveBook: (book: Book, isEdit: boolean, oldIsbn?: string) => void;
}

interface FormData {
  title: string;
  author: string;
  isbn: string;
  isBorrowed: boolean;
}

export const BookForm = ({ book, toggleModal, onSaveBook }: BookFormProps) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onSubmit",
    resolver: yupResolver(bookFormSchema),
  });

  useEffect(() => {
    if (book) {
      setValue("title", book.title);
      setValue("author", book.author);
      setValue("isbn", book.isbn);
      setValue("isBorrowed", book.isBorrowed);
    }
  }, [book, setValue]);

  const bookStatus = watch("isBorrowed", book ? book.isBorrowed : false);

  const toggleBookStatus = () => {
    setValue("isBorrowed", !bookStatus);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (book) {
        const bookData = {
          title: data.title,
          author: data.author,
          isbn: data.isbn,
          isBorrowed: data.isBorrowed,
        };

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id: unused, ...oldBook } = book;

        if (checkObjectEquality(bookData, oldBook)) {
          toggleModal();
          return;
        }

        const updatedBook = await updateBook(book.isbn, bookData);

        onSaveBook(updatedBook, true, book.isbn);
        toast.success(
          `Book «${updatedBook.title}» has been successfully updated`
        );
      } else {
        console.log("Add");
        const newBook = await addBook(data);
        onSaveBook(newBook, false);
        toast.success(`Book «${newBook.title}» has been successfully added`);
      }
      toggleModal();
    } catch (error) {
      toast.error(error instanceof Error && error.message);
    }
  };

  return (
    <div className="w-[400px] p-8 text-center">
      <h2 className="mb-8 text-[24px] font-bold">
        {!book ? "Add New Book" : "Edit Book"}
      </h2>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="title"
          type="text"
          placeholder="Title"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />
        <Input
          name="author"
          type="text"
          placeholder="Author"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />
        <Input
          name="isbn"
          type="text"
          placeholder="ISBN"
          register={register as unknown as UseFormRegister<FieldValues>}
          errors={errors}
        />

        <button
          type="button"
          onClick={toggleBookStatus}
          className={`w-full rounded-md px-4 py-2 text-center hover:text-white focus-visible:text-white ${bookStatus ? "bg-red-400 hover:bg-red-600 focus-visible:bg-red-600" : "bg-green-400 hover:bg-green-600 focus-visible:bg-green-600"} transition duration-300`}
        >
          {bookStatus ? "Borrowed" : "Available"}
        </button>

        <button type="submit" className="primary-btn w-full">
          Save
        </button>
      </form>
    </div>
  );
};
