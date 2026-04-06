import { useState } from "react";
import { QUICK_ACTIONS, PAST_CHATS } from "../data";
import { SmBtn, UploadModal } from "../shared";

// ── CHAT BUBBLES ───────────────────────────────────────────────────────────

function UserMsg({ children }) {
  return (
    <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:20 }}>
      <div>
        <div style={{ background:"#2E75B6", color:"white", borderRadius:"16px 16px 4px 16px", padding:"10px 16px", fontSize:13, lineHeight:1.6, maxWidth:480 }}>{children}</div>
        <p style={{ fontSize:11, color:"#9ca3af", textAlign:"right", margin:"4px 0 0" }}>Sarah M. · just now</p>
      </div>
    </div>
  );
}

function AiMsg({ children, sources, time }) {
  return (
    <div style={{ display:"flex", gap:12, marginBottom:20 }}>
      <div style={{ width:28, height:28, borderRadius:"50%", background:"#2E75B6", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
        <span style={{ color:"white", fontSize:11, fontWeight:700 }}>AI</span>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <p style={{ fontSize:12, fontWeight:600, color:"#374151", margin:"0 0 2px" }}>Smart Document Access</p>
        {sources && <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 8px" }}>{sources} · {time || "just now"}</p>}
        <div style={{ background:"white", border:"1px solid #e5e7eb", borderRadius:"4px 16px 16px 16px", padding:"16px 20px", boxShadow:"0 1px 4px rgba(0,0,0,0.06)" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── EXAMPLE CONVERSATIONS ──────────────────────────────────────────────────

function SearchExample() {
  return (
    <div>
      <UserMsg>Compare the rent rolls for Midtown Plaza and Midtown Corner. Which property has stronger occupancy stability heading into Q3?</UserMsg>
      <AiMsg sources="2 documents analyzed" time="3 seconds">
        <table style={{ width:"100%", borderCollapse:"collapse", marginBottom:16, fontSize:12 }}>
          <thead>
            <tr style={{ background:"#f8fafc" }}>
              {["Metric","Midtown Plaza","Midtown Corner"].map(h => (
                <th key={h} style={{ border:"1px solid #e5e7eb", padding:"8px 12px", textAlign:"left", fontWeight:600, color:"#374151" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[["Occupancy","94%","88%"],["WALT","4.2 yrs","3.1 yrs"],["Avg Rent/SF","$36.50","$32.80"],["Leases Expiring <12mo","2 · 3,400 SF","5 · 11,800 SF"],["Anchor Expiry","March 2030","August 2027"]].map((r,i) => (
              <tr key={i} style={{ background:i%2===0?"white":"#f8fafc" }}>
                {r.map((c,j) => <td key={j} style={{ border:"1px solid #e5e7eb", padding:"8px 12px", color:"#374151", fontSize:12 }}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:12, marginBottom:12 }}>
          <p style={{ fontSize:12, fontWeight:700, color:"#1e40af", margin:"0 0 6px" }}>AI Assessment</p>
          <p style={{ fontSize:13, color:"#1e3a8a", margin:0, lineHeight:1.5 }}>
            <strong>Midtown Plaza</strong> is the stronger asset — 94% occupancy, 4.2yr WALT, anchor through 2030.{" "}
            <strong>Midtown Corner</strong> carries meaningful rollover risk with 5 leases expiring in 12 months (31% of GLA).
          </p>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {["Export to Excel","Draft Memo","Save to SharePoint","Ask Follow-Up"].map(b => <SmBtn key={b}>{b}</SmBtn>)}
        </div>
      </AiMsg>
    </div>
  );
}

function DraftExample() {
  return (
    <div>
      <UserMsg>Draft an LOI response for the Doral retail space. Tenant is a QSR operator, 3,200 SF, requesting a 10-year term.</UserMsg>
      <AiMsg sources="Template: LOI Standard QSR NNN v3" time="5 seconds">
        <div style={{ border:"1px solid #e5e7eb", borderRadius:10, overflow:"hidden", marginBottom:12 }}>
          <div style={{ background:"#f8fafc", borderBottom:"1px solid #e5e7eb", padding:"10px 16px" }}>
            <p style={{ fontSize:12, fontWeight:700, color:"#374151", margin:0 }}>LETTER OF INTENT — RESPONSE · Doral Retail Center · Suite 104</p>
          </div>
          <div style={{ padding:16 }}>
            {[
              ["Premises",     "Suite 104, Doral Retail Center, 8250 NW 25th St, Doral FL 33122 — 3,200 SF inline retail."],
              ["Lease Term",   "7 years with two 5-year options. MMG will consider 10-year term with rent step to $41/SF at Year 8."],
              ["Base Rent",    "$38.00/SF NNN for Years 1-3 with 3% annual escalations."],
              ["TI Allowance", "$35.00/SF ($112,000 total), disbursed on execution and permit issuance."],
              ["Delivery",     "60 days from full lease execution, as-is shell condition."],
            ].map(([k,v]) => (
              <div key={k} style={{ display:"flex", gap:12, marginBottom:8 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#374151", width:100, flexShrink:0 }}>{k}</span>
                <span style={{ fontSize:12, color:"#6b7280", lineHeight:1.5 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {["Copy","Save to SharePoint","Open in Word","Regenerate"].map(b => <SmBtn key={b}>{b}</SmBtn>)}
        </div>
      </AiMsg>
    </div>
  );
}

function ReportExample() {
  const data = [
    {m:"Sep",n:104200,b:106000},{m:"Oct",n:107800,b:107000},{m:"Nov",n:105600,b:108000},
    {m:"Dec",n:103200,b:108000},{m:"Jan",n:108600,b:109500},{m:"Feb",n:111400,b:109500},
  ];
  const mn=98000, mx=115000, rng=mx-mn, xS=100/(data.length-1);
  const yP = v => 100-((v-mn)/rng)*100;

  return (
    <div>
      <UserMsg>Generate a monthly property report for Wynwood Retail — February 2026. Include financials and a NOI vs budget chart.</UserMsg>
      <AiMsg sources="4 source files" time="8 seconds">
        <table style={{ width:"100%", borderCollapse:"collapse", marginBottom:16, fontSize:12 }}>
          <thead>
            <tr style={{ background:"#f8fafc" }}>
              {["Metric","Feb 2026","Budget","Variance"].map(h => (
                <th key={h} style={{ border:"1px solid #e5e7eb", padding:"6px 10px", textAlign:"left", fontWeight:600, color:"#374151" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[["Gross Revenue","$142,800","$140,000","+$2,800"],["NOI","$111,400","$109,500","+$1,900"],["Collections Rate","97.2%","96.0%","+1.2%"]].map((r,i) => (
              <tr key={i} style={{ background:i%2===0?"white":"#f8fafc" }}>
                {r.map((c,j) => (
                  <td key={j} style={{ border:"1px solid #e5e7eb", padding:"6px 10px", color:j===3?(c.startsWith("+")?"#059669":"#dc2626"):"#374151", fontWeight:j===3?700:400 }}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ border:"1px solid #e5e7eb", borderRadius:8, padding:16, marginBottom:12 }}>
          <p style={{ fontSize:12, fontWeight:700, color:"#374151", margin:"0 0 4px" }}>NOI vs Budget — Sep 2025 to Feb 2026</p>
          <p style={{ fontSize:11, color:"#059669", fontWeight:600, margin:"0 0 12px" }}>February: first month NOI exceeded budget</p>
          <div style={{ position:"relative", height:100 }}>
            <svg style={{ width:"100%", height:80 }} viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline points={data.map((p,i)=>`${i*xS},${yP(p.b)}`).join(" ")} fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,2" vectorEffect="non-scaling-stroke" />
              <polyline points={data.map((p,i)=>`${i*xS},${yP(p.n)}`).join(" ")} fill="none" stroke="#2E75B6" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
              {data.map((p,i) => <circle key={i} cx={i*xS} cy={yP(p.n)} r="3" fill={p.n>p.b?"#059669":"#2E75B6"} vectorEffect="non-scaling-stroke" />)}
            </svg>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              {data.map(d => <span key={d.m} style={{ fontSize:10, color:"#9ca3af" }}>{d.m}</span>)}
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {["Download PDF","Save to SharePoint","Email to Team"].map(b => <SmBtn key={b}>{b}</SmBtn>)}
        </div>
      </AiMsg>
    </div>
  );
}

// ── QUICK ACTIONS PANEL ────────────────────────────────────────────────────

function QuickActionsPanel({ onAction, onUpload }) {
  return (
    <div style={{ flex:1, overflowY:"auto", background:"#f8fafc" }}>
      <div style={{ background:"white", borderBottom:"1px solid #e5e7eb", padding:"20px 32px 16px" }}>
        <p style={{ fontSize:16, fontWeight:700, color:"#111827", margin:"0 0 4px" }}>Smart Document Access</p>
        <p style={{ fontSize:13, color:"#6b7280", margin:"0 0 12px" }}>Ask the AI anything about your documents, or choose a quick action below.</p>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {[["40+ Properties","Connected"],["SharePoint","Synced"],["2,400+ Documents","Indexed"],["Last sync","2 min ago"]].map(([k,v]) => (
            <div key={k} style={{ display:"flex", alignItems:"center", gap:8, background:"#f8fafc", border:"1px solid #e5e7eb", borderRadius:8, padding:"6px 12px" }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#10b981" }} />
              <p style={{ fontSize:12, fontWeight:600, color:"#374151", margin:0 }}>{k}</p>
              <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>{v}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:"24px 32px" }}>
        {QUICK_ACTIONS.map(group => (
          <div key={group.cat} style={{ marginBottom:28 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <div style={{ width:28, height:28, borderRadius:8, background:group.lightBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:group.color }}>{group.icon}</div>
              <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>{group.cat}</p>
              <div style={{ flex:1, height:1, background:"#f3f4f6" }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {group.actions.map(a => (
                <button key={a.label}
                  onClick={() => a.prompt === "UPLOAD" ? onUpload() : onAction(a.prompt)}
                  style={{ textAlign:"left", background:"white", border:"1px solid #e5e7eb", borderRadius:10, padding:"14px 16px", cursor:"pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=group.color+"66"; e.currentTarget.style.background=group.lightBg; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="#e5e7eb"; e.currentTarget.style.background="white"; }}
                >
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:6 }}>
                    <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>{a.label}</p>
                    <span style={{ color:"#d1d5db", fontSize:16, lineHeight:1, flexShrink:0 }}>›</span>
                  </div>
                  <p style={{ fontSize:12, color:"#6b7280", margin:"0 0 8px", lineHeight:1.5 }}>{a.desc}</p>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:4, height:4, borderRadius:"50%", background:group.color }} />
                    <span style={{ fontSize:11, fontWeight:500, color:group.color }}>{a.prompt==="UPLOAD"?"Opens upload panel":"Opens AI prompt"}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function SmartDocAccess() {
  const [activeTab, setActiveTab]   = useState("actions");
  const [inputVal, setInputVal]     = useState("");
  const [showUpload, setShowUpload] = useState(false);

  const tabs = [
    { id:"actions", label:"Quick Actions"  },
    { id:"search",  label:"Search Example" },
    { id:"draft",   label:"Draft & Save"   },
    { id:"report",  label:"Report + Chart" },
  ];

  return (
    <div style={{ display:"flex", height:"100%" }}>

      {/* ── SIDEBAR ── */}
      <div style={{ width:190, flexShrink:0, display:"flex", flexDirection:"column", background:"white", borderRight:"1px solid #e5e7eb" }}>
        <div style={{ padding:"12px 10px 8px" }}>
          <button style={{
            width:"100%",
            background:"#2E75B6",
            color:"white",
            fontSize:12,
            borderRadius:6,
            padding:"8px 0",
            border:"none",
            fontWeight:600,
            cursor:"pointer",
          }}>+ New Chat</button>

          <input style={{
            width:"100%",
            marginTop:8,
            fontSize:11,
            borderRadius:6,
            padding:"6px 8px",
            outline:"none",
            background:"#f9fafb",
            color:"#374151",
            border:"1px solid #e5e7eb",
            boxSizing:"border-box",
          }} placeholder="Search chats..." />
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"4px 8px 8px" }}>
          {PAST_CHATS.map((c, i) => (
            <div key={c.id} style={{
              display:"flex",
              alignItems:"flex-start",
              gap:4,
              padding:"8px 8px 8px 10px",
              borderRadius:6,
              cursor:"pointer",
              marginBottom:2,
              background: i === 0 ? "#eff6ff" : "transparent",
              borderLeft: i === 0 ? "2px solid #2E75B6" : "2px solid transparent",
            }}>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{
                  fontSize:11,
                  fontWeight: i === 0 ? 600 : 400,
                  margin:0,
                  overflow:"hidden",
                  textOverflow:"ellipsis",
                  whiteSpace:"nowrap",
                  color: i === 0 ? "#1e40af" : "#6b7280",
                }}>{c.label}</p>
                <p style={{ fontSize:11, color:"#9ca3af", margin:"2px 0 0" }}>{c.date}</p>
              </div>
              <span style={{ color: c.saved ? "#2E75B6" : "#d1d5db", fontSize:13 }}>
                {c.saved ? "★" : "☆"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN PANEL ── */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, background:"#f8fafc" }}>
        {/* Tab bar */}
        <div style={{ background:"white", borderBottom:"1px solid #e5e7eb", padding:"0 16px", display:"flex", gap:4 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ padding:"10px 16px", fontSize:13, fontWeight:500, border:"none", borderBottom:activeTab===t.id?"2px solid #2E75B6":"2px solid transparent", color:activeTab===t.id?"#2E75B6":"#6b7280", background:"none", cursor:"pointer" }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", display:"flex", justifyContent:"center" }}>
          <div style={{ width:"100%", maxWidth:860 }}>
            {activeTab==="actions" && (
              <QuickActionsPanel onAction={p => { setInputVal(p); setActiveTab("search"); }} onUpload={() => setShowUpload(true)} />
            )}
            {activeTab !== "actions" && (
              <div style={{ padding:24 }}>
                {activeTab==="search" && <SearchExample />}
                {activeTab==="draft"  && <DraftExample />}
                {activeTab==="report" && <ReportExample />}
              </div>
            )}
          </div>
        </div>

        {/* Input bar */}
        <div style={{ background:"white", borderTop:"1px solid #e5e7eb", padding:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, border:"1px solid #d1d5db", borderRadius:8, padding:"8px 12px" }}>
            <button onClick={() => setShowUpload(true)} style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", display:"flex" }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            <div style={{ width:1, height:18, background:"#e5e7eb" }} />
            <input
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              style={{ flex:1, fontSize:13, outline:"none", border:"none", color:"#374151" }}
              placeholder="Ask anything about your documents..."
            />
            <button style={{ background:"none", border:"none", cursor:"pointer", color:"#2E75B6", display:"flex" }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
}
