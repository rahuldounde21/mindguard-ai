import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./App.css";

function App() {
  const [sleep, setSleep] = useState("");
  const [workload, setWorkload] = useState("");
  const [mood, setMood] = useState("");
  const [result, setResult] = useState("");
  const [level, setLevel] = useState("");

  const analyzeStress = async () => {
    let stress = "";
    let stressLevel = "";

    if (sleep < 5 && workload > 7 && mood < 4) {
      stress = "😡 High Stress";
      stressLevel = "high";
    } else if (sleep < 6 || workload > 6) {
      stress = "😟 Medium Stress";
      stressLevel = "medium";
    } else {
      stress = "😊 Low Stress";
      stressLevel = "low";
    }

    setResult(stress);
    setLevel(stressLevel);

    await addDoc(collection(db, "stressReports"), {
      sleep,
      workload,
      mood,
      stress,
      createdAt: new Date(),
    });
  };

  return (
    <div className="container">
      <h1>🧠 MindGuard AI</h1>
      <p>Daily Student Stress Check-In</p>

      <input
        type="number"
        placeholder="😴 Sleep Hours"
        onChange={(e) => setSleep(e.target.value)}
      />

      <input
        type="number"
        placeholder="📚 Workload (1–10)"
        onChange={(e) => setWorkload(e.target.value)}
      />

      <input
        type="number"
        placeholder="😊 Mood (1–10)"
        onChange={(e) => setMood(e.target.value)}
      />

      <button onClick={analyzeStress}>Analyze Stress</button>

      {result && (
        <div className={`result ${level}`}>
          {result}
        </div>
      )}
    </div>
  );
}

export default App;
