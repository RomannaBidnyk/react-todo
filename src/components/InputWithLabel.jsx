import { useEffect, useRef } from "react";
import style from "./Input.module.css";
import PropTypes from "prop-types";

function InputWithLabel({ id, todoTitle, onInputChange, children }) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor={id}>{children} </label>
      <input
        className={style.inputField}
        ref={inputRef}
        id={id}
        type="text"
        name="title"
        value={todoTitle}
        onChange={onInputChange}
      />
    </>
  );
}

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  todoTitle: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default InputWithLabel;
