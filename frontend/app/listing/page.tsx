"use client";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";

const LISTINGS: Record<string, {
  title: string; subtitle: string; price: string; rating: number;
  reviews: number; img: string; imgs: string[]; desc: string;
  highlights: string[]; type: string;
}> = {
  "1": {
    title: "IndiGo 6E-201", subtitle: "Hyderabad → Dubai • Non-stop • 3h 45m",
    price: "₹8,499", rating: 4.5, reviews: 1240, type: "flight",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    imgs: ["https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80","https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=400&q=80"],
    desc: "Experience a seamless non-stop journey from Hyderabad to Dubai with IndiGo. Known for punctuality and value, this flight offers comfortable seating and complimentary snacks.",
    highlights: ["Non-stop flight", "20kg check-in baggage", "Complimentary meal", "On-time performance 94%", "Web check-in available"],
  },
  "4": {
    title: "Atlantis The Palm", subtitle: "Dubai, UAE • 5-Star Resort",
    price: "₹22,999", rating: 4.8, reviews: 3560, type: "hotel",
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    imgs: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80","https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80"],
    desc: "The iconic Atlantis The Palm sits at the apex of the Palm Jumeirah. With world-class amenities, private beach, and over 20 restaurants, it's an unmatched luxury experience.",
    highlights: ["Private beach access", "Aquaventure Waterpark", "5 swimming pools", "Free WiFi", "Airport transfer included"],
  },
  "5": {
    title: "Bali Adventure Tour", subtitle: "7 Days • All Inclusive • Group Tour",
    price: "₹32,999", rating: 4.7, reviews: 892, type: "tour",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    imgs: ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80","https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=80"],
    desc: "Immerse yourself in Bali's magic — from sacred temples to terraced rice fields, volcanic peaks to pristine beaches. Our 7-day all-inclusive package covers everything.",
    highlights: ["Flights + hotel included", "Expert local guide", "Tanah Lot & Uluwatu temples", "Mount Batur sunrise trek", "Traditional cooking class"],
  },
};

function ListingContent() {
  const params = useSearchParams();
  const id = params.get("id") || "1";
  const listing = LISTINGS[id] || LISTINGS["1"];
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("");

  const priceNum = parseInt(listing.price.replace(/[₹,]/g, ""));
  const total = priceNum * guests;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      {/* Breadcrumb */}
      <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 24 }}>
        <Link href="/" style={{ color: "var(--muted)", textDecoration: "none" }}>Home</Link>
        <span style={{ margin: "0 8px" }}>›</span>
        <Link href="/search" style={{ color: "var(--muted)", textDecoration: "none" }}>Search</Link>
        <span style={{ margin: "0 8px" }}>›</span>
        <span style={{ color: "var(--text)" }}>{listing.title}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32 }}>
        {/* Left */}
        <div>
          <img src={listing.img} alt={listing.title} style={{ width: "100%", height: 380, objectFit: "cover", borderRadius: 16, marginBottom: 16 }} />
          <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
            {listing.imgs.map((img, i) => (
              <img key={i} src={img} alt="" style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 10, cursor: "pointer", border: "2px solid var(--border)" }} />
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 6 }}>{listing.title}</h1>
              <p style={{ color: "var(--muted)", fontSize: 15 }}>{listing.subtitle}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "var(--accent)", fontSize: 18 }}>★ {listing.rating}</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{listing.reviews.toLocaleString()} reviews</div>
            </div>
          </div>

          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: 32, fontSize: 15 }}>{listing.desc}</p>

          <h3 style={{ fontSize: 20, marginBottom: 16 }}>Highlights</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {listing.highlights.map(h => (
              <div key={h} style={{
                padding: "12px 16px", background: "var(--card)", border: "1px solid var(--border)",
                borderRadius: 10, fontSize: 14, display: "flex", alignItems: "center", gap: 8
              }}>
                <span style={{ color: "var(--accent)" }}>✓</span> {h}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Card */}
        <div>
          <div className="card" style={{ padding: 28, position: "sticky", top: 80 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--accent)", fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>
              {listing.price}
            </div>
            <div style={{ color: "var(--muted)", fontSize: 13, marginBottom: 24 }}>per person</div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Travel Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, color: "var(--muted)", display: "block", marginBottom: 6 }}>Guests</label>
              <select value={guests} onChange={e => setGuests(Number(e.target.value))}>
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} Guest{n>1?"s":""}</option>)}
              </select>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: "var(--muted)" }}>{listing.price} × {guests}</span>
                <span>₹{(priceNum * guests).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14 }}>
                <span style={{ color: "var(--muted)" }}>Taxes & fees</span>
                <span>₹{Math.round(total * 0.05).toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16, marginTop: 12 }}>
                <span>Total</span>
                <span style={{ color: "var(--accent)" }}>₹{Math.round(total * 1.05).toLocaleString()}</span>
              </div>
            </div>

            <Link href={`/booking?id=${id}&guests=${guests}&date=${date}`}>
              <button className="btn-primary" style={{ width: "100%", fontSize: 15, padding: "14px" }}>Book Now</button>
            </Link>
            <div style={{ textAlign: "center", color: "var(--muted)", fontSize: 12, marginTop: 12 }}>
              Free cancellation within 24 hours
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ListingPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: "var(--muted)" }}>Loading...</div>}>
      <ListingContent />
    </Suspense>
  );
}
