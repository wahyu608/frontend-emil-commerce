 const Button = (props) => {
    const { type, onChange, onClick, variant } = props;
    return (
      <button className={variant} 
      type={type} 
      onChange={onChange}
      onClick={onClick}>
        {props.children}
      </button> 
    );
  };

  export default Button