"use client";
export default function Footer() {
  return (
    <footer style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", padding: "48px 24px 24px", marginTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>WanderNest - Your travel companion</p>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
          <span style={{ color: "var(--muted)", fontSize: 13 }}>© 2025 WanderNest</span>
        </div>
      </div>
    </footer>
  );
}