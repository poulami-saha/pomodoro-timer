import classes from "./Header.module.css";
const Header = () => {
  return (
    <div className={classes.container}>
      <div className={classes.bar}></div>
      <p className={classes.header}>Pomodoro Timer</p>
      <div className={classes.bar}></div>
    </div>
  );
};
export default Header;
