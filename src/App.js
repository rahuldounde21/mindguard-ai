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
    // convert to numbers
    const s = Number(sleep);
    const w = Number(workload);
    const m = Number(mood);

    let stress = "";
    let stressLevel = "";

    if (s < 5 && w > 7 && m < 4) {
      stress = "😡 High Stress";
      stressLevel = "high";
    } else if (s < 6 || w > 6) {
      stress = "😟 Medium Stress";
      stressLevel = "medium";
    } else {
      stress = "😊 Low Stress";
      stressLevel = "low";
    }

    setResult(stress);
    setLevel(stressLevel);

    // Save to Firebase
    await addDoc(collection(db, "stressReports"), {
      sleep: s,
      workload: w,
      mood: m,
      stress,
      level: stressLevel,
      createdAt: new Date(),
    });
  };

  return (
    <div className="app">
      <div className="card">
        <h1>🧠 MindGuard AI</h1>
        <p className="subtitle">Daily Student Stress Check-In</p>

        <input
          type="number"
          placeholder="😴 Sleep Hours"
          onChange={(e) => setSleep(e.target.value)}
        />

        <input
          type="number"
          placeholder="📚 Workload (1-10)"
          onChange={(e) => setWorkload(e.target.value)}
        />

        <input
          type="number"
          placeholder="😊 Mood (1-10)"
          onChange={(e) => setMood(e.target.value)}
        />

        <button onClick={analyzeStress}>Analyze Stress</button>

        {result && (
          <div className={`result ${level}`}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
