import { useState } from "react";

// ── PRIMITIVE COMPONENTS ───────────────────────────────────────────────────

export function Badge({ label, color, bg }) {
  return (
    <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:10, background:bg, color, whiteSpace:"nowrap" }}>
      {label}
    </span>
  );
}

export function ConfDot({ conf }) {
  const colors = { high:"#16a34a", medium:"#d97706", low:"#dc2626", none:"#d1d5db" };
  return <span style={{ display:"inline-block", width:8, height:8, borderRadius:"50%", background:colors[conf]||"#d1d5db", marginRight:6 }} />;
}

export function ScoreBadge({ score }) {
  const color = score>=80?"#059669":score>=60?"#d97706":"#9ca3af";
  const bg    = score>=80?"#d1fae5":score>=60?"#fef3c7":"#f3f4f6";
  return <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:10, color, background:bg }}>{score}</span>;
}

export function SourceBadge({ source }) {
  const isOM = source==="OM Library";
  return (
    <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:10, color:isOM?"#7c3aed":"#2E75B6", background:isOM?"#ede9fe":"#dbeafe" }}>
      {source}
    </span>
  );
}

export function StatusBadge({ status }) {
  const map = {
    "New":           { color:"#2E75B6", bg:"#dbeafe" },
    "Contacted":     { color:"#d97706", bg:"#fef3c7" },
    "Responded":     { color:"#059669", bg:"#d1fae5" },
    "Tour Scheduled":{ color:"#7c3aed", bg:"#ede9fe" },
  };
  const s = map[status]||{ color:"#6b7280", bg:"#f3f4f6" };
  return <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:10, color:s.color, background:s.bg }}>{status}</span>;
}

export function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      style={{ width:44, height:24, borderRadius:12, border:"none", cursor:"pointer", position:"relative", background:on?"#2E75B6":"#d1d5db", flexShrink:0 }}
    >
      <span style={{ position:"absolute", top:3, left:on?23:3, width:18, height:18, borderRadius:"50%", background:"white", transition:"left 0.15s" }} />
    </button>
  );
}

export function FitButtons({ prospect, onMark }) {
  return (
    <div style={{ display:"flex", gap:4 }}>
      <button
        onClick={() => onMark(prospect, "good")}
        style={{ fontSize:11, padding:"3px 8px", borderRadius:4, border:prospect.fit==="good"?"1px solid #059669":"1px solid #e5e7eb", background:prospect.fit==="good"?"#d1fae5":"white", color:prospect.fit==="good"?"#059669":"#9ca3af", cursor:"pointer", fontWeight:600 }}
      >Good Fit</button>
      <button
        onClick={() => onMark(prospect, "bad")}
        style={{ fontSize:11, padding:"3px 8px", borderRadius:4, border:prospect.fit==="bad"?"1px solid #dc2626":"1px solid #e5e7eb", background:prospect.fit==="bad"?"#fee2e2":"white", color:prospect.fit==="bad"?"#dc2626":"#9ca3af", cursor:"pointer", fontWeight:600 }}
      >Bad Fit</button>
    </div>
  );
}

export function SmBtn({ children, blue, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ fontSize:12, padding:"5px 12px", border:blue?"none":"1px solid #2E75B6", borderRadius:6, color:blue?"white":"#2E75B6", background:blue?"#2E75B6":"white", cursor:"pointer", fontWeight:500 }}
    >
      {children}
    </button>
  );
}

// ── UPLOAD MODAL ───────────────────────────────────────────────────────────

