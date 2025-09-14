import { useState } from "react";
import ResumeUpload from "./components/ResumeUpload";
import QuestionPanel from "./components/QuestionPanel";
import AnswerPanel from "./components/AnswerPanel";
import "./index.css"; // Import index.css here

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [questions, setQuestions] = useState([]);

  return (
    <div className="app-container">
      <h1 className="title">Candidate Verification Portal</h1>
      <ResumeUpload onVerified={setResumeData} />
      {resumeData && <QuestionPanel onQuestions={setQuestions} />}
      {questions.length > 0 && <AnswerPanel questions={questions} />}
    </div>
  );
}

export default App;
