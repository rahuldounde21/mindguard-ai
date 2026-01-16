import { useEffect, useState } from "react";
import TrendChart from "../components/TrendChart";
import AIRecommendation from "../components/AIRecommendation";
import StressInputCard from "../components/StressInputCard";
import { fetchStressHistory } from "../utils/fetchStressHistory";
import { getStudentId } from "../utils/getStudentId";

const Dashboard = () => {
  const [stressHistory, setStressHistory] = useState([]);
  const [showOutput, setShowOutput] = useState(false);

  // Fetch previous data from Firebase
  useEffect(() => {
    const loadHistory = async () => {
      const studentId = getStudentId();
      const history = await fetchStressHistory(studentId);

      if (history.length > 0) {
        setStressHistory(history);
        setShowOutput(true);
      }
    };

    loadHistory();
  }, []);

  // When user analyzes new stress
  const handleAnalyze = (stressValue) => {
    const newEntry = {
      date: `Day ${stressHistory.length + 1}`,
      stress: stressValue,
    };

    setStressHistory((prev) => [...prev, newEntry]);
    setShowOutput(true);
  };

  const latestStress =
    stressHistory.length > 0
      ? stressHistory[stressHistory.length - 1].stress
      : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* INPUT */}
      <StressInputCard onAnalyze={handleAnalyze} />

      {/* OUTPUT AFTER CLICK */}
      {showOutput && (
        <>
          <div className="card" style={{ marginTop: "30px", width: "700px" }}>
            <h3 style={{ color: "white", textAlign: "center" }}>
              Student Stress Trend
            </h3>
            <TrendChart trendData={stressHistory} />
          </div>

          <div className="card" style={{ width: "700px" }}>
            <AIRecommendation stressLevel={latestStress} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
