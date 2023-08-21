import { useState } from "react";
import classes from "./Length.module.css";
import add from "../assets/add.png";
import remove from "../assets/remove.png";
const Length = (props) => {
  const [value, setValue] = useState(props.value);
  const minValue = +props.minValue;
  const maxValue = +props.maxValue;

  const addButtonHandler = () => {
    setValue((prevValue) => (prevValue !== maxValue ? ++prevValue : prevValue));
    props.onLengthHandler(value + 1);
  };

  const subtractButtonHandler = () => {
    setValue((prevValue) => (prevValue !== minValue ? --prevValue : prevValue));
    props.onLengthHandler(value - 1);
  };

  return (
    <div>
      <p className={classes.label}>{props.label}</p>
      <div className={classes.container}>
        <img
          src={remove}
          className={classes.image}
          onClick={subtractButtonHandler}
        />
        <p className={classes.length}>{value}</p>
        <img src={add} className={classes.image} onClick={addButtonHandler} />
      </div>
    </div>
  );
};
export default Length;
