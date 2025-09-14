import { useState } from "react";
import { getQuestions } from "../api";
import "./QuestionPanel.css";

function QuestionPanel({ onQuestions }) {
  const [tech, setTech] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const res = await getQuestions({
      technologies: tech.split(",").map((t) => t.trim()),
      difficulty,
    });
    setQuestions(res.data.questions);
    onQuestions(res.data.questions);
  };

  return (
    <div className="questions-container">
      <h2 className="questions-title">Coding Questions</h2>

      <input
        type="text"
        placeholder="Technologies (comma separated)"
        className="questions-input"
        value={tech}
        onChange={(e) => setTech(e.target.value)}
      />

      <select
        className="questions-input"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button onClick={fetchQuestions} className="questions-btn">
        Get Questions
      </button>

      {questions.length > 0 && (
        <ul className="questions-list">
          {questions.map((q, i) => (
            <li key={i}>{q.question_text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionPanel;
