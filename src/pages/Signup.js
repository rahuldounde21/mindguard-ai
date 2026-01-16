import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Save user data in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        points: 0,
        streak: 0,
        lastCheck: null,
        createdAt: Date.now(),
      });

      alert("Account created successfully 🎉");
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Signup</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Creating Account..." : "Signup"}
      </button>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
