import { useState } from "react";
import { PASS_REASONS, RENT_ROLL_ROWS, LEASE_COMPS, SALES_COMPS } from "../data";
import { Badge, AiActionPanel } from "../shared";

// ── PROPERTY RECORD ────────────────────────────────────────────────────────

function PropertyRecord() {
  const [subTab, setSubTab]       = useState("Overview");
  const [dealStatus, setDealStatus] = useState("Passed");
  const [dealNote, setDealNote]   = useState("Asking price 15% above our underwritten value. 3 inline tenants expire within 12 months. Revisit if price drops below $12.5M.");
  const [rrFilter, setRrFilter]   = useState("All");

  const statusColors = {
    "Active Pursuit":{ color:"#059669", bg:"#d1fae5" },
    "Passed":        { color:"#dc2626", bg:"#fee2e2" },
    "Processing":    { color:"#6b7280", bg:"#f3f4f6" },
    "New":           { color:"#1d4ed8", bg:"#dbeafe" },
  };
  const confDot = conf => {
    const c = { high:"#16a34a", medium:"#d97706", low:"#dc2626", none:"#d1d5db" };
    return <span style={{ display:"inline-block", width:8, height:8, borderRadius:"50%", background:c[conf]||"#d1d5db" }} />;
  };
  const filteredRR = rrFilter==="All" ? RENT_ROLL_ROWS : RENT_ROLL_ROWS.filter(r => r.use===rrFilter);

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      {/* Sub-tabs */}
      <div style={{ background:"white", borderBottom:"1px solid #f3f4f6", padding:"0 24px", display:"flex", gap:4 }}>
        {["Overview","Rent Roll","Deal Record"].map(t => (
          <button key={t} onClick={() => setSubTab(t)}
            style={{ padding:"10px 16px", fontSize:12, fontWeight:600, border:"none", borderBottom:subTab===t?"2px solid #2E75B6":"2px solid transparent", color:subTab===t?"#2E75B6":"#6b7280", background:"none", cursor:"pointer" }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:24, background:"#f8fafc" }}>

        {/* ── OVERVIEW ── */}
        {subTab==="Overview" && (
          <div>
            <AiActionPanel context="Property Overview" actions={[
              { label:"Valuation Analysis", color:"#2E75B6" },
              { label:"Risk Summary",        color:"#dc2626" },
              { label:"Compare to Portfolio",color:"#7c3aed" },
              { label:"Draft Offer Memo",    color:"#059669" },
            ]} />
            <div style={{ marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16 }}>
                <div>
                  <h1 style={{ fontSize:22, fontWeight:700, color:"#111827", margin:"0 0 4px" }}>Kendall Fresh Plaza</h1>
                  <p style={{ fontSize:13, color:"#6b7280", margin:"0 0 8px" }}>13500 SW 120th St, Miami, FL 33186</p>
                  <div style={{ display:"flex", gap:8 }}>
                    <Badge label="Retail — Grocery Anchored" color="#2E75B6" bg="#dbeafe" />
                    <Badge label="Return to Market" color="#b45309" bg="#fef3c7" />
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                  <button style={{ fontSize:12, border:"1px solid #bfdbfe", color:"#2E75B6", background:"#eff6ff", padding:"6px 12px", borderRadius:6, cursor:"pointer", fontWeight:600 }}>Download OM</button>
                  <button style={{ fontSize:12, background:"#2E75B6", color:"white", padding:"6px 12px", borderRadius:6, border:"none", cursor:"pointer", fontWeight:600 }}>Add to Pipeline</button>
                </div>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:20 }}>
              <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", padding:20 }}>
                <p style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1, margin:"0 0 12px" }}>Property Details</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                  {[["Asking Price","$14,100,000"],["Cap Rate","6.2%"],["NOI","$874,200"],["GLA","45,200 SF"],["Year Built","1998 / Ren. 2019"],["Occupancy","92%"],["Parking","4.8 / 1,000 SF"],["Lot Size","3.2 acres"],["Zoning","BU-2"]].map(([k,v]) => (
                    <div key={k} style={{ background:"#f8fafc", borderRadius:8, padding:"10px 12px" }}>
                      <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>{k}</p>
                      <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", padding:16 }}>
                <p style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1, margin:"0 0 10px" }}>Broker</p>
                <p style={{ fontSize:14, fontWeight:600, color:"#111827", margin:0 }}>Andrew Easton</p>
                <p style={{ fontSize:12, color:"#6b7280", margin:"2px 0 0" }}>The Easton Group</p>
                <p style={{ fontSize:11, color:"#9ca3af", margin:"4px 0 0" }}>OM Date: March 2026</p>
              </div>
            </div>

            <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:12, padding:16 }}>
              <p style={{ fontSize:11, fontWeight:700, color:"#1e40af", textTransform:"uppercase", letterSpacing:1, margin:"0 0 8px" }}>AI Property Summary</p>
              <p style={{ fontSize:13, color:"#1e3a8a", margin:0, lineHeight:1.6 }}>
                Kendall Fresh Plaza is a 45,200 SF grocery-anchored retail center in Kendall. Anchor (Presidente Supermarket) holds lease through March 2030. Returned to market at $14.1M — 12.9% reduction from prior $16.2M ask. Key risks: 3 inline leases expiring within 12 months and below-average occupancy (92% vs 95.1% submarket median). Recommend re-evaluating with a target offer of $13.2M contingent on anchor renewal confirmation.
              </p>
            </div>
          </div>
        )}

        {/* ── RENT ROLL ── */}
        {subTab==="Rent Roll" && (
          <div>
            <AiActionPanel context="Rent Roll" actions={[
              { label:"Rollover Risk Report",      color:"#dc2626" },
              { label:"Flag Below-Market Tenants", color:"#ea580c" },
              { label:"Suggest Renewal Strategy",  color:"#059669" },
            ]} />
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16, flexWrap:"wrap" }}>
              <p style={{ fontSize:12, fontWeight:600, color:"#6b7280", margin:0 }}>Filter:</p>
              {["All","Grocery","QSR","Medical","Service","Education","Financial","Personal Care"].map(u => (
                <button key={u} onClick={() => setRrFilter(u)}
                  style={{ fontSize:11, padding:"4px 10px", borderRadius:12, border:"1px solid", borderColor:rrFilter===u?"#1B2A4A":"#e5e7eb", background:rrFilter===u?"#1B2A4A":"#f9fafb", color:rrFilter===u?"white":"#6b7280", cursor:"pointer", fontWeight:500 }}>
                  {u}
                </button>
              ))}
            </div>
            <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12, minWidth:800 }}>
                <thead>
                  <tr style={{ background:"#f8fafc" }}>
                    {["Tenant","Suite","SF","Base/SF","Total/SF","Type","Start","Exp","Use","Pos","Conf"].map(h => (
                      <th key={h} style={{ padding:"10px 12px", textAlign:"left", fontWeight:600, color:"#6b7280", borderBottom:"1px solid #f3f4f6", whiteSpace:"nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRR.map((r, i) => (
                    <tr key={i} style={{ borderBottom:"1px solid #f9fafb", cursor:"pointer" }}
                      onMouseEnter={e=>e.currentTarget.style.background="#eff6ff"}
                      onMouseLeave={e=>e.currentTarget.style.background="white"}>
                      <td style={{ padding:"10px 12px", fontWeight:500, color:"#111827" }}>{r.tenant}</td>
                      <td style={{ padding:"10px 12px", color:"#6b7280" }}>{r.suite}</td>
                      <td style={{ padding:"10px 12px", color:"#374151" }}>{r.sf}</td>
                      <td style={{ padding:"10px 12px", color:"#374151" }}>{r.baseRent}</td>
                      <td style={{ padding:"10px 12px", fontWeight:500, color:"#111827" }}>{r.totalRent}</td>
                      <td style={{ padding:"10px 12px", color:"#6b7280" }}>{r.type}</td>
                      <td style={{ padding:"10px 12px", color:"#9ca3af" }}>{r.start}</td>
                      <td style={{ padding:"10px 12px", color:"#374151" }}>{r.exp}</td>
                      <td style={{ padding:"10px 12px" }}>{r.use!=="—" && <Badge label={r.use} color={r.useColor} bg={r.useBg} />}</td>
                      <td style={{ padding:"10px 12px", color:"#6b7280" }}>{r.pos}</td>
                      <td style={{ padding:"10px 12px" }}>{confDot(r.conf)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── DEAL RECORD ── */}
        {subTab==="Deal Record" && (
          <div style={{ maxWidth:640 }}>
            <AiActionPanel context="Deal Record" actions={[
              { label:"Draft IC Memo",        color:"#2E75B6" },
              { label:"AI Bid Recommendation",color:"#059669" },
            ]} />
            <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", padding:20, marginBottom:16 }}>
              <p style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1, margin:"0 0 16px" }}>Deal Record</p>
              <div style={{ marginBottom:16 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"#6b7280", display:"block", marginBottom:8 }}>Deal Status</label>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {["Active Pursuit","Passed","Processing","New"].map(s => {
                    const sc = statusColors[s];
                    return (
                      <button key={s} onClick={() => setDealStatus(s)}
                        style={{ fontSize:12, padding:"6px 14px", borderRadius:20, border:"1px solid", borderColor:dealStatus===s?sc.color+"66":"#e5e7eb", background:dealStatus===s?sc.bg:"#f9fafb", color:dealStatus===s?sc.color:"#9ca3af", cursor:"pointer", fontWeight:600 }}>
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"#6b7280", display:"block", marginBottom:6 }}>Pass Reason</label>
                <select style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:8, padding:"8px 12px", fontSize:13, outline:"none" }}>
                  {PASS_REASONS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              {[["MMG Bid Price","—"],["Actual Sale Price","—"]].map(([label, val]) => (
                <div key={label} style={{ marginBottom:12 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:"#6b7280", display:"block", marginBottom:6 }}>{label}</label>
                  <input defaultValue={val} style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:8, padding:"8px 12px", fontSize:13, outline:"none", boxSizing:"border-box" }} />
                </div>
              ))}
              <div style={{ marginBottom:12 }}>
                <label style={{ fontSize:12, fontWeight:600, color:"#6b7280", display:"block", marginBottom:6 }}>Notes</label>
                <textarea value={dealNote} onChange={e => setDealNote(e.target.value)} rows={4}
                  style={{ width:"100%", border:"1px solid #e5e7eb", borderRadius:8, padding:"8px 12px", fontSize:13, outline:"none", resize:"none", boxSizing:"border-box" }} />
              </div>
              <button style={{ background:"#2E75B6", color:"white", fontSize:13, padding:"9px 16px", borderRadius:6, border:"none", cursor:"pointer", fontWeight:600 }}>Save Changes</button>
            </div>

            {/* Return to Market */}
            <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:12, padding:16 }}>
              <p style={{ fontSize:11, fontWeight:700, color:"#d97706", textTransform:"uppercase", letterSpacing:1, margin:"0 0 10px" }}>Return to Market</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {[["Previously Reviewed","July 15, 2025"],["Prior Asking Price","$16,200,000"],["Current Asking Price","$14,100,000"],["Price Delta","-12.9%"],["Originally Assigned To","Marcus A."]].map(([k,v]) => (
                  <div key={k} style={{ background:"#fef3c7", borderRadius:6, padding:"8px 12px" }}>
                    <p style={{ fontSize:11, color:"#d97706", margin:0 }}>{k}</p>
                    <p style={{ fontSize:12, fontWeight:600, color:"#92400e", margin:0 }}>{v}</p>
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

// ── COMPS ENGINE ───────────────────────────────────────────────────────────

function CompsEngine() {
  const [compsTab, setCompsTab] = useState("Lease Comps");

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      <div style={{ background:"white", borderBottom:"1px solid #f3f4f6", padding:"0 24px", display:"flex", gap:4 }}>
        {["Lease Comps","Sales Comps"].map(t => (
          <button key={t} onClick={() => setCompsTab(t)}
            style={{ padding:"10px 16px", fontSize:12, fontWeight:600, border:"none", borderBottom:compsTab===t?"2px solid #2E75B6":"2px solid transparent", color:compsTab===t?"#2E75B6":"#6b7280", background:"none", cursor:"pointer" }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:24, background:"#f8fafc" }}>
        <AiActionPanel context="Comps Engine" actions={[
          { label:"Interpret Comps",       color:"#2E75B6" },
          { label:"AI Bid Recommendation", color:"#059669" },
        ]} />

        {compsTab==="Lease Comps" && (
          <div>
            <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:10, padding:"12px 20px", marginBottom:16, display:"flex", alignItems:"center", gap:24 }}>
              <p style={{ fontSize:12, fontWeight:700, color:"#1e40af", margin:0 }}>QSR Market Range — Kendall</p>
              {[["Low","$28/SF"],["Median","$34/SF"],["High","$42/SF"]].map(([k,v]) => (
                <div key={k} style={{ textAlign:"center" }}>
                  <p style={{ fontSize:11, color:"#3b82f6", margin:0 }}>{k}</p>
                  <p style={{ fontSize:16, fontWeight:700, color:"#1e40af", margin:0 }}>{v}</p>
                </div>
              ))}
              <p style={{ fontSize:12, color:"#2563eb", marginLeft:"auto" }}>Subject avg: $39.00/SF — <strong>above median</strong></p>
            </div>
            <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                <thead>
                  <tr style={{ background:"#f8fafc" }}>
                    {["Property","Tenant","SF","Rent/SF","Type","Date","Term","Distance"].map(h => (
                      <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:600, color:"#6b7280", borderBottom:"1px solid #f3f4f6" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {LEASE_COMPS.map((r, i) => (
                    <tr key={i} style={{ borderBottom:"1px solid #f9fafb", cursor:"pointer" }}
                      onMouseEnter={e=>e.currentTarget.style.background="#eff6ff"}
                      onMouseLeave={e=>e.currentTarget.style.background="white"}>
                      <td style={{ padding:"12px 16px", fontWeight:500, color:"#111827" }}>{r.property}</td>
                      <td style={{ padding:"12px 16px", color:"#6b7280" }}>{r.tenant}</td>
                      <td style={{ padding:"12px 16px", color:"#374151" }}>{r.sf}</td>
                      <td style={{ padding:"12px 16px", fontWeight:600, color:"#111827" }}>{r.rent}</td>
                      <td style={{ padding:"12px 16px", color:"#6b7280" }}>{r.type}</td>
                      <td style={{ padding:"12px 16px", color:"#6b7280" }}>{r.date}</td>
                      <td style={{ padding:"12px 16px", color:"#6b7280" }}>{r.term}</td>
                      <td style={{ padding:"12px 16px", color:"#9ca3af" }}>{r.dist}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {compsTab==="Sales Comps" && (
          <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr style={{ background:"#f8fafc" }}>
                  {["Property","GLA","Asking Price","Price/SF","Cap Rate","Occupancy","Anchor","OM Date","Sale Price"].map(h => (
                    <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:11, fontWeight:600, color:"#6b7280", borderBottom:"1px solid #f3f4f6", whiteSpace:"nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SALES_COMPS.map((r, i) => (
                  <tr key={i} style={{ borderBottom:"1px solid #f9fafb", cursor:"pointer" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#eff6ff"}
                    onMouseLeave={e=>e.currentTarget.style.background="white"}>
                    <td style={{ padding:"12px 16px", fontWeight:500, color:"#111827" }}>{r.property}</td>
                    <td style={{ padding:"12px 16px", color:"#374151" }}>{r.gla}</td>
                    <td style={{ padding:"12px 16px", fontWeight:500, color:"#111827" }}>{r.ask}</td>
                    <td style={{ padding:"12px 16px", color:"#374151" }}>{r.psf}</td>
                    <td style={{ padding:"12px 16px", color:"#374151" }}>{r.cap}</td>
                    <td style={{ padding:"12px 16px", color:"#374151" }}>{r.occ}</td>
                    <td style={{ padding:"12px 16px", color:"#6b7280", fontSize:12 }}>{r.anchor}</td>
                    <td style={{ padding:"12px 16px", color:"#9ca3af" }}>{r.omDate}</td>
                    <td style={{ padding:"12px 16px", fontWeight:600, color:r.sale!=="—"?"#059669":"#9ca3af" }}>{r.sale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ── PRE-LOI PACKAGE ────────────────────────────────────────────────────────

function PreLoiPackage() {
  const [loiLoading, setLoiLoading]     = useState(false);
  const [loiGenerated, setLoiGenerated] = useState(false);

  const generate = () => {
    setLoiLoading(true);
    setTimeout(() => { setLoiLoading(false); setLoiGenerated(true); }, 1600);
  };

  const sections = [
    { label:"S1 — Subject Property Summary", body:
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
        {[["Asking Price","$14,100,000"],["Cap Rate","6.2%"],["NOI","$874,200"],["GLA","45,200 SF"],["Occupancy","92%"],["WALT","3.4 yrs"]].map(([k,v]) => (
          <div key={k} style={{ background:"#f8fafc", borderRadius:6, padding:"8px 12px" }}>
            <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>{k}</p>
            <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>{v}</p>
          </div>
        ))}
      </div>
    },
    { label:"S4 — Rollover Risk", body:
      <p style={{ fontSize:13, color:"#374151", lineHeight:1.6, margin:0 }}>4 leases (8,100 SF, 17.9% of GLA) expire within 12 months. WALT: 3.4 years vs comparable median 4.1 years. UPS Store, Kumon Learning, and Amscot Financial represent the highest risk — all expire before Q4 2026.</p>
    },
    { label:"S5 — Occupancy Analysis", body:
      <p style={{ fontSize:13, color:"#374151", lineHeight:1.6, margin:0 }}>Subject occupancy: 92%. Comparable grocery-anchored average in Kendall: 95.1%. One current vacancy (Suite 109, 2,100 SF). Recommend underwriting a 12-month lease-up assumption at $36.00/SF.</p>
    },
    { label:"S6 — Prior MMG Review", body:
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
        {[["Prior Ask","$16,200,000"],["Current Ask","$14,100,000"],["Delta","-12.9%"],["Prior Status","Passed"],["Pass Reason","Pricing too tight"],["Assigned To","Marcus A."]].map(([k,v]) => (
          <div key={k} style={{ background:"#fffbeb", borderRadius:6, padding:"8px 12px" }}>
            <p style={{ fontSize:11, color:"#d97706", margin:0 }}>{k}</p>
            <p style={{ fontSize:12, fontWeight:600, color:"#92400e", margin:0 }}>{v}</p>
          </div>
        ))}
      </div>
    },
    { label:"S7 — Broker Intelligence", body:
      <p style={{ fontSize:13, color:"#374151", lineHeight:1.6, margin:0 }}>4 OMs received from The Easton Group in 24 months. 1 entered pipeline. 0 closed transactions. Pass rate: 75%. The current 12.9% price reduction aligns with MMG's prior feedback. Recommend re-engaging Andrew Easton directly before submitting an offer.</p>
    },
  ];

  return (
    <div style={{ flex:1, overflowY:"auto", padding:24, background:"#f8fafc" }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <AiActionPanel context="Pre-LOI Package" actions={[
          { label:"Draft LOI from Package",  color:"#2E75B6" },
          { label:"AI Bid Recommendation",   color:"#059669" },
          { label:"Draft IC Memo",           color:"#7c3aed" },
        ]} />

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
          <div>
            <p style={{ fontSize:18, fontWeight:700, color:"#111827", margin:0 }}>Pre-LOI Comp Package</p>
            <p style={{ fontSize:13, color:"#6b7280", margin:"2px 0 0" }}>
              Kendall Fresh Plaza ·{" "}
              {loiGenerated
                ? <span style={{ color:"#059669", fontWeight:500 }}>Generated in 47 seconds</span>
                : "Not yet generated"
              }
            </p>
          </div>
          {!loiGenerated ? (
            <button onClick={generate} style={{ fontSize:13, padding:"9px 16px", background:"#2E75B6", color:"white", borderRadius:8, border:"none", cursor:"pointer", fontWeight:600 }}>
              {loiLoading ? "Generating..." : "Generate Package"}
            </button>
          ) : (
            <div style={{ display:"flex", gap:8 }}>
              {["Download PDF","Download Excel","Share with Team"].map(b => (
                <button key={b} style={{ fontSize:12, border:"1px solid #bfdbfe", color:"#2E75B6", background:"#eff6ff", padding:"6px 12px", borderRadius:6, cursor:"pointer", fontWeight:600 }}>{b}</button>
              ))}
            </div>
          )}
        </div>

        {loiLoading && (
          <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", padding:40, textAlign:"center" }}>
            <p style={{ color:"#2E75B6", fontWeight:500, fontSize:13, margin:0 }}>Compiling comps, rollover analysis, and broker intelligence...</p>
          </div>
        )}
        {!loiGenerated && !loiLoading && (
          <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", padding:40, textAlign:"center" }}>
            <p style={{ color:"#9ca3af", fontSize:13, margin:0 }}>Click Generate Package to compile all sections into a ready-to-share document.</p>
          </div>
        )}
        {loiGenerated && !loiLoading && (
          <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
            {sections.map((s, i) => (
              <div key={i} style={{ padding:20, borderBottom:i<sections.length-1?"1px solid #f3f4f6":"none" }}>
                <p style={{ fontSize:11, fontWeight:700, color:"#9ca3af", textTransform:"uppercase", letterSpacing:1, margin:"0 0 12px" }}>{s.label}</p>
                {s.body}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── ROOT COMPONENT ─────────────────────────────────────────────────────────

export default function OmDetail() {
  const [mainTab, setMainTab] = useState("Property Record");

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%" }}>
      {/* Top tabs + breadcrumb */}
      <div style={{ background:"white", borderBottom:"1px solid #e5e7eb", flexShrink:0 }}>
        <div style={{ padding:"0 24px", display:"flex", gap:4 }}>
          {["Property Record","Comps Engine","Pre-LOI Package"].map(t => (
            <button key={t} onClick={() => setMainTab(t)}
              style={{ padding:"12px 20px", fontSize:13, fontWeight:500, border:"none", borderBottom:mainTab===t?"2px solid #2E75B6":"2px solid transparent", color:mainTab===t?"#2E75B6":"#6b7280", background:"none", cursor:"pointer" }}>
              {t}
            </button>
          ))}
        </div>
        <div style={{ padding:"4px 24px 6px", background:"#f8fafc", borderTop:"1px solid #f3f4f6" }}>
          <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>Library <span style={{ margin:"0 4px" }}>›</span> <span style={{ color:"#374151", fontWeight:500 }}>Kendall Fresh Plaza</span></p>
        </div>
      </div>

      <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        {mainTab==="Property Record"  && <PropertyRecord />}
        {mainTab==="Comps Engine"     && <CompsEngine />}
        {mainTab==="Pre-LOI Package"  && <PreLoiPackage />}
      </div>
    </div>
  );
}
