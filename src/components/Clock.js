import classes from "./Clock.module.css";
import tomato from "../assets/tomato.png";
const Clock = (props) => {
  return (
    <div className={classes.clock}>
      <img src={tomato} className={classes.image} />
      <p className={classes.label}>{props.timer}</p>
    </div>
  );
};
export default Clock;
