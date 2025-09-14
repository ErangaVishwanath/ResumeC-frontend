import { useState } from "react";
import { verifyResume } from "../api";
import "./ResumeUpload.css";

function ResumeUpload({ onVerified }) {
  const [file, setFile] = useState(null);
  const [github, setGithub] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!file || !github) {
      alert("Please upload resume and enter GitHub username");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("github_username", github);

    const res = await verifyResume(formData);
    setResult(res.data);
    onVerified(res.data);
  };

  return (
    <div className="resume-container">
      <h2 className="resume-title">Resume Verification</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="resume-input"
      />

      <input
        type="text"
        placeholder="GitHub Username"
        className="resume-input"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />

      <button onClick={handleSubmit} className="resume-btn">
        Verify
      </button>

      {result && (
        <div className="resume-result">
          <p>
            <strong>Resume Skills:</strong> {result.resume_skills.join(", ")}
          </p>
          <p>
            <strong>Matching GitHub Skills:</strong>{" "}
            {result.matching_skills.join(", ")}
          </p>
          <p>
            <strong>Repositories Checked:</strong> {result.repositories_checked}
          </p>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
