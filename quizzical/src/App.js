import React from "react";
import Card from "./Card";
import he from "he";

function shuffle(array) {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function App() {
  const [quiz, setQuiz] = React.useState([
    {
      correct_answer: "",
      incorrect_answers: ["", "", ""],
      allAnswers: ["", "", "", ""],
      question: "",
      chosenAnswer: "",
    },
  ]);
  const [isOver, setIsOver] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [isStarted, setIsStarted] = React.useState(false);

  function pullQuestions() {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then(response => response.json())
      .then(data =>
        setQuiz(
          data.results.map(result => {
            return {
              correct_answer: he.decode(result.correct_answer),
              incorrect_answers: result.incorrect_answers.map(answer =>
                he.decode(answer)
              ),
              allAnswers: shuffle([
                he.decode(result.correct_answer),
                ...result.incorrect_answers.map(answer => he.decode(answer)),
              ]),
              question: he.decode(result.question),
              chosenAnswer: "",
            };
          })
        )
      )
      .then(() => setIsOver(false));
  }

  React.useEffect(() => {
    pullQuestions();
  }, []);

  function startQuiz() {
    setIsStarted(true);
  }

  function calculateAnswers() {
    let scores = 0;
    quiz.forEach(obj => {
      if (obj.chosenAnswer === obj.correct_answer) {
        scores++;
      }
    });
    setScore(scores);
  }

  function checkAnswers() {
    if (isOver) {
      pullQuestions();
    } else {
      calculateAnswers();
      setIsOver(true);
    }
  }

  function chooseAnswer(event) {
    if (!isOver) {
      setQuiz(prevQuiz => {
        return prevQuiz.map(card => {
          if (event.target.getAttribute("question") === card.question) {
            return {
              ...card,
              chosenAnswer: event.target.getAttribute("value"),
            };
          } else {
            return card;
          }
        });
      });
    }
  }

  const cards = quiz.map((object, id) => {
    return (
      <Card
        key={"c" + id}
        question={object.question}
        answers={object.allAnswers}
        chosenAnswer={object.chosenAnswer}
        correctAnswer={object.correct_answer}
        handleClick={chooseAnswer}
        isOver={isOver}
      />
    );
  });

  return isStarted ? (
    <main className="main-quiz">
      <div className="main-quiz--card-container">{cards}</div>
      <div className="main--results">
        {isOver && (
          <h3 className="score">You scored {score}/5 correct answers</h3>
        )}
        <button className="results--check-button" onClick={checkAnswers}>
          {isOver ? "Play again" : "Check answers"}
        </button>
      </div>
    </main>
  ) : (
    <main className="main-start">
      <h1>Quizzical</h1>
      <p>Test your knowledge!</p>
      <button className="main--start-button" onClick={startQuiz}>
        Start quiz
      </button>
    </main>
  );
}

export default App;
