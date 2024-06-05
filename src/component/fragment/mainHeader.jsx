export default function MainHeader({Judul, SubJudul, margin}) {
  return(
    <>
      <h1 className="text-4xl font-semibold text-custom-coklat">{Judul}</h1>
        <p className="text-gray-600 opacity-55 pt-2">{SubJudul}</p>
      <div className={`w-5/6 h-0.5 m-14 ${margin} bg-custom-coklat opacity-40`}></div>
    </>
  )
}