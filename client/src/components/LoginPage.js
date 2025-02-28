import React, { useState } from "react";

function LoginPage({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const correctEmail = "testuser@scholarstation.com";
  const correctPassword = "Password123!";

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Simulate login check
    if (email === correctEmail && password === correctPassword) {
      // Simulate successful login
      localStorage.setItem("token", "simulated_token"); // Simulate storing a token
      setIsLoggedIn(true); // Update login state to logged in
      alert("Login successful!");
    } else {
      // Simulate failed login
      setErrorMsg("Invalid email or password.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
