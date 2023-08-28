import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import "./App.css";
import pauseImg from "./assets/pause.png";
import restart from "./assets/restart.png";
import Length from "./components/Length";
import Header from "./components/Header";
import Clock from "./components/Clock";

const defaultSessionLength = 15;
const defaultBreakLength = 5;

function App() {
  const [sessionLength, setSessionLength] = useState(defaultSessionLength);
  const [breakLength, setBreakLength] = useState(defaultBreakLength);

  const [currentTimerMinute, setCurrentTimerMinute] =
    useState(defaultSessionLength);
  const [currentTimerSecond, setCurrentTimerSecond] = useState(0);

  const [isOnBreak, setIsOnBreak] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [percent, setPercent] = useState(0);

  let interval = null;

  const resetButtonHandler = () => {
    clearInterval(interval);
    setCurrentTimerMinute(sessionLength);
    setCurrentTimerSecond(0);
    setPercent(0);
  };

  const startButtonHandler = () => {
    setIsActive(!isActive);
  };

  const switchHandler = () => {
    let isOnBreakTime = isOnBreak;
    if (interval) {
      clearInterval(interval);
    }

    setIsOnBreak(!isOnBreak);
    isOnBreakTime = !isOnBreakTime;

    if (isOnBreakTime) {
      setCurrentTimerMinute(breakLength);
      setIsActive(true);
    } else {
      setCurrentTimerMinute(sessionLength);
      setIsActive(false);
    }
    setCurrentTimerSecond(0);
    setPercent(0);
  };

  const lengthValueHandler = (type, lengthValue) => {
    if (interval) {
      clearInterval(interval);
    }

    setCurrentTimerSecond(0);

    if (type === "break") {
      setBreakLength(lengthValue);
      if (isOnBreak) {
        setCurrentTimerMinute(lengthValue);
      }
    }
    if (type === "session") {
      setSessionLength(lengthValue);
      if (!isOnBreak) {
        setCurrentTimerMinute(lengthValue);
      }
    }
  };

  const minutes =
    currentTimerMinute < 10 ? `0${currentTimerMinute}` : currentTimerMinute;
  const seconds =
    currentTimerSecond < 10 ? `0${currentTimerSecond}` : currentTimerSecond;

  const totalTime = isOnBreak ? breakLength * 60 : sessionLength * 60;

  useEffect(() => {
    if (isActive) {
      interval = setInterval(() => {
        if (currentTimerMinute === 0 && currentTimerSecond === 0) {
          setCurrentTimerMinute(isOnBreak ? breakLength : sessionLength);
          setIsActive(false);
          return () => clearInterval(interval);
        }
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
        setPercent(
          ((currentTimerMinute * 60 + currentTimerSecond) / totalTime) * 100
        );
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
          minValue="1"
          type="break"
          onLengthHandler={(type, lengthValue) =>
            lengthValueHandler(type, lengthValue)
          }
        />

        <Length
          label="Session Length"
          value={sessionLength}
          minValue="1"
          type="session"
          onLengthHandler={(type, lengthValue) =>
            lengthValueHandler(type, lengthValue)
          }
        />
      </section>
      <section>
        <Clock timer={`${minutes}:${seconds}`} percentage={percent} />
      </section>
      <section className="button">
        {!isOnBreak && (
          <Button
            label={!isActive ? "START" : "PAUSE"}
            image={pauseImg}
            onClickHandler={startButtonHandler}
          />
        )}
        {!isOnBreak && isActive && (
          <Button
            label="RESET"
            image={restart}
            onClickHandler={resetButtonHandler}
          />
        )}
        <Button
          label={isOnBreak ? "POMODORO" : "BREAK"}
          image={restart}
          onClickHandler={switchHandler}
        />
      </section>
      <footer>
        With ♡ by @Dereemii for WWCode FrontEnd , tomato by Flaticon
      </footer>
    </React.Fragment>
  );
}

export default App;
