"use client";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #1e293b 100%)",
      minHeight: "100vh",
      padding: "80px 24px"
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h1 style={{ fontSize: 42, fontWeight: 700, marginBottom: 8, textAlign: "center", color: "#fbbf24", fontFamily: "Playfair Display, serif" }}>
          Contact Us
        </h1>
        <p style={{ color: "#cbd5e1", textAlign: "center", marginBottom: 40, fontSize: 16 }}>
          Have questions? We'd love to hear from you!
        </p>

        <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: 40 }}>
          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 13, color: "#fbbf24", marginBottom: 10, textTransform: "uppercase", letterSpacing: 2, fontWeight: 600 }}>Name</h3>
            <p style={{ fontSize: 20, color: "#f8fafc", fontWeight: 500 }}>Mohammed Mujahid Ul Islam</p>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 13, color: "#fbbf24", marginBottom: 10, textTransform: "uppercase", letterSpacing: 2, fontWeight: 600 }}>Phone</h3>
            <p style={{ fontSize: 20 }}>
              <a href="tel:9247247775" style={{ color: "#f8fafc", textDecoration: "none", fontWeight: 500 }}>9247247775</a>
            </p>
          </div>

          <div style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 13, color: "#fbbf24", marginBottom: 10, textTransform: "uppercase", letterSpacing: 2, fontWeight: 600 }}>Email</h3>
            <p style={{ fontSize: 20 }}>
              <a href="mailto:mohammedmujahidulislam1998@gmail.com" style={{ color: "#f8fafc", textDecoration: "none", fontWeight: 500 }}>mohammedmujahidulislam1998@gmail.com</a>
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 13, color: "#fbbf24", marginBottom: 10, textTransform: "uppercase", letterSpacing: 2, fontWeight: 600 }}>Address</h3>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: "#cbd5e1" }}>
              MO Colony, Bahadurpura<br />
              Hyderabad, Telangana<br />
              500064, India
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <Link href="/" style={{ color: "#fbbf24", textDecoration: "none", fontSize: 16, fontWeight: 500 }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}