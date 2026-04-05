'use client';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense, useEffect } from 'react';
import Link from 'next/link';

const SORT = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Rating'];

interface Flight {
  id: number;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  price: number;
  class: string;
}

const DEALS = [
  { id: 1, title: 'Dubai Summer Sale', desc: 'Flat 35% off on all flights to Dubai', discount: '35%', valid: 'Valid until May 31, 2026', color: '#f59e0b' },
  { id: 2, title: 'Europe Escape', desc: 'Round trip to Paris starting ₹45,999', discount: 'From ₹45,999', valid: 'Limited seats available', color: '#3b82f6' },
  { id: 3, title: 'Bali Paradise', desc: '5 nights + flights package at ₹32,999', discount: 'From ₹32,999', valid: 'Valid until Jun 15, 2026', color: '#14b8a6' },
  { id: 4, title: 'Weekend Getaway', desc: 'Mumbai-Goa weekend package at ₹8,999', discount: 'From ₹8,999', valid: 'Weekends only', color: '#a855f7' },
  { id: 5, title: 'Luxury Staycation', desc: '5-star hotels from ₹3,499/night', discount: 'From ₹3,499', valid: 'Valid until May 20, 2026', color: '#ec4899' },
  { id: 6, title: 'Honeymoon Special', desc: 'Maldives couples package - 40% off', discount: '40%', valid: 'Valid until Jun 30, 2026', color: '#f59e0b' },
  { id: 7, title: 'Business Class Upgrade', desc: 'Upgrade to business class at 50% off', discount: '50%', valid: 'Limited offer', color: '#8b5cf6' },
  { id: 8, title: 'Group Discount', desc: '5% extra off for 5+ travelers', discount: '5%', valid: 'Valid always', color: '#22c55e' },
];

const HOTELS = [
  { id: 1, name: 'Grand Hyatt Dubai', location: 'Dubai', rating: 4.8, reviews: 2340, price: 8500, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80', amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi'] },
  { id: 2, name: 'Marriott Paris', location: 'Paris, France', rating: 4.6, reviews: 1850, price: 12000, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80', amenities: ['Gym', 'Bar', 'Restaurant', 'WiFi'] },
  { id: 3, name: 'The RitzCarlton Bali', location: 'Bali, Indonesia', rating: 4.9, reviews: 3100, price: 15000, image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=80', amenities: ['Beach', 'Pool', 'Spa', 'Restaurant'] },
  { id: 4, name: 'Taj Palace Mumbai', location: 'Mumbai, India', rating: 4.7, reviews: 4200, price: 9500, image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&q=80', amenities: ['Pool', 'Gym', 'Restaurant', 'WiFi'] },
  { id: 5, name: 'InterContinental Tokyo', location: 'Tokyo, Japan', rating: 4.8, reviews: 1650, price: 18000, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80', amenities: ['Spa', 'Restaurant', 'Bar', 'WiFi'] },
  { id: 6, name: 'Hilton Garden Inn Goa', location: 'Goa, India', rating: 4.5, reviews: 2800, price: 4500, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', amenities: ['Pool', 'Beach', 'Restaurant', 'WiFi'] },
];

const TOURS = [
  { id: 1, title: 'Dubai City Tour', duration: '8 hours', price: 2500, rating: 4.7, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80', highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall'] },
  { id: 2, title: 'Paris Highlights', duration: '2 days', price: 8500, rating: 4.9, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80', highlights: ['Eiffel Tower', 'Louvre Museum', 'Seine Cruise'] },
  { id: 3, title: 'Bali Adventure', duration: '3 days', price: 12000, rating: 4.8, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', highlights: ['Temples', 'Rice Terraces', 'Volcano Trek'] },
  { id: 4, title: 'Tokyo Cultural Day', duration: '10 hours', price: 5500, rating: 4.6, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80', highlights: ['Senso-ji Temple', 'Shibuya Crossing', 'Tea Ceremony'] },
  { id: 5, title: 'Goa Beach Hopping', duration: '1 day', price: 1800, rating: 4.5, image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=80', highlights: ['Baga Beach', 'Anjuna', 'Fort Aguada'] },
  { id: 6, title: 'Swiss Alps Expedition', duration: '5 days', price: 45000, rating: 4.9, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=400&q=80', highlights: ['Matterhorn', 'Glacier Express', 'Zermatt'] },
];

const FLIGHTS = [
  { id: 1, airline: 'Emirates', flightNumber: 'EK 501', from: 'DEL', to: 'DXB', departure: '02:30', arrival: '05:15', duration: '3h 45m', stops: 0, price: 12500, class: 'Economy' },
  { id: 2, airline: 'Qatar Airways', flightNumber: 'QR 127', from: 'BOM', to: 'DOH', departure: '03:45', arrival: '05:30', duration: '2h 45m', stops: 0, price: 9800, class: 'Economy' },
  { id: 3, airline: 'Lufthansa', flightNumber: 'LH 777', from: 'DEL', to: 'FRA', departure: '06:00', arrival: '11:30', duration: '9h 30m', stops: 0, price: 35000, class: 'Business' },
  { id: 4, airline: 'Air India', flightNumber: 'AI 202', from: 'HYD', to: 'BOM', departure: '07:15', arrival: '08:30', duration: '1h 15m', stops: 0, price: 3500, class: 'Economy' },
  { id: 5, airline: 'British Airways', flightNumber: 'BA 144', from: 'DEL', to: 'LHR', departure: '14:00', arrival: '19:45', duration: '9h 45m', stops: 0, price: 42000, class: 'Business' },
  { id: 6, airline: 'SpiceJet', flightNumber: 'SG 15', from: 'BLR', to: 'GOI', departure: '09:30', arrival: '10:15', duration: '45m', stops: 0, price: 2800, class: 'Economy' },
];

function SearchContent() {
  const params = useSearchParams();
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const date = params.get('date') || '';
  const type = params.get('type') || 'flights';
  
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sort, setSort] = useState('Recommended');
  const [maxPrice, setMaxPrice] = useState(50000);

  useEffect(() => {
    if (type === 'flights' && from && to) {
      setLoading(true);
      setError('');
      fetch('/api/flights/search?from=' + from + '&to=' + to + (date ? '&date=' + date : ''))
        .then(res => res.json())
        .then(data => {
          if (data.message) {
            setError(data.message);
          } else {
            setFlights(data.flights || []);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch flights');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [from, to, date, type]);

  const displayFlights = (from && to) ? flights : FLIGHTS;
  
  const sortedFlights = [...displayFlights]
    .filter(f => f.price <= maxPrice)
    .sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price;
      if (sort === 'Price: High to Low') return b.price - a.price;
      return 0;
    });

  const tagColors: Record<string, string> = {
    'Best Value': '#14b8a6', 'Cheapest': '#22c55e', 'Premium': '#a855f7'
  };

  const getTag = (flight: Flight) => {
    if (displayFlights.length === 0) return 'Best Value';
    const minPrice = Math.min(...displayFlights.map(f => f.price));
    if (flight.price === minPrice) return 'Cheapest';
    if (flight.class === 'Business') return 'Premium';
    return 'Best Value';
  };

  if (type === 'deals') {
    return (
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>🔥 Hot Deals</h1>
          <p style={{ color: '#888' }}>Grab the best offers and discounts before they expire!</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
          {DEALS.map(deal => (
            <div key={deal.id} style={{ 
              background: 'var(--card)', 
              borderRadius: 16, 
              border: '1px solid var(--border)',
              overflow: 'hidden',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ background: deal.color, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <div style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 600, display: 'inline-block', marginBottom: 8 }}>
                    🔥 HOT
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{deal.title}</h3>
                </div>
                <div style={{ background: '#fff', color: deal.color, padding: '8px 16px', borderRadius: 8, fontWeight: 700, fontSize: 16 }}>
                  {deal.discount}
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <p style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 12 }}>{deal.desc}</p>
                <p style={{ color: 'var(--muted)', fontSize: 12, opacity: 0.7 }}>{deal.valid}</p>
                <Link href="/search" style={{ display: 'block', marginTop: 16, background: deal.color, color: '#fff', textAlign: 'center', padding: '12px 0', borderRadius: 10, fontWeight: 600, textDecoration: 'none' }}>
                  Book Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'hotels') {
    const sortedHotels = [...HOTELS].sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price;
      if (sort === 'Price: High to Low') return b.price - a.price;
      return 0;
    });

    return (
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>🏨 Popular Hotels</h1>
          <p style={{ color: '#888' }}>Find the best accommodations for your trip</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
          {sortedHotels.map(hotel => (
            <div key={hotel.id} style={{ 
              background: 'var(--card)', 
              borderRadius: 16, 
              border: '1px solid var(--border)',
              overflow: 'hidden',
              transition: 'transform 0.3s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ height: 180, background: `url(${hotel.image}) center/cover` }} />
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>{hotel.name}</h3>
                    <p style={{ color: '#888', fontSize: 14 }}>📍 {hotel.location}</p>
                  </div>
                  <div style={{ background: '#22c55e', color: '#fff', padding: '4px 10px', borderRadius: 8, fontSize: 14, fontWeight: 600 }}>
                    {hotel.rating} ★
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                  {hotel.amenities.map((amenity, i) => (
                    <span key={i} style={{ background: 'rgba(255,255,255,0.1)', color: '#888', padding: '4px 10px', borderRadius: 6, fontSize: 12 }}>
                      {amenity}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ color: '#888', fontSize: 12 }}>per night</span>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#f59e0b' }}>₹{hotel.price.toLocaleString()}</div>
                  </div>
                  <button style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'tours') {
    const sortedTours = [...TOURS].sort((a, b) => {
      if (sort === 'Price: Low to High') return a.price - b.price;
      if (sort === 'Price: High to Low') return b.price - a.price;
      return 0;
    });

    return (
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>🗺️ Popular Tours</h1>
          <p style={{ color: '#888' }}>Discover exciting tours and experiences</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
          {sortedTours.map(tour => (
            <div key={tour.id} style={{ 
              background: 'var(--card)', 
              borderRadius: 16, 
              border: '1px solid var(--border)',
              overflow: 'hidden',
              transition: 'transform 0.3s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ height: 180, background: `url(${tour.image}) center/cover`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 12, right: 12, background: '#22c55e', color: '#fff', padding: '4px 10px', borderRadius: 8, fontSize: 14, fontWeight: 600 }}>
                  {tour.rating} ★
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{tour.title}</h3>
                <p style={{ color: '#888', fontSize: 14, marginBottom: 12 }}>⏱️ {tour.duration}</p>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>Highlights:</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {tour.highlights.map((h, i) => (
                      <span key={i} style={{ background: 'rgba(59,130,246,0.2)', color: '#3b82f6', padding: '4px 10px', borderRadius: 6, fontSize: 12 }}>
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ color: '#888', fontSize: 12 }}>starting from</span>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#f59e0b' }}>₹{tour.price.toLocaleString()}</div>
                  </div>
                  <button style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '10px 20px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
          {from && to ? from + ' → ' + to : '✈️ Popular Flights'}
        </h1>
        <p style={{ color: '#888' }}>
          {from && to ? sortedFlights.length + ' flights found' : 'Find the best flights at unbeatable prices'}
          {date && ' on ' + date}
        </p>
      </div>

      {error && (
        <div style={{ padding: 20, background: '#fee2e2', borderRadius: 8, color: '#dc2626', marginBottom: 20 }}>
          {error} - From: {from}, To: {to}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 28 }}>
        <div>
          <div style={{ padding: 24, position: 'sticky', top: 80, background: 'var(--card)', borderRadius: 12, border: '1px solid var(--border)' }}>
            <h3 style={{ marginBottom: 20, fontSize: 16 }}>Filters</h3>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>MAX PRICE</div>
              <input type='range' min={1000} max={50000} step={500} value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%' }} />
              <div style={{ color: '#f59e0b', fontSize: 14, marginTop: 6 }}>
                Up to ₹{maxPrice.toLocaleString()}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>SORT BY</div>
              {SORT.map(s => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, cursor: 'pointer' }}>
                  <input type='radio' name='sort' checked={sort === s} onChange={() => setSort(s)} style={{ width: 'auto' }} />
                  <span style={{ fontSize: 14 }}>{s}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>Loading flights...</div>
          ) : sortedFlights.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>No flights found. Try different dates or routes.</div>
          ) : (
            sortedFlights.map(flight => (
              <div key={flight.id} style={{ display: 'flex', gap: 0, overflow: 'hidden', background: 'var(--card)', borderRadius: 12, border: '1px solid var(--border)' }}>
                <div style={{ width: 120, background: 'linear-gradient(135deg, #1a1a2e, #16213e)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                  <span style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{flight.airline}</span>
                </div>
                <div style={{ padding: '20px 24px', flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 600 }}>{flight.airline} {flight.flightNumber}</h3>
                      <span style={{ 
                        background: tagColors[getTag(flight)] + '22', 
                        color: tagColors[getTag(flight)], 
                        border: '1px solid ' + tagColors[getTag(flight)] + '44', 
                        fontSize: 11, padding: '4px 8px', borderRadius: 4
                      }}>
                        {getTag(flight)}
                      </span>
                    </div>
                    <p style={{ color: '#888', fontSize: 14, marginBottom: 12 }}>
                      {flight.from} → {flight.to} • {flight.stops === 0 ? 'Non-stop' : '1 Stop'} • {flight.duration}
                    </p>
                    <div style={{ fontSize: 13, color: '#888' }}>{flight.class}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#f59e0b' }}>
                      ₹{flight.price.toLocaleString()}
                    </div>
                    <div style={{ color: '#888', fontSize: 12, marginBottom: 14 }}>per person</div>
                    <button style={{ background: '#f59e0b', color: '#000', border: 'none', padding: '9px 20px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}>Select</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: '#888' }}>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
