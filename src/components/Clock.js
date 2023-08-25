import classes from "./Clock.module.css";
import tomato from "../assets/tomato.png";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const Clock = (props) => {
  return (
    <CircularProgressbarWithChildren
      className={classes.clock}
      value={props.percentage}
      styles={buildStyles({
        rotation: 0.25,
        strokeLinecap: "round",
        pathTransitionDuration: 0.5,
        pathColor: `rgba(234, 94, 87, ${props.percentage / 100})`,
        trailColor: "rgba(255, 157, 174, 1)",
        backgroundColor: "rgba(255, 157, 174, 1)",
      })}
    >
      <img src={tomato} className={classes.image} />
      <p className={classes.label}>{props.timer}</p>
    </CircularProgressbarWithChildren>
  );
};
export default Clock;
