 const Button = (props) => {
    const { type, variant } = props;
    return (
      <button className={variant} 
      type={type}>
        {props.children}
      </button> 
    );
  };

  export default Button