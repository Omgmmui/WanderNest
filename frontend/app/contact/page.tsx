"use client";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div style={{
      background: "#0a0e1a",
      minHeight: "100vh",
      padding: "80px 24px"
    }}>
      <style>{`
        .card { background: #161d2e; border: 1px solid #2a3a55; border-radius: 16px; padding: 32; }
        :root { --bg: #0a0e1a; --accent: #f59e0b; --text: #f1f5f9; --muted: #94a3b8; }
      `}</style>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8, textAlign: "center", color: "white" }}>
          Contact Us
        </h1>
        <p style={{ color: "#94a3b8", textAlign: "center", marginBottom: 40, fontSize: 16 }}>
          Have questions? We'd love to hear from you!
        </p>

        <div style={{ background: "#161d2e", border: "1px solid #2a3a55", borderRadius: 16, padding: 32 }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, color: "#f59e0b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Name</h3>
            <p style={{ fontSize: 18, color: "white" }}>Mohammed Mujahid Ul Islam</p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, color: "#f59e0b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Phone</h3>
            <p style={{ fontSize: 18 }}>
              <a href="tel:9247247775" style={{ color: "white", textDecoration: "none" }}>9247247775</a>
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, color: "#f59e0b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Email</h3>
            <p style={{ fontSize: 18 }}>
              <a href="mailto:mohammedmujahidulislam1998@gmail.com" style={{ color: "white", textDecoration: "none" }}>mohammedmujahidulislam1998@gmail.com</a>
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, color: "#f59e0b", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Address</h3>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: "white" }}>
              MO Colony, Bahadurpura<br />
              Hyderabad, Telangana<br />
              500064, India
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/" style={{ color: "#f59e0b", textDecoration: "none" }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}