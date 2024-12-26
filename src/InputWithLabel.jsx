import React from "react";

function InputWithLabel({ id, todoTitle, onInputChange, children }) {
  const inputRef = React.useRef();
  React.useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor={id}>{children} </label>
      <input
        ref={inputRef}
        id="todoTitle"
        type="text"
        name="title"
        value={todoTitle}
        onChange={onInputChange}
      />
    </>
  );
}

export default InputWithLabel;
