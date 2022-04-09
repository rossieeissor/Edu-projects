import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import showRandomFace from "./diceFaces";

let startTime;

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rolls, setRolls] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [bestTime, setBestTime] = React.useState(
    JSON.parse(localStorage.getItem("bestTime")) || {}
  );
  const [isNewRecord, setIsNewRecord] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].face.value;
    const allSameValue = dice.every(die => die.face.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  React.useEffect(() => {
    if (tenzies) {
      const spendedTime = new Date() - startTime;
      setMinutes(Math.floor(spendedTime / 60000));
      setSeconds(Math.floor((spendedTime % 60000) / 1000));
    }
  }, [tenzies, minutes, seconds]);

  React.useEffect(() => {
    if (tenzies) {
      const bestSeconds = bestTime.min * 60 + bestTime.sec;
      const newSeconds = minutes * 60 + seconds;
      if (
        newSeconds < bestSeconds ||
        (JSON.stringify(bestTime) === "{}" && (minutes !== 0 || seconds !== 0))
      ) {
        localStorage.setItem(
          "bestTime",
          JSON.stringify({ min: minutes, sec: seconds })
        );
        setBestTime({ min: minutes, sec: seconds });
        setIsNewRecord(true);
      }
    }
  }, [minutes, seconds, bestTime, tenzies]);

  function generateNewDie() {
    return {
      face: showRandomFace(),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    if (rolls === 0) {
      startTime = new Date();
    }
    if (!tenzies) {
      setRolls(prevRolls => prevRolls + 1);
      setDice(oldDice =>
        oldDice.map(die => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRolls(0);
      setIsNewRecord(false);
    }
  }

  function holdDice(id) {
    setDice(oldDice =>
      oldDice.map(die => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      face={die.face.face()}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
      value={die.face.value}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        {isNewRecord
          ? "Congratulations! You have set new record!"
          : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
      </p>
      <div className="dice-container">{diceElements}</div>
      <h2>{rolls === 0 ? "Let's Roll!" : `Rolls: ${rolls}`}</h2>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <div className="time">
        {tenzies && <span>Your time: </span>}
        {tenzies && minutes !== 0 && <span>{`${minutes} m `}</span>}
        {tenzies && seconds !== 0 && <span>{`${seconds} s`}</span>}
      </div>
      {JSON.stringify(bestTime) !== "{}" && (
        <h2 className="record">{`Record: ${bestTime.min} m ${bestTime.sec} s`}</h2>
      )}
    </main>
  );
}
