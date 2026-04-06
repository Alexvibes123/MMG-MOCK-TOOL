import { useState } from "react";
import { OUTREACH_ITEMS, KANBAN_CARDS, WEEKLY_REPORT_DATA } from "../data";
import { Badge, ScoreBadge, SourceBadge } from "../shared";

// ── OUTREACH CENTER ────────────────────────────────────────────────────────

function OutreachCenter() {
  const [filter, setFilter]       = useState("All");
  const [expanded, setExpanded]   = useState(null);
  const [sent, setSent]           = useState([]);
  const [aiAction, setAiAction]   = useState(null);
  const [aiResult, setAiResult]   = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const filterTabs = [
    { label:"All",     count:OUTREACH_ITEMS.length },
    { label:"Draft",   count:OUTREACH_ITEMS.filter(i=>i.status==="Draft").length },
    { label:"Sent",    count:OUTREACH_ITEMS.filter(i=>i.status==="Sent").length },
    { label:"Replied", count:OUTREACH_ITEMS.filter(i=>i.status==="Replied"||i.status==="Tour Scheduled").length },
  ];

  const filtered =
    filter==="All"     ? OUTREACH_ITEMS :
    filter==="Replied" ? OUTREACH_ITEMS.filter(i=>i.status==="Replied"||i.status==="Tour Scheduled") :
    OUTREACH_ITEMS.filter(i=>i.status===filter);

  const aiOutreachActions = [
    { label:"Draft All Pending",     color:"#059669" },
    { label:"Flag Urgent Follow-Ups",color:"#dc2626" },
    { label:"Generate Sequence",     color:"#2E75B6" },
    { label:"Analyze Response Rate", color:"#7c3aed" },
  ];

  const aiResponses = {
    "Draft All Pending":     "Drafted 4 emails using your AI Settings:\n\n1. Coastal Coffee Co. — Referenced their Wynwood hiring posts and 70-day lease window.\n2. BurgerFi — Led with their 3 new FL leases in 2025 as proof of momentum.\n3. Pollo Tropical — Cited Hialeah proximity and Colonial center demographics.\n4. European Wax Center — Referenced their 5-location expansion and Pinecrest suite.\n\nAll 4 drafts include your signature and are ready to review.",
    "Flag Urgent Follow-Ups":"2 emails flagged for urgent follow-up:\n\n1. Orangetheory Fitness — Sent Mar 24, opened 3 times, no reply. 10 days with no response. Suggested: send a second-touch referencing their Kendall expansion plans.\n\n2. Heartland Dental — Sent Mar 20, opened once, no reply. 15 days elapsed. Medical tenants respond better to phone outreach.",
    "Generate Sequence":     "3-Touch Sequence — Non-Responders:\n\nTouch 1 (Sent): Initial outreach — space opportunity + growth angle.\nTouch 2 (Day 7): Follow-up referencing a specific signal (hiring, new lease, press). Keep under 75 words.\nTouch 3 (Day 14): Value add — send a 1-page property brief or market snapshot.\n\nSequence drafted for Orangetheory, Heartland Dental, and European Wax Center.",
    "Analyze Response Rate": "This Week's Outreach Analysis:\n\nResponse rate: 33% (4/12 replied). Benchmark for CRE tenant outreach: 18-25% — you are above average.\n\nWhat's working: Emails referencing the tenant's current lease timing convert at 2x the rate of generic space descriptions.\n\nBest send window: Tuesday-Thursday, 10am-2pm.\n\nRecommendation: Prioritize OM Library leads — responding at 40% vs 22% for Market Scan leads.",
  };

  const handleAI = label => {
    setAiAction(label); setAiLoading(true); setAiResult("");
    setTimeout(() => { setAiLoading(false); setAiResult(aiResponses[label]||"AI analysis complete."); }, 1300);
  };

  const statusMap = {
    "Draft":         { c:"#6b7280", bg:"#f3f4f6" },
    "Sent":          { c:"#2E75B6", bg:"#dbeafe" },
    "Replied":       { c:"#059669", bg:"#d1fae5" },
    "Tour Scheduled":{ c:"#7c3aed", bg:"#ede9fe" },
  };

  return (
    <div style={{ flex:1, overflowY:"auto", padding:24, background:"#f8fafc" }}>
      {/* AI Outreach Engine */}
      <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", marginBottom:20, overflow:"hidden" }}>
        <div style={{ padding:"12px 20px", borderBottom:"1px solid #f3f4f6", background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:24, height:24, borderRadius:"50%", background:"#059669", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"white", fontSize:11, fontWeight:700 }}>AI</span>
            </div>
            <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>AI Outreach Engine</p>
            <span style={{ fontSize:11, background:"#d1fae5", color:"#059669", border:"1px solid #a7f3d0", padding:"2px 8px", borderRadius:10, fontWeight:600 }}>Active</span>
          </div>
          <span style={{ fontSize:12, color:"#9ca3af" }}>Signature: Lisa Ramirez | MMG Equity Partners</span>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:"1px solid #f3f4f6" }}>
          {[
            { label:"Auto-Draft",      desc:"Drafts personalized emails for new prospects" },
            { label:"Signal Matching", desc:"Matches outreach angle to each tenant's growth signals" },
            { label:"Follow-Up Timing",desc:"Flags emails with no reply after 5 days" },
            { label:"HubSpot Sync",    desc:"Pushes sends and stage changes to HubSpot" },
          ].map((item, i) => (
            <div key={item.label} style={{ padding:"12px 16px", borderRight:i<3?"1px solid #f3f4f6":"none" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:"#10b981" }} />
                <p style={{ fontSize:12, fontWeight:700, color:"#111827", margin:0 }}>{item.label}</p>
              </div>
              <p style={{ fontSize:11, color:"#9ca3af", margin:0, lineHeight:1.4 }}>{item.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ padding:"12px 20px" }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:aiResult?12:0 }}>
            {aiOutreachActions.map(a => {
              const isActive = aiAction===a.label;
              return (
                <button key={a.label} onClick={() => handleAI(a.label)}
                  style={{ fontSize:12, padding:"6px 12px", borderRadius:8, border:"1px solid", borderColor:isActive?a.color:"#e5e7eb", background:isActive&&aiResult?a.color+"14":"#f9fafb", color:isActive?a.color:"#374151", cursor:"pointer", fontWeight:600 }}>
                  {aiLoading&&aiAction===a.label ? "Running..." : a.label}
                </button>
              );
            })}
          </div>
          {aiResult && (
            <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:8, padding:12 }}>
              <p style={{ fontSize:12, fontWeight:700, color:"#059669", margin:"0 0 6px" }}>{aiAction}</p>
              <p style={{ fontSize:12, color:"#14532d", margin:0, lineHeight:1.5, whiteSpace:"pre-line" }}>{aiResult}</p>
              <div style={{ display:"flex", gap:8, marginTop:10 }}>
                {["Apply Changes","Save to SharePoint","Dismiss"].map(b => (
                  <button key={b} onClick={() => b==="Dismiss"&&(setAiResult(""),setAiAction(null))}
                    style={{ fontSize:12, border:"1px solid #bbf7d0", color:"#059669", background:"white", padding:"4px 10px", borderRadius:6, cursor:"pointer", fontWeight:500 }}>{b}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:20 }}>
        {filterTabs.map(t => (
          <button key={t.label} onClick={() => setFilter(t.label)}
            style={{ fontSize:12, padding:"6px 16px", borderRadius:20, border:"1px solid", borderColor:filter===t.label?"#059669":"#e5e7eb", background:filter===t.label?"#059669":"white", color:filter===t.label?"white":"#6b7280", fontWeight:600, cursor:"pointer" }}>
            {t.label} ({t.count})
          </button>
        ))}
        <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:12, color:"#9ca3af" }}>Response rate this week:</span>
          <span style={{ fontSize:14, fontWeight:700, color:"#059669" }}>33%</span>
        </div>
      </div>

      {/* Outreach list */}
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {filtered.map((item, i) => {
          const isExp    = expanded===item.name;
          const isSent   = sent.includes(item.name);
          const ss       = statusMap[isSent?"Sent":item.status]||{ c:"#6b7280", bg:"#f3f4f6" };
          return (
            <div key={i} style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
              <div style={{ padding:"14px 20px", display:"flex", alignItems:"center", gap:16 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                    <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>{item.name}</p>
                    <ScoreBadge score={item.score} />
                    <SourceBadge source={item.source} />
                    <Badge label={isSent?"Sent":item.status} color={ss.c} bg={ss.bg} />
                    {item.opened && <span style={{ fontSize:11, color:"#d97706", fontWeight:600 }}>Opened</span>}
                    {item.replied && <span style={{ fontSize:11, color:"#059669", fontWeight:600 }}>Replied</span>}
                  </div>
                  <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>{item.vacancy} · "{item.subject}"</p>
                  {item.date && <p style={{ fontSize:11, color:"#9ca3af", margin:"2px 0 0" }}>Sent {item.date}</p>}
                  <p style={{ fontSize:11, color:"#2E75B6", margin:"4px 0 0" }}>
                    {item.source==="OM Library" ? "AI signal: lease expiring soon — timing window is open" : "AI signal: expansion activity detected in target market"}
                  </p>
                </div>
                <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                  {item.status==="Draft" && !isSent ? (
                    <>
                      <button onClick={() => setExpanded(isExp?null:item.name)} style={{ fontSize:12, border:"1px solid #e5e7eb", color:"#374151", padding:"6px 10px", borderRadius:6, background:"white", cursor:"pointer" }}>{isExp?"Hide":"Preview"}</button>
                      <button style={{ fontSize:12, border:"1px solid #e5e7eb", color:"#374151", padding:"6px 10px", borderRadius:6, background:"white", cursor:"pointer" }}>Edit</button>
                      <button onClick={() => setSent(s=>[...s,item.name])} style={{ fontSize:12, background:"#059669", color:"white", padding:"6px 12px", borderRadius:6, border:"none", cursor:"pointer", fontWeight:600 }}>Send</button>
                    </>
                  ) : (
                    <>
                      <button style={{ fontSize:12, border:"1px solid #e5e7eb", color:"#374151", padding:"6px 10px", borderRadius:6, background:"white", cursor:"pointer" }}>AI Follow Up</button>
                      <button style={{ fontSize:12, border:"1px solid #e5e7eb", color:"#374151", padding:"6px 10px", borderRadius:6, background:"white", cursor:"pointer" }}>Schedule Tour</button>
                    </>
                  )}
                </div>
              </div>
              {isExp && (
                <div style={{ borderTop:"1px solid #f3f4f6", padding:"16px 20px", background:"#f8fafc" }}>
                  <p style={{ fontSize:12, fontWeight:600, color:"#9ca3af", margin:"0 0 8px" }}>Subject: <span style={{ color:"#374151", fontWeight:500 }}>{item.subject}</span></p>
                  <div style={{ background:"white", border:"1px solid #e5e7eb", borderRadius:8, padding:16, fontSize:13, color:"#374151", lineHeight:1.6 }}>
                    <p style={{ margin:"0 0 10px" }}>Hi [First Name],</p>
                    <p style={{ margin:"0 0 10px" }}>I noticed {item.name} has been growing across South Florida. With your current lease timing in mind, I wanted to reach out about {item.vacancy} — well positioned for your customer demographic with no competing tenant in the center.</p>
                    <p style={{ margin:"0 0 10px" }}>Would love to show you the space when you have 20 minutes.</p>
                    <p style={{ margin:0 }}>Best,<br />Lisa Ramirez<br />Leasing Director | MMG Equity Partners<br />(305) 555-0182 | l.ramirez@mmgequity.com</p>
                  </div>
                  <p style={{ fontSize:11, color:"#2E75B6", margin:"8px 0 0" }}>AI drafted using: warm tone · goal: schedule tour · signature from AI Settings</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── PIPELINE BOARD ─────────────────────────────────────────────────────────

function PipelineBoard() {
  const [cards, setCards]           = useState(KANBAN_CARDS);
  const [filterSource, setFilterSource] = useState("All");
  const [dragging, setDragging]     = useState(null);
  const [dragOver, setDragOver]     = useState(null);
  const [aiAction, setAiAction]     = useState(null);
  const [aiResult, setAiResult]     = useState("");
  const [aiLoading, setAiLoading]   = useState(false);

  const stages      = ["Identified","Contacted","Responded","Tour Scheduled","LOI Sent","Lease Signed"];
  const stageColors = ["#6b7280","#2E75B6","#059669","#7c3aed","#ea580c","#16a34a"];
  const filtered    = filterSource==="All" ? cards : cards.filter(c=>c.source===filterSource);

  const aiPipelineActions = [
    { label:"Identify Stalled Deals",  color:"#dc2626" },
    { label:"Recommend Next Actions",  color:"#2E75B6" },
    { label:"Advance Ready Prospects", color:"#059669" },
    { label:"Pipeline Health Report",  color:"#7c3aed" },
  ];

  const aiResponses = {
    "Identify Stalled Deals":  "3 prospects flagged as stalled:\n\n1. Orangetheory Fitness — 8 days in Contacted, email opened 3x but no reply. Recommended: call directly.\n2. Kumon Learning — 9 days in Responded, no tour scheduled. Recommended: send calendar link.\n3. Mathnasium — 7 days in Responded with no movement. Recommended: re-engage with updated property brief.",
    "Recommend Next Actions":  "AI-recommended next steps:\n\nContacted: Send personalized follow-up for Orangetheory. Phone call recommended for Stretch Zone.\n\nResponded: Jersey Mike's replied positively — schedule tour this week. Kumon and Mathnasium need calendar links sent.\n\nTour Scheduled: Clean Juice tour is Mar 28 — send property brief today.",
    "Advance Ready Prospects": "2 prospects are ready to advance:\n\n1. Jersey Mike's (Responded → Tour Scheduled): Replied positively. Action: send calendar invite this week.\n\n2. Clean Juice (Tour Scheduled → LOI Sent): Tour confirmed Mar 28. Pre-draft LOI so it's ready same day.",
    "Pipeline Health Report":  "Pipeline Health Summary:\n\nTotal prospects: 14 | Avg score: 76\n\nStrengths: Strong top-of-funnel (7 in Identified/Contacted). One deal in LOI stage (Wingstop) — close to conversion.\n\nRisks: 3 stalled deals in Responded. Pipeline weighted toward early stages.\n\nForecast: 2-3 leases expected to close in Q2 2026.",
  };

  const handleAI = label => {
    setAiAction(label); setAiLoading(true); setAiResult("");
    setTimeout(() => { setAiLoading(false); setAiResult(aiResponses[label]||"Analysis complete."); }, 1200);
  };

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", background:"#f8fafc" }}>
      {/* AI toolbar */}
      <div style={{ background:"white", borderBottom:"1px solid #e5e7eb", padding:"10px 24px", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:aiResult?10:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:24, height:24, borderRadius:"50%", background:"#059669", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"white", fontSize:11, fontWeight:700 }}>AI</span>
            </div>
            <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>AI Pipeline Intelligence</p>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {aiPipelineActions.map(a => {
              const isActive = aiAction===a.label;
              return (
                <button key={a.label} onClick={() => handleAI(a.label)}
                  style={{ fontSize:12, padding:"5px 10px", borderRadius:6, border:"1px solid", borderColor:isActive?a.color:"#e5e7eb", background:isActive&&aiResult?a.color+"14":"#f9fafb", color:isActive?a.color:"#374151", cursor:"pointer", fontWeight:500 }}>
                  {aiLoading&&aiAction===a.label?"...":a.label}
                </button>
              );
            })}
          </div>
          <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:12, color:"#9ca3af" }}>Source:</span>
            {["All","OM Library","Market Scan"].map(s => (
              <button key={s} onClick={() => setFilterSource(s)}
                style={{ fontSize:11, padding:"4px 10px", borderRadius:10, border:"1px solid", borderColor:filterSource===s?"#059669":"#e5e7eb", background:filterSource===s?"#059669":"white", color:filterSource===s?"white":"#6b7280", fontWeight:600, cursor:"pointer" }}>
                {s}
              </button>
            ))}
          </div>
        </div>
        {aiResult && (
          <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:8, padding:10 }}>
            <p style={{ fontSize:12, fontWeight:700, color:"#059669", margin:"0 0 4px" }}>{aiAction}</p>
            <p style={{ fontSize:12, color:"#14532d", margin:0, lineHeight:1.5, whiteSpace:"pre-line" }}>{aiResult}</p>
            <button onClick={() => { setAiResult(""); setAiAction(null); }} style={{ fontSize:11, color:"#059669", background:"none", border:"none", cursor:"pointer", marginTop:6 }}>Dismiss</button>
          </div>
        )}
      </div>

      {/* Kanban */}
      <div style={{ flex:1, overflowX:"auto", overflowY:"hidden", padding:16 }}>
        <div style={{ display:"flex", gap:12, height:"100%", minWidth:stages.length*200 }}>
          {stages.map((stage, si) => {
            const stageCards = filtered.filter(c=>c.stage===si);
            return (
              <div key={si}
                style={{ width:200, minWidth:200, display:"flex", flexDirection:"column", borderRadius:10, border:"1px solid #e5e7eb", overflow:"hidden", background:dragOver===si?stageColors[si]+"08":"#f0f2f5" }}
                onDragOver={e => { e.preventDefault(); setDragOver(si); }}
                onDrop={() => {
                  if (dragging) setCards(p=>p.map(c=>c.name===dragging.name?{...c,stage:si}:c));
                  setDragging(null); setDragOver(null);
                }}>
                <div style={{ padding:"10px 12px", borderBottom:"2px solid "+stageColors[si]+"44", background:stageColors[si]+"18", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <p style={{ fontSize:12, fontWeight:700, color:stageColors[si], margin:0 }}>{stage}</p>
                  <span style={{ fontSize:11, fontWeight:700, padding:"1px 6px", borderRadius:8, background:stageColors[si]+"22", color:stageColors[si] }}>{stageCards.length}</span>
                </div>
                <div style={{ flex:1, overflowY:"auto", padding:8, display:"flex", flexDirection:"column", gap:8 }}>
                  {stageCards.map(card => {
                    const isStalled = card.days>7 && card.stage<3;
                    const scoreColor = card.score>=80?"#059669":card.score>=60?"#d97706":"#9ca3af";
                    return (
                      <div key={card.name} draggable
                        onDragStart={() => setDragging(card)}
                        onDragEnd={() => { setDragging(null); setDragOver(null); }}
                        style={{ background:"white", borderRadius:8, border:"1px solid "+(isStalled?"#fca5a5":"#e5e7eb"), padding:10, cursor:"grab", boxShadow:dragging&&dragging.name===card.name?"0 4px 12px rgba(0,0,0,0.15)":"none" }}>
                        <p style={{ fontSize:12, fontWeight:700, color:"#111827", margin:"0 0 2px" }}>{card.name}</p>
                        <p style={{ fontSize:11, color:"#6b7280", margin:"0 0 8px" }}>{card.property}</p>
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:4 }}>
                          <span style={{ fontSize:11, fontWeight:700, padding:"2px 6px", borderRadius:8, background:scoreColor+"18", color:scoreColor }}>{card.score}</span>
                          <span style={{ fontSize:10, padding:"2px 6px", borderRadius:8, color:card.source==="OM Library"?"#7c3aed":"#2E75B6", background:card.source==="OM Library"?"#ede9fe":"#dbeafe", fontWeight:600 }}>{card.source==="OM Library"?"OM":"Scan"}</span>
                        </div>
                        <p style={{ fontSize:11, color:isStalled?"#dc2626":"#9ca3af", margin:"0 0 6px" }}>{card.days}d{isStalled?" · stalled":""}</p>
                        <div style={{ borderTop:"1px solid #f9fafb", paddingTop:6 }}>
                          <p style={{ fontSize:11, color:"#2E75B6", margin:0, lineHeight:1.3 }}>
                            {si===0?"AI: Draft outreach":
                             si===1&&isStalled?`AI: Follow up — no reply in ${card.days}d`:
                             si===1?"AI: Monitor for reply":
                             si===2?"AI: Schedule tour now":
                             si===3?"AI: Send property brief":
                             si===4?"AI: Follow up on LOI":
                             "AI: Prepare lease docs"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {stageCards.length===0 && (
                    <div style={{ height:60, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <p style={{ fontSize:11, color:"#d1d5db", margin:0 }}>Drop here</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── WEEKLY REPORT ──────────────────────────────────────────────────────────

function WeeklyReport() {
  const d = WEEKLY_REPORT_DATA;
  return (
    <div style={{ flex:1, overflowY:"auto", padding:24, background:"#f8fafc" }}>
      <div style={{ maxWidth:760, margin:"0 auto", background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
        {/* Header */}
        <div style={{ padding:"20px 24px", borderBottom:"1px solid #f3f4f6", background:"#f8fafc", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
          <div>
            <p style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1, margin:"0 0 4px" }}>Weekly Prospecting Report</p>
            <p style={{ fontSize:20, fontWeight:700, color:"#111827", margin:"0 0 2px" }}>Week of March 23, 2026</p>
            <p style={{ fontSize:12, color:"#9ca3af", margin:0 }}>Generated automatically every Monday · Saved to SharePoint</p>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button style={{ fontSize:12, border:"1px solid #e5e7eb", color:"#374151", padding:"6px 12px", borderRadius:6, background:"white", cursor:"pointer" }}>Download PDF</button>
            <button style={{ fontSize:12, background:"#059669", color:"white", padding:"6px 12px", borderRadius:6, border:"none", cursor:"pointer", fontWeight:600 }}>Email to Team</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", borderBottom:"1px solid #f3f4f6" }}>
          {[{l:"New Prospects",v:d.newProspects,c:"#2E75B6"},{l:"Outreach Sent",v:d.outreachSent,c:"#059669"},{l:"Response Rate",v:d.responseRate+"%",c:"#7c3aed"},{l:"Tours Booked",v:d.toursBooked,c:"#ea580c"}].map(s => (
            <div key={s.l} style={{ padding:"16px 20px", textAlign:"center", borderRight:"1px solid #f3f4f6" }}>
              <p style={{ fontSize:12, color:"#9ca3af", margin:"0 0 4px" }}>{s.l}</p>
              <p style={{ fontSize:22, fontWeight:700, color:s.c, margin:0 }}>{s.v}</p>
            </div>
          ))}
        </div>

        {/* By Vacancy */}
        <div style={{ padding:"20px 24px", borderBottom:"1px solid #f3f4f6" }}>
          <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:"0 0 12px" }}>By Vacancy</p>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
            <thead>
              <tr style={{ background:"#f8fafc" }}>
                {["Vacancy","New Prospects","Outreach Sent","Responses","Tours"].map(h => (
                  <th key={h} style={{ padding:"8px 12px", textAlign:"left", fontWeight:600, color:"#6b7280", borderBottom:"1px solid #f3f4f6" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.byVacancy.map((row, i) => (
                <tr key={i} style={{ borderBottom:"1px solid #f9fafb" }}>
                  <td style={{ padding:"10px 12px", fontWeight:500, color:"#111827" }}>{row.vacancy}</td>
                  <td style={{ padding:"10px 12px", color:"#374151" }}>{row.newP}</td>
                  <td style={{ padding:"10px 12px", color:"#374151" }}>{row.sent}</td>
                  <td style={{ padding:"10px 12px", color:"#374151" }}>{row.responses}</td>
                  <td style={{ padding:"10px 12px", fontWeight:600, color:"#059669" }}>{row.tours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* By Lead Source */}
        <div style={{ padding:"20px 24px", borderBottom:"1px solid #f3f4f6" }}>
          <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:"0 0 12px" }}>By Lead Source</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {[
              { src:"OM Library",   c:"#7c3aed", bg:"#ede9fe", rate:d.omRate,   leads:5, contacted:3, responded:2 },
              { src:"Market Scan",  c:"#2E75B6", bg:"#dbeafe", rate:d.scanRate, leads:7, contacted:9, responded:2 },
            ].map(s => (
              <div key={s.src} style={{ border:"1px solid "+s.c+"33", borderRadius:8, padding:14, background:s.bg }}>
                <p style={{ fontSize:13, fontWeight:700, color:s.c, margin:"0 0 8px" }}>{s.src}</p>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:8 }}>
                  {[["Leads",s.leads],["Contacted",s.contacted],["Responded",s.responded]].map(([k,v]) => (
                    <div key={k}><p style={{ fontSize:11, color:"#6b7280", margin:0 }}>{k}</p><p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>{v}</p></div>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ flex:1, height:5, background:"white", borderRadius:3, overflow:"hidden" }}>
                    <div style={{ height:"100%", background:s.c, width:s.rate+"%" }} />
                  </div>
                  <span style={{ fontSize:11, fontWeight:700, color:s.c }}>{s.rate}%</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:10, padding:"8px 12px", background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:6 }}>
            <p style={{ fontSize:12, color:"#166534", fontWeight:500, margin:0 }}>OM Library leads converting at nearly 2x the rate of Market Scan leads this week.</p>
          </div>
        </div>

        {/* Top Performers */}
        <div style={{ padding:"20px 24px", borderBottom:"1px solid #f3f4f6" }}>
          <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:"0 0 12px" }}>Top Performers</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {d.topPerformers.map((p, i) => (
              <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, background:"#f8fafc", borderRadius:8, padding:"10px 12px" }}>
                <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:10, background:p.score>=80?"#d1fae5":"#fef3c7", color:p.score>=80?"#059669":"#d97706", flexShrink:0 }}>{p.score}</span>
                <div>
                  <p style={{ fontSize:12, fontWeight:700, color:"#111827", margin:0 }}>{p.name}</p>
                  <p style={{ fontSize:11, color:"#6b7280", margin:"2px 0 0" }}>{p.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommended Actions */}
        <div style={{ padding:"20px 24px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <div style={{ width:22, height:22, borderRadius:"50%", background:"#059669", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ color:"white", fontSize:10, fontWeight:700 }}>AI</span>
            </div>
            <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>AI Recommended Actions</p>
          </div>
          {d.aiActions.map((action, i) => (
            <div key={i} style={{ display:"flex", gap:10, marginBottom:10, padding:"10px 14px", background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8 }}>
              <span style={{ fontSize:12, fontWeight:700, color:"#2E75B6", flexShrink:0 }}>{i+1}.</span>
              <p style={{ fontSize:12, color:"#1e3a8a", margin:0, lineHeight:1.5 }}>{action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ROOT COMPONENT ─────────────────────────────────────────────────────────

export default function OutreachPipeline() {
  const [tab, setTab] = useState("Outreach");

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ background:"white", borderBottom:"1px solid #e5e7eb", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ display:"flex", gap:4 }}>
          {["Outreach","Pipeline","Weekly Report"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding:"12px 20px", fontSize:13, fontWeight:500, border:"none", borderBottom:tab===t?"2px solid #059669":"2px solid transparent", color:tab===t?"#059669":"#6b7280", background:"none", cursor:"pointer" }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6, paddingBottom:4 }}>
          <div style={{ width:24, height:24, background:"#059669", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:11, fontWeight:700 }}>LR</div>
          <span style={{ fontSize:12, fontWeight:500, color:"#374151" }}>Lisa R.</span>
          <span style={{ fontSize:12, color:"#9ca3af" }}>· HubSpot Connected</span>
        </div>
      </div>
      <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        {tab==="Outreach"      && <OutreachCenter />}
        {tab==="Pipeline"      && <PipelineBoard />}
        {tab==="Weekly Report" && <WeeklyReport />}
      </div>
    </div>
  );
}
