"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function AuthContent() {
  const params = useSearchParams();
  const router = useRouter();
  const [mode, setMode] = useState(params.get("mode") === "register" ? "register" : "login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setError("");
    
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    
    if (mode === "register") {
      if (!form.name) {
        setError("Please enter your name");
        return;
      }
      if (form.password !== form.confirm) {
        setError("Passwords do not match");
        return;
      }
    }

    setLoading(true);
    
    try {
      const endpoint = mode === "register" ? "/api/register" : "/api/login";
      const body = mode === "register" 
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ email: form.email }));
      }

      setLoading(false);
      router.push("/");
    } catch (err) {
      setError("Failed to connect to server");
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");

  if (isLoggedIn) {
    return (
      <div style={{
        minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #0a0e1a 0%, #0f1e3d 100%)", padding: 24
      }}>
        <div style={{ width: "100%", maxWidth: 440, textAlign: "center" }}>
          <div className="card" style={{ padding: 32 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>You're logged in!</h1>
            <p style={{ color: "var(--muted)", marginBottom: 24 }}>Welcome back to WanderNest</p>
            <button className="btn-primary" style={{ width: "100%", padding: 14 }} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0a0e1a 0%, #0f1e3d 100%)",
      padding: 24
    }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-block", marginBottom: 24 }}>
            <span style={{ fontSize: 28, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--accent)" }}>Wander</span>
            <span style={{ fontSize: 28, fontFamily: "'Playfair Display', serif", fontWeight: 400, color: "var(--text)" }}>Nest</span>
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 15 }}>
            {mode === "login" ? "Sign in to manage your bookings" : "Start your journey with WanderNest"}
          </p>
        </div>

        {error && (
          <div style={{ background: "#ef444422", color: "#ef4444", padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 14 }}>
            {error}
          </div>
        )}

        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: "flex", background: "var(--card2)", borderRadius: 12, padding: 4, marginBottom: 28 }}>
            {["login", "register"].map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }} style={{
                flex: 1, padding: "9px", borderRadius: 9, border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
                background: mode === m ? "var(--accent)" : "transparent",
                color: mode === m ? "#0a0e1a" : "var(--muted)",
                transition: "all 0.2s", textTransform: "capitalize"
              }}>{m === "login" ? "Sign In" : "Sign Up"}</button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "register" && (
              <div>
                <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Full Name</label>
                <input placeholder="Mohammed Mujahid" value={form.name} onChange={e => update("name", e.target.value)} />
              </div>
            )}
            <div>
              <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Email Address</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={e => update("email", e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={e => update("password", e.target.value)} />
            </div>
            {mode === "register" && (
              <div>
                <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Confirm Password</label>
                <input type="password" placeholder="••••••••" value={form.confirm} onChange={e => update("confirm", e.target.value)} />
              </div>
            )}
          </div>

          <button className="btn-primary" style={{ width: "100%", marginTop: 24, padding: 14, fontSize: 15 }}
            onClick={handleSubmit} disabled={loading}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </div>

        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 13, marginTop: 20 }}>
          {mode === "login" ? "Don't have an account? " : "Already have an account? "}
          <span style={{ color: "var(--accent)", cursor: "pointer" }} onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}>
            {mode === "login" ? "Sign up free" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: "var(--muted)" }}>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