export function UploadModal({ onClose }) {
  const [uploaded, setUploaded] = useState(false);
  return (
    <div
      onClick={onClose}
      style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.45)" }}
    >
      <div onClick={e => e.stopPropagation()} style={{ background:"white", borderRadius:16, boxShadow:"0 20px 60px rgba(0,0,0,0.2)", width:384, padding:24 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
          <div>
            <p style={{ fontWeight:700, fontSize:15, color:"#111827", margin:0 }}>Upload Document</p>
            <p style={{ fontSize:12, color:"#6b7280", margin:"2px 0 0" }}>AI will analyze and index your file for chat.</p>
          </div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:20, color:"#9ca3af", cursor:"pointer", lineHeight:1 }}>×</button>
        </div>
        {!uploaded ? (
          <div
            onClick={() => setUploaded(true)}
            style={{ border:"2px dashed #d1d5db", borderRadius:12, padding:32, textAlign:"center", cursor:"pointer" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="#2E75B6"; e.currentTarget.style.background="#eff6ff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="#d1d5db"; e.currentTarget.style.background="white"; }}
          >
            <p style={{ fontWeight:600, fontSize:14, color:"#374151", margin:"0 0 4px" }}>Drag and drop or click to browse</p>
            <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>PDF, Word, Excel, CSV</p>
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"24px 0" }}>
            <div style={{ width:56, height:56, background:"#d1fae5", border:"1px solid #a7f3d0", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
              <svg width="28" height="28" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p style={{ fontWeight:600, color:"#111827", margin:"0 0 4px" }}>File uploaded successfully</p>
            <p style={{ fontSize:12, color:"#2E75B6", fontWeight:500, margin:"0 0 16px" }}>AI analysis complete — ready to use in chat</p>
            <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
              <button onClick={onClose} style={{ background:"#2E75B6", color:"white", fontSize:13, padding:"8px 16px", borderRadius:6, border:"none", cursor:"pointer", fontWeight:500 }}>Ask About This File</button>
              <button onClick={onClose} style={{ background:"white", color:"#374151", fontSize:13, padding:"8px 16px", borderRadius:6, border:"1px solid #e5e7eb", cursor:"pointer" }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── PROFILE MODAL ──────────────────────────────────────────────────────────

export function ProfileModal({ onClose, initialSection = "profile" }) {
  const [section, setSection] = useState(initialSection);
  const [twoFA, setTwoFA] = useState(true);
  const [notifs, setNotifs] = useState({ email:true, weekly:true, expiry:true, prospect:false });
  const [aiSettings, setAiSettings] = useState({
    name:"Lisa R.", fullName:"Lisa Ramirez", title:"Leasing Director", company:"MMG Equity Partners",
    phone:"(305) 555-0182", email:"l.ramirez@mmgequity.com", tone:"professional",
    signature:"Lisa Ramirez\nLeasing Director | MMG Equity Partners\n(305) 555-0182 | l.ramirez@mmgequity.com",
    outreachGoal:"Schedule a property tour",
    aiNotes:"Always reference the tenant's current lease timing. Lead with their growth story, not the property specs. Keep emails under 150 words.",
  });
  const updateAI = (k, v) => setAiSettings(p => ({ ...p, [k]:v }));
  const tabs = [["profile","Profile"],["security","Security"],["notifications","Notifications"],["ai","AI Settings"]];

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"flex-end", background:"rgba(0,0,0,0.4)" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"white", width:384, height:"100%", display:"flex", flexDirection:"column", boxShadow:"-8px 0 32px rgba(0,0,0,0.15)" }}>

        {/* Header */}
        <div style={{ padding:"14px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#1B2A4A" }}>
          <p style={{ color:"white", fontWeight:600, fontSize:14, margin:0 }}>Account & Settings</p>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#c8ddf4", fontSize:20, cursor:"pointer", lineHeight:1 }}>×</button>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", borderBottom:"1px solid #e5e7eb" }}>
          {tabs.map(([id, label]) => (
            <button key={id} onClick={() => setSection(id)}
              style={{ flex:1, padding:"10px 0", fontSize:12, fontWeight:600, border:"none", borderBottom:section===id?"2px solid #2E75B6":"2px solid transparent", color:section===id?"#2E75B6":"#6b7280", background:"white", cursor:"pointer" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", padding:20 }}>

          {section==="profile" && (
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:14, paddingBottom:16, marginBottom:16, borderBottom:"1px solid #f3f4f6" }}>
                <div style={{ width:56, height:56, background:"#2E75B6", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:18, fontWeight:700 }}>SM</div>
                <div>
                  <p style={{ fontWeight:600, color:"#111827", margin:0 }}>Sarah Mitchell</p>
                  <p style={{ fontSize:13, color:"#6b7280", margin:0 }}>Asset Management</p>
                  <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>s.mitchell@mmgequity.com</p>
                </div>
              </div>
              {[["Full Name","Sarah Mitchell"],["Job Title","Asset Management"],["Department","Portfolio Operations"],["Office","Miami, FL"]].map(([label, val]) => (
                <div key={label} style={{ marginBottom:12 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:"#6b7280", display:"block", marginBottom:4 }}>{label}</label>
                  <input defaultValue={val} style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:6, padding:"8px 10px", fontSize:13, color:"#111827", outline:"none", boxSizing:"border-box" }} />
                </div>
              ))}
              <button style={{ width:"100%", background:"#2E75B6", color:"white", fontSize:13, padding:"9px 0", borderRadius:6, border:"none", cursor:"pointer", fontWeight:500 }}>Save Changes</button>
            </div>
          )}

          {section==="security" && (
            <div>
              <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:8, padding:"12px 14px", marginBottom:16 }}>
                <p style={{ fontWeight:600, color:"#166534", fontSize:13, margin:0 }}>Account Secure</p>
                <p style={{ fontSize:12, color:"#15803d", margin:"4px 0 0" }}>2FA active. Last login: Today at 9:14 AM from Miami, FL.</p>
              </div>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:20 }}>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:"#111827", margin:0 }}>Two-Factor Authentication</p>
                  <p style={{ fontSize:12, color:"#6b7280", margin:"2px 0 0" }}>Require a code on each login.</p>
                  {twoFA && <p style={{ fontSize:12, color:"#2E75B6", margin:"4px 0 0" }}>Active — Google Authenticator</p>}
                </div>
                <Toggle on={twoFA} onChange={() => setTwoFA(v => !v)} />
              </div>
              <div style={{ borderTop:"1px solid #f3f4f6", paddingTop:16 }}>
                <p style={{ fontSize:12, fontWeight:600, color:"#6b7280", textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>Change Password</p>
                {["Current Password","New Password","Confirm New Password"].map(p => (
                  <input key={p} type="password" placeholder={p} style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:6, padding:"8px 10px", fontSize:13, outline:"none", marginBottom:8, boxSizing:"border-box" }} />
                ))}
                <button style={{ width:"100%", background:"#2E75B6", color:"white", fontSize:13, padding:"9px 0", borderRadius:6, border:"none", cursor:"pointer", fontWeight:500 }}>Update Password</button>
              </div>
            </div>
          )}

          {section==="notifications" && (
            <div>
              {[
                ["email",   "Email Notifications",    "Receive report summaries and lease alerts."],
                ["weekly",  "Weekly Summary",          "Portfolio digest every Monday."],
                ["expiry",  "Lease Expiration Alerts", "Notify 90, 60, 30 days before expiry."],
                ["prospect","Prospecting Updates",     "Alert when a tenant responds."],
              ].map(([id, label, desc]) => (
                <div key={id} style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, paddingBottom:16, marginBottom:16, borderBottom:"1px solid #f3f4f6" }}>
                  <div>
                    <p style={{ fontSize:13, fontWeight:600, color:"#111827", margin:0 }}>{label}</p>
                    <p style={{ fontSize:12, color:"#6b7280", margin:"2px 0 0" }}>{desc}</p>
                  </div>
                  <Toggle on={notifs[id]} onChange={() => setNotifs(n => ({ ...n, [id]:!n[id] }))} />
                </div>
              ))}
            </div>
          )}

          {section==="ai" && (
            <div>
              <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:"12px 14px", marginBottom:16 }}>
                <p style={{ fontWeight:600, color:"#1e40af", fontSize:13, margin:"0 0 4px" }}>AI Personalization</p>
                <p style={{ fontSize:12, color:"#2563eb", margin:0, lineHeight:1.5 }}>These settings tell the AI who you are and how you work. Every generated email, memo, and report will use this context automatically.</p>
              </div>
              {[["Display Name","name"],["Full Name","fullName"],["Title","title"],["Company","company"],["Phone","phone"],["Email","email"]].map(([label, key]) => (
                <div key={key} style={{ marginBottom:10 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:"#6b7280", display:"block", marginBottom:4 }}>{label}</label>
                  <input value={aiSettings[key]} onChange={e => updateAI(key, e.target.value)}
                    style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:6, padding:"8px 10px", fontSize:13, color:"#111827", outline:"none", boxSizing:"border-box" }} />
                </div>
              ))}
              <div style={{ borderTop:"1px solid #f3f4f6", paddingTop:14, marginTop:4 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"#6b7280", display:"block", marginBottom:6 }}>Email Signature</label>
                <textarea value={aiSettings.signature} onChange={e => updateAI("signature", e.target.value)} rows={4}
                  style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:6, padding:"8px 10px", fontSize:12, color:"#111827", outline:"none", fontFamily:"monospace", resize:"none", boxSizing:"border-box" }} />
              </div>
              <div style={{ borderTop:"1px solid #f3f4f6", paddingTop:14, marginTop:4 }}>
                <p style={{ fontSize:12, fontWeight:600, color:"#6b7280", marginBottom:8 }}>Tone</p>
                <div style={{ display:"flex", gap:8, marginBottom:12 }}>
                  {["professional","warm","concise"].map(t => (
                    <button key={t} onClick={() => updateAI("tone", t)}
                      style={{ fontSize:12, padding:"5px 12px", borderRadius:20, border:"1px solid", borderColor:aiSettings.tone===t?"#2E75B6":"#e5e7eb", background:aiSettings.tone===t?"#2E75B6":"white", color:aiSettings.tone===t?"white":"#6b7280", cursor:"pointer", fontWeight:500, textTransform:"capitalize" }}>
                      {t}
                    </button>
                  ))}
                </div>
                <label style={{ fontSize:12, fontWeight:600, color:"#6b7280", display:"block", marginBottom:6 }}>Custom AI Instructions</label>
                <textarea value={aiSettings.aiNotes} onChange={e => updateAI("aiNotes", e.target.value)} rows={4}
                  style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:6, padding:"8px 10px", fontSize:12, color:"#111827", outline:"none", resize:"none", boxSizing:"border-box" }} />
              </div>
              <button style={{ width:"100%", background:"#2E75B6", color:"white", fontSize:13, padding:"9px 0", borderRadius:6, border:"none", cursor:"pointer", fontWeight:500, marginTop:12 }}>Save AI Settings</button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding:"12px 20px", borderTop:"1px solid #e5e7eb" }}>
          <button style={{ width:"100%", border:"1px solid #fca5a5", color:"#ef4444", background:"white", fontSize:13, padding:"9px 0", borderRadius:6, cursor:"pointer", fontWeight:500 }}>Sign Out</button>
        </div>
      </div>
    </div>
  );
}

