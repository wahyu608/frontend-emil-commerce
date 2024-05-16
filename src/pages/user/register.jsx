import { useEffect } from "react"
import pngwing from "../../assets/pngwing.png"
import Button from "../../component/element/button.jsx"
// import { axiosInstance } from "../../lib/login.jsx"
import { Input } from "../../component/element/input.jsx"

export default function Register() {

  return (
    <>
    <div className="w-100% font-poppins flex-row h-screen justify-center items-center bg-white sm:flex sm:justify-center overflow-hidden">
      <div className=" bg-custom-coklat w-full h-1/3 text-white sm:w-3/4 sm:h-full sm:-ml-96 left-9  sm:rounded-tr-full min-w-72 rounded-br-full sm:rounded-br-full">
        <img className="relative sm:top-1/4 sm:ml-32  sm:left-2/4  min-w-1/3 w-2/4" alt={"logo"}  src={pngwing}></img>
      </div>
      <div className="w-full sm:w-2/3 bg-white h-full flex justify-center items-center">
        <div className="w-full pb-72 sm:-mr-40 max-w-sm flex flex-col justify-center items-center pt-32">
          <h1 className="text-3xl mb-4  text-custom-coklat">Daftar</h1>
          <form className="flex flex-col gap-4 w-full justify-center">
            <label htmlFor="username"></label>
            <Input variant=" h-10 rounded-3xl w-100% text-white bg-custom-coklat border text-center placeholder-white border-gray-300 placeholder: opacity-50 focus:opacity-100 outline-none" 
            type="text" name="email" id="email" placeholder="Masukkan Email" />
            <label htmlFor="Password"></label>
            <Input variant="h-10 sm:-mt-4 bg-custom-coklat rounded-3xl text-white border text-center placeholder-white  border-gray-300 placeholder: opacity-50 focus:opacity-100 outline-none" type="text" name="pengguna" id="pengguna" placeholder="Nama Pengguna" />
            <Input variant="h-10 bg-custom-coklat rounded-3xl text-white border text-center placeholder-white  border-gray-300 placeholder: opacity-50 focus:opacity-100 outline-none" type="text" name="password" id="password" placeholder="No Telepon" />
            <Input variant="h-10 bg-custom-coklat rounded-3xl text-white border text-center placeholder-white  border-gray-300 placeholder: opacity-50 focus:opacity-100 outline-none" type="text" name="password" id="password" placeholder="Masukkan Password" />
            <Input variant="h-10 bg-custom-coklat rounded-3xl text-white border text-center placeholder-white  border-gray-300 placeholder: opacity-50 focus:opacity-100 outline-none " type="text" name="password" id="password" placeholder="Konfirmasi Password" />
            <Button variant="h-10 sm:mt-2 text-white bg-stone-400 hover:bg-stone-600  rounded-3xl w-1/2 sm:relative sm:ml-24 ">Daftar</Button>
            <a className="text-center" href="/loginUser">sudah punya akun?</a>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

