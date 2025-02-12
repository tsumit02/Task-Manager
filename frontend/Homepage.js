import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { login } from "./api";
import { useNavigate } from "react-router-dom";

const authSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Homepage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    const endpoint = isLogin
      ? "http://localhost:8080/api/user/login"
      : "http://localhost:8080/api/user";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }
      // if (response.data.success) {
      //   localStorage.setItem("token", response.data.token);
      //   localStorage.setItem("userId", response.data.user._id); // Store userId
      //   navigate("/tasks"); // Redirect to tasks page
      // }

      console.log("Success:", result);
      navigate("/tasks");
      alert(isLogin ? "Login successful!" : "Signup successful!");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>{isLogin ? "Login" : "Sign Up"}</h2>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            {errors.password && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: loading ? "gray" : "blue",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: "none",
              border: "none",
              color: "blue",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
