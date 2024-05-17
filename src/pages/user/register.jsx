import pngwing from "../../assets/pngwing.png";
import Button from "../../component/element/button.jsx";
import { axiosInstance } from "../../lib/login.jsx";
import { Input } from "../../component/element/input.jsx";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export default function Register() {
  const navigate = useNavigate();

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (values) => {
      const { email, password, confirm_password, fullname, phone_number } = values;

      console.log('Sending data to API:', values); 

      const registerResponse = await axiosInstance.post('auth/register', {
        email,
        password,
        confirm_password,
        fullname,
        phone_number,
      });

      return registerResponse;
    },
    onError: (error) => {
      console.error('Register error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        formik.setErrors(error.response.data.error);
      }
    },
    onSuccess: (data) => {
      console.log('Register success:', data);
      navigate('/loginUser'); // Redirect after successful registration
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirm_password: '',
      fullname: '',
      phone_number: '',
    },
    onSubmit: (values) => {
      console.log("dataa yang dikirim:",values)
      mutate(values);
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Required';
      }
      if (!values.confirm_password) {
        errors.confirm_password = 'Required';
      }
      if (!values.fullname) {
        errors.fullname = 'Required';
      }
      if (!values.phone_number) {
        errors.phone_number = 'Required';
      }
      return errors;
    }
  });

  return (
    <>
      <div className="w-100% font-poppins flex-row h-screen justify-center items-center bg-white sm:flex sm:justify-center overflow-hidden">
        <div className="bg-custom-coklat w-full h-1/3 text-white sm:w-3/4 sm:h-full sm:-ml-96 left-9 sm:rounded-tr-full min-w-72 rounded-br-full sm:rounded-br-full">
          <img className="relative sm:top-1/4 sm:ml-32 sm:left-2/4 min-w-1/3 w-2/4" alt="logo" src={pngwing}></img>
        </div>
        <div className="w-full sm:w-2/3 bg-white h-full flex justify-center items-center">
          <div className="w-full pb-72 sm:-mr-40 max-w-sm flex flex-col justify-center items-center pt-32">
            <h1 className="text-3xl mb-4 text-custom-coklat">Daftar</h1>
            <form className="flex flex-col gap-4 w-full justify-center" onSubmit={formik.handleSubmit}>
              <Input variant="h-10 rounded-3xl w-100% text-white bg-custom-coklat border text-center placeholder-white border-gray-300 placeholder:opacity-50 focus:opacity-100 outline-none" type="email" name="email" id="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Masukkan Email" />
              {formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}
              <Input variant="h-10 bg-custom-coklat rounded-3xl text-white border text-center placeholder-white border-gray-300 placeholder:opacity-50 focus:opacity-100 outline-none" type="text" name="fullname" id="fullname" onChange={formik.handleChange} value={formik.values.fullname} placeholder="Nama Pengguna" />
              {formik.errors.fullname && <div className="text-red-500">{formik.errors.fullname}</div>}
              <Input variant="h-10 bg-custom-coklat rounded-3xl text-white border text-center placeholder-white border-gray-300 placeholder:opacity-50 focus:opacity-100 outline-none" type="number" name="phone_number" id="phone_number" onChange={formik.handleChange} value={formik.values.phone_number} placeholder="No Telepon" />
              {formik.errors.phone_number && <div className="text-red-500">{formik.errors.phone_number}</div>}
              <Input variant="h-10 bg-custom-coklat rounded-3xl text-white border text-center placeholder-white border-gray-300 placeholder:opacity-50 focus:opacity-100 outline-none" type="password" name="password" id="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Masukkan Password" />
              {formik.errors.password && <div className="text-red-500">{formik.errors.password}</div>}
              <Input variant="h-10 bg-custom-coklat rounded-3xl text-white border text-center placeholder-white border-gray-300 placeholder:opacity-50 focus:opacity-100 outline-none" type="password" name="confirm_password" id="confirm_password" onChange={formik.handleChange} value={formik.values.confirm_password} placeholder="Konfirmasi Password" />
              {formik.errors.confirm_password && <div className="text-red-500">{formik.errors.confirm_password}</div>}
              <Button variant="h-10 sm:mt-2 text-white bg-stone-400 hover:bg-stone-600 rounded-3xl w-1/2 sm:relative sm:ml-24" type="submit" disabled={isLoading}>Daftar</Button>
              <a className="text-center" href="/loginUser">Sudah punya akun?</a>
              {isError && <div className="text-red-500">Error: {error.message}</div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
