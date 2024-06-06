import MainHeader from "../../component/fragment/mainHeader";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFetchUser } from "../../store/useFetchUser";
import useAuthStore from "../../store/useAuthStore";
import Cookies from "js-cookie";
import { button } from "@material-tailwind/react";
import axiosInstance from "../../lib/login";

export default function Users() {
  let {
    userEntries,
    userCount,
    loading,
    fetchUser,
    page,
    limit,
    orderBy,
    orderType,
    query,
    setQuery,
  } = useFetchUser();
  let [paginationData, setPaginationData] = useState({});
  const [paginationButton, setPaginationButton] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetchUser(orderBy, orderType, page, limit, query);
    const token = Cookies.get("accessToken"),
      pageLength = Math.floor(userCount / limit) + 1;
    if (!token) navigate("/loginUser");
    setPaginationData({
      length: (page - 1) * limit,
      pageButton: Math.floor(userCount / limit) + 1,
    });

    const paginationButtons = [];
    for (let index = 0; index < pageLength; index++) {
      paginationButtons.push({
        currentPage: page - 1 == index,
        onClick: async () =>
          await fetchUser(orderBy, orderType, index + 1, limit, query),
        text: index + 1,
        id: index,
      });
    }
    setPaginationButton(paginationButtons);
  }, [fetchUser, page, limit, orderType, orderBy, query]);

  const location = useLocation();
  const isDashboardRoute = location.pathname === "/admin/users";

  async function search(element) {
    if (element.code === "Enter") {
      setQuery(element.target.value);
    }
  }

  async function promoteUser(userId) {
    try {
      await axiosInstance.post("user/promote", {
        userId: userId.toString(),
      });
      await fetchUser(orderBy, orderType, page, limit, query);
    } catch (e) {
      console.log(e);
    }
  }

  async function demoteUser(userId) {
    try {
      await axiosInstance.post("user/demote", {
        userId: userId.toString(),
      });
      await fetchUser(orderBy, orderType, page, limit, query);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <div className="px-4 py-6 w-full flex flex-col items-center">
        <MainHeader
          Judul="Manajemen User"
          SubJudul="Lihat data User dulu yuk"
          margin="mb-7"
        />
      </div>
      <div className="w-full flex justify-center pb-5">
        <div className="w-5/6 overflow-x-hidden flex flex-col gap-y-10 ">         
          <input
            className="bg-custom-coklat h-10 border w-72 border-gray-300 rounded-3xl text-center text-white placeholder-white  placeholder: opacity-50 focus:opacity-100 outline-none"
            type="search"
            placeholder="Cari Disini"
            onKeyDown={search}
          />
        </div>
      </div>
      <div className="w-full flex-col overflow-x-hidden border-t flex items-center">

          <div className="w-5/6 overflow-x-scroll">
            <table className="w-[1400px] first-letter: bg-white min-h-[600px]">
              <thead className="bg-gray-200 border-b-2 text-custom-coklat">
                <tr className="border-b-2 border-opacity-40  border-custom-coklat">
                  <th className="text-left py-3 pl-4 uppercase text-custom-coklat font-bold text-sm">
                    No.
                  </th>
                  <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                    Nama
                  </th>
                  <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                    No. HP
                  </th>
                  <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                    Role User
                  </th>
                  <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="text-custom-coklat bg-gray-200">
                {loading ? (
                  <tr>
                    <td className="text-center p-4 text-dark text-[48px]" colSpan="12">
                      Loading...
                    </td>
                  </tr>
                ) : userEntries.length > 0 ? (
                  userEntries.map((userEntry, index) => (
                    <tr key={userEntry.id}>
                      <td className="text-left py-3 pl-4">
                        {paginationData.length + index + 1}.
                      </td>
                      <td className="text-left py-3 px-4 w-[209px]">
                        {userEntry.fullname}
                      </td>
                      <td className="text-left py-3 pl-4">
                        {userEntry.phoneNumber ?? "0872187932658"}
                      </td>
                      <td className="text-left py-3 pl-4">{userEntry.email}</td>
                      <td className="text-left py-3 pl-4">
                        {userEntry.roleUser == "normal"
                          ? "Pengguna biasa"
                          : "Admin"}
                      </td>
                      <td className="text-left py-3 pl-4">
                        {userEntry.roleUser == "normal" ? (
                          <button
                            className="p-2 px-4 bg-custom-coklat bg-opacity-40 text-white rounded-md hover:shadow-md hover:bg-opacity-100"
                            onClick={() => promoteUser(userEntry.id)}
                          >
                            Promote
                          </button>
                        ) : (
                          <button
                            className="p-2 px-4 bg-custom-coklat bg-opacity-40 text-white rounded-md hover:shadow-md hover:bg-opacity-100"
                            onClick={() => demoteUser(userEntry.id)}
                          >
                            Demote
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center p-4 text-dark" colSpan="12">
                      Data tidak ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        {/* Pagination Section */}
        <div className="mt-8">
          {loading == false &&
            paginationButton.map((paginationButton, index) => (
              <button
                key={index}
                className={`${
                  paginationButton.currentPage
                    ? "bg-opacity-20 text-dark"
                    : "bg-opacity-100 text-white"
                } bg-custom-coklat p-3 px-5  m-2 rounded-md font-bold border-1`}
                onClick={paginationButton.onClick}
              >
                {paginationButton.text}
              </button>
            ))}

        </div>
      </div>
    </div>
  );
}
