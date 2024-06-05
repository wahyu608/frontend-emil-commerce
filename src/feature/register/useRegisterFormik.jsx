import { useFormik } from "formik";
import validationSchema from "./validationSchema";

const useRegisterFormik = (onSubmit) => {
  return useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
      fullname: '',
      phone_number: '',
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });
};

export default useRegisterFormik;
