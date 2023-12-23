import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
//components
import QuestionCards from "./components/QuestionCards";
//Types
import { QuestionsState, Difficulty } from "./API";
// Styles
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0); 
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  //* This function is used to start the Quiz game
  const startTrivia = async () => {
    
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    ); //* Fetches the Questions that need to be displayed. Takes Total Number of Questions and Difficulty to get Questions from the API

    setQuestions(newQuestions); //* Stores the generated Questions once per game
    setScore(0);//* Sets the initial Score

    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  // * This function is used to check the answer of the user which will take an input from only an html button hence the type written above.
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  // * Updating the Question count
  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) setGameOver(true);
    else setNumber(nextQuestion);
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Computer Quiz</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ) : null}
        {!gameOver ? <p className="Score">Score: {score}</p> : null}
        {loading && <p>Loading Questions....</p>}
        {!gameOver && !loading ? (
          <QuestionCards
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        ) : null}
        {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
