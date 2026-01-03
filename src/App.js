import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [sleep, setSleep] = useState("");
  const [workload, setWorkload] = useState("");
  const [mood, setMood] = useState("");
  const [result, setResult] = useState("");

  const analyzeStress = async () => {
  let stress = "";

  if (sleep < 5 && workload > 7 && mood < 4) {
    stress = "🔴 High Stress";
  } else if (sleep < 6 || workload > 6) {
    stress = "🟠 Medium Stress";
  } else {
    stress = "🟢 Low Stress";
  }

  setResult(stress);

  // save data to Firebase
  await addDoc(collection(db, "stressReports"), {
    sleep,
    workload,
    mood,
    stress,
    createdAt: new Date()
  });
};


  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>MindGuard AI</h1>
      <p>Daily Student Stress Check-In</p>

      <input
        type="number"
        placeholder="Sleep Hours"
        onChange={(e) => setSleep(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Workload (1-10)"
        onChange={(e) => setWorkload(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Mood (1-10)"
        onChange={(e) => setMood(e.target.value)}
      />
      <br /><br />

      <button onClick={analyzeStress}>
        Analyze Stress
      </button>

      {result && <h2>{result}</h2>}
    </div>
  );
}

export default App;
