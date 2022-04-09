import React from "react";

function Card(props) {
  const style = {
    chosen: {
      backgroundColor: "#D6DBF5",
      border: "none",
    },
    notChosen: {
      backgroundColor: "transparent",
    },
    correctChosen: {
      backgroundColor: "#94D7A2",
      border: "none",
    },
    correctNotChosen: {
      backgroundColor: "#c3e6ca",
      border: "none",
    },
    incorrect: {
      backgroundColor: "#F8BCBC",
      border: "none",
      opacity: "0.5",
    },
    rest: {
      backgroundColor: "transparent",
      opacity: "0.5",
    },
  };

  const answerSpans = props.answers.map((answer, id) => {
    return (
      <span
        key={"a" + id}
        className="card--answer"
        onClick={props.handleClick}
        value={answer}
        question={props.question}
        style={
          answer === props.chosenAnswer && !props.isOver
            ? style.chosen
            : answer !== props.chosenAnswer && !props.isOver
            ? style.notChosen
            : answer === props.chosenAnswer &&
              props.chosenAnswer === props.correctAnswer &&
              props.isOver
            ? style.correctChosen
            : answer !== props.chosenAnswer && answer === props.correctAnswer
            ? style.correctNotChosen
            : answer === props.chosenAnswer &&
              props.chosenAnswer !== props.correctAnswer &&
              props.isOver
            ? style.incorrect
            : style.rest
        }
      >
        {answer}
      </span>
    );
  });

  return (
    <div className="card">
      <h3 className="card--question">{props.question}</h3>
      <div className="card--answers-wrap">{answerSpans}</div>
    </div>
  );
}

export default Card;
