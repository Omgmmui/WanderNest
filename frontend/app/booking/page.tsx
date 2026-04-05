"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function BookingContent() {
  const params = useSearchParams();
  const router = useRouter();
  const guests = params.get("guests") || "1";
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", dob: "", card: "", expiry: "", cvv: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleConfirm = () => {
    setSubmitted(true);
    setTimeout(() => router.push("/"), 3000);
  };

  if (submitted) return (
    <div style={{ maxWidth: 600, margin: "80px auto", padding: "0 24px", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>Booking Confirmed!</h1>
      <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: 32 }}>
        Your booking reference is <strong style={{ color: "var(--accent)" }}>WN-{Math.random().toString(36).substr(2,8).toUpperCase()}</strong>
        <br />A confirmation email has been sent.
      </p>
      <div style={{ color: "var(--muted)", fontSize: 14 }}>Redirecting to home...</div>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <Link href="/search" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 13, display: "inline-block", marginBottom: 24 }}>
        ← Back to search
      </Link>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Complete Your Booking</h1>

      {/* Steps */}
      <div style={{ display: "flex", gap: 0, marginBottom: 40 }}>
        {["Traveler Details", "Review", "Payment"].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: 600,
                background: step > i+1 ? "var(--teal)" : step === i+1 ? "var(--accent)" : "var(--card)",
                color: step >= i+1 ? "#0a0e1a" : "var(--muted)",
                border: step === i+1 ? "none" : "1px solid var(--border)"
              }}>{step > i+1 ? "✓" : i+1}</div>
              <span style={{ fontSize: 14, color: step === i+1 ? "var(--text)" : "var(--muted)", fontWeight: step === i+1 ? 600 : 400 }}>{s}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 1, background: "var(--border)", margin: "0 12px" }} />}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 28 }}>
        <div className="card" style={{ padding: 32 }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 20, marginBottom: 24 }}>Traveler Information</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Full Name</label>
                  <input placeholder="Mohammed Mujahid" value={form.name} onChange={e => update("name", e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Email</label>
                  <input type="email" placeholder="you@example.com" value={form.email} onChange={e => update("email", e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Phone</label>
                  <input placeholder="+91 98765 43210" value={form.phone} onChange={e => update("phone", e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Date of Birth</label>
                  <input type="date" value={form.dob} onChange={e => update("dob", e.target.value)} />
                </div>
              </div>
              <button className="btn-primary" style={{ marginTop: 28, padding: "12px 32px" }} onClick={() => setStep(2)}>
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: 20, marginBottom: 24 }}>Review Your Booking</h2>
              <div style={{ background: "var(--card2)", borderRadius: 12, padding: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>IndiGo 6E-201</div>
                <div style={{ color: "var(--muted)", fontSize: 14 }}>Hyderabad → Dubai • Non-stop • {guests} Guest(s)</div>
              </div>
              <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, marginBottom: 24 }}>
                <strong style={{ color: "var(--text)" }}>{form.name}</strong> · {form.email} · {form.phone}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-ghost" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-primary" style={{ padding: "12px 32px" }} onClick={() => setStep(3)}>Proceed to Payment →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: 20, marginBottom: 24 }}>Payment Details</h2>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Card Number</label>
                <input placeholder="4242 4242 4242 4242" value={form.card} onChange={e => update("card", e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
                <div>
                  <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Expiry</label>
                  <input placeholder="MM/YY" value={form.expiry} onChange={e => update("expiry", e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>CVV</label>
                  <input placeholder="***" type="password" value={form.cvv} onChange={e => update("cvv", e.target.value)} />
                </div>
              </div>
              <div style={{ background: "rgba(20,184,166,0.1)", border: "1px solid rgba(20,184,166,0.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "var(--teal)" }}>
                🔒 Your payment is secured with 256-bit SSL encryption
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn-ghost" onClick={() => setStep(2)}>← Back</button>
                <button className="btn-primary" style={{ padding: "12px 32px" }} onClick={handleConfirm}>
                  Confirm & Pay
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="card" style={{ padding: 24, height: "fit-content" }}>
          <h3 style={{ fontSize: 16, marginBottom: 20 }}>Order Summary</h3>
          <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 16 }}>IndiGo 6E-201 × {guests} guest(s)</div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: "var(--muted)" }}>Base fare</span>
              <span>₹{(8499 * parseInt(guests)).toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: "var(--muted)" }}>Taxes</span>
              <span>₹{Math.round(8499 * parseInt(guests) * 0.05).toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16, marginTop: 14 }}>
              <span>Total</span>
              <span style={{ color: "var(--accent)" }}>₹{Math.round(8499 * parseInt(guests) * 1.05).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: "var(--muted)" }}>Loading...</div>}>
      <BookingContent />
    </Suspense>
  );
}
