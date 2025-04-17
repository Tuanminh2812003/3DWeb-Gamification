// src/components/QuestionPopup.jsx
import React, { useState } from 'react';
import "./styles.css";

const QuestionPopup = ({ question, answers, correctAnswer, onClose }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleClose = () => {
    onClose(isCorrect); // Close the popup and pass whether the answer was correct
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3 className="question-title">{question}</h3>
        <div className="answers">
          {answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              disabled={isAnswered}
              className={`answer-button ${selectedAnswer === answer ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
            >
              {answer}
            </button>
          ))}
        </div>
        {isAnswered && (
          <div className="result-message">
            <p>{isCorrect ? 'Đúng rồi!' : 'Sai rồi, thử lại!'}</p>
            <button onClick={handleClose} className="close-btn">Đóng</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionPopup;
