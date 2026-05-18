// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/auth/login",
        {
          email: email.trim(),
          password: password.trim()
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("✅ Login successful");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.detail || "Login failed ❌");
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 20, background: "white", borderRadius: 12 }}>
      <h3>Login</h3>

      <form onSubmit={handleLogin}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />

        <button>Login</button>
      </form>
    </div>
  );
}
