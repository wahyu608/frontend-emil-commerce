export const Input = (props) => {
    const { type, name, id, placeholder, value, variant, onChange } = props;
    return (
        <input 
            className={`${variant} h-10 rounded-3xl w-100% text-white bg-custom-coklat border text-center placeholder-white border-gray-300 placeholder:opacity-50 focus:opacity-100 outline-none`} 
            type={type} 
            name={name} 
            id={id} 
            value={value}
            onChange={onChange}
            placeholder={placeholder} 
        />
    );
};


  