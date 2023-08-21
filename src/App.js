import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import "./App.css";
import pauseImg from "./assets/pause.png";
import restart from "./assets/restart.png";
import Length from "./components/Length";
import Header from "./components/Header";
import Clock from "./components/Clock";
const defaultSession = 15;

function App() {
  const [session, setSession] = useState(defaultSession);
  const [breakLength, setBreakLength] = useState(5);

  const [currentTimerMinute, setCurrentTimerMinute] = useState(defaultSession);
  const [currentTimerSecond, setCurrentTimerSecond] = useState(0);
  const [isActive, setIsActive] = useState(false);

  let interval = null;

  const resetButtonHandler = () => {
    clearInterval(interval);
    setCurrentTimerMinute(session);
    setCurrentTimerSecond(0);
  };

  const startButtonHandler = () => {
    setIsActive(!isActive);
  };

  const sessionValueHandler = (val) => {
    if (interval) {
      clearInterval(interval);
    }
    console.log(val);
    setSession(val);
    setCurrentTimerMinute(val);
    setCurrentTimerSecond(0);
  };
  const breakValueHandler = (val) => {
    setBreakLength(val);
  };
  const minutes =
    currentTimerMinute < 10 ? `0${currentTimerMinute}` : currentTimerMinute;
  const seconds =
    currentTimerSecond < 10 ? `0${currentTimerSecond}` : currentTimerSecond;

  useEffect(() => {
    if (isActive) {
      interval = setInterval(() => {
        if (currentTimerSecond === 0) {
          if (currentTimerMinute !== 0) {
            setCurrentTimerSecond(59);
            setCurrentTimerMinute(currentTimerMinute - 1);
          } else {
            setCurrentTimerSecond(59);
          }
        } else {
          setCurrentTimerSecond(currentTimerSecond - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentTimerMinute, currentTimerSecond, isActive]);
  return (
    <React.Fragment>
      <Header />
      <section>
        <Length
          label="Break Length"
          value={breakLength}
          minValue="5"
          maxValue="30"
          onLengthHandler={breakValueHandler}
        />

        <Length
          label="Session Length"
          value={session}
          minValue="15"
          maxValue="60"
          onLengthHandler={sessionValueHandler}
        />
      </section>
      <section>
        <Clock timer={`${minutes}:${seconds}`} />
      </section>
      <section className="button">
        <Button
          label={!isActive ? "START" : "PAUSE"}
          image={pauseImg}
          onClickHandler={startButtonHandler}
        />
        <Button
          label="RESET"
          image={restart}
          onClickHandler={resetButtonHandler}
        />
      </section>
      <footer>
        With ♡ by @Dereemii for WWCode FrontEnd , tomato by Flaticon
      </footer>
    </React.Fragment>
  );
}

export default App;
