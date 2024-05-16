export const Input = (props) => {
    const { type, name, id, placeholder, value, variant,onChange } = props;
    return (
        <input className={variant} 
        type={type} 
        name={name} 
        id={id} 
        value={value}
        onChange={onChange}
        placeholder={placeholder} />
    );
  };

  