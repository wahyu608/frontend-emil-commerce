export default function Admin() {
  return (
		<table className="w-5/6 first-letter: bg-white">
      <thead className="bg-gray-200 border-b-2 text-custom-coklat">
        <tr className="border-b-2 border-opacity-40  border-custom-coklat">
          <th className="text-left py-3 pl-4 uppercase text-custom-coklat font-bold text-sm">No.</th>
          <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Nama</th>
          <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Harga</th>
          <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Deskripsi</th>
          <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Kategori</th>
          <th className="text-left py-3 px-4 uppercase text-custom-coklat font-bold text-sm">Aksi</th>
        </tr>
      </thead>
      <tbody className="text-custom-coklat bg-gray-200">
        <tr>
          <td className="text-left py-3 pl-4">Lian</td>
          <td className="text-left py-3 px-4">
            <a className="hover:text-blue-500" href="tel:622322662">Wahyu</a>
          </td>
          <td className="text-left py-3 pl-4">Rp. 100.000,00</td>
          <td className="text-left py-3 pl-4">Murah Meriah</td>
          <td className="text-left py-3 pl-4">Manusia</td>
          <td className="text-left py-3 pl-4">Aksi</td>
        </tr>
      </tbody>
    </table>
	)
}