// ── PROFILE DROPDOWN ───────────────────────────────────────────────────────

export function ProfileDropdown({ onClose, onOpenModal }) {
  const items = [
    { label:"My Profile",    section:"profile",       icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
    { label:"AI Settings",   section:"ai",            icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg> },
    { label:"Notifications",  section:"notifications", icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg> },
    { label:"Security",       section:"security",      icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> },
  ];

  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:998 }} />
      <div style={{ position:"fixed", top:54, right:12, width:230, background:"white", borderRadius:12, border:"1px solid #e5e7eb", boxShadow:"0 8px 32px rgba(0,0,0,0.16)", zIndex:999, overflow:"hidden" }}>
        <div style={{ padding:"14px 16px", borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:38, height:38, borderRadius:"50%", background:"#2E75B6", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:13, fontWeight:700, flexShrink:0 }}>SM</div>
          <div>
            <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>Sarah Mitchell</p>
            <p style={{ fontSize:11, color:"#6b7280", margin:0 }}>Asset Manager · MMG Equity</p>
          </div>
        </div>
        {items.map(item => (
          <button key={item.label}
            onClick={() => { onOpenModal(item.section); onClose(); }}
            style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"11px 16px", fontSize:13, color:"#374151", background:"white", border:"none", textAlign:"left", cursor:"pointer" }}
            onMouseEnter={e => e.currentTarget.style.background="#f8fafc"}
            onMouseLeave={e => e.currentTarget.style.background="white"}
          >
            <span style={{ color:"#6b7280", display:"flex" }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
        <div style={{ borderTop:"1px solid #f3f4f6" }}>
          <button
            onClick={onClose}
            style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"11px 16px", fontSize:13, color:"#ef4444", background:"white", border:"none", textAlign:"left", cursor:"pointer" }}
            onMouseEnter={e => e.currentTarget.style.background="#fff5f5"}
            onMouseLeave={e => e.currentTarget.style.background="white"}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

