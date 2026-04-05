'use client';
import { useState } from 'react';
import Link from 'next/link';

const ATTRACTIONS = {
  landmarks: {
    title: '🏛️ Iconic Landmarks',
    items: [
      { name: 'Taj Mahal', location: 'Agra, Uttar Pradesh', desc: 'One of the Seven Wonders of the World, built by Mughal emperor Shah Jahan', price: '₹1,100', rating: 4.9, img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&q=80', type: 'monument' },
      { name: 'Qutub Minar', location: 'Delhi', desc: 'Tallest brick minaret in the world, UNESCO World Heritage Site', price: '₹300', rating: 4.6, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Qutb_Minar_2022.jpg/960px-Qutb_Minar_2022.jpg', type: 'monument' },
    ]
  },
  nature: {
    title: '🏞️ Natural Wonders',
    items: [
      { name: 'Kerala Backwaters', location: 'Kerala', desc: 'Peaceful network of lagoons & canals - stay in a traditional houseboat', price: '₹8,500', rating: 4.8, img: 'https://gos3.ibcdn.com/985e6f8e933811edad520a58a9feac02.jpg', type: 'nature' },
      { name: 'Leh-Ladakh', location: 'Ladakh, Jammu & Kashmir', desc: 'Breathtaking Himalayan landscapes, ideal for road trips and adventure', price: '₹15,000', rating: 4.9, img: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/06/74/9d/53.jpg', type: 'nature' },
    ]
  },
  beaches: {
    title: '🏖️ Beaches & Relaxation',
    items: [
      { name: 'Goa', location: 'Goa', desc: 'Famous for beaches & nightlife - great mix of relaxation and parties', price: '₹5,000', rating: 4.7, img: 'https://www.thebluekite.com/uploads/blog/63-kishore-v-taVGqBGCAdo-unsplash2024-10-22-10-02-03-0.23870900%201729591323.jpg', type: 'beach' },
    ]
  },
  spiritual: {
    title: '🛕 Spiritual Destinations',
    items: [
      { name: 'Varanasi', location: 'Uttar Pradesh', desc: 'One of the oldest living cities in the world - experience the Ganga Aarti', price: '₹3,500', rating: 4.8, img: 'https://res.klook.com/image/upload/w_750%2Ch_469%2Cc_fill%2Cq_85/w_80%2Cx_15%2Cy_15%2Cg_south_west%2Cl_Klook_water_br_trans_yhcmh3/activities/s6bh7galou2a7eti0tep.jpg', type: 'spiritual' },
      { name: 'Golden Temple', location: 'Amritsar, Punjab', desc: 'Holiest Sikh shrine - free community meals (Langar)', price: 'Free', rating: 4.9, img: 'https://assets.cntraveller.in/photos/6368e177a788c013ce0f6c13/4%3A3/w_1440%2Ch_1080%2Cc_limit/golden-temple-lead.jpg', type: 'spiritual' },
    ]
  },
  heritage: {
    title: '🏰 Royal Heritage',
    items: [
      { name: 'Jaipur', location: 'Rajasthan', desc: 'Known as the Pink City - palaces, forts, and vibrant bazaars', price: '₹4,500', rating: 4.8, img: 'https://upload.wikimedia.org/wikipedia/commons/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg', type: 'heritage' },
    ]
  },
  hillstations: {
    title: '🌄 Hill Stations',
    items: [
      { name: 'Manali', location: 'Himachal Pradesh', desc: 'Popular for snow and adventure - great for couples and road trips', price: '₹6,500', rating: 4.6, img: 'https://hblimg.mmtcdn.com/content/hubble/img/manali/mmt/activities/m_rohtang-pass_l_400_640.jpg', type: 'hillstation' },
    ]
  },
  wildlife: {
    title: '🌿 Wildlife & Nature',
    items: [
      { name: 'Ranthambore National Park', location: 'Rajasthan', desc: 'Famous for tiger safaris - best visited between October-April', price: '₹2,000', rating: 4.7, img: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/06/75/79/80.jpg', type: 'wildlife' },
    ]
  },
};

const ALL_ATTRACTIONS = Object.values(ATTRACTIONS).flatMap(cat => cat.items);

const QUICK_PICKS = [
  { icon: '❤️', label: 'Romantic', places: ['Taj Mahal', 'Kerala Backwaters'] },
  { icon: '🧗', label: 'Adventure', places: ['Leh-Ladakh', 'Manali'] },
  { icon: '🏖️', label: 'Chill', places: ['Goa'] },
  { icon: '🛕', label: 'Spiritual', places: ['Varanasi', 'Golden Temple'] },
  { icon: '🏰', label: 'Culture', places: ['Jaipur'] },
];

export default function IndiaPage() {
  const [activeTab, setActiveTab] = useState('all');

  const getFilteredAttractions = () => {
    if (activeTab === 'all') return ALL_ATTRACTIONS;
    if (activeTab === 'monument') return ATTRACTIONS.landmarks.items;
    if (activeTab === 'nature') return [...ATTRACTIONS.nature.items, ...ATTRACTIONS.wildlife.items];
    if (activeTab === 'beach') return ATTRACTIONS.beaches.items;
    if (activeTab === 'spiritual') return ATTRACTIONS.spiritual.items;
    if (activeTab === 'heritage') return [...ATTRACTIONS.heritage.items, ...ATTRACTIONS.hillstations.items];
    return ALL_ATTRACTIONS;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0e1a 0%, #0f1e3d 100%)', paddingTop: 80 }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b', padding: '10px 20px', borderRadius: 30, fontSize: 14, fontWeight: 600, display: 'inline-block' }}>
            🌍 Discover Incredible India
          </span>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: '#fff', marginTop: 16, marginBottom: 12 }}>
            Top Attractions in <span style={{ color: '#f59e0b' }}>India</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            From mountains to beaches, palaces to spiritual sites - explore the diversity of India
          </p>
        </div>

        <div style={{ marginBottom: 40, padding: 24, background: 'rgba(30,42,64,0.6)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: '#fff', fontSize: 16, marginBottom: 16 }}>✨ Quick Picks Based on Your Interest</h3>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            {QUICK_PICKS.map((pick, i) => (
              <div key={i} style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12, padding: '12px 20px' }}>
                <span style={{ marginRight: 8 }}>{pick.icon}</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{pick.label}</span>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4 }}>{pick.places.join(', ')}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'monument', label: '🏛️ Monuments' },
            { id: 'nature', label: '🏞️ Nature' },
            { id: 'beach', label: '🏖️ Beaches' },
            { id: 'spiritual', label: '🛕 Spiritual' },
            { id: 'heritage', label: '🏰 Heritage' },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: '12px 24px', borderRadius: 12, border: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 600,
              background: activeTab === tab.id ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'rgba(255,255,255,0.1)',
              color: activeTab === tab.id ? '#0a0e1a' : 'rgba(255,255,255,0.7)',
              transition: 'all 0.3s',
            }}>
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, marginBottom: 60 }}>
          {getFilteredAttractions().map((place: any, i: number) => (
            <div key={i} style={{ 
              background: 'linear-gradient(135deg, rgba(30,42,64,0.9), rgba(20,30,50,0.9))', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: 20, 
              overflow: 'hidden',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ height: 200, background: `url(${place.img}) center/cover`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 12, right: 12, background: '#22c55e', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
                  ★ {place.rating}
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{place.name}</h3>
                <p style={{ color: '#f59e0b', fontSize: 13, marginBottom: 8 }}>📍 {place.location}</p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginBottom: 16, lineHeight: 1.5 }}>{place.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>from</span>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#f59e0b' }}>{place.price}</div>
                  </div>
                  <Link href={`/listing?id=${i+100}`}>
                    <button style={{ background: '#f59e0b', color: '#0a0e1a', padding: '10px 20px', borderRadius: 10, border: 'none', fontWeight: 600, cursor: 'pointer' }}>
                      Explore →
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, marginBottom: 40, textAlign: 'center', padding: 32, background: 'linear-gradient(135deg, #f59e0b22, #3b82f622)', borderRadius: 20, border: '1px solid rgba(245,158,11,0.3)' }}>
          <h3 style={{ color: '#fff', fontSize: 24, marginBottom: 8 }}>Ready to Explore India?</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>Book your dream vacation today!</p>
          <Link href="/search">
            <button style={{ background: '#f59e0b', color: '#0a0e1a', padding: '14px 32px', borderRadius: 12, fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: 16 }}>
              Start Planning →
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
