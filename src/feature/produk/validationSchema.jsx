import * as Yup from "yup";

const validationSchema = Yup.object({
  image: Yup.mixed().required('Gambar diperlukan'),
  name: Yup.string().required('Nama diperlukan'),
  price: Yup.number().required('Harga diperlukan').positive('Harga harus positif'),
  description: Yup.string().required('Deskripsi diperlukan'),
  category_id: Yup.array().of(Yup.string()).min(1, 'Minimal satu kategori diperlukan').required('Kategori diperlukan'),  
  weight: Yup.number().required('Berat diperlukan').positive('Berat harus positif'),  
});

export default validationSchema;
