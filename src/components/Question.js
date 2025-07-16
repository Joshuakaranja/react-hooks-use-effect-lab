import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // useEffect for timer functionality
  useEffect(() => {
    // Reset timer when question changes
    setTimeRemaining(10);
  }, [question]);

  useEffect(() => {
    // Set up interval to decrease timer every second
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          // Time's up! Auto-answer with false (incorrect)
          onAnswered(false);
          return 10; // Reset for next question
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup function to clear timeout
    return () => {
      clearTimeout(timer);
    };
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
