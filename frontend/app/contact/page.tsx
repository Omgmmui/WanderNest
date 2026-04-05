"use client";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div style={{
      minHeight: "calc(100vh - 64px)",
      background: "linear-gradient(135deg, #0a0e1a 0%, #0f1e3d 100%)",
      padding: "80px 24px"
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8, textAlign: "center" }}>
          Contact Us
        </h1>
        <p style={{ color: "var(--muted)", textAlign: "center", marginBottom: 40, fontSize: 16 }}>
          Have questions? We'd love to hear from you!
        </p>

        <div className="card" style={{ padding: 32 }}>
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, color: "var(--accent)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Name</h3>
            <p style={{ fontSize: 18 }}>Mohammed Mujahid Ul Islam</p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, color: "var(--accent)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Phone</h3>
            <p style={{ fontSize: 18 }}>
              <a href="tel:9247247775" style={{ color: "var(--text)", textDecoration: "none" }}>9247247775</a>
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, color: "var(--accent)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Email</h3>
            <p style={{ fontSize: 18 }}>
              <a href="mailto:mohammedmujahidulislam1998@gmail.com" style={{ color: "var(--text)", textDecoration: "none" }}>mohammedmujahidulislam1998@gmail.com</a>
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 14, color: "var(--accent)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Address</h3>
            <p style={{ fontSize: 18, lineHeight: 1.6 }}>
              MO Colony, Bahadurpura<br />
              Hyderabad, Telangana<br />
              500064, India
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link href="/" style={{ color: "var(--accent)", textDecoration: "none" }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
