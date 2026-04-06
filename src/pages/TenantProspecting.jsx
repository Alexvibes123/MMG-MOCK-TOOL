import { useState } from "react";
import {
  TOP_PROSPECTS, ACTIVE_VACANCIES, OM_LIBRARY_LEADS, MARKET_SCAN_LEADS,
  PIPELINE_STAGES,
} from "../data";
import { Badge, ScoreBadge, SourceBadge, StatusBadge, FitButtons } from "../shared";

// ── DASHBOARD ──────────────────────────────────────────────────────────────

function ProspectingDashboard({ prospects, setProspects, onSelectVacancy, onSelectProspect }) {
  const handleMark = (p, fit) => setProspects(prev => prev.map(x => x.name===p.name ? {...x, fit} : x));

  return (
    <div style={{ flex:1, overflowY:"auto", padding:24, background:"#f8fafc" }}>
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:20 }}>
        {[
          { label:"Active Vacancies", val:"6",  sub:"154,800 SF total",   color:"#2E75B6" },
          { label:"Total Prospects",  val:"47", sub:"AI-scored this week", color:"#059669" },
          { label:"Outreach Sent",    val:"12", sub:"This week",           color:"#7c3aed" },
          { label:"Tours Scheduled",  val:"3",  sub:"Next 14 days",        color:"#ea580c" },
        ].map(s => (
          <div key={s.label} style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", padding:16 }}>
            <p style={{ fontSize:12, color:"#6b7280", margin:"0 0 4px" }}>{s.label}</p>
            <p style={{ fontSize:24, fontWeight:700, color:s.color, margin:"0 0 2px" }}>{s.val}</p>
            <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* AI Engine */}
      <div style={{ background:"white", border:"1px solid #e5e7eb", borderRadius:12, marginBottom:20, overflow:"hidden" }}>
        <div style={{ padding:"12px 20px", borderBottom:"1px solid #f3f4f6", background:"#f8fafc", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:24, height:24, borderRadius:"50%", background:"#059669", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"white", fontSize:11, fontWeight:700 }}>AI</span>
            </div>
            <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>AI Intelligence Engine</p>
            <span style={{ fontSize:11, background:"#d1fae5", color:"#059669", border:"1px solid #a7f3d0", padding:"2px 8px", borderRadius:10, fontWeight:600 }}>Running Autonomously</span>
          </div>
          <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>Last run: 4 minutes ago</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:"1px solid #f3f4f6" }}>
          {[
            { label:"Tenant-Property Matching", desc:"Space fit, industry, co-tenancy" },
            { label:"Prospect Scoring (0-100)",  desc:"Financial health, growth, timing" },
            { label:"Outreach Generation",       desc:"Personalized emails with growth signals" },
            { label:"Market Briefings",          desc:"Weekly reports on trends" },
          ].map((item, i) => (
            <div key={item.label} style={{ padding:"12px 16px", borderRight:i<3?"1px solid #f3f4f6":"none" }}>
              <p style={{ fontSize:12, fontWeight:700, color:"#111827", margin:"0 0 4px" }}>{item.label}</p>
              <p style={{ fontSize:11, color:"#6b7280", margin:0, lineHeight:1.4 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prospects + Vacancies */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20 }}>
        {/* Top Prospects table */}
        <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
          <div style={{ padding:"12px 20px", borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>Top Prospects</p>
            <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>AI-scored · Mark fit to improve model</p>
          </div>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ background:"#f8fafc" }}>
                {["Business","Score","Vacancy","Source","Status","Timing","Fit"].map(h => (
                  <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:600, color:"#6b7280", borderBottom:"1px solid #f3f4f6" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prospects.map((p, i) => (
                <tr key={i} style={{ borderBottom:"1px solid #f9fafb", cursor:"pointer" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#f0fdf4"}
                  onMouseLeave={e=>e.currentTarget.style.background="white"}>
                  <td style={{ padding:"12px 16px" }}>
                    <button onClick={() => onSelectProspect(p)} style={{ fontSize:13, fontWeight:700, color:"#111827", background:"none", border:"none", cursor:"pointer", padding:0, textAlign:"left" }}>{p.name}</button>
                    <p style={{ fontSize:11, color:"#9ca3af", margin:"2px 0 0" }}>{p.industry} · {p.locations} locations</p>
                  </td>
                  <td style={{ padding:"12px 16px" }}><ScoreBadge score={p.score} /></td>
                  <td style={{ padding:"12px 16px", color:"#6b7280" }}>{p.vacancy}</td>
                  <td style={{ padding:"12px 16px" }}><SourceBadge source={p.source} /></td>
                  <td style={{ padding:"12px 16px" }}><StatusBadge status={p.status} /></td>
                  <td style={{ padding:"12px 16px", color:"#6b7280" }}>{p.timing}</td>
                  <td style={{ padding:"12px 16px" }}><FitButtons prospect={p} onMark={handleMark} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Active Vacancies */}
        <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb" }}>
          <div style={{ padding:"12px 20px", borderBottom:"1px solid #f3f4f6" }}>
            <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>Active Vacancies</p>
          </div>
          {ACTIVE_VACANCIES.map((v, i) => {
            const total = v.stages.reduce((a,b)=>a+b, 0);
            return (
              <button key={i} onClick={() => onSelectVacancy(v)}
                style={{ width:"100%", textAlign:"left", padding:"12px 16px", borderBottom:"1px solid #f9fafb", background:"white", border:"none", borderBottom:"1px solid #f9fafb", cursor:"pointer" }}
                onMouseEnter={e=>e.currentTarget.style.background="#f0fdf4"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:6 }}>
                  <div>
                    <p style={{ fontSize:13, fontWeight:600, color:"#111827", margin:0 }}>{v.property}</p>
                    <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>{v.suite} · {v.sf.toLocaleString()} SF</p>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <p style={{ fontSize:12, fontWeight:700, color:"#374151", margin:0 }}>{total} prospects</p>
                    <p style={{ fontSize:11, fontWeight:600, color:v.days>60?"#dc2626":v.days>30?"#d97706":"#059669", margin:0 }}>{v.days}d vacant</p>
                  </div>
                </div>
                <div style={{ display:"flex", gap:2 }}>
                  {PIPELINE_STAGES.map((stage, si) => {
                    const count = v.stages[si] || 0;
                    return <div key={si} style={{ flex:1, height:5, borderRadius:2, background:count>0?"#10b981":"#e5e7eb", opacity:count>0?Math.min(0.4+count*0.3,1):1 }} />;
                  })}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── VACANCY DETAIL ─────────────────────────────────────────────────────────

function VacancyDetail({ vacancy, prospects, setProspects, onSelectProspect }) {
  const handleMark = (p, fit) => setProspects(prev => prev.map(x => x.name===p.name ? {...x, fit} : x));

  return (
    <div style={{ flex:1, overflowY:"auto", padding:24, background:"#f8fafc" }}>
      {/* Header */}
      <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", padding:20, marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
          <div>
            <h2 style={{ fontSize:20, fontWeight:700, color:"#111827", margin:0 }}>{vacancy.property} — {vacancy.suite}</h2>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:6 }}>
              <span style={{ fontSize:13, fontWeight:600, color:"#374151" }}>{vacancy.sf.toLocaleString()} SF</span>
              <span style={{ fontSize:13, fontWeight:600, color:"#374151" }}>{vacancy.asking}</span>
              <span style={{ fontSize:13, fontWeight:600, color:vacancy.days>60?"#dc2626":vacancy.days>30?"#d97706":"#059669" }}>{vacancy.days} days vacant</span>
            </div>
          </div>
          <button style={{ fontSize:12, background:"#059669", color:"white", padding:"8px 14px", borderRadius:6, border:"none", cursor:"pointer", fontWeight:600 }}>Generate Outreach for Top 5</button>
        </div>
        <p style={{ fontSize:12, fontWeight:600, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1, margin:"0 0 8px" }}>Pipeline Progress</p>
        <div style={{ display:"flex", gap:4 }}>
          {PIPELINE_STAGES.map((stage, si) => {
            const count = vacancy.stages[si] || 0;
            return (
              <div key={si} style={{ flex:1, textAlign:"center" }}>
                <div style={{ height:24, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, marginBottom:4, background:count>0?"#10b981":"#f3f4f6", color:count>0?"white":"#9ca3af" }}>{count>0?count:"—"}</div>
                <p style={{ fontSize:10, color:"#9ca3af", margin:0, lineHeight:1.3 }}>{stage}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* OM Library Leads */}
        <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
          <div style={{ padding:"12px 16px", borderBottom:"1px solid #f3f4f6", background:"#faf5ff", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>OM Library Leads</p>
              <p style={{ fontSize:11, color:"#7c3aed", margin:"2px 0 0" }}>Tenants with expiring leases from ingested OMs</p>
            </div>
            <button style={{ fontSize:11, background:"#7c3aed", color:"white", padding:"5px 10px", borderRadius:6, border:"none", cursor:"pointer", fontWeight:600 }}>Export to HubSpot</button>
          </div>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ background:"#f8fafc" }}>
                {["Tenant","SF","Expiry","Days","Dist.","Score","Fit"].map(h => (
                  <th key={h} style={{ padding:"8px 12px", textAlign:"left", fontSize:11, fontWeight:600, color:"#6b7280", borderBottom:"1px solid #f3f4f6" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {OM_LIBRARY_LEADS.map((t, i) => {
                const mockP = { name:t.name, fit:null, score:t.score };
                return (
                  <tr key={i} style={{ borderBottom:"1px solid #f9fafb", cursor:"pointer" }}>
                    <td style={{ padding:"10px 12px" }}>
                      <p style={{ fontSize:12, fontWeight:600, color:"#111827", margin:0 }}>{t.name}</p>
                      <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>{t.current}</p>
                    </td>
                    <td style={{ padding:"10px 12px", color:"#374151" }}>{t.sf.toLocaleString()}</td>
                    <td style={{ padding:"10px 12px", color:"#6b7280" }}>{t.exp}</td>
                    <td style={{ padding:"10px 12px" }}>
                      <span style={{ fontSize:11, fontWeight:600, color:t.days<90?"#dc2626":t.days<180?"#d97706":"#6b7280" }}>{t.days}d</span>
                    </td>
                    <td style={{ padding:"10px 12px", color:"#9ca3af" }}>{t.dist}</td>
                    <td style={{ padding:"10px 12px" }}><ScoreBadge score={t.score} /></td>
                    <td style={{ padding:"10px 12px" }}><FitButtons prospect={mockP} onMark={handleMark} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Market Scan Leads */}
        <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
          <div style={{ padding:"12px 16px", borderBottom:"1px solid #f3f4f6", background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>Market Scan Leads</p>
              <p style={{ fontSize:11, color:"#2E75B6", margin:"2px 0 0" }}>AI-identified businesses showing expansion signals</p>
            </div>
            <button style={{ fontSize:11, background:"#2E75B6", color:"white", padding:"5px 10px", borderRadius:6, border:"none", cursor:"pointer", fontWeight:600 }}>Generate Outreach</button>
          </div>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ background:"#f8fafc" }}>
                {["Business","Industry","Signal","Location","Score","Fit"].map(h => (
                  <th key={h} style={{ padding:"8px 12px", textAlign:"left", fontSize:11, fontWeight:600, color:"#6b7280", borderBottom:"1px solid #f3f4f6" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MARKET_SCAN_LEADS.map((t, i) => {
                const mockP = { name:t.name, fit:null };
                return (
                  <tr key={i} style={{ borderBottom:"1px solid #f9fafb", cursor:"pointer" }}>
                    <td style={{ padding:"10px 12px", fontWeight:600, color:"#111827" }}>{t.name}</td>
                    <td style={{ padding:"10px 12px", color:"#6b7280" }}>{t.industry}</td>
                    <td style={{ padding:"10px 12px", color:"#9ca3af", fontSize:11, lineHeight:1.4 }}>{t.signal}</td>
                    <td style={{ padding:"10px 12px", color:"#6b7280" }}>{t.location}</td>
                    <td style={{ padding:"10px 12px" }}><ScoreBadge score={t.score} /></td>
                    <td style={{ padding:"10px 12px" }}><FitButtons prospect={mockP} onMark={handleMark} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── PROSPECT DETAIL ────────────────────────────────────────────────────────

function ProspectDetail({ prospect, onMark, onSwitch, allProspects }) {
  const [emailSent, setEmailSent] = useState(false);
  const [showEmail, setShowEmail] = useState(true);

  const p = prospect || allProspects[0] || {};
  const scoreColor = p.score>=80?"#059669":p.score>=60?"#d97706":"#9ca3af";

  if (!p.name) return (
    <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <p style={{ color:"#9ca3af", fontSize:13 }}>No prospect selected.</p>
    </div>
  );

  const scoring = [
    { factor:"Space Fit",         score:Math.min(p.score+5, 99), detail:"SF and layout match vacancy requirements" },
    { factor:"Timing Signal",     score:Math.min(p.score+8, 99), detail:`${p.timing||"—"} remaining on current lease` },
    { factor:"Industry Fit",      score:Math.max(p.score-4, 50), detail:"Co-tenancy and traffic pattern alignment" },
    { factor:"Growth Trajectory", score:Math.min(p.score+3, 99), detail:`${p.locations||"—"} locations — ${p.growth||"—"} growth` },
    { factor:"Financial Health",  score:Math.max(p.score-2, 55), detail:"Revenue trajectory and unit economics" },
    { factor:"Lead Source",       score:p.source==="OM Library"?95:72, detail:`${p.source||"—"} — ${p.source==="OM Library"?"high confidence data":"market signal"}` },
  ];

  return (
    <div style={{ flex:1, overflowY:"auto", background:"#f8fafc" }}>
      {/* Prospect switcher */}
      <div style={{ background:"white", borderBottom:"1px solid #e5e7eb", padding:"8px 24px", display:"flex", alignItems:"center", gap:8, overflowX:"auto" }}>
        <p style={{ fontSize:12, fontWeight:600, color:"#9ca3af", flexShrink:0, margin:0 }}>Switch prospect:</p>
        {allProspects.map(sp => {
          const isActive = sp.name===p.name;
          return (
            <button key={sp.name} onClick={() => onSwitch(sp)}
              style={{ fontSize:11, padding:"5px 12px", borderRadius:20, border:"1px solid", borderColor:isActive?"#059669":"#e5e7eb", background:isActive?"#059669":"white", color:isActive?"white":"#6b7280", cursor:"pointer", fontWeight:600, whiteSpace:"nowrap" }}>
              {sp.name} · {sp.score}
            </button>
          );
        })}
      </div>

      <div style={{ padding:24 }}>
        {/* Header card */}
        <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", padding:20, marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16 }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:16 }}>
              <div style={{ width:64, height:64, borderRadius:12, border:"2px solid "+scoreColor, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:scoreColor+"10", flexShrink:0 }}>
                <span style={{ fontSize:22, fontWeight:800, color:scoreColor, lineHeight:1 }}>{p.score}</span>
                <span style={{ fontSize:10, fontWeight:600, color:scoreColor }}>score</span>
              </div>
              <div>
                <h2 style={{ fontSize:20, fontWeight:700, color:"#111827", margin:"0 0 8px" }}>{p.name}</h2>
                <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                  <Badge label={p.industry||"—"} color="#374151" bg="#f3f4f6" />
                  <SourceBadge source={p.source||"—"} />
                  <StatusBadge status={p.status||"New"} />
                </div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, flexShrink:0 }}>
              <FitButtons prospect={p} onMark={onMark} />
              <button style={{ fontSize:12, background:"#059669", color:"white", padding:"6px 14px", borderRadius:6, border:"none", cursor:"pointer", fontWeight:600 }}>Add to Pipeline</button>
            </div>
          </div>
          {p.fit && (
            <div style={{ marginTop:12, padding:"8px 12px", borderRadius:6, background:p.fit==="good"?"#d1fae5":"#fee2e2", color:p.fit==="good"?"#059669":"#dc2626", fontSize:12, fontWeight:600 }}>
              {p.fit==="good" ? "Marked as Good Fit — scoring model updated." : "Marked as Bad Fit — scoring model updated."}
            </div>
          )}
        </div>

        {/* Intelligence + Score */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
          <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", padding:20 }}>
            <p style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1, margin:"0 0 12px" }}>Prospect Intelligence</p>
            <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:12, marginBottom:12 }}>
              <p style={{ fontSize:12, fontWeight:700, color:"#1e40af", margin:"0 0 4px" }}>AI Overview</p>
              <p style={{ fontSize:12, color:"#1e3a8a", margin:0, lineHeight:1.5 }}>
                {p.name} is a South Florida {(p.industry||"").toLowerCase()} operator with {p.locations} active locations. Lease expiring in {p.timing}.
                {p.growth==="High" ? " Known for aggressive expansion." : " Steady regional presence."}
              </p>
            </div>
            {[["Matched Vacancy",p.vacancy||"—"],["Current Space",(p.sf||0).toLocaleString()+" SF"],["Lease Timing",(p.timing||"—")+" remaining"],["Growth Level",p.growth||"—"],["Lead Source",p.source||"—"]].map(([k,v]) => (
              <div key={k} style={{ display:"flex", gap:12, marginBottom:8 }}>
                <span style={{ fontSize:12, fontWeight:600, color:"#9ca3af", width:110, flexShrink:0 }}>{k}</span>
                <span style={{ fontSize:12, color:"#374151" }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", padding:20 }}>
            <p style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1, margin:"0 0 12px" }}>AI Score Breakdown — {p.score}/100</p>
            {scoring.map(item => {
              const barColor = item.score>=80?"#10b981":item.score>=60?"#f59e0b":"#9ca3af";
              return (
                <div key={item.factor} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                    <span style={{ fontSize:12, fontWeight:600, color:"#374151" }}>{item.factor}</span>
                    <span style={{ fontSize:12, fontWeight:700, color:barColor }}>{item.score}</span>
                  </div>
                  <div style={{ height:6, background:"#f3f4f6", borderRadius:3, overflow:"hidden", marginBottom:2 }}>
                    <div style={{ height:"100%", background:barColor, width:item.score+"%" }} />
                  </div>
                  <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>{item.detail}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Email */}
        <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
          <div style={{ padding:"12px 20px", borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:"#059669", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ color:"white", fontSize:11, fontWeight:700 }}>AI</span>
              </div>
              <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>AI-Drafted Outreach Email</p>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => setShowEmail(!showEmail)} style={{ fontSize:12, border:"1px solid #e5e7eb", color:"#374151", padding:"5px 10px", borderRadius:6, background:"white", cursor:"pointer" }}>
                {showEmail?"Hide":"Show"} Email
              </button>
              <button style={{ fontSize:12, border:"1px solid #e5e7eb", color:"#374151", padding:"5px 10px", borderRadius:6, background:"white", cursor:"pointer" }}>Edit</button>
              <button onClick={() => setEmailSent(true)}
                style={{ fontSize:12, padding:"5px 14px", borderRadius:6, border:"none", background:emailSent?"#d1fae5":"#059669", color:emailSent?"#059669":"white", cursor:"pointer", fontWeight:600 }}>
                {emailSent ? "Sent via HubSpot" : "Send via HubSpot"}
              </button>
            </div>
          </div>
          {showEmail && (
            <div style={{ padding:20 }}>
              <div style={{ display:"flex", gap:16, marginBottom:12, paddingBottom:12, borderBottom:"1px solid #f3f4f6" }}>
                <span style={{ fontSize:12 }}><strong style={{ color:"#9ca3af" }}>To:</strong> [Decision Maker] · {p.name}</span>
                <span style={{ fontSize:12 }}><strong style={{ color:"#9ca3af" }}>Subject:</strong> A new space in Wynwood for {p.name}'s next chapter</span>
              </div>
              <div style={{ fontSize:13, color:"#374151", lineHeight:1.6 }}>
                <p style={{ margin:"0 0 10px" }}>Hi [First Name],</p>
                <p style={{ margin:"0 0 10px" }}>I noticed {p.name} has been building momentum across South Florida — {p.locations} locations is impressive. With your current lease coming up in {p.timing}, I wanted to reach out before your search begins elsewhere.</p>
                <p style={{ margin:"0 0 10px" }}>We have a {ACTIVE_VACANCIES[0].sf.toLocaleString()} SF space available at Wynwood Retail — {ACTIVE_VACANCIES[0].asking}, endcap with strong foot traffic and no competing {(p.industry||"").toLowerCase()} tenant in the center.</p>
                <p style={{ margin:"0 0 10px" }}>Would love to show you the space — happy to work around your schedule.</p>
                <p style={{ margin:0 }}>Best,<br />Lisa Ramirez<br />Leasing Director | MMG Equity Partners<br />(305) 555-0182</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── ROOT COMPONENT ─────────────────────────────────────────────────────────

export default function TenantProspecting() {
  const [tab, setTab]                         = useState("Dashboard");
  const [selectedVacancy, setSelectedVacancy] = useState(ACTIVE_VACANCIES[0]);
  const [selectedProspect, setSelectedProspect] = useState(TOP_PROSPECTS[0]);
  const [prospects, setProspects]             = useState(TOP_PROSPECTS);

  const handleMark = (p, fit) => {
    setProspects(prev => prev.map(x => x.name===p.name ? {...x, fit} : x));
    if (selectedProspect && selectedProspect.name===p.name) setSelectedProspect(prev => ({...prev, fit}));
  };

  const handleSelectProspect = p => {
    const fresh = prospects.find(x => x.name===p.name) || p;
    setSelectedProspect(fresh);
    setTab("Prospect Detail");
  };

  const handleSelectVacancy = v => {
    setSelectedVacancy(v);
    setTab("Vacancy Detail");
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ background:"white", borderBottom:"1px solid #e5e7eb", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ display:"flex", gap:4 }}>
          {["Dashboard","Vacancy Detail","Prospect Detail"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding:"12px 20px", fontSize:13, fontWeight:500, border:"none", borderBottom:tab===t?"2px solid #059669":"2px solid transparent", color:tab===t?"#059669":"#6b7280", background:"none", cursor:"pointer" }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, paddingBottom:4 }}>
          <div style={{ width:24, height:24, background:"#059669", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:11, fontWeight:700 }}>LR</div>
          <span style={{ fontSize:12, fontWeight:500, color:"#374151" }}>Lisa R.</span>
        </div>
      </div>

      <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        {tab==="Dashboard"      && <ProspectingDashboard prospects={prospects} setProspects={setProspects} onSelectVacancy={handleSelectVacancy} onSelectProspect={handleSelectProspect} />}
        {tab==="Vacancy Detail" && <VacancyDetail vacancy={selectedVacancy} prospects={prospects} setProspects={setProspects} onSelectProspect={handleSelectProspect} />}
        {tab==="Prospect Detail"&& <ProspectDetail prospect={selectedProspect} onMark={handleMark} onSwitch={handleSelectProspect} allProspects={prospects} />}
      </div>
    </div>
  );
}
