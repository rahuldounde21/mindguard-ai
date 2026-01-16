import { getAIRecommendation } from "../utils/aiRecommendation";

const AIRecommendation = ({ stressLevel }) => {
  const suggestion = getAIRecommendation(stressLevel);

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "15px",
        borderRadius: "8px",
        backgroundColor: "#f1f5f9",
        maxWidth: "600px"
      }}
    >
      <h3>AI Recommendation</h3>
      <p>{suggestion}</p>
    </div>
  );
};

export default AIRecommendation;
