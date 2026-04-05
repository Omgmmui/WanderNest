"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    router.push("/");
  };

  const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("token");

  const navItems = [
    { label: "Flights", href: "/search?type=flights", highlight: true },
    { label: "Hotels", href: "/search?type=hotels", highlight: true },
    { label: "Tours", href: "/search?type=tours", highlight: true },
    { label: "Deals", href: "/search?type=deals", highlight: true },
    { label: "India", href: "/india", highlight: true },
    { label: "Visa", href: "/visa", highlight: true },
    { label: "Contact", href: "/contact", highlight: true },
  ];

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(10,14,26,0.9)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border)",
      padding: "0 24px", height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <Link href="/" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:8}}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" stroke="#f59e0b" strokeWidth="2"/>
          <circle cx="16" cy="16" r="8" stroke="#3b82f6" strokeWidth="1.5"/>
          <path d="M16 8v16M8 16l8-8 8 8" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span style={{fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:700,color:"var(--accent)"}}>Wander</span>
        <span style={{fontSize:22,fontFamily:"'Playfair Display',serif",fontWeight:400,color:"var(--text)"}}>Nest</span>
      </Link>

      <div style={{display:"flex",gap:6,alignItems:"center"}}>
        {navItems.map(item => (
          <Link key={item.label} href={item.href}
            style={{
              color: item.highlight ? "#f59e0b" : "var(--muted)",
              textDecoration: "none",
              padding: "8px 14px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: item.highlight ? 600 : 400,
              background: item.highlight ? "rgba(245,158,11,0.15)" : "transparent",
              border: item.highlight ? "1px solid rgba(245,158,11,0.3)" : "1px solid transparent",
              transition: "all 0.2s",
            }}>
            {item.label}
          </Link>
        ))}
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{marginLeft:8,fontSize:14,padding:"8px 18px",background:"transparent",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)",cursor:"pointer"}}>Logout</button>
        ) : (
          <>
            <Link href="/auth" style={{marginLeft:8}}>
              <button style={{fontSize:14,padding:"8px 18px",background:"transparent",border:"1px solid var(--border)",borderRadius:8,color:"var(--text)"}}>Login</button>
            </Link>
            <Link href="/auth?mode=register">
              <button style={{fontSize:14,padding:"8px 18px",background:"var(--accent)",border:"none",borderRadius:8,color:"#0a0e1a",fontWeight:600}}>Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
