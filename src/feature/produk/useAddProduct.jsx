import { useFormik } from "formik";
import validationSchema from "./validationSchema";
import Kategori from "../../pages/home/kategori";

const useAddProduct = (onSubmit) => {
  return useFormik({
    initialValues: {
      image: '',
      name: '',
      price: '',
      description: '',
      category: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
};

export default useAddProduct;