// ── AI ACTION PANEL (used across OM Detail) ────────────────────────────────

export function AiActionPanel({ actions, context }) {
  const [result, setResult]           = useState("");
  const [loading, setLoading]         = useState("");
  const [activeAction, setActiveAction] = useState(null);

  const aiResponses = {
    "Valuation Analysis":    "Based on comparable sales in Kendall (median $284/SF, 6.2% cap), the $14.1M ask ($312/SF) is a 9.9% premium to market. A bid at $13.2M ($292/SF, 6.6% cap) would be competitive while preserving yield.",
    "Risk Summary":          "HIGH: 3 inline leases (4,700 SF, 10.4% GLA) expire within 12 months. MEDIUM: Amscot pad (3,800 SF) expires July 2026 — difficult to replace. LOW: Anchor secured through 2030 with strong demographic fit.",
    "Compare to Portfolio":  "Kendall Fresh Plaza underperforms the MMG portfolio average on occupancy (92% vs 95.2%), WALT (3.4 vs 4.8 yrs), and avg rent/SF ($30.80 vs $34.20).",
    "Draft Offer Memo":      "INVESTMENT MEMORANDUM — Kendall Fresh Plaza\n\nRecommendation: Re-engage at $13.2M contingent on anchor renewal confirmation.\n\nThe asset returned to market at a 12.9% reduction. Recommend 60-day DD period.",
    "Rollover Risk Report":  "12-Month Risk (High): UPS Store (1,200 SF, Apr 2026), Kumon (1,600 SF, Jun 2026), Amscot Pad (3,800 SF, Jul 2026) — 6,600 SF combined, 14.6% of GLA. WALT of 3.4 years is 18% below submarket median.",
    "Suggest Renewal Strategy":"1. Amscot (Pad, Jul 2026): Outreach immediately. Offer 5-year renewal at $30/SF with 3% escalations.\n2. UPS Store (Suite 105, Apr 2026): Offer 3-year renewal at $34/SF — 6% above current market.",
    "Flag Below-Market Tenants":"Amscot Financial (Pad): $28.00/SF vs market $32-36/SF — 12-22% below market.\nKumon Learning (Suite 107): $30.00/SF Gross vs $32-35/SF NNN equivalent — 15-20% below market.",
    "Draft IC Memo":         "INVESTMENT COMMITTEE MEMORANDUM\nDate: April 6, 2026\n\nRecommendation: Pass / Re-engage at $13.2M\n\nKendall Fresh Plaza returned to market at a 12.9% discount. Recommend re-engaging at $13.2M subject to anchor renewal confirmation.",
    "AI Bid Recommendation": "Recommended Offer: $13,200,000 ($292/SF | 6.62% cap)\n\nRationale: Comparable grocery-anchored sales averaged $281/SF at 6.2% cap. Stabilized value in 18 months: $14.8M at 6.4% cap assuming Suite 109 lease-up and Amscot renewal.",
    "Interpret Comps":       "QSR comps show a $32-44/SF NNN band with $34/SF median. Subject QSR tenants (Wingstop $35, Little Caesars $34, Clean Juice $36) are at or slightly above median.",
    "Draft LOI from Package":"LETTER OF INTENT — Kendall Fresh Plaza\n\nPurchase Price: $13,200,000, all cash at closing.\nDue Diligence: 60 days from PSA execution.\nConditions: Satisfactory review of all leases and financials. Written confirmation of Presidente lease renewal.",
  };

  const handleAction = label => {
    setActiveAction(label);
    setLoading(label);
    setResult("");
    setTimeout(() => { setLoading(""); setResult(aiResponses[label] || "AI analysis complete."); }, 1200);
  };

  return (
    <div style={{ background:"white", border:"1px solid #e5e7eb", borderRadius:12, overflow:"hidden", marginBottom:20 }}>
      <div style={{ padding:"12px 16px", borderBottom:"1px solid #f3f4f6", background:"#f8fafc", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:24, height:24, borderRadius:"50%", background:"#2E75B6", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"white", fontSize:11, fontWeight:700 }}>AI</span>
          </div>
          <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>AI Actions</p>
          <span style={{ fontSize:12, color:"#9ca3af" }}>— {context}</span>
        </div>
        {result && <button onClick={() => { setResult(""); setActiveAction(null); }} style={{ fontSize:12, color:"#9ca3af", background:"none", border:"none", cursor:"pointer" }}>Clear</button>}
      </div>
      <div style={{ padding:"12px 16px" }}>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:result ? 12 : 0 }}>
          {actions.map(a => {
            const isActive = activeAction === a.label;
            const isLoading = loading === a.label;
            return (
              <button key={a.label} onClick={() => handleAction(a.label)}
                style={{ fontSize:12, padding:"6px 12px", borderRadius:8, border:"1px solid", borderColor:isActive?a.color:"#e5e7eb", background:isActive&&result?a.color+"14":"#f9fafb", color:isActive?a.color:"#374151", cursor:"pointer", fontWeight:600 }}>
                {isLoading ? "..." : a.label}
              </button>
            );
          })}
        </div>
        {result && (
          <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:12 }}>
            <p style={{ fontSize:12, fontWeight:700, color:"#1e40af", margin:"0 0 6px" }}>{activeAction}</p>
            <p style={{ fontSize:12, color:"#1e3a8a", margin:0, lineHeight:1.5, whiteSpace:"pre-line" }}>{result}</p>
            <div style={{ display:"flex", gap:8, marginTop:10 }}>
              {["Copy","Save to SharePoint","Share with Team"].map(b => (
                <button key={b} style={{ fontSize:12, border:"1px solid #bfdbfe", color:"#2E75B6", background:"white", padding:"4px 10px", borderRadius:6, cursor:"pointer", fontWeight:500 }}>{b}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
