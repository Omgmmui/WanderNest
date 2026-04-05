"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DESTINATIONS = [
  { name: "Bali", country: "Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80", price: "₹24,999" },
  { name: "Paris", country: "France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80", price: "₹58,999" },
  { name: "Tokyo", country: "Japan", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80", price: "₹42,999" },
  { name: "Dubai", country: "UAE", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80", price: "₹31,999" },
  { name: "Santorini", country: "Greece", img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80", price: "₹64,999" },
  { name: "New York", country: "USA", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80", price: "₹72,999" },
];

const DEALS = [
  { title: "Last Minute Flights", desc: "Up to 40% off on select routes", tag: "Flash Deal", color: "#ef4444" },
  { title: "Luxury Hotels", desc: "5-star stays from ₹8,999/night", tag: "Hot", color: "#f59e0b" },
  { title: "Weekend Getaways", desc: "Curated 3-day packages", tag: "New", color: "#14b8a6" },
];

const ADS = [
  { title: "Dubai Summer Sale", desc: "Flat 35% off on all flights to Dubai", cta: "Book Now", color: "#f59e0b" },
  { title: "Europe Special", desc: "Round trip to Paris starting ₹45,999", cta: "Explore", color: "#3b82f6" },
  { title: "Staycation Deals", desc: "Luxury hotels from ₹3,499/night", cta: "View Hotels", color: "#14b8a6" },
];

export default function HomePage() {
  const router = useRouter();
  const [tab, setTab] = useState("flights");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("roundtrip");
  const [guests, setGuests] = useState("1");
  const [counters, setCounters] = useState({ travelers: 0, destinations: 0, deals: 0 });

  useEffect(() => {
    const target = { travelers: 2000000, destinations: 500, deals: 1000 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounters({
        travelers: Math.floor((target.travelers / steps) * step),
        destinations: Math.floor((target.destinations / steps) * step),
        deals: Math.floor((target.deals / steps) * step),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams({
      type: tab, from, to, date, guests,
      tripType: tab === "flights" ? tripType : "",
      returnDate: tab === "flights" ? returnDate : ""
    });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
      `}</style>

      <section style={{
        minHeight: "100vh", position: "relative", display: "flex", alignItems: "center",
        justifyContent: "center", overflow: "hidden",
        background: "linear-gradient(135deg, #0a0e1a 0%, #0f1e3d 50%, #0a1628 100%)"
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.08,
          backgroundImage: "radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
        <div style={{
          position: "absolute", top: "10%", right: "5%", width: 400, height: 400,
          background: "radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "10%", left: "5%", width: 300, height: 300,
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none"
        }} />

        <div style={{ maxWidth: 1000, width: "100%", padding: "0 24px", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="animate-pulse" style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)", marginBottom: 20, fontSize: 14, display: "inline-block", padding: "8px 20px", borderRadius: 30 }}>
              ✈️ {counters.travelers.toLocaleString()}+ Happy Travelers | 🏨 {counters.destinations}+ Destinations | 💰 {counters.deals}+ Deals
            </div>
            <h1 style={{ fontSize: "clamp(42px, 8vw, 90px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, background: "linear-gradient(135deg, #fff 0%, #f59e0b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Explore the World<br />
              <span style={{ background: "linear-gradient(135deg, #f59e0b 0%, #3b82f6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Your Way</span>
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 18, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
              Flights, hotels, and experiences — all in one place. Discover extraordinary destinations at unbeatable prices. 
              <span className="animate-float" style={{ display: "inline-block", marginLeft: 8, fontSize: 24 }}>🌍</span>
            </p>
          </div>

          <div style={{ borderRadius: 20, padding: 28, background: "rgba(30,42,64,0.8)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
              {["flights", "hotels", "tours"].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: "10px 24px", borderRadius: 12, border: "none", cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14,
                  background: tab === t ? "var(--accent)" : "rgba(255,255,255,0.1)",
                  color: tab === t ? "#0a0e1a" : "var(--muted)",
                  transition: "all 0.3s", textTransform: "capitalize"
                }}>{t === "flights" ? "✈️" : t === "hotels" ? "🏨" : "🗺️"} {t}</button>
              ))}
            </div>

            {tab === "flights" && (
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                <div style={{ display: "inline-flex", background: "rgba(0,0,0,0.3)", borderRadius: 12, padding: 4 }}>
                  <button onClick={() => setTripType("roundtrip")} style={{
                    padding: "10px 24px", borderRadius: 10, border: "none", cursor: "pointer",
                    fontSize: 14, fontWeight: 600,
                    background: tripType === "roundtrip" ? "linear-gradient(135deg, #f59e0b, #d97706)" : "transparent",
                    color: tripType === "roundtrip" ? "#0a0e1a" : "var(--muted)",
                    transition: "all 0.3s", display: "flex", alignItems: "center", gap: 8
                  }}>
                    <span>🔄</span> Round Trip
                  </button>
                  <button onClick={() => setTripType("oneway")} style={{
                    padding: "10px 24px", borderRadius: 10, border: "none", cursor: "pointer",
                    fontSize: 14, fontWeight: 600,
                    background: tripType === "oneway" ? "linear-gradient(135deg, #f59e0b, #d97706)" : "transparent",
                    color: tripType === "oneway" ? "#0a0e1a" : "var(--muted)",
                    transition: "all 0.3s", display: "flex", alignItems: "center", gap: 8
                  }}>
                    <span>🧭</span> One Way
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16, alignItems: "end" }}>
              <div>
                <label style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, display: "block" }}>{tab === "hotels" ? "🏙️ City / Hotel" : "🛫 From"}</label>
                <input placeholder={tab === "hotels" ? "Search city..." : "Hyderabad"} value={from} onChange={e => setFrom(e.target.value)} style={{ width: "100%" }} />
              </div>
              {tab !== "hotels" && (
                <div>
                  <label style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, display: "block" }}>🛬 To</label>
                  <input placeholder="Dubai" value={to} onChange={e => setTo(e.target.value)} style={{ width: "100%" }} />
                </div>
              )}
              {tab === "flights" && (
                <>
                  <div>
                    <label style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, display: "block" }}>
                      📅 {tripType === "roundtrip" ? "Departure" : "Date"}
                    </label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: "100%" }} />
                  </div>
                  {tripType === "roundtrip" && (
                    <div>
                      <label style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, display: "block" }}>📅 Return</label>
                      <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)} style={{ width: "100%" }} />
                    </div>
                  )}
                </>
              )}
              {tab !== "flights" && (
                <div>
                  <label style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, display: "block" }}>📅 Date</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: "100%" }} />
                </div>
              )}
              <div>
                <label style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6, display: "block" }}>👥 Guests</label>
                <select value={guests} onChange={e => setGuests(e.target.value)} style={{ width: "100%" }}>
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n>1?"s":""}</option>)}
                </select>
              </div>
              <button onClick={handleSearch} style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", color: "#0a0e1a", fontWeight: 700, padding: "14px 32px", borderRadius: 12, border: "none", cursor: "pointer", fontSize: 16, whiteSpace: "nowrap", transition: "transform 0.2s" }}>
                🔍 Search
              </button>
            </div>
          </div>

          <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 48, flexWrap: "wrap" }}>
            {[["5L+", "Flight Routes"], ["2M+", "Happy Travelers"], ["98%", "Satisfaction"], ["24/7", "Customer Support"], ["500+", "Partner Airlines"]].map(([n, l], i) => (
              <div key={l} style={{ textAlign: "center", padding: "16px 24px", background: "rgba(255,255,255,0.05)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#f59e0b", fontFamily: "'Playfair Display', serif" }}>{n}</div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 24px", background: "linear-gradient(135deg, #0f1e3d 0%, #0a0e1a 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, textAlign: "center" }}>🔥 Limited Time Offers</h2>
          <p style={{ color: "var(--muted)", textAlign: "center", marginBottom: 40 }}>Grab these exclusive deals before they expire!</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {ADS.map((ad, i) => (
              <div key={i} style={{ background: "linear-gradient(135deg, " + ad.color + "22 0%, " + ad.color + "11 100%)", border: "1px solid " + ad.color + "44", borderRadius: 20, padding: 28, cursor: "pointer", transition: "transform 0.3s" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ background: ad.color, color: "#0a0e1a", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>ENDS SOON</span>
                  <span style={{ fontSize: 24 }}>⏰</span>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{ad.title}</h3>
                <p style={{ color: "var(--muted)", marginBottom: 16 }}>{ad.desc}</p>
                <button style={{ background: ad.color, color: "#0a0e1a", fontWeight: 600, padding: "10px 24px", borderRadius: 8, border: "none", cursor: "pointer" }}>{ad.cta} →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <div style={{ color: "#f59e0b", fontSize: 13, fontWeight: 500, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>EXPLORE</div>
            <h2 style={{ fontSize: 36, fontWeight: 700 }}>Popular Destinations</h2>
          </div>
          <Link style={{ color: "#f59e0b", textDecoration: "none", fontSize: 14 }} href="/search">View all →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {DESTINATIONS.map(d => (
            <Link key={d.name} href={`/listing?dest=${d.name}`} style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", borderRadius: 20, overflow: "hidden", border: "1px solid var(--border)", transition: "transform 0.3s" }}>
                <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                  <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />
                  <div style={{ position: "absolute", bottom: 16, left: 16 }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display', serif" }}>{d.name}</div>
                    <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14 }}>{d.country}</div>
                  </div>
                  <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.6)", padding: "6px 12px", borderRadius: 20, fontSize: 12 }}>
                    ⭐ 4.9 rating
                  </div>
                </div>
                <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ color: "var(--muted)", fontSize: 12 }}>Starting from</span>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#f59e0b" }}>{d.price}</div>
                  </div>
                  <button style={{ background: "#f59e0b", color: "#0a0e1a", fontWeight: 600, padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer" }}>Book Now</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <div style={{ background: "linear-gradient(135deg, #1e2a40, #0f1e3d)", borderRadius: 24, padding: "60px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>Ready to Explore?</h2>
            <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 400 }}>Join 2 million travelers who trust WanderNest for their adventures. Sign up free today.</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/auth?mode=register"><button style={{ background: "#f59e0b", color: "#0a0e1a", fontWeight: 600, fontSize: 16, padding: "14px 32px", borderRadius: 12, border: "none", cursor: "pointer" }}>Get Started Free</button></Link>
            <Link href="/search"><button style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text)", fontSize: 16, padding: "14px 32px", borderRadius: 12, cursor: "pointer" }}>Browse Deals</button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
