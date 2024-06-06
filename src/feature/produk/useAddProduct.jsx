import { useFormik } from "formik";
import validationSchema from "./validationSchema";

const useAddProduct = (onSubmit) => {
  return useFormik({
    initialValues: {
      image: '',
      name: '',
      price: '',
      description: '',
      category_id: [],  
      weight: '', 
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
};

export default useAddProduct;
