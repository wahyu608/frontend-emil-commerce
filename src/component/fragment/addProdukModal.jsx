import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/login.jsx";
import useAddProduct from "../../feature/produk/useAddProduct.jsx";

export default function AddProdukModal({ isOpen, isClose }) {
  const navigate = useNavigate();
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      values.category_id.forEach((category) =>
        formData.append("category_id[]", category)
      );
      formData.append("weight", values.weight);

      console.log("Sending data to API:", values);

      const productResponse = await axiosInstance.post(
        "product/insert",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return productResponse;
    },
    onError: (error) => {
      console.error("Add error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        formik.setErrors(error.response.data.error);
      }
    },
    onSuccess: (data) => {
      console.log("Product add Success:", data);
      isClose();
      navigate("/admin/products");
    },
  });

  const formik = useAddProduct((values) => {
    setSubmitAttempted(true);
    console.log("Data yang dikirim:", values);
    mutate(values);
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/3">
        <div className="p-4 relative">
          <button
            onClick={isClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-2">Tambah Produk</h2>
            <p className="text-gray-700 mb-4">Masukkan detail produk</p>
            <form
              className="w-full flex flex-col items-center gap-4"
              onSubmit={formik.handleSubmit}
            >
              <label htmlFor="image" className="text-custom-coklat">
                Gambar
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="w-32 rounded-full h-32 border-custom-coklat border-2 text-center py-2"
                onChange={(event) =>
                  formik.setFieldValue("image", event.target.files[0])
                }
              />
              {formik.errors.image && (
                <p className="text-red-500">{formik.errors.image}</p>
              )}
              <input
                type="text"
                name="name"
                className="w-full rounded-xl border-custom-coklat border-2 text-center py-2"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder="Nama"
              />
              {formik.errors.name && (
                <p className="text-red-500">{formik.errors.name}</p>
              )}
              <input
                type="number"
                name="price"
                className="w-full rounded-xl border-custom-coklat text-center border-2 py-2"
                placeholder="Harga"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
              {formik.errors.price && (
                <p className="text-red-500">{formik.errors.price}</p>
              )}
              <input
                type="number"
                name="weight"
                className="w-full rounded-xl border-custom-coklat text-center border-2 py-2"
                placeholder="Berat"
                onChange={formik.handleChange}
                value={formik.values.weight}
              />
              {formik.errors.weight && (
                <p className="text-red-500">{formik.errors.weight}</p>
              )}
              <select
                multiple
                className="w-full rounded-xl border-custom-coklat text-center border-2 py-2"
                name="category_id"
                onChange={(event) => {
                  const selectedOptions = Array.from(
                    event.target.selectedOptions,
                    (option) => option.value
                  );
                  formik.setFieldValue("category_id", selectedOptions);
                }}
                value={formik.values.category_id}
              >
                <option value="" disabled>
                  Pilih Kategori
                </option>
                <option value="1">Kursi</option>
                <option value="2">Meja</option>
                <option value="3">Kasur</option>
              </select>
              {formik.errors.category_id && (
                <p className="text-red-500">{formik.errors.category_id}</p>
              )}
              <textarea
                className="w-full rounded-xl border-custom-coklat text-center border-2 py-2"
                placeholder="Deskripsi"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.errors.description && (
                <p className="text-red-500">{formik.errors.description}</p>
              )}
              <button
                type="submit"
                className="bg-gray-800 text-white px-6 py-2 rounded-lg"
              >
                Submit
              </button>
              {isLoading && <p>Loading...</p>}
              {isError && (
                <p className="text-red-500">Error: {error.message}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
