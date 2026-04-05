"use client";
import { useState } from "react";
import Link from "next/link";

const VISA_ON_ARRIVAL = [
  { code: "TH", name: "Thailand", flag: "🇹🇭", processing: "On Arrival", price: 3000, duration: "15 days" },
  { code: "AE", name: "UAE", flag: "🇦🇪", processing: "On Arrival", price: 3500, duration: "14 days" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾", processing: "On Arrival", price: 2500, duration: "15 days" },
  { code: "SG", name: "Singapore", flag: "🇸🇬", processing: "On Arrival", price: 2800, duration: "96 hours" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩", processing: "On Arrival", price: 3200, duration: "30 days" },
  { code: "LK", name: "Sri Lanka", flag: "🇱🇰", processing: "On Arrival", price: 2000, duration: "30 days" },
  { code: "MV", name: "Maldives", flag: "🇲🇻", processing: "On Arrival", price: 3500, duration: "30 days" },
  { code: "NP", name: "Nepal", flag: "🇳🇵", processing: "On Arrival", price: 500, duration: "15/90 days" },
];

const EVISA = [
  { code: "VN", name: "Vietnam", flag: "🇻🇳", processing: "3-5 days", price: 4500, duration: "90 days", portal: "evisa.gov.vn" },
  { code: "AU", name: "Australia", flag: "🇦🇺", processing: "7-14 days", price: 15000, duration: "1 year", portal: "immi.homeaffairs.gov.au" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿", processing: "10-15 days", price: 14000, duration: "2 years", portal: "immigration.govt.nz" },
  { code: "CA", name: "Canada", flag: "🇨🇦", processing: "15-20 days", price: 18000, duration: "10 years", portal: "canada.ca/eta" },
  { code: "US", name: "USA", flag: "🇺🇸", processing: "3-5 days", price: 21000, duration: "10 years", portal: "ceac.state.gov" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧", processing: "5-7 days", price: 18000, duration: "2-10 years", portal: "gov.uk/apply-uk-visa" },
  { code: "GE", name: "Georgia", flag: "🇬🇪", processing: "5-7 days", price: 3500, duration: "90 days", portal: "evisa.ge" },
  { code: "RW", name: "Rwanda", flag: "🇷🇼", processing: "3 days", price: 3000, duration: "30 days", portal: "irembo.gov.rw" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", processing: "7-10 days", price: 5500, duration: "90 days", portal: "dh.gov.za" },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿", processing: "5 days", price: 4000, duration: "90 days", portal: "immigration.go.tz" },
];

const STICKER_VISA = [
  { code: "DE", name: "Germany", flag: "🇩🇪", processing: "15-20 days", price: 8500, duration: "90 days", embassy: "New Delhi, Mumbai" },
  { code: "FR", name: "France", flag: "🇫🇷", processing: "15-20 days", price: 8500, duration: "90 days", embassy: "New Delhi, Mumbai, Bangalore" },
  { code: "IT", name: "Italy", flag: "🇮🇹", processing: "15-20 days", price: 8000, duration: "90 days", embassy: "New Delhi, Mumbai" },
  { code: "ES", name: "Spain", flag: "🇪🇸", processing: "15-20 days", price: 7500, duration: "90 days", embassy: "New Delhi, Mumbai" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱", processing: "15-20 days", price: 7500, duration: "90 days", embassy: "New Delhi" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭", processing: "15-20 days", price: 8500, duration: "90 days", embassy: "New Delhi" },
  { code: "SE", name: "Sweden", flag: "🇸🇪", processing: "15-20 days", price: 7500, duration: "90 days", embassy: "New Delhi" },
  { code: "NO", name: "Norway", flag: "🇳🇴", processing: "15-20 days", price: 8000, duration: "90 days", embassy: "New Delhi" },
  { code: "DK", name: "Denmark", flag: "🇩🇰", processing: "15-20 days", price: 7500, duration: "90 days", embassy: "New Delhi" },
  { code: "JP", name: "Japan", flag: "🇯🇵", processing: "10-15 days", price: 12000, duration: "90 days", embassy: "New Delhi, Mumbai, Chennai" },
  { code: "KR", name: "South Korea", flag: "🇰🇷", processing: "10-15 days", price: 9000, duration: "90 days", embassy: "New Delhi" },
  { code: "CN", name: "China", flag: "🇨🇳", processing: "15-20 days", price: 8500, duration: "90 days", embassy: "New Delhi, Mumbai, Guangzhou" },
  { code: "RU", name: "Russia", flag: "🇷🇺", processing: "15-20 days", price: 7000, duration: "90 days", embassy: "New Delhi" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", processing: "15-20 days", price: 8000, duration: "90 days", embassy: "New Delhi" },
  { code: "IN", name: "Indonesia", flag: "🇮🇩", processing: "15-20 days", price: 7000, duration: "90 days", embassy: "New Delhi" },
];

const OFFERS = [
  { title: "Summer Sale", desc: "Flat 25% off on USA & UK visas", code: "SUMMER25", valid: "31 May 2026" },
  { title: "Europe Special", desc: "Get 2 free travel insurance on EU visa", code: "EUROPE", valid: "30 Jun 2026" },
  { title: "Group Discount", desc: "5% extra off for 3+ applicants", code: "GROUP5", valid: "31 Dec 2026" },
];

const FAQS = [
  { q: "What's the difference between Visa on Arrival, E-Visa, and Sticker Visa?", a: "Visa on Arrival is obtained at the destination airport. E-Visa is applied online before travel. Sticker Visa requires visiting the embassy/consulate with documents." },
  { q: "How long does E-Visa take to process?", a: "E-Visa processing typically takes 3-15 business days depending on the country. Some offer express processing." },
  { q: "Can I extend my visa while in the country?", a: "Extension policies vary by country. Most visa on arrival and E-visas can be extended through local immigration." },
  { q: "What documents are needed for Sticker Visa?", a: "Typically: Valid passport (6+ months), photos, filled application form, financial documents, travel insurance, flight tickets, and hotel booking." },
  { q: "Is visa fee refundable if rejected?", a: "Government visa fees are generally non-refundable. Our service charge may be refundable if application is not submitted." },
];

export default function VisaPage() {
  const [activeTab, setActiveTab] = useState<"voa" | "evisa" | "sticker">("voa");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showFAQ, setShowFAQ] = useState<number | null>(null);

  const getCountries = () => {
    switch(activeTab) {
      case "voa": return VISA_ON_ARRIVAL;
      case "evisa": return EVISA;
      case "sticker": return STICKER_VISA;
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0e1a 0%, #0f1e3d 100%)", padding: "80px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Application Submitted!</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, marginBottom: 32 }}>
            Your visa application for {selectedCountry?.name} has been submitted. Our team will contact you within 24 hours.
          </p>
          <button onClick={() => { setSubmitted(false); setSelectedCountry(null); }}
            style={{ background: "#f59e0b", color: "#0a0e1a", border: "none", padding: "14px 28px", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
            Apply for Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0e1a 0%, #0f1e3d 100%)", paddingTop: 80 }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
        
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ background: "rgba(245,158,11,0.2)", color: "#f59e0b", padding: "10px 20px", borderRadius: 30, fontSize: 14, fontWeight: 600, display: "inline-block" }}>
            🌍 Global Visa Services
          </span>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: "#fff", marginTop: 16, marginBottom: 12 }}>
            Choose Your <span style={{ color: "#f59e0b" }}>Visa Type</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, maxWidth: 600, margin: "0 auto" }}>
            Select from Visa on Arrival, E-Visa, or Sticker Visa for 50+ countries
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 48 }}>
          {OFFERS.map((offer, i) => (
            <div key={i} style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))", border: "1px solid rgba(245,158,11,0.4)", borderRadius: 16, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <div>
                  <span style={{ background: "#f59e0b", color: "#0a0e1a", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>🔥 LIMITED</span>
                  <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700, marginTop: 12 }}>{offer.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, marginTop: 4 }}>{offer.desc}</p>
                </div>
                <div style={{ background: "rgba(0,0,0,0.3)", padding: "8px 12px", borderRadius: 8 }}>
                  <code style={{ color: "#f59e0b", fontWeight: 700 }}>{offer.code}</code>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 12 }}>Valid until {offer.valid}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 40, flexWrap: "wrap" }}>
          {[
            { id: "voa", label: "✈️ Visa on Arrival", color: "#3b82f6", desc: "Get visa at airport", count: VISA_ON_ARRIVAL.length },
            { id: "evisa", label: "💻 E-Visa", color: "#14b8a6", desc: "Apply online", count: EVISA.length },
            { id: "sticker", label: "📋 Sticker Visa", color: "#f59e0b", desc: "Embassy process", count: STICKER_VISA.length },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} style={{
              padding: "16px 28px", borderRadius: 16, border: "none", cursor: "pointer",
              fontSize: 15, fontWeight: 700,
              background: activeTab === tab.id ? `linear-gradient(135deg, ${tab.color}, ${tab.color}99)` : "rgba(255,255,255,0.1)",
              color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.6)",
              transition: "all 0.3s", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 180
            }}>
              <span>{tab.label}</span>
              <span style={{ fontSize: 11, fontWeight: 400, opacity: 0.8 }}>{tab.desc} • {tab.count} countries</span>
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 60 }}>
          {activeTab === "voa" && <h2 style={{ color: "#3b82f6", fontSize: 28, marginBottom: 20, textAlign: "center" }}>✈️ Visa on Arrival Countries</h2>}
          {activeTab === "evisa" && <h2 style={{ color: "#14b8a6", fontSize: 28, marginBottom: 20, textAlign: "center" }}>💻 E-Visa Eligible Countries</h2>}
          {activeTab === "sticker" && <h2 style={{ color: "#f59e0b", fontSize: 28, marginBottom: 20, textAlign: "center" }}>📋 Sticker Visa Countries</h2>}
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {getCountries().map((country: any, i) => (
              <div key={country.code} onClick={() => setSelectedCountry(country)}
                style={{ 
                  background: "linear-gradient(135deg, rgba(30,42,64,0.9), rgba(20,30,50,0.9))", 
                  border: "1px solid rgba(255,255,255,0.1)", 
                  borderRadius: 20, 
                  padding: 24, 
                  cursor: "pointer", 
                  transition: "all 0.3s",
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <span style={{ fontSize: 48 }}>{country.flag}</span>
                  <div>
                    <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>{country.name}</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>⏱️ {country.processing}</p>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div style={{ background: "rgba(0,0,0,0.3)", padding: 12, borderRadius: 10 }}>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 4 }}>Duration</p>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{country.duration}</p>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.3)", padding: 12, borderRadius: 10 }}>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 4 }}>Processing</p>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{country.processing}</p>
                  </div>
                </div>
                {country.portal && (
                  <div style={{ marginBottom: 12, padding: "8px 12px", background: "rgba(59,130,246,0.15)", borderRadius: 8 }}>
                    <span style={{ color: "#3b82f6", fontSize: 12 }}>🌐 Apply at: {country.portal}</span>
                  </div>
                )}
                {country.embassy && (
                  <div style={{ marginBottom: 12, padding: "8px 12px", background: "rgba(245,158,11,0.15)", borderRadius: 8 }}>
                    <span style={{ color: "#f59e0b", fontSize: 12 }}>🏛️ Embassy: {country.embassy}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Starting from</span>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#f59e0b" }}>₹{country.price.toLocaleString()}</div>
                  </div>
                  <button style={{ background: "#f59e0b", color: "#0a0e1a", padding: "10px 20px", borderRadius: 10, border: "none", fontWeight: 600, cursor: "pointer" }}>
                    Apply Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 40, padding: 40, background: "linear-gradient(135deg, rgba(30,42,64,0.8), rgba(20,30,50,0.8))", borderRadius: 24, border: "1px solid rgba(255,255,255,0.1)" }}>
          <h3 style={{ color: "#fff", fontSize: 24, marginBottom: 24, textAlign: "center" }}>💼 Why Choose WanderNest for Visa?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
            {[
              { icon: "⚡", title: "Fast Processing", desc: "2-15 days", color: "#f59e0b" },
              { icon: "📋", title: "Expert Support", desc: "24/7 Assistance", color: "#3b82f6" },
              { icon: "✅", title: "98% Success", desc: "High Approval Rate", color: "#14b8a6" },
              { icon: "💰", title: "Best Prices", desc: "Competitive Rates", color: "#f59e0b" },
              { icon: "🔒", title: "Secure Process", desc: "Data Protected", color: "#8b5cf6" },
              { icon: "📱", title: "Digital Tracking", desc: "Real-time Updates", color: "#ec4899" },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center", padding: 20, background: "rgba(0,0,0,0.2)", borderRadius: 16 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <h4 style={{ color: item.color, fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{item.title}</h4>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ color: "#fff", fontSize: 24, marginBottom: 24, textAlign: "center" }}>❓ Frequently Asked Questions</h3>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ background: "rgba(30,42,64,0.6)", borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
              <button onClick={() => setShowFAQ(showFAQ === i ? null : i)} style={{ width: "100%", padding: 20, background: "none", border: "none", color: "#fff", fontSize: 15, fontWeight: 600, textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {faq.q}
                <span style={{ color: "#f59e0b", fontSize: 20 }}>{showFAQ === i ? "−" : "+"}</span>
              </button>
              {showFAQ === i && (
                <div style={{ padding: "0 20px 20px", color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.6 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 60, marginBottom: 40, textAlign: "center", padding: 32, background: "linear-gradient(135deg, #f59e0b22, #3b82f622)", borderRadius: 20, border: "1px solid rgba(245,158,11,0.3)" }}>
          <h3 style={{ color: "#fff", fontSize: 24, marginBottom: 8 }}>Need Help? Talk to Our Visa Experts</h3>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>📞 +91 9247247775 | ✉️ visa@wandernest.com</p>
          <Link href="/contact" style={{ background: "#f59e0b", color: "#0a0e1a", padding: "14px 32px", borderRadius: 12, fontWeight: 600, textDecoration: "none", display: "inline-block" }}>
            Contact Us →
          </Link>
        </div>
      </div>
    </div>
  );
}
