export const getStudentId = () => {
  let studentId = localStorage.getItem("studentId");

  if (!studentId) {
    studentId = "student_" + Math.floor(Math.random() * 100000);
    localStorage.setItem("studentId", studentId);
  }

  return studentId;
};
