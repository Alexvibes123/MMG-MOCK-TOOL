import { useState } from "react";
import {
  RECENT_INGESTED, NEEDS_REVIEW, UPCOMING_EXP, LIBRARY_ROWS,
  MAP_DOTS, DOT_COLOR, INGESTION_QUEUE, EXTRACTED_FIELDS, EXTRACTED_TENANTS,
  EXPIRING_TENANTS, MMG_AT_RISK,
} from "../data";
import { Badge, ConfDot, ScoreBadge } from "../shared";

// ── OM DASHBOARD ───────────────────────────────────────────────────────────

function OmDashboard() {
  const [confirmed, setConfirmed] = useState([]);
  const [editing, setEditing]     = useState(null);
  const [editVals, setEditVals]   = useState({});
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState([]);

  const colorMap = {
    alert:   { bg:"#fff7ed", border:"#fed7aa", text:"#c2410c", label:"#ea580c" },
    insight: { bg:"#eff6ff", border:"#bfdbfe", text:"#1e40af", label:"#2E75B6" },
    action:  { bg:"#f0fdf4", border:"#bbf7d0", text:"#15803d", label:"#16a34a" },
  };

  const runAI = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiLoading(false);
      setAiInsights([
        { type:"alert",   text:"3 OMs ingested this week have cap rates below 6.0% — below MMG's typical acquisition threshold. Flag for IC review before pursuing." },
        { type:"insight", text:"Aventura Mixed Use at $22.3M is the largest deal this month. Mixed-use assets in Aventura have sold at a median 5.6% cap — current ask of 5.8% is near-market." },
        { type:"action",  text:"5 leases expire within 90 days across the portfolio. Recommend initiating renewal outreach for Kumon Learning and Amscot Financial this week." },
        { type:"insight", text:"Kendall Fresh Plaza returned to market at $14.1M — a 12.9% reduction from prior ask. Now within MMG underwritten range. Recommend re-evaluating." },
      ]);
    }, 1400);
  };

  return (
    <div style={{ flex:1, overflowY:"auto", padding:24, background:"#f8fafc" }}>
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:20 }}>
        {[{label:"Total Properties",val:"127",sub:"+8 this month",subColor:"#059669"},{label:"OMs This Month",val:"18",sub:"5 pending review",subColor:"#6b7280"},{label:"Active Pursuits",val:"4",sub:"2 in LOI stage",subColor:"#6b7280"},{label:"Passed",val:"14",sub:"This month",subColor:"#6b7280"}].map(s => (
          <div key={s.label} style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", padding:16 }}>
            <p style={{ fontSize:12, color:"#6b7280", margin:"0 0 4px" }}>{s.label}</p>
            <p style={{ fontSize:24, fontWeight:700, color:"#111827", margin:"0 0 4px" }}>{s.val}</p>
            <p style={{ fontSize:12, color:s.subColor, margin:0 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* AI Intelligence */}
      <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", marginBottom:20 }}>
        <div style={{ padding:"12px 20px", borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>AI Portfolio Intelligence</p>
            <p style={{ fontSize:12, color:"#9ca3af", margin:"2px 0 0" }}>Automated analysis of ingested OMs, expiration risk, and market signals</p>
          </div>
          <button onClick={runAI} style={{ fontSize:12, padding:"6px 14px", borderRadius:6, border:"1px solid #bfdbfe", background:"#eff6ff", color:"#2E75B6", fontWeight:600, cursor:"pointer" }}>
            {aiLoading ? "Analyzing..." : aiInsights.length ? "Refresh Analysis" : "Run AI Analysis"}
          </button>
        </div>
        <div style={{ padding:20 }}>
          {!aiInsights.length && !aiLoading && <p style={{ fontSize:13, color:"#9ca3af", textAlign:"center", margin:0 }}>Click Run AI Analysis to generate portfolio-wide insights.</p>}
          {aiLoading && <p style={{ fontSize:13, color:"#2E75B6", textAlign:"center", margin:0 }}>Analyzing 18 OMs and portfolio data...</p>}
          {aiInsights.length > 0 && !aiLoading && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {aiInsights.map((ins, i) => {
                const c = colorMap[ins.type];
                return (
                  <div key={i} style={{ borderRadius:8, border:"1px solid "+c.border, padding:12, background:c.bg }}>
                    <p style={{ fontSize:11, fontWeight:700, color:c.label, textTransform:"uppercase", letterSpacing:1, margin:"0 0 6px" }}>{ins.type}</p>
                    <p style={{ fontSize:12, color:c.text, margin:0, lineHeight:1.5 }}>{ins.text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recently Ingested */}
      <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", marginBottom:20, overflow:"hidden" }}>
        <div style={{ padding:"12px 20px", borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>Recently Ingested</p>
          <button style={{ fontSize:12, color:"#2E75B6", background:"none", border:"none", cursor:"pointer" }}>View all</button>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr style={{ background:"#f8fafc" }}>
              {["Property","Type","City","Price","Cap Rate","Status","Date"].map(h => (
                <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:600, color:"#6b7280", borderBottom:"1px solid #f3f4f6" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_INGESTED.map((r, i) => (
              <tr key={i} style={{ borderBottom:"1px solid #f9fafb", cursor:"pointer" }}>
                <td style={{ padding:"12px 16px", fontWeight:500, color:"#111827" }}>{r.name}</td>
                <td style={{ padding:"12px 16px" }}><Badge label={r.type} color={r.typeColor} bg={r.typeColor+"18"} /></td>
                <td style={{ padding:"12px 16px", color:"#6b7280" }}>{r.city}</td>
                <td style={{ padding:"12px 16px", fontWeight:500, color:"#111827" }}>{r.price}</td>
                <td style={{ padding:"12px 16px", color:"#374151" }}>{r.cap}</td>
                <td style={{ padding:"12px 16px" }}><Badge label={r.status} color={r.statusColor} bg={r.statusBg} /></td>
                <td style={{ padding:"12px 16px", fontSize:12, color:"#9ca3af" }}>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom grid */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* Needs Review */}
        <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb" }}>
          <div style={{ padding:"12px 20px", borderBottom:"1px solid #f3f4f6" }}>
            <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>Needs Review</p>
            <p style={{ fontSize:12, color:"#9ca3af", margin:"2px 0 0" }}>Low-confidence AI extractions requiring confirmation</p>
          </div>
          {NEEDS_REVIEW.map((n, i) => {
            const isConf = confirmed.includes(i);
            const isEdit = editing === i;
            return (
              <div key={i} style={{ padding:"12px 20px", borderBottom:"1px solid #f9fafb", background:isConf?"#f0fdf4":"white" }}>
                {isEdit ? (
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:12, fontWeight:500, color:"#374151", margin:"0 0 4px" }}>{n.name} — {n.field}</p>
                      <input
                        value={editVals[i] || n.value}
                        onChange={e => { const v=e.target.value; setEditVals(p=>({...p,[i]:v})); }}
                        style={{ width:"100%", border:"1px solid #bfdbfe", borderRadius:4, padding:"4px 8px", fontSize:12, outline:"none", boxSizing:"border-box" }}
                      />
                    </div>
                    <button onClick={() => { setEditing(null); setConfirmed(c=>[...c,i]); }} style={{ fontSize:12, background:"#2E75B6", color:"white", padding:"6px 10px", borderRadius:4, border:"none", cursor:"pointer" }}>Save</button>
                    <button onClick={() => setEditing(null)} style={{ fontSize:12, color:"#6b7280", background:"none", border:"none", cursor:"pointer" }}>Cancel</button>
                  </div>
                ) : (
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
                    <div style={{ minWidth:0 }}>
                      <p style={{ fontSize:13, fontWeight:500, color:"#111827", margin:0 }}>{n.name}</p>
                      <p style={{ fontSize:12, color:"#6b7280", margin:"2px 0 0" }}>
                        <ConfDot conf={isConf?"high":n.conf} />
                        {n.field} — {editVals[i]||n.value}
                        {isConf && <span style={{ color:"#059669", fontWeight:600, marginLeft:8 }}>Confirmed</span>}
                      </p>
                    </div>
                    {!isConf && (
                      <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                        <button onClick={() => setConfirmed(c=>[...c,i])} style={{ fontSize:11, background:"#f0fdf4", color:"#16a34a", border:"1px solid #bbf7d0", padding:"4px 10px", borderRadius:4, cursor:"pointer" }}>Confirm</button>
                        <button onClick={() => setEditing(i)} style={{ fontSize:11, background:"#f8fafc", color:"#6b7280", border:"1px solid #e5e7eb", padding:"4px 10px", borderRadius:4, cursor:"pointer" }}>Edit</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Upcoming Expirations */}
        <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
          <div style={{ padding:"12px 20px", borderBottom:"1px solid #f3f4f6" }}>
            <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>Upcoming Expirations</p>
            <p style={{ fontSize:12, color:"#9ca3af", margin:"2px 0 0" }}>Leases expiring within 12 months</p>
          </div>
          {UPCOMING_EXP.map((e, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 20px", borderBottom:"1px solid #f9fafb", cursor:"pointer" }}>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:13, fontWeight:600, color:"#111827", margin:0 }}>{e.tenant}</p>
                <p style={{ fontSize:12, color:"#9ca3af", margin:"2px 0 0" }}>{e.property}</p>
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <p style={{ fontSize:12, fontWeight:600, color:"#374151", margin:0 }}>{e.exp}</p>
                <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>{e.sf} SF</p>
              </div>
              <div style={{ flexShrink:0 }}><Badge label={e.type} color={e.typeColor} bg={e.typeBg} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── OM INGESTION ───────────────────────────────────────────────────────────

function OmIngestion() {
  const [selected, setSelected]   = useState(0);
  const [activePass, setActivePass] = useState("Pass 1");
  const sel = INGESTION_QUEUE[selected];

  const statusMeta = {
    complete:   { label:"Complete",     color:"#059669", bg:"#d1fae5" },
    extracting: { label:"Extracting",   color:"#2E75B6", bg:"#dbeafe" },
    review:     { label:"Needs Review", color:"#d97706", bg:"#fef3c7" },
    duplicate:  { label:"Duplicate",    color:"#dc2626", bg:"#fee2e2" },
  };
  const confMeta = {
    high:   { label:"High",   color:"#059669", dot:"#16a34a" },
    medium: { label:"Medium", color:"#d97706", dot:"#d97706" },
    low:    { label:"Low",    color:"#dc2626", dot:"#dc2626" },
    none:   { label:"—",      color:"#9ca3af", dot:"#d1d5db" },
  };

  return (
    <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
      {/* Queue sidebar */}
      <div style={{ width:280, flexShrink:0, background:"white", borderRight:"1px solid #e5e7eb", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"12px 16px", borderBottom:"1px solid #f3f4f6" }}>
          <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>Ingestion Queue</p>
          <p style={{ fontSize:11, color:"#9ca3af", margin:"2px 0 0" }}>SharePoint file watcher · Auto-triggered</p>
        </div>
        <div style={{ padding:"8px 12px", borderBottom:"1px solid #f3f4f6", background:"#f0fdf4" }}>
          <p style={{ fontSize:11, fontWeight:600, color:"#16a34a", margin:0 }}>Watching: /SharePoint/OMs/Incoming/</p>
          <p style={{ fontSize:11, color:"#22c55e", margin:"2px 0 0" }}>Last file detected 14 minutes ago</p>
        </div>
        <div style={{ flex:1, overflowY:"auto" }}>
          {INGESTION_QUEUE.map((f, i) => {
            const sm = statusMeta[f.status];
            return (
              <button key={i} onClick={() => setSelected(i)}
                style={{ width:"100%", textAlign:"left", padding:"12px 16px", borderBottom:"1px solid #f9fafb", background:selected===i?"#eff6ff":"white", border:"none", cursor:"pointer" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:4 }}>
                  <p style={{ fontSize:11, fontWeight:600, color:"#111827", margin:0, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.name}</p>
                  <Badge label={sm.label} color={sm.color} bg={sm.bg} />
                </div>
                <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>{f.type} · {f.city} · {f.date}</p>
                {f.fields && <p style={{ fontSize:11, color:"#6b7280", margin:"2px 0 0" }}>{f.fields} fields · {f.records} tenants</p>}
                {f.dupes && <p style={{ fontSize:11, color:"#ef4444", margin:"2px 0 0" }}>Duplicate detected</p>}
              </button>
            );
          })}
        </div>
        <div style={{ padding:12, borderTop:"1px solid #f3f4f6" }}>
          <button style={{ width:"100%", fontSize:12, background:"#2E75B6", color:"white", padding:"8px 0", borderRadius:8, border:"none", fontWeight:600, cursor:"pointer" }}>+ Upload PDF Manually</button>
        </div>
      </div>

      {/* Detail panel */}
      <div style={{ flex:1, overflowY:"auto", padding:24, background:"#f8fafc" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
          <div>
            <p style={{ fontSize:18, fontWeight:700, color:"#111827", margin:"0 0 6px" }}>{sel.name}</p>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <Badge label={statusMeta[sel.status].label} color={statusMeta[sel.status].color} bg={statusMeta[sel.status].bg} />
              {sel.confidence && <Badge label={"Confidence: "+confMeta[sel.confidence].label} color={confMeta[sel.confidence].color} bg={confMeta[sel.confidence].color+"18"} />}
              <span style={{ fontSize:12, color:"#9ca3af" }}>{sel.city} · {sel.date}</span>
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button style={{ fontSize:12, border:"1px solid #e5e7eb", color:"#374151", padding:"6px 12px", borderRadius:6, background:"white", cursor:"pointer" }}>View Original PDF</button>
            <button style={{ fontSize:12, background:"#2E75B6", color:"white", padding:"6px 12px", borderRadius:6, border:"none", cursor:"pointer" }}>Open Property Record</button>
          </div>
        </div>

        {sel.status==="duplicate" && (
          <div style={{ background:"#fff5f5", border:"1px solid #fca5a5", borderRadius:10, padding:"12px 16px", marginBottom:16 }}>
            <p style={{ fontSize:13, fontWeight:700, color:"#dc2626", margin:"0 0 4px" }}>Duplicate Detected</p>
            <p style={{ fontSize:12, color:"#ef4444", margin:"0 0 10px" }}>Matched to existing record — Aventura Mixed Use (Mar 14, 2026). Quarantined.</p>
            <div style={{ display:"flex", gap:8 }}>
              <button style={{ fontSize:12, background:"#dc2626", color:"white", padding:"6px 12px", borderRadius:6, border:"none", cursor:"pointer" }}>Merge with Existing</button>
              <button style={{ fontSize:12, border:"1px solid #fca5a5", color:"#dc2626", padding:"6px 12px", borderRadius:6, background:"white", cursor:"pointer" }}>Discard</button>
            </div>
          </div>
        )}

        {sel.status==="extracting" && (
          <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:10, padding:"12px 16px", marginBottom:16 }}>
            <p style={{ fontSize:13, fontWeight:700, color:"#2E75B6", margin:"0 0 4px" }}>AI Extraction In Progress</p>
            <p style={{ fontSize:12, color:"#3b82f6", margin:"0 0 8px" }}>Pass 1 complete. Pass 2 running — extracting tenant rows...</p>
            <div style={{ background:"#bfdbfe", borderRadius:4, height:6, overflow:"hidden" }}><div style={{ height:"100%", background:"#2E75B6", width:"60%" }} /></div>
          </div>
        )}

        {sel.status==="review" && (
          <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:10, padding:"12px 16px", marginBottom:16 }}>
            <p style={{ fontSize:13, fontWeight:700, color:"#d97706", margin:"0 0 4px" }}>Needs Human Review</p>
            <p style={{ fontSize:12, color:"#f59e0b", margin:0 }}>2 low-confidence fields. 1 tenant row has conflicting rent figures.</p>
          </div>
        )}

        {sel.status !== "duplicate" && sel.status !== "extracting" && (
          <div>
            {/* Pass tabs */}
            <div style={{ background:"white", border:"1px solid #e5e7eb", borderRadius:12, overflow:"hidden", marginBottom:16 }}>
              <div style={{ display:"flex", borderBottom:"1px solid #f3f4f6" }}>
                {["Pass 1","Pass 2"].map(p => (
                  <button key={p} onClick={() => setActivePass(p)}
                    style={{ flex:1, padding:"10px 0", fontSize:12, fontWeight:700, border:"none", borderBottom:activePass===p?"2px solid #2E75B6":"2px solid transparent", color:activePass===p?"#2E75B6":"#6b7280", background:"white", cursor:"pointer" }}>
                    {p==="Pass 1" ? "Pass 1 — Property Fields (18 extracted)" : `Pass 2 — Rent Roll (${sel.records||0} tenant rows)`}
                  </button>
                ))}
              </div>

              {activePass==="Pass 1" && (
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12, minWidth:600 }}>
                    <thead>
                      <tr style={{ background:"#f8fafc" }}>
                        {["Pass","Field","Extracted Value","Confidence","Flag"].map(h => (
                          <th key={h} style={{ padding:"8px 12px", textAlign:"left", fontWeight:600, color:"#6b7280", borderBottom:"1px solid #f3f4f6" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {EXTRACTED_FIELDS.map((f, i) => {
                        const cm = confMeta[f.conf];
                        return (
                          <tr key={i} style={{ borderBottom:"1px solid #f9fafb", background:f.flag?"#fffbeb":i%2===0?"white":"#f8fafc" }}>
                            <td style={{ padding:"8px 12px", color:"#9ca3af" }}>P{f.pass}</td>
                            <td style={{ padding:"8px 12px", fontWeight:500, color:"#374151" }}>{f.field}</td>
                            <td style={{ padding:"8px 12px", color:"#111827" }}>{f.value}</td>
                            <td style={{ padding:"8px 12px" }}>
                              <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                                <span style={{ width:8, height:8, borderRadius:"50%", background:cm.dot, display:"inline-block" }} />
                                <span style={{ color:cm.color }}>{cm.label}</span>
                              </span>
                            </td>
                            <td style={{ padding:"8px 12px", color:"#d97706", fontSize:11 }}>{f.flag}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {activePass==="Pass 2" && (
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12, minWidth:700 }}>
                    <thead>
                      <tr style={{ background:"#f8fafc" }}>
                        {["Tenant","SF","Rent/SF","Start","Expiry","Use","NAICS","Conf.","Flag"].map(h => (
                          <th key={h} style={{ padding:"8px 12px", textAlign:"left", fontWeight:600, color:"#6b7280", borderBottom:"1px solid #f3f4f6", whiteSpace:"nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {EXTRACTED_TENANTS.map((t, i) => {
                        const cm = confMeta[t.conf] || confMeta["none"];
                        return (
                          <tr key={i} style={{ borderBottom:"1px solid #f9fafb", background:t.flag?"#fffbeb":i%2===0?"white":"#f8fafc" }}>
                            <td style={{ padding:"8px 12px", fontWeight:500, color:"#111827" }}>{t.tenant}</td>
                            <td style={{ padding:"8px 12px", color:"#374151" }}>{t.sf}</td>
                            <td style={{ padding:"8px 12px", color:"#374151" }}>{t.rent}</td>
                            <td style={{ padding:"8px 12px", color:"#6b7280" }}>{t.start}</td>
                            <td style={{ padding:"8px 12px", color:"#374151" }}>{t.exp}</td>
                            <td style={{ padding:"8px 12px", color:"#374151" }}>{t.use}</td>
                            <td style={{ padding:"8px 12px", color:"#9ca3af" }}>{t.naics}</td>
                            <td style={{ padding:"8px 12px" }}>
                              <span style={{ display:"flex", alignItems:"center", gap:6 }}>
                                <span style={{ width:8, height:8, borderRadius:"50%", background:cm.dot, display:"inline-block" }} />
                                <span style={{ color:cm.color }}>{cm.label}</span>
                              </span>
                            </td>
                            <td style={{ padding:"8px 12px", color:"#d97706", fontSize:11 }}>{t.flag}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Sanity checks */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div style={{ background:"white", borderRadius:10, border:"1px solid #e5e7eb", padding:16 }}>
                <p style={{ fontSize:12, fontWeight:700, color:"#374151", margin:"0 0 8px" }}>Auto-Applied Naming Convention</p>
                <div style={{ background:"#f8fafc", border:"1px solid #e5e7eb", borderRadius:6, padding:"8px 12px", fontFamily:"monospace", fontSize:11, color:"#374151", marginBottom:6 }}>/OMs/2026/Q1/Retail-GA/Kendall_Fresh_Plaza_OM_Mar2026.pdf</div>
                <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>Format: Type / Year / Quarter / Subtype / Name_OM_MonYear</p>
              </div>
              <div style={{ background:"white", borderRadius:10, border:"1px solid #e5e7eb", padding:16 }}>
                <p style={{ fontSize:12, fontWeight:700, color:"#374151", margin:"0 0 8px" }}>Sanity Checks</p>
                {[
                  { check:"NOI matches asking price x cap rate",       pass:true  },
                  { check:"Rent roll SF totals match stated GLA",      pass:true  },
                  { check:"All expiration dates are future-dated",     pass:true  },
                  { check:"Amscot rent figure consistent across doc",  pass:false },
                ].map((c, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                    <span style={{ fontSize:12, fontWeight:700, color:c.pass?"#059669":"#dc2626" }}>{c.pass?"+":"!"}</span>
                    <p style={{ fontSize:12, color:c.pass?"#374151":"#dc2626", margin:0, fontWeight:c.pass?400:500 }}>{c.check}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── OM MAP ─────────────────────────────────────────────────────────────────

function OmMap() {
  const [selected, setSelected] = useState(null);
  const [filters, setFilters]   = useState({ retail:true, office:true, medical:true, mixed:true });
  const [search, setSearch]     = useState("");
  const [aiInsight, setAiInsight] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [heatmap, setHeatmap]   = useState(false);
  const [nlQuery, setNlQuery]   = useState("");
  const [nlResult, setNlResult] = useState("");
  const [nlLoading, setNlLoading] = useState(false);

  const filteredList = MAP_DOTS.filter(d => filters[d.type] && d.label.toLowerCase().includes(search.toLowerCase()));
  const sel = selected !== null ? MAP_DOTS[selected] : null;

  const handleAskAI = () => {
    if (!sel) return;
    setAiLoading(true); setAiInsight("");
    setTimeout(() => {
      setAiLoading(false);
      setAiInsight(`${sel.label} shows strong fundamentals for a ${sel.type} asset. Cap rate of 6.4% is in line with Kendall submarket median (6.2-6.8%). Occupancy at 96% is above comparable average of 94.1%. Key risk: 2 inline leases expiring within 9 months (~8% of GLA). Recommend pursuing — underwrite at $9.2M.`);
    }, 1200);
  };

  const handleNlSearch = () => {
    if (!nlQuery.trim()) return;
    setNlLoading(true);
    setTimeout(() => {
      setNlLoading(false);
      setNlResult("Found 4 properties matching your query: Kendall Corners ($9.7M, 6.4% cap, 96% occ, Active Pursuit), Centre at Cutler Bay ($15.4M, 6.0% cap, 95% occ, New), Naranja Plaza ($8.9M, 6.8% cap, 93% occ, Active Pursuit), Meadows Square ($13.8M, 6.1% cap, 97% occ, Passed). Kendall Corners is the strongest current opportunity.");
    }, 1100);
  };

  return (
    <div style={{ display:"flex", height:"100%" }}>
      {/* Sidebar */}
      <div style={{ width:280, flexShrink:0, background:"white", borderRight:"1px solid #e5e7eb", display:"flex", flexDirection:"column" }}>
        <div style={{ padding:"12px 16px", borderBottom:"1px solid #f3f4f6" }}>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:8, padding:"8px 12px", fontSize:13, outline:"none", boxSizing:"border-box" }} placeholder="Search properties..." />
        </div>
        <div style={{ padding:"12px 16px", borderBottom:"1px solid #f3f4f6" }}>
          <p style={{ fontSize:12, fontWeight:600, color:"#6b7280", margin:"0 0 6px" }}>Natural Language Query</p>
          <div style={{ display:"flex", gap:6 }}>
            <input value={nlQuery} onChange={e=>setNlQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleNlSearch()}
              style={{ flex:1, border:"1px solid #e5e7eb", borderRadius:6, padding:"6px 10px", fontSize:12, outline:"none" }} placeholder="e.g. grocery-anchored under $10M" />
            <button onClick={handleNlSearch} style={{ fontSize:12, background:"#2E75B6", color:"white", padding:"6px 12px", borderRadius:6, border:"none", cursor:"pointer", fontWeight:600 }}>{nlLoading?"...":"Ask"}</button>
          </div>
          {nlResult && <div style={{ marginTop:8, background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:6, padding:8 }}><p style={{ fontSize:11, color:"#1e3a8a", margin:0, lineHeight:1.5 }}>{nlResult}</p></div>}
        </div>
        <div style={{ padding:"12px 16px", borderBottom:"1px solid #f3f4f6" }}>
          <p style={{ fontSize:11, fontWeight:600, color:"#6b7280", textTransform:"uppercase", letterSpacing:1, margin:"0 0 8px" }}>Property Type</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
            {["retail","office","medical","mixed"].map(k => (
              <button key={k} onClick={() => setFilters(f=>({...f,[k]:!f[k]}))}
                style={{ fontSize:11, padding:"4px 10px", borderRadius:12, border:"1px solid", borderColor:filters[k]?DOT_COLOR[k]:"#e5e7eb", background:filters[k]?DOT_COLOR[k]+"22":"#f9fafb", color:filters[k]?DOT_COLOR[k]:"#9ca3af", fontWeight:500, cursor:"pointer", textTransform:"capitalize" }}>
                {k}
              </button>
            ))}
          </div>
        </div>
        <div style={{ padding:"8px 16px", borderBottom:"1px solid #f3f4f6" }}>
          <p style={{ fontSize:11, color:"#6b7280", margin:0 }}>Showing <strong style={{ color:"#374151" }}>{filteredList.length}</strong> of <strong style={{ color:"#374151" }}>127</strong> properties</p>
        </div>
        <div style={{ flex:1, overflowY:"auto" }}>
          {filteredList.map(d => {
            const idx = MAP_DOTS.indexOf(d);
            return (
              <button key={idx} onClick={() => { setSelected(idx===selected?null:idx); setAiInsight(""); }}
                style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", borderBottom:"1px solid #f9fafb", textAlign:"left", background:selected===idx?"#eff6ff":"white", border:"none", cursor:"pointer" }}>
                <div>
                  <p style={{ fontSize:13, fontWeight:500, color:"#111827", margin:0 }}>{d.label}</p>
                  <span style={{ fontSize:11, fontWeight:500, color:DOT_COLOR[d.type], textTransform:"capitalize" }}>{d.type}</span>
                </div>
                <span style={{ color:"#d1d5db" }}>›</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map */}
      <div style={{ flex:1, position:"relative", overflow:"hidden" }}>
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <rect width="800" height="600" fill="#cfe8f7" />
          <ellipse cx="660" cy="310" rx="60" ry="180" fill="#a8d4ee" opacity="0.7" />
          <rect x="680" y="0" width="120" height="600" fill="#a8d4ee" opacity="0.5" />
          <path d="M 80,30 L 640,30 L 660,80 L 670,160 L 660,260 L 640,340 L 600,400 L 540,460 L 460,520 L 380,570 L 300,590 L 200,580 L 120,550 L 80,500 L 60,400 L 50,280 L 60,160 L 70,80 Z" fill="#e8ede4" stroke="#c5cfc0" strokeWidth="1.5" />
          <line x1="120" y1="30" x2="120" y2="580" stroke="#d1c9b8" strokeWidth="2" opacity="0.6" />
          <line x1="280" y1="30" x2="280" y2="590" stroke="#d1c9b8" strokeWidth="2" opacity="0.6" />
          <line x1="60" y1="160" x2="650" y2="160" stroke="#d1c9b8" strokeWidth="1.5" opacity="0.5" />
          <line x1="60" y1="280" x2="650" y2="280" stroke="#d1c9b8" strokeWidth="1.5" opacity="0.5" />
          <line x1="60" y1="400" x2="580" y2="400" stroke="#d1c9b8" strokeWidth="1.5" opacity="0.5" />
          <text x="340" y="260" fontSize="12" fill="#374151" fontWeight="700" textAnchor="middle">Miami</text>
          <text x="180" y="240" fontSize="11" fill="#6b7280" fontWeight="600" textAnchor="middle">Hialeah</text>
          <text x="480" y="130" fontSize="11" fill="#6b7280" fontWeight="600" textAnchor="middle">Aventura</text>
          <text x="350" y="360" fontSize="11" fill="#6b7280" fontWeight="600" textAnchor="middle">Kendall</text>
          <text x="150" y="140" fontSize="10" fill="#9ca3af" fontWeight="500" textAnchor="middle">Plantation</text>
          <text x="350" y="530" fontSize="10" fill="#9ca3af" fontWeight="500" textAnchor="middle">Homestead</text>
          <text x="730" y="300" fontSize="11" fill="#4a90b8" fontWeight="500" textAnchor="middle" transform="rotate(-90,730,300)">Atlantic Ocean</text>
        </svg>

        {MAP_DOTS.map((d, i) => {
          if (!filters[d.type]) return null;
          return (
            <button key={i} onClick={() => { setSelected(i===selected?null:i); setAiInsight(""); }}
              style={{ position:"absolute", left:`calc(${d.x}% - 8px)`, top:`calc(${d.y}% - 8px)`, zIndex:selected===i?10:2, background:"none", border:"none", cursor:"pointer", padding:0 }}>
              <div style={{ width:16, height:16, borderRadius:"50%", border:"2px solid white", background:DOT_COLOR[d.type], transform:selected===i?"scale(1.5)":"scale(1)", boxShadow:"0 1px 4px rgba(0,0,0,0.3)", transition:"transform 0.15s" }} />
            </button>
          );
        })}

        {sel && (
          <div style={{ position:"absolute", left:sel.x>58?"auto":`calc(${sel.x}% + 16px)`, right:sel.x>58?`calc(${100-sel.x}% + 16px)`:"auto", top:16, width:256, zIndex:30, background:"white", borderRadius:12, border:"1px solid #e5e7eb", boxShadow:"0 8px 24px rgba(0,0,0,0.12)", padding:16 }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:8 }}>
              <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>{sel.label}</p>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <Badge label={sel.type.charAt(0).toUpperCase()+sel.type.slice(1)} color={DOT_COLOR[sel.type]} bg={DOT_COLOR[sel.type]+"22"} />
                <button onClick={() => { setSelected(null); setAiInsight(""); }} style={{ width:20, height:20, borderRadius:"50%", background:"#f3f4f6", border:"none", cursor:"pointer", fontSize:12, color:"#6b7280", display:"flex", alignItems:"center", justifyContent:"center" }}>×</button>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:12 }}>
              {[["GLA","34,306 SF"],["Price","$9.7M"],["Cap Rate","6.4%"],["Occupancy","96%"]].map(([k,v]) => (
                <div key={k} style={{ background:"#f8fafc", borderRadius:6, padding:"8px 10px" }}>
                  <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>{k}</p>
                  <p style={{ fontSize:13, fontWeight:600, color:"#111827", margin:0 }}>{v}</p>
                </div>
              ))}
            </div>
            {aiLoading && <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:10, marginBottom:10 }}><p style={{ fontSize:11, color:"#2E75B6", textAlign:"center", margin:0 }}>Analyzing property...</p></div>}
            {aiInsight && <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:10, marginBottom:10 }}><p style={{ fontSize:11, fontWeight:600, color:"#1e40af", margin:"0 0 4px" }}>AI Analysis</p><p style={{ fontSize:11, color:"#1e3a8a", margin:0, lineHeight:1.5 }}>{aiInsight}</p></div>}
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={handleAskAI} style={{ flex:1, fontSize:12, padding:"7px 0", borderRadius:6, border:"1px solid #bfdbfe", background:"#eff6ff", color:"#2E75B6", cursor:"pointer", fontWeight:500 }}>AI Analyze</button>
              <button style={{ flex:1, fontSize:12, padding:"7px 0", borderRadius:6, border:"none", background:"#2E75B6", color:"white", cursor:"pointer", fontWeight:500 }}>View Record</button>
            </div>
          </div>
        )}

        {/* Legend */}
        <div style={{ position:"absolute", bottom:16, left:16, zIndex:20, background:"white", borderRadius:10, border:"1px solid #e5e7eb", padding:"10px 14px" }}>
          <p style={{ fontSize:11, fontWeight:600, color:"#6b7280", margin:"0 0 8px" }}>Property Type</p>
          {Object.entries(DOT_COLOR).map(([type, color]) => (
            <div key={type} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <div style={{ width:10, height:10, borderRadius:"50%", background:color }} />
              <span style={{ fontSize:11, color:"#6b7280", textTransform:"capitalize" }}>{type}</span>
            </div>
          ))}
          <div style={{ borderTop:"1px solid #f3f4f6", marginTop:8, paddingTop:8 }}>
            <button onClick={() => setHeatmap(!heatmap)} style={{ width:"100%", fontSize:11, padding:"5px 0", borderRadius:4, border:"1px solid", borderColor:heatmap?"#fed7aa":"#e5e7eb", background:heatmap?"#fff7ed":"#f9fafb", color:heatmap?"#ea580c":"#6b7280", cursor:"pointer", fontWeight:600 }}>
              {heatmap?"Heatmap ON":"Heatmap OFF"}
            </button>
          </div>
        </div>

        {heatmap && (
          <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:3 }}>
            <defs>
              <radialGradient id="hm1" cx="62%" cy="54%" r="18%"><stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" /><stop offset="100%" stopColor="#ef4444" stopOpacity="0" /></radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#hm1)" />
            <text x="62%" y="48%" fontSize="10" fill="#dc2626" fontWeight="700" textAnchor="middle">High Activity</text>
          </svg>
        )}
      </div>
    </div>
  );
}

// ── OM LIBRARY TABLE ───────────────────────────────────────────────────────

function OmLibrary() {
  const [search, setSearch]               = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [aiSearch, setAiSearch]           = useState(false);
  const [aiQuery, setAiQuery]             = useState("");
  const [aiResult, setAiResult]           = useState("");
  const [aiLoading, setAiLoading]         = useState(false);
  const [sortDir, setSortDir]             = useState(1);

  const statuses = ["All","New","Active Pursuit","Processing","Passed"];
  const filtered = LIBRARY_ROWS.filter(r => {
    const ms = r.name.toLowerCase().includes(search.toLowerCase()) || r.city.toLowerCase().includes(search.toLowerCase()) || r.anchor.toLowerCase().includes(search.toLowerCase());
    const ms2 = selectedStatus==="All" || r.status===selectedStatus;
    return ms && ms2;
  });

  const handleAiSearch = () => {
    if (!aiQuery.trim()) return;
    setAiLoading(true); setAiResult("");
    setTimeout(() => {
      setAiLoading(false);
      setAiResult(`Found 3 properties matching "${aiQuery}": Kendall Corners (96% occ, $9.7M, Active Pursuit), Meadows Square (97% occ, $13.8M, Passed — cap below threshold), Centre at Cutler Bay (95% occ, $15.4M, New). Kendall Corners is the strongest active opportunity.`);
    }, 1300);
  };

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", background:"#f8fafc" }}>
      <div style={{ padding:"16px 24px", background:"white", borderBottom:"1px solid #e5e7eb" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10, flexWrap:"wrap" }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", gap:8, border:"1px solid #e5e7eb", borderRadius:8, padding:"8px 12px", background:"white", maxWidth:340 }}>
            <svg width="15" height="15" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input value={search} onChange={e=>setSearch(e.target.value)} style={{ flex:1, fontSize:13, color:"#111827", outline:"none", border:"none" }} placeholder="Search properties, cities, anchors..." />
          </div>
          <button onClick={() => setAiSearch(!aiSearch)} style={{ fontSize:12, padding:"7px 14px", borderRadius:8, border:"1px solid", borderColor:aiSearch?"#bfdbfe":"#e5e7eb", background:aiSearch?"#eff6ff":"#f9fafb", color:aiSearch?"#2E75B6":"#6b7280", fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>AI Smart Search</button>
          {statuses.map(s => (
            <button key={s} onClick={() => setSelectedStatus(s)} style={{ fontSize:12, border:"1px solid", borderRadius:20, padding:"5px 14px", fontWeight:500, cursor:"pointer", whiteSpace:"nowrap", borderColor:selectedStatus===s?"#1B2A4A":"#e5e7eb", background:selectedStatus===s?"#1B2A4A":"#f9fafb", color:selectedStatus===s?"white":"#6b7280" }}>{s}</button>
          ))}
        </div>
        {aiSearch && (
          <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:12 }}>
            <p style={{ fontSize:12, fontWeight:600, color:"#2E75B6", margin:"0 0 8px" }}>Ask AI — search in plain English</p>
            <div style={{ display:"flex", gap:8 }}>
              <input value={aiQuery} onChange={e=>setAiQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAiSearch()} style={{ flex:1, border:"1px solid #bfdbfe", borderRadius:6, padding:"8px 12px", fontSize:13, outline:"none", background:"white" }} placeholder="e.g. grocery-anchored retail over 90% occupancy" />
              <button onClick={handleAiSearch} style={{ background:"#2E75B6", color:"white", fontSize:12, padding:"8px 16px", borderRadius:6, border:"none", cursor:"pointer", fontWeight:600 }}>{aiLoading?"Searching...":"Search"}</button>
            </div>
            {aiResult && <div style={{ marginTop:8, background:"white", border:"1px solid #bfdbfe", borderRadius:6, padding:10 }}><p style={{ fontSize:12, color:"#1e3a8a", margin:0, lineHeight:1.5 }}>{aiResult}</p></div>}
          </div>
        )}
      </div>
      <div style={{ padding:"6px 24px", background:"white", borderBottom:"1px solid #f3f4f6" }}>
        <p style={{ fontSize:12, color:"#6b7280", margin:0 }}>Showing <strong style={{ color:"#374151" }}>{filtered.length}</strong> of <strong style={{ color:"#374151" }}>{LIBRARY_ROWS.length}</strong> properties</p>
      </div>
      <div style={{ flex:1, overflowX:"auto", overflowY:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13, minWidth:900 }}>
          <thead>
            <tr style={{ background:"white", position:"sticky", top:0 }}>
              {["Property Name","Type","City","GLA","Asking Price","Cap Rate","Occupancy","Anchor","Status","OM Date"].map(col => (
                <th key={col} onClick={() => setSortDir(d=>-d)} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:600, color:"#6b7280", borderBottom:"1px solid #e5e7eb", cursor:"pointer", whiteSpace:"nowrap" }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={i} style={{ borderBottom:"1px solid #f3f4f6", cursor:"pointer" }}
                onMouseEnter={e=>e.currentTarget.style.background="#eff6ff"}
                onMouseLeave={e=>e.currentTarget.style.background="white"}>
                <td style={{ padding:"12px 16px", fontWeight:500, color:"#111827" }}>{r.name}</td>
                <td style={{ padding:"12px 16px" }}><Badge label={r.type} color={r.typeColor} bg={r.typeColor+"18"} /></td>
                <td style={{ padding:"12px 16px", color:"#6b7280" }}>{r.city}</td>
                <td style={{ padding:"12px 16px", color:"#374151" }}>{r.gla}</td>
                <td style={{ padding:"12px 16px", fontWeight:500, color:"#111827" }}>{r.price}</td>
                <td style={{ padding:"12px 16px", color:"#374151" }}>{r.cap}</td>
                <td style={{ padding:"12px 16px", color:"#374151" }}>{r.occ}</td>
                <td style={{ padding:"12px 16px", color:"#6b7280", fontSize:12 }}>{r.anchor}</td>
                <td style={{ padding:"12px 16px" }}><Badge label={r.status} color={r.statusColor} bg={r.statusBg} /></td>
                <td style={{ padding:"12px 16px", fontSize:11, color:"#9ca3af" }}>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── TENANT EXPIRATION TRACKER ──────────────────────────────────────────────

function TenantExpirationTracker() {
  const [address, setAddress]       = useState("Wynwood Retail Suite 104, Miami FL");
  const [radius, setRadius]         = useState("3");
  const [months, setMonths]         = useState("12");
  const [useFilter, setUseFilter]   = useState("All");
  const [searched, setSearched]     = useState(true);
  const [searching, setSearching]   = useState(false);
  const [exportedIds, setExportedIds] = useState([]);
  const [aiInsight, setAiInsight]   = useState("");
  const [aiLoading, setAiLoading]   = useState(false);

  const uses = ["All","QSR","Medical","Service","Education","Personal Care"];
  const filteredT = EXPIRING_TENANTS.filter(t => useFilter==="All" || t.use===useFilter);

  const handleSearch = () => { setSearching(true); setTimeout(() => { setSearching(false); setSearched(true); }, 1000); };
  const handleAI = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiLoading(false);
      setAiInsight("Top prospect for Wynwood Retail Suite 104 (3,200 SF, $42/SF): Coastal Coffee Co. — lease expires in 70 days at Kendall Corners, currently at $34/SF on 1,800 SF. Strong growth (6 locations). BurgerFi is second-best — 8 FL locations. Recommend outreach to both within 2 weeks.");
    }, 1300);
  };

  return (
    <div style={{ flex:1, overflowY:"auto", padding:24, background:"#f8fafc" }}>
      {/* Search form */}
      <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", padding:20, marginBottom:20 }}>
        <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 4px" }}>Find Expiring Tenants Near Your Vacancy</p>
        <p style={{ fontSize:12, color:"#9ca3af", margin:"0 0 16px" }}>Enter a vacancy address to surface tenants with expiring leases nearby, ranked by fit score.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:12 }}>
          <div style={{ gridColumn:"span 2" }}>
            <label style={{ fontSize:12, fontWeight:600, color:"#6b7280", display:"block", marginBottom:4 }}>Vacancy Address</label>
            <input value={address} onChange={e=>setAddress(e.target.value)} style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:8, padding:"8px 12px", fontSize:13, outline:"none", boxSizing:"border-box" }} />
          </div>
          <div>
            <label style={{ fontSize:12, fontWeight:600, color:"#6b7280", display:"block", marginBottom:4 }}>Radius</label>
            <select value={radius} onChange={e=>setRadius(e.target.value)} style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:8, padding:"8px 12px", fontSize:13, outline:"none" }}>
              {["1","2","3","5","10"].map(r => <option key={r} value={r}>{r} miles</option>)}
            </select>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
          <div>
            <label style={{ fontSize:12, fontWeight:600, color:"#6b7280", display:"block", marginBottom:4 }}>Expiring Within</label>
            <select value={months} onChange={e=>setMonths(e.target.value)} style={{ border:"1px solid #e5e7eb", borderRadius:8, padding:"8px 12px", fontSize:13, outline:"none" }}>
              {["6","12","18","24"].map(m => <option key={m} value={m}>{m} months</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize:12, fontWeight:600, color:"#6b7280", display:"block", marginBottom:4 }}>Use Category</label>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
              {uses.map(u => (
                <button key={u} onClick={() => setUseFilter(u)} style={{ fontSize:11, padding:"5px 10px", borderRadius:6, border:"1px solid", borderColor:useFilter===u?"#1B2A4A":"#e5e7eb", background:useFilter===u?"#1B2A4A":"#f9fafb", color:useFilter===u?"white":"#6b7280", cursor:"pointer", fontWeight:500 }}>{u}</button>
              ))}
            </div>
          </div>
          <button onClick={handleSearch} style={{ fontSize:13, padding:"9px 20px", background:"#2E75B6", color:"white", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600, marginTop:16 }}>
            {searching ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {searched && (
        <div>
          {/* AI Match */}
          <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", marginBottom:20 }}>
            <div style={{ padding:"12px 20px", borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:24, height:24, borderRadius:"50%", background:"#2E75B6", display:"flex", alignItems:"center", justifyContent:"center" }}><span style={{ color:"white", fontSize:11, fontWeight:700 }}>AI</span></div>
                <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>AI Match Analysis</p>
              </div>
              <button onClick={handleAI} style={{ fontSize:12, padding:"6px 14px", borderRadius:6, border:"1px solid #bfdbfe", background:"#eff6ff", color:"#2E75B6", fontWeight:600, cursor:"pointer" }}>
                {aiLoading ? "Analyzing..." : "Run AI Match"}
              </button>
            </div>
            <div style={{ padding:16 }}>
              {!aiInsight && !aiLoading && <p style={{ fontSize:12, color:"#9ca3af", textAlign:"center", margin:0 }}>Click Run AI Match to get a ranked recommendation for this vacancy.</p>}
              {aiLoading && <p style={{ fontSize:12, color:"#2E75B6", textAlign:"center", margin:0 }}>Analyzing {filteredT.length} nearby tenants...</p>}
              {aiInsight && <p style={{ fontSize:12, color:"#1e3a8a", margin:0, lineHeight:1.5 }}>{aiInsight}</p>}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20 }}>
            {/* Expiring Tenants */}
            <div>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>{filteredT.length} Expiring Tenants — within {radius} miles</p>
                <button style={{ fontSize:12, border:"1px solid #bfdbfe", color:"#2E75B6", background:"#eff6ff", padding:"6px 12px", borderRadius:6, cursor:"pointer", fontWeight:600 }}>Export All to HubSpot</button>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[...filteredT].sort((a,b)=>b.score-a.score).map(t => {
                  const isExp = exportedIds.includes(t.name);
                  return (
                    <div key={t.name} style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", padding:16 }}>
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:8 }}>
                        <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                          <div style={{ width:40, height:40, borderRadius:8, background:"#f8fafc", border:"1px solid #e5e7eb", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <ScoreBadge score={t.score} />
                          </div>
                          <div>
                            <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>{t.name}</p>
                            <p style={{ fontSize:12, color:"#6b7280", margin:"2px 0 0" }}>At {t.current} · {t.sf.toLocaleString()} SF · {t.rent}/SF</p>
                          </div>
                        </div>
                        <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
                          <Badge label={t.use} color={t.useColor} bg={t.useBg} />
                          {t.locations>3 && <span style={{ fontSize:11, background:"#ede9fe", color:"#7c3aed", border:"1px solid #ddd6fe", padding:"2px 8px", borderRadius:10, fontWeight:600 }}>{t.locations} locations</span>}
                        </div>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:12 }}>
                        <span style={{ fontSize:12, color:"#6b7280" }}>Expires: <strong style={{ color:"#111827" }}>{t.exp}</strong></span>
                        <span style={{ fontSize:12, fontWeight:600, color:t.daysLeft<90?"#dc2626":t.daysLeft<180?"#d97706":"#6b7280" }}>{t.daysLeft} days remaining</span>
                      </div>
                      <div style={{ display:"flex", gap:8 }}>
                        <button onClick={() => setExportedIds(p=>[...p,t.name])} style={{ fontSize:11, padding:"5px 10px", borderRadius:6, border:"1px solid", borderColor:isExp?"#bbf7d0":"#e5e7eb", background:isExp?"#d1fae5":"white", color:isExp?"#059669":"#6b7280", cursor:"pointer", fontWeight:500 }}>
                          {isExp ? "Exported to HubSpot" : "Export to HubSpot"}
                        </button>
                        <button style={{ fontSize:11, padding:"5px 10px", borderRadius:6, border:"1px solid #bfdbfe", background:"#eff6ff", color:"#2E75B6", cursor:"pointer", fontWeight:500 }}>View Prospect</button>
                        <button style={{ fontSize:11, padding:"5px 10px", borderRadius:6, border:"1px solid #e5e7eb", background:"white", color:"#6b7280", cursor:"pointer", fontWeight:500 }}>Draft Outreach</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MMG At Risk */}
            <div>
              <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 12px" }}>MMG Tenants at Risk</p>
              <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
                <div style={{ padding:"10px 16px", borderBottom:"1px solid #f3f4f6", background:"#fff5f5" }}>
                  <p style={{ fontSize:12, fontWeight:700, color:"#dc2626", margin:0 }}>Expiring from your own portfolio</p>
                  <p style={{ fontSize:11, color:"#ef4444", margin:"2px 0 0" }}>Flagged from Yardi sync</p>
                </div>
                {MMG_AT_RISK.map(t => (
                  <div key={t.name} style={{ padding:"12px 16px", borderBottom:"1px solid #f9fafb" }}>
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:4 }}>
                      <div>
                        <p style={{ fontSize:12, fontWeight:600, color:"#111827", margin:0 }}>{t.name}</p>
                        <p style={{ fontSize:11, color:"#9ca3af", margin:"2px 0 0" }}>{t.property} · {t.sf} SF</p>
                        <p style={{ fontSize:11, fontWeight:600, color:t.risk==="high"?"#dc2626":"#d97706", margin:"2px 0 0" }}>{t.exp} · {t.daysLeft}d</p>
                      </div>
                      <span style={{ fontSize:11, padding:"2px 8px", borderRadius:10, fontWeight:600, background:t.risk==="high"?"#fee2e2":"#fef3c7", color:t.risk==="high"?"#dc2626":"#d97706" }}>{t.risk==="high"?"High":"Med"}</span>
                    </div>
                    <button style={{ fontSize:11, color:"#2E75B6", background:"none", border:"none", cursor:"pointer", fontWeight:500, padding:0 }}>Draft Renewal Offer</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ROOT COMPONENT ─────────────────────────────────────────────────────────

export default function OmDiscovery() {
  const [tab, setTab] = useState("Dashboard");
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ background:"white", borderBottom:"1px solid #e5e7eb", padding:"0 24px", display:"flex", gap:4, flexShrink:0, overflowX:"auto" }}>
        {["Dashboard","Ingestion","Map","Library","Tenant Expiration Tracker"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding:"12px 20px", fontSize:13, fontWeight:500, border:"none", borderBottom:tab===t?"2px solid #2E75B6":"2px solid transparent", color:tab===t?"#2E75B6":"#6b7280", background:"none", cursor:"pointer", whiteSpace:"nowrap" }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        {tab==="Dashboard"                && <OmDashboard />}
        {tab==="Ingestion"                && <OmIngestion />}
        {tab==="Map"                      && <OmMap />}
        {tab==="Library"                  && <OmLibrary />}
        {tab==="Tenant Expiration Tracker"&& <TenantExpirationTracker />}
      </div>
    </div>
  );
}
