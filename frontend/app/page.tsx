"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DESTINATIONS = [
  { name: "Bali", country: "Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", price: "₹24,999" },
  { name: "Paris", country: "France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", price: "₹58,999" },
  { name: "Tokyo", country: "Japan", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", price: "₹42,999" },
  { name: "Dubai", country: "UAE", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", price: "₹31,999" },
  { name: "Maldives", country: "Maldives", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", price: "₹45,999" },
  { name: "Swiss Alps", country: "Switzerland", img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80", price: "₹89,999" },
];

const FEATURES = [
  { icon: "✈️", title: "500+ Airlines", desc: "Best deals from top carriers" },
  { icon: "🏨", title: "50K+ Hotels", desc: "Luxury to budget stays" },
  { icon: "🎯", title: "Best Price Guarantee", desc: "We match any lower rate" },
  { icon: "💬", title: "24/7 Support", desc: "Always here to help" },
];

const ADS = [
  { title: "Dubai Summer Sale", desc: "Flat 35% off on all flights to Dubai", cta: "Book Now", color: "#f59e0b", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" },
  { title: "European Escape", desc: "Round trip to Paris starting ₹45,999", cta: "Explore", color: "#3b82f6", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" },
  { title: "Maldives Paradise", desc: "4 nights with flights at ₹65,999", cta: "View Deal", color: "#06b6d4", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80" },
];

export default function HomePage() {
  const router = useRouter();
  const [tab, setTab] = useState("flights");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [counters, setCounters] = useState({ travelers: 0, destinations: 0, deals: 0 });

  useEffect(() => {
    const target = { travelers: 2000000, destinations: 500, deals: 1000 };
    const duration = 2500;
    const steps = 50;
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
    const params = new URLSearchParams({ type: tab, from, to, date });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div style={{ background: "#0a0e1a", minHeight: "100vh" }}>
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(245,158,11,0.3); } 50% { box-shadow: 0 0 40px rgba(245,158,11,0.6); } }
        .glass { background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); }
        .premium-gradient { background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #f59e0b 100%); background-size: 200% auto; animation: shimmer 3s linear infinite; }
        .card-hover:hover { transform: translateY(-8px); box-shadow: 0 25px 50px rgba(0,0,0,0.4); }
        input, select { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 16px; color: white; font-size: 15px; width: 100%; outline: none; transition: all 0.3s; }
        input:focus, select:focus { border-color: #f59e0b; box-shadow: 0 0 0 3px rgba(245,158,11,0.1); }
        input::placeholder { color: rgba(255,255,255,0.4); }
      `}</style>

      {/* Navigation */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(10,14,26,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #f59e0b, #d97706)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#0a0e1a" strokeWidth="2"/><path d="M12 6v12M6 12l6-6 6 6" stroke="#0a0e1a" strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <span style={{ fontSize: 24, fontWeight: 700, color: "white" }}>Wander<span style={{ color: "#f59e0b" }}>Nest</span></span>
        </Link>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["Flights", "Hotels", "Tours"].map(t => (
            <Link key={t} href={`/search?type=${t}`} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 500, transition: "all 0.3s" }}>{t}</Link>
          ))}
          <Link href="/india" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 500 }}>India</Link>
          <Link href="/visa" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 500 }}>Visa</Link>
          <Link href="/contact" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 500 }}>Contact</Link>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/auth"><button style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "10px 24px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>Login</button></Link>
          <Link href="/auth?mode=register"><button className="premium-gradient" style={{ border: "none", color: "#0a0e1a", padding: "10px 24px", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Sign Up</button></Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ minHeight: "100vh", padding: "140px 40px 80px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.15) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", top: "20%", right: "10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)" }} />
        
        <div style={{ maxWidth: 900, width: "100%", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ display: "inline-flex", gap: 24, marginBottom: 32, padding: "12px 24px", borderRadius: 50, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <span style={{ color: "#f59e0b", fontSize: 14, fontWeight: 500 }}>✨ {counters.travelers.toLocaleString()}+ Travelers</span>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>|</span>
            <span style={{ color: "#f59e0b", fontSize: 14, fontWeight: 500 }}>🏨 {counters.destinations}+ Hotels</span>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>|</span>
            <span style={{ color: "#f59e0b", fontSize: 14, fontWeight: 500 }}>💰 {counters.deals}+ Deals</span>
          </div>
          
          <h1 style={{ fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 24, color: "white" }}>
            Discover Your Next<br />
            <span style={{ background: "linear-gradient(135deg, #f59e0b, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Extraordinary Journey</span>
          </h1>
          
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.7 }}>
            Premium travel experiences. Curated adventures. Unbeatable prices.<br />
            Your journey begins here.
          </p>

          {/* Search Card */}
          <div className="glass" style={{ borderRadius: 24, padding: 32, maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 32, justifyContent: "center" }}>
              {["flights", "hotels", "tours"].map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: "12px 28px", borderRadius: 12, border: "none", cursor: "pointer",
                  fontWeight: 600, fontSize: 15,
                  background: tab === t ? "linear-gradient(135deg, #f59e0b, #d97706)" : "rgba(255,255,255,0.05)",
                  color: tab === t ? "#0a0e1a" : "rgba(255,255,255,0.6)",
                  transition: "all 0.3s"
                }}>{t === "flights" ? "✈️ Flights" : t === "hotels" ? "🏨 Hotels" : "🗺️ Tours"}</button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, alignItems: "end" }}>
              <div>
                <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8, display: "block" }}>🛫 From</label>
                <input placeholder="City" value={from} onChange={e => setFrom(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8, display: "block" }}>🛬 To</label>
                <input placeholder="Destination" value={to} onChange={e => setTo(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8, display: "block" }}>📅 Departure</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 8, display: "block" }}>👥 Guests</label>
                <select><option>1 Guest</option><option>2 Guests</option><option>3 Guests</option><option>4 Guests</option></select>
              </div>
              <button onClick={handleSearch} className="premium-gradient" style={{ border: "none", color: "#0a0e1a", fontWeight: 700, padding: "16px 32px", borderRadius: 12, fontSize: 16, cursor: "pointer", height: "50px" }}>
                Search 🔍
              </button>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginTop: 64, flexWrap: "wrap" }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ textAlign: "center", padding: "20px 28px" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "white", marginBottom: 4 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section style={{ padding: "80px 40px", background: "linear-gradient(180deg, #0a0e1a 0%, #0f172a 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: "#f59e0b", fontSize: 13, fontWeight: 600, marginBottom: 12, letterSpacing: 2, textTransform: "uppercase" }}>Exclusive Offers</div>
            <h2 style={{ fontSize: 40, fontWeight: 700, color: "white" }}>Flash Deals</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 24 }}>
            {ADS.map((ad, i) => (
              <Link key={i} href="/search" style={{ textDecoration: "none", position: "relative", borderRadius: 24, overflow: "hidden", height: 300, display: "block" }}>
                <img src={ad.image} alt={ad.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%)" }} />
                <div style={{ position: "absolute", top: 20, left: 20, right: 20, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ background: ad.color, color: "#0a0e1a", padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700 }}>🔥 HOT DEAL</span>
                </div>
                <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
                  <h3 style={{ fontSize: 28, fontWeight: 700, color: "white", marginBottom: 8 }}>{ad.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>{ad.desc}</p>
                  <button style={{ background: ad.color, color: "#0a0e1a", fontWeight: 600, padding: "12px 24px", borderRadius: 10, border: "none", cursor: "pointer" }}>{ad.cta} →</button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section style={{ padding: "80px 40px", background: "#0a0e1a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <div style={{ color: "#f59e0b", fontSize: 13, fontWeight: 600, marginBottom: 12, letterSpacing: 2, textTransform: "uppercase" }}>Popular</div>
              <h2 style={{ fontSize: 40, fontWeight: 700, color: "white" }}>Top Destinations</h2>
            </div>
            <Link href="/search" style={{ color: "#f59e0b", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>View all destinations →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
            {DESTINATIONS.map(d => (
              <Link key={d.name} href={`/listing?dest=${d.name}`} style={{ textDecoration: "none" }}>
                <div className="card-hover" style={{ background: "#131c2e", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.4s" }}>
                  <div style={{ height: 220, position: "relative" }}>
                    <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.9)", color: "#0a0e1a", padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600 }}>⭐ 4.9</div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h3 style={{ fontSize: 20, fontWeight: 600, color: "white", marginBottom: 4 }}>{d.name}</h3>
                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>{d.country}</p>
                      </div>
                      <div>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>From</span>
                        <div style={{ fontSize: 20, fontWeight: 700, color: "#f59e0b" }}>{d.price}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "80px 40px", background: "linear-gradient(135deg, #1e1b4b, #0f172a)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 48, fontWeight: 700, color: "white", marginBottom: 16 }}>Ready for Your Next Adventure?</h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>Join millions of travelers who trust WanderNest for their perfect trips.</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <Link href="/auth?mode=register"><button className="premium-gradient" style={{ border: "none", color: "#0a0e1a", fontWeight: 700, padding: "16px 40px", borderRadius: 12, fontSize: 16, cursor: "pointer" }}>Get Started Free</button></Link>
            <Link href="/search"><button style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "16px 40px", borderRadius: 12, fontSize: 16, cursor: "pointer" }}>Browse Deals</button></Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "60px 40px 30px", background: "#0a0e1a", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #f59e0b, #d97706)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#0a0e1a" strokeWidth="2"/><path d="M12 6v12M6 12l6-6 6 6" stroke="#0a0e1a" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
              <span style={{ fontSize: 20, fontWeight: 700, color: "white" }}>Wander<span style={{ color: "#f59e0b" }}>Nest</span></span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>© 2025 WanderNest. All rights reserved.</p>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {["About", "Privacy", "Terms", "Contact"].map(l => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 14 }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}