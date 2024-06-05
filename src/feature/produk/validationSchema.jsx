import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Email diperlukan'),
  fullname: Yup.string().required('Nama pengguna diperlukan'),
  phone_number: Yup.string().required('No telepon diperlukan'),
  password: Yup.string().min(6, 'Password harus minimal 6 karakter').required('Password diperlukan'),
  confirm_password: Yup.string().oneOf([Yup.ref('password'), null], 'Konfirmasi password harus sama').required('Konfirmasi password diperlukan'),
});

export default validationSchema;
