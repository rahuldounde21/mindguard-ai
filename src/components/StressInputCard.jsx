import { useState } from "react";

const StressInputCard = ({ onAnalyze }) => {
  const [sleep, setSleep] = useState("");
  const [workload, setWorkload] = useState("");
  const [mood, setMood] = useState("");

  const handleAnalyze = () => {
    // Simple stress calculation (hackathon-friendly)
    const stressScore =
      Number(workload) * 10 +
      Number(mood) * 5 -
      Number(sleep) * 5;

    const finalStress = Math.min(Math.max(stressScore, 20), 90);

    onAnalyze(finalStress);
  };

  return (
    <div
      style={{
  background: "#ffffff",
  padding: "25px",
  borderRadius: "16px",
  width: "350px",
  textAlign: "center",
  boxShadow: "0 20px 40px rgba(0,0,0,0.25)"
}}

    >
      <h2>🧠 MindGuard AI</h2>
      <p>Daily Student Stress Check-In</p>

      <input
        placeholder="Sleep hours"
        value={sleep}
        onChange={e => setSleep(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Academic workload (1-10)"
        value={workload}
        onChange={e => setWorkload(e.target.value)}
        style={inputStyle}
      />

      <input
        placeholder="Mood level (1-10)"
        value={mood}
        onChange={e => setMood(e.target.value)}
        style={inputStyle}
      />

      <button
        onClick={handleAnalyze}
        style={buttonStyle}
      >
        Analyze Stress
      </button>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd"
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#6d6bd1",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer"
};

export default StressInputCard;
