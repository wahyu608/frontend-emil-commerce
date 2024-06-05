 const Button = (props) => {
    const { type, variant } = props;
    return (
      <button className={`${variant}h-10 sm:mt-2  text-white bg-stone-400 hover:bg-stone-600 rounded-3xl w-1/2 sm:relative sm:ml-24 `} 
      type={type}>
        {props.children}
      </button> 
    );
  };

  export default Button