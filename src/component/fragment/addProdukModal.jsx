// Modal.js
import React from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/login.jsx";
import useAddProduct from "../../feature/produk/useAddProduct.jsx";


export default function AddProdukModal({ isOpen, isClose }) {

  const navigate = useNavigate();
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (values) => {
      const { image, name, price, description, category } = values;

      console.log('Sending data to API:', values);

      const productResponse = await axiosInstance.post('product/insert', {
        image,
        name,
        price,
        description,
        category,
      });

      return productResponse;
    },
    onError: (error) => {
      console.error('Add error:', error);
      if (error.response && error.response.data && error.response.data.error) {
        formik.setErrors(error.response.data.error);
      }
    },
    onSuccess: (data) => {
      console.log('Product add Success:', data);
    },
  });

  const formik = useAddProduct((values) => {
    setSubmitAttempted(true);
    console.log("Data yang dikirim:", values);
    mutate(values);
  });
  console.log(formik.values);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 h-3/6 md:w-1/3">
        <div className="p-4 relative">
          <button
            onClick={isClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2"></h2>
            <p className="text-gray-700 mb-4"></p>
            <form className="w-full flex gap-10 items-center flex-col" onSubmit={formik.handleSubmit}>
            <label htmlFor="image" className="text-custom-coklat">Gambar</label>
            <input
              type="file"
              name="image"
              id="image"
              className="w-32 rounded-full h-32 border-custom-coklat border-2 text-center py-2"
              onChange={(event) => formik.setFieldValue('image', (event.target.files[0]))}
            />
            {formik.error && <p className="text-red-500">{formik.error}</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 h-full">
                <div className="flex flex-col gap-y-5 items-start pr-10">
                  <input
                    type="text"
                    name="name"
                    className="w-full rounded-xl border-custom-coklat border-2 text-center py-2"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Nama"
                  />
                  <input
                    type="number"
                    name="price"
                    className="w-full rounded-xl border-custom-coklat text-center border-2 py-2"
                    placeholder="Harga"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                  />
                    
                  <select className="w-full rounded-xl border-custom-coklat text-center border-2 py-2" name="category" onChange={formik.handleChange} value={formik.values.category} placeholder="Kategori">
                    <option value="Kursi">Kursi</option>
                    <option value="Meja">Meja</option>
                    <option value="Kasur">Kasur</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    className="w-full h-full rounded-xl border-custom-coklat text-center border-2 py-2"
                    placeholder="Deskripsi"
                    name="description"
                    values={formik.values.description}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded-lg">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
