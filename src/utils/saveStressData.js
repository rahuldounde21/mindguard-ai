import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const saveStressData = async (studentId, data) => {
  try {
    await addDoc(
      collection(db, "students", studentId, "stressRecords"),
      {
        ...data,
        createdAt: serverTimestamp()
      }
    );
  } catch (error) {
    console.error("Error saving stress data:", error);
  }
};
