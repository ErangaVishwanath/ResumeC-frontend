import { useState } from "react";
import { verifyResume } from "../api";
import { FaUpload, FaGithub } from "react-icons/fa";
import "./ResumeUpload.css";

function ResumeUpload({ onVerified }) {
  const [file, setFile] = useState(null);
  const [github, setGithub] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file || !github) {
      alert("Please upload resume and enter GitHub username");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("github_username", github);

    try {
      const res = await verifyResume(formData);
      setResult(res.data);
      onVerified(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-card">
      <h2 className="resume-title">Resume Verification</h2>

      {/* File upload */}
      <label className="file-upload">
        <FaUpload className="icon" />
        <span>{file ? file.name : "Upload your Resume (PDF)"}</span>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </label>

      {/* GitHub input */}
      <div className="input-wrapper">
        <FaGithub className="icon-left" />
        <input
          type="text"
          placeholder="GitHub Username"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
      </div>

      {/* Button */}
      <button onClick={handleSubmit} className="verify-btn" disabled={loading}>
        {loading ? "Verifying..." : "Verify Resume"}
      </button>

      {/* Results */}
      {result && (
        <div className="resume-result">
          <p>
            <strong className="blue">Resume Skills:</strong>{" "}
            {result.resume_skills.join(", ")}
          </p>
          <p>
            <strong className="green">Matching GitHub Skills:</strong>{" "}
            {result.matching_skills.join(", ")}
          </p>
          <p>
            <strong className="purple">Repositories Checked:</strong>{" "}
            {result.repositories_checked}
          </p>
          <p>
            <strong className="red">Score:</strong> {result.score}%
          </p>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;
