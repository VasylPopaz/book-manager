import * as yup from "yup";

export const bookFormSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Min length must be more than 2 symbols.")
    .matches(/^[^\s].*[^\s]$/, "Title should not start or end with spaces")
    .matches(/^(?!.*\s{2,}).*$/, "Title should not have double spaces"),
  author: yup
    .string()
    .required("Author is required")
    .min(2, "Min length must be more than 2 symbols.")
    .matches(
      /^[^\s].*[^\s]$/,
      "Author name should not start or end with spaces"
    )
    .matches(/^(?!.*\s{2,}).*$/, "Author name should not have double spaces"),
  isbn: yup
    .string()
    .required("ISBN is required")
    .matches(/^[^\s].*[^\s]$/, "ISBN should not start or end with spaces")
    .matches(/^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/, "ISBN is not valid"),
  isBorrowed: yup.boolean().default(false),
});
