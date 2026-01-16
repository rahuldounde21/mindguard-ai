import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export const fetchStressHistory = async (studentId) => {
  try {
    const q = query(
      collection(db, "students", studentId, "stressRecords"),
      orderBy("createdAt", "asc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc, index) => ({
      date: `Day ${index + 1}`,
      stress: doc.data().stress
    }));
  } catch (error) {
    console.error("Error fetching stress history:", error);
    return [];
  }
};
