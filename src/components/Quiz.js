import React, { useEffect, useState } from 'react';
import QuizResult from './QuizResult';
import axios from 'axios';

function Quiz() {
  const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080; // The port your server is running on

// Enable CORS for all routes
app.use(cors());

// Define your routes and handle data requests here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

  const url = 'http://localhost:8080/';
  const [data, setData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clickedOption, setClickedOption] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(null); // New state to store error

  const changeQuestion = () => {
    updateScore();
    if (currentQuestion < data.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClickedOption(0);
    } else {
      setShowResult(true);
    }
  };

  const updateScore = () => {
    if (clickedOption === data[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const resetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
    setError(null); // Clear any previous errors when resetting
  };

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setData(res.data);
        setError(null); // Clear any previous errors on successful data fetch
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later."); // Set an error message
      });
  }, []);

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (currentQuestion >= data.length) {
    setShowResult(true);
    return null;
  }

  return (
    <div>
      <p className="heading-txt">Quiz APP</p>
      <div className="container">
        {showResult ? (
          <QuizResult score={score} totalScore={data.length} tryAgain={resetAll} />
        ) : (
          <>
            <div className="question">
              <span id="question-number">{currentQuestion + 1}. </span>
              <span id="question-txt">{data[currentQuestion].title}</span>
            </div>
            <div className="option-container">
              {Object.keys(data[currentQuestion]).map((key) => {
                if (key.startsWith('option')) {
                  return (
                    <div key={key} className="option">
                      <input
                        type="button"
                        onClick={() => setClickedOption(parseInt(key.slice(-1)))}
                      />
                      <span>{data[currentQuestion][key]}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
