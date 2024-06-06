import MainHeader from "../../component/fragment/mainHeader";
import AddProdukModal from "../../component/fragment/addProdukModal";
import { useEffect, useState } from "react";
import useFetchProduk from "../../store/useFetchProduk.jsx";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../lib/login.jsx";
import { useFormik } from "formik";

export default function Product() {
  const { produk, fetchProduk, deleteProduct } = useFetchProduk((state) => ({
    produk: state.produk,
    fetchProduk: state.fetchProduk,
    deleteProduct: state.deleteProduct,
  }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductImage, setEditProductImage] = useState(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (id) => {
      await deleteProduct(id);
    },
    onError: (error) => {
      console.error("Delete error:", error);
    },
    onSuccess: () => {
      fetchProduk();
    },
  });

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      mutation.mutate(productId);
    }
  };

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: async (values) => {
      const formData = new FormData();
      if (values.image) {
        formData.append("image", values.image);
      }
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("description", values.description);
      values.category_id.forEach((category) =>
        formData.append("category_id[]", category)
      );
      formData.append("weight", values.weight);

      console.log("Sending data to API:", values);

      const productResponse = await axiosInstance.post(
        `product/update/${editProductId}`,
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
      console.error("Update error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        // Tambahkan penanganan error sesuai kebutuhan
      }
    },
    onSuccess: (data) => {
      console.log("Product update Success:", data);
      setIsModalOpen(false);
      setEditProductImage(null);
      // Redirect atau lakukan tindakan lain setelah berhasil memperbarui produk
      fetchProduk();
    },
  });

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditProductImage(null);
  };

  const handleEditProduct = (productId) => {
    setEditProductId(productId);
    const product = produk.find((item) => item.id === productId);
    setEditProductImage(product.image || "");
    formik.setValues({
      image: "",
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      category_id: product.categories.map((category) => category.id) || [],
      weight: product.weight || "",
    });
  };

  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      price: "",
      description: "",
      category_id: [],
      weight: "",
    },
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("image", file);
    setEditProductImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    fetchProduk();
  }, [fetchProduk]);

  return (
    <div>
      <div className="px-4 py-6 w-full flex flex-col items-center">
        <MainHeader
          Judul="Manajemen Produk"
          SubJudul="Lihat data produk dulu yuk"
        />
      </div>
      <div className="w-full flex justify-center pb-5">
        <div className="w-5/6 overflow-x-hidden flex justify-between">
          <input
            className="bg-custom-coklat h-10 border border-gray-300 rounded-3xl text-center text-white placeholder-white placeholder:opacity-50 focus:opacity-100 outline-none"
            type="search"
            placeholder="Cari Disini"
          />
          <button
            className="bg-custom-coklat h-10 w-11 border rounded-3xl text-white border-gray-300 placeholder:opacity-50 focus:opacity-100 outline-none"
            onClick={handleAddProduct}
          >
            +
          </button>
        </div>
      </div>
      <div className="w-full overflow-x-hidden border-t flex justify-center">
        <table className="w-5/6 first-letter:bg-white">
          <thead className="bg-gray-200 border-b-2 text-custom-coklat">
            <tr className="border-b-2 border-opacity-40 border-custom-coklat">
              <th className="text-left py-3 pl-4 uppercase text-custom-coklat font-bold text-sm">
                No.
              </th>
              <th className="text-left py-3 pl-3 uppercase text-custom-coklat font-bold text-sm">
                Foto
              </th>
              <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                Nama
              </th>
              <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                Harga
              </th>
              <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                Deskripsi
              </th>
              <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                Kategori
              </th>
              <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="text-custom-coklat bg-gray-200">
            {produk.map((item, index) => (
              <tr key={item.id}>
                <td className="text-left py-3 pl-4">{index + 1}</td>
                <td className="text-left py-3 pl-3">
                  {editProductId === item.id ? (
                    <div>
                      <img
                        src={editProductImage}
                        alt={item.name}
                        className="h-10 bg-gray-300 mb-4"
                      />
                      <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                      />
                    </div>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 bg-gray-300 mb-4"
                    />
                  )}
                </td>
                <td className="text-left py-3 px-4">
                  {editProductId === item.id ? (
                    <input
                      type="text"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="text-left py-3 px-4">
                  {editProductId === item.id ? (
                    <input
                      type="number"
                      name="price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                    />
                  ) : (
                    item.price
                  )}
                </td>
                <td className="text-left py-3 px-4">
                  {editProductId === item.id ? (
                    <input
                      type="text"
                      name="description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td className="text-left py-3 px-4">
                  {editProductId === item.id ? (
                    <select
                      multiple
                      name="category_id"
                      value={formik.values.category_id}
                      onChange={(e) => {
                        const selectedOptions = Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        );
                        formik.setFieldValue("category_id", selectedOptions);
                      }}
                    >
                      <option value="1">Kursi</option>
                      <option value="2">Meja</option>
                      <option value="3">Kasur</option>
                    </select>
                  ) : (
                    item.categories.map((category) => category.name).join(", ")
                  )}
                </td>
                <td className="text-left py-3 px-4">
                  {editProductId === item.id ? (
                    <button
                      className="text-green-500 hover:underline"
                      onClick={() => {
                        formik.handleSubmit();
                      }}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleEditProduct(item.id)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="text-red-500 hover:underline ml-2"
                    onClick={() => handleDeleteProduct(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddProdukModal isOpen={isModalOpen} isClose={handleCloseModal} />
      </div>
    </div>
  );
}
