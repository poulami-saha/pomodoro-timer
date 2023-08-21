import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <div className={classes.container} onClick={props.onClickHandler}>
      <img src={props.image} className={classes.image}/>
      <span>{props.label}</span>
    </div>
  );
};

export default Button;
