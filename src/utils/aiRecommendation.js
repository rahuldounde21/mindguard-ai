export const getAIRecommendation = (stressLevel) => {
  if (stressLevel < 40) {
    return "You're doing well! Maintain your routine and take short breaks.";
  } else if (stressLevel < 70) {
    return "Moderate stress detected. Try relaxation exercises and reduce screen time.";
  } else {
    return "High stress detected. Please take rest and consider talking to a mentor or counselor.";
  }
};
