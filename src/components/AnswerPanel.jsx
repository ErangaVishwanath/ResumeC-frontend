import { useState } from "react";
import { checkAnswer } from "../api";
import "./AnswerPanel.css";

function AnswerPanel({ questions }) {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);

  const handleSubmit = async () => {
    const resultsArr = [];
    for (const q of questions) {
      const res = await checkAnswer({
        question_text: q.question_text,
        answer: answers[q.question_text] || "",
      });
      resultsArr.push(res.data);
    }
    setResults(resultsArr);
  };

  return (
    <div className="answer-card">
      <h2 className="answer-title">📝 Submit Answers</h2>

      {questions.map((q, i) => (
        <div key={i} className="question-block">
          <p className="question-text">{q.question_text}</p>
          <textarea
            className="answer-textarea"
            rows="4"
            value={answers[q.question_text] || ""}
            onChange={(e) =>
              setAnswers({ ...answers, [q.question_text]: e.target.value })
            }
          ></textarea>
        </div>
      ))}

      <button onClick={handleSubmit} className="answer-btn">
        🚀 Submit
      </button>

      {results.length > 0 && (
        <div className="results-container">
          <h3 className="results-title">📊 Results</h3>
          {results.map((r, i) => (
            <div key={i} className="result-card">
              <p>
                <strong>Expected:</strong> {r.expected_answer}
              </p>
              <p>
                <strong>Your Answer:</strong> {r.candidate_answer}
              </p>
              <p>
                <strong>Similarity:</strong> {r.similarity_score}
              </p>
              <p className={r.result === "pass" ? "result-pass" : "result-fail"}>
                {r.result.toUpperCase()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnswerPanel;
