import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/login.jsx"; 
import pngwing from "../../assets/pngwing.png";
import Button from "../../component/element/button.jsx";
import { Input } from "../../component/element/input.jsx";
import { useFormik } from "formik";

export default function LoginAdmin() {
    const navigate = useNavigate(); 

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                console.log(values);
                const userResponse = await axiosInstance.post('/auth/login', values);
                const { accessToken } = userResponse.data;
                navigate('/'); 
            } catch (error) {
                console.error('Login error:', error);
                
            }
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
            return errors;
        },
    });


    return (
        <div className="w-100% font-poppins flex-row h-screen justify-center items-center bg-white sm:flex sm:justify-center overflow-hidden">
            <div className="bg-custom-coklat w-full h-1/3 text-white sm:w-3/4 sm:h-full sm:-ml-96 left-9  sm:rounded-tr-full min-w-72 rounded-br-full sm:rounded-br-full">
                <img className="relative sm:top-1/4 sm:ml-32  sm:left-2/4  min-w-1/3 w-2/4" alt={"logo"}  src={pngwing}></img>
            </div>
            <div className="w-full sm:w-2/3 bg-white h-full flex justify-center items-center">
                <div className="w-full pb-72 sm:-mr-40 max-w-sm flex flex-col justify-center items-center pt-32">
                    <h1 className="text-3xl mb-4  text-custom-coklat">Login admin</h1>
                    <form className="flex flex-col gap-4 w-full" onSubmit={formik.handleSubmit}>
                      <p>{formik.values.name}</p>
                        <Input variant="h-10 rounded-3xl w-100% text-white bg-custom-coklat border text-center placeholder-white border-gray-300 placeholder: opacity-50 focus:opacity-100 outline-none"
                            type="text" name="email" id="email" onChange={formik.handleChange} placeholder="Email" />
                        {formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}
                        <Input variant="h-10 rounded-3xl w-100% text-white bg-custom-coklat border text-center placeholder-white border-gray-300 placeholder: opacity-50 focus:opacity-100 outline-none"
                            type="password" name="password" id="password" placeholder="Password" onChange={formik.handleChange} />
                        {formik.errors.password && <div className="text-red-500">{formik.errors.password}</div>}
                        <Button variant="h-10 sm:mt-2 text-white bg-stone-400 hover:bg-stone-600  rounded-3xl w-1/2 sm:relative sm:ml-24 " type="submit">Login</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
