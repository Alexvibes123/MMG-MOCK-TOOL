import { useState } from "react";
import { AGENT_CATALOG, PERMISSIONS_CONFIG, AUTOMATION_RULES, ACTIVITY_FEED } from "../data";
import { Toggle } from "../shared";

// Extra automations not in data.js (extended set)
const EXTRA_AUTOMATIONS = [
  { id:7,  name:"Stale Lead Re-Engagement",  trigger:"Prospect has no activity for 10+ days in HubSpot",        action:"Draft a personalized second-touch email referencing latest growth signals, queue for approval", apps:["HubSpot","Outlook","Claude"],        active:false, runs:0,  lastRun:"Not yet run" },
  { id:8,  name:"Monthly Property Report",    trigger:"1st of each month at 7:00 AM",                            action:"Pull financials from Yardi, generate NOI summary and occupancy report, save to SharePoint and email to team", apps:["Yardi","SharePoint","Outlook","Claude"], active:false, runs:0,  lastRun:"Not yet run" },
  { id:9,  name:"IC Meeting Pack",            trigger:"24 hours before scheduled IC meeting",                    action:"Compile active deal memos, comps, and underwriting summaries into a single PDF, save to SharePoint", apps:["SharePoint","Claude"],              active:false, runs:0,  lastRun:"Not yet run" },
  { id:10, name:"Cap Rate Threshold Alert",   trigger:"Ingested OM has cap rate below 6.0%",                     action:"Flag for IC review in Teams with cap rate comparison to MMG portfolio average", apps:["SharePoint","Teams"],              active:true,  runs:7,  lastRun:"Today" },
  { id:11, name:"Budget Variance Alert",      trigger:"Property NOI deviates more than 5% from budget in Yardi", action:"Generate variance summary and flag to asset manager in Teams with recommended action", apps:["Yardi","Teams","Claude"],           active:false, runs:0,  lastRun:"Not yet run" },
  { id:12, name:"Broker OM Tracker",          trigger:"New OM received from tracked broker email",               action:"Log broker, property, and asking price. Update pass rate and pricing accuracy in broker intelligence dashboard", apps:["Outlook","SharePoint","Claude"],  active:false, runs:0,  lastRun:"Not yet run" },
  { id:13, name:"Anchor Lease Watch",         trigger:"Anchor tenant lease expires within 18 months (Yardi)",    action:"Trigger renewal strategy workflow — draft renewal offer, notify acquisitions and asset management teams", apps:["Yardi","Outlook","Teams"],       active:true,  runs:2,  lastRun:"Yesterday" },
  { id:14, name:"Weekly Portfolio Snapshot",  trigger:"Every Friday at 4:00 PM",                                 action:"Email one-page portfolio summary to leadership — occupancy, NOI, active deals, key alerts", apps:["Yardi","Outlook","Claude"],        active:false, runs:0,  lastRun:"Not yet run" },
];

const ALL_AUTOMATIONS = [...AUTOMATION_RULES, ...EXTRA_AUTOMATIONS];

// ── AGENTS TAB ─────────────────────────────────────────────────────────────

function AgentsTab() {
  const [agents, setAgents]          = useState(AGENT_CATALOG);
  const [expandedAgent, setExpanded] = useState("ag1");

  const toggleAgent = id => setAgents(prev => prev.map(a => {
    if (a.id !== id) return a;
    const next = a.status==="active" ? "paused" : a.status==="paused" ? "active" : "active";
    return {...a, status:next};
  }));

  const statusStyle = {
    active:    { bg:"#d1fae5", c:"#059669", l:"Active"    },
    paused:    { bg:"#fef3c7", c:"#d97706", l:"Paused"    },
    idle:      { bg:"#f3f4f6", c:"#6b7280", l:"Idle"      },
    available: { bg:"#dbeafe", c:"#2E75B6", l:"Available" },
  };

  return (
    <div>
      <div style={{ background:"#1B2A4A", borderRadius:12, padding:20, marginBottom:20, color:"white" }}>
        <p style={{ fontSize:15, fontWeight:700, margin:"0 0 6px" }}>What is an AI Agent?</p>
        <p style={{ fontSize:13, color:"#c8ddf4", margin:"0 0 14px", lineHeight:1.5 }}>An Agent is an AI that works autonomously toward a specific goal using your connected tools. Unlike a chatbot that waits for questions, an Agent monitors data, takes actions, and reports results — on its own schedule, with defined guardrails.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
          {[
            ["Monitors continuously","Watches SharePoint, Yardi, HubSpot, and market listings so you don't have to."],
            ["Acts with your tools","Sends emails, updates CRM records, generates reports, and schedules meetings."],
            ["Stays in control","Shows exactly what it did. Approval-required agents wait for your sign-off before acting."],
          ].map(([title, desc]) => (
            <div key={title} style={{ background:"rgba(255,255,255,0.08)", borderRadius:8, padding:12 }}>
              <p style={{ fontSize:12, fontWeight:700, color:"#7eb3e8", margin:"0 0 4px" }}>{title}</p>
              <p style={{ fontSize:12, color:"#c8ddf4", margin:0, lineHeight:1.4 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {agents.map(agent => {
        const isExp = expandedAgent===agent.id;
        const sc    = statusStyle[agent.status] || { bg:"#f3f4f6", c:"#6b7280", l:agent.status };
        return (
          <div key={agent.id} style={{ background:"white", borderRadius:12, border:"1px solid "+(agent.status==="active"?agent.color+"44":"#e5e7eb"), marginBottom:10, overflow:"hidden" }}>
            <div style={{ padding:"16px 20px", display:"flex", alignItems:"flex-start", gap:16 }}>
              <div style={{ width:48, height:48, borderRadius:12, background:agent.color+"18", border:"2px solid "+agent.color+"33", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <div style={{ width:20, height:20, borderRadius:"50%", background:agent.color }} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
                  <p style={{ fontSize:15, fontWeight:700, color:"#111827", margin:0 }}>{agent.name}</p>
                  <span style={{ fontSize:11, padding:"2px 8px", borderRadius:10, fontWeight:700, background:sc.bg, color:sc.c }}>{sc.l}</span>
                  {agent.requiresApproval && <span style={{ fontSize:11, padding:"2px 8px", borderRadius:10, fontWeight:600, background:"#fef3c7", color:"#d97706" }}>Requires Approval</span>}
                </div>
                <p style={{ fontSize:12, color:"#6b7280", margin:"0 0 6px", fontStyle:"italic" }}>{agent.tagline}</p>
                <div style={{ fontSize:12, color:"#9ca3af", display:"flex", gap:16, flexWrap:"wrap" }}>
                  <span>{agent.tools.join(", ")}</span>
                  {agent.actionsToday>0 && <span style={{ color:"#059669", fontWeight:600 }}>{agent.actionsToday} actions today</span>}
                </div>
                {agent.status==="active" && <p style={{ fontSize:11, color:"#2E75B6", margin:"4px 0 0" }}>Last: {agent.lastAction}</p>}
              </div>
              <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
                <button onClick={() => setExpanded(isExp?null:agent.id)}
                  style={{ fontSize:12, padding:"5px 12px", borderRadius:6, border:"1px solid #e5e7eb", background:"white", color:"#374151", cursor:"pointer" }}>
                  {isExp?"Collapse":"Details"}
                </button>
                {agent.status!=="available"
                  ? <Toggle on={agent.status==="active"} onChange={() => toggleAgent(agent.id)} />
                  : <button onClick={() => toggleAgent(agent.id)} style={{ fontSize:12, padding:"5px 14px", borderRadius:6, border:"none", background:agent.color, color:"white", cursor:"pointer", fontWeight:600 }}>Activate</button>
                }
              </div>
            </div>
            {isExp && (
              <div style={{ borderTop:"1px solid #f3f4f6", padding:"16px 20px", background:"#fafafa" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <div>
                    <p style={{ fontSize:11, fontWeight:700, color:"#374151", textTransform:"uppercase", letterSpacing:1, margin:"0 0 8px" }}>What this agent does</p>
                    <p style={{ fontSize:13, color:"#6b7280", lineHeight:1.5, margin:"0 0 12px" }}>{agent.desc}</p>
                    <p style={{ fontSize:11, fontWeight:700, color:"#374151", textTransform:"uppercase", letterSpacing:1, margin:"0 0 8px" }}>Capabilities</p>
                    {agent.capabilities.map(cap => (
                      <div key={cap} style={{ display:"flex", gap:8, marginBottom:5 }}>
                        <div style={{ width:6, height:6, borderRadius:"50%", background:agent.color, marginTop:5, flexShrink:0 }} />
                        <p style={{ fontSize:12, color:"#374151", margin:0 }}>{cap}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontSize:11, fontWeight:700, color:"#374151", textTransform:"uppercase", letterSpacing:1, margin:"0 0 8px" }}>Connected Tools</p>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                      {agent.tools.map(t => <span key={t} style={{ fontSize:12, padding:"3px 10px", borderRadius:6, background:"#f3f4f6", color:"#374151", fontWeight:500 }}>{t}</span>)}
                    </div>
                    <div style={{ background:agent.requiresApproval?"#fffbeb":"#f0fdf4", border:"1px solid "+(agent.requiresApproval?"#fde68a":"#bbf7d0"), borderRadius:8, padding:12 }}>
                      <p style={{ fontSize:12, fontWeight:700, color:agent.requiresApproval?"#92400e":"#14532d", margin:"0 0 4px" }}>
                        {agent.requiresApproval ? "Approval Required" : "Fully Autonomous"}
                      </p>
                      <p style={{ fontSize:12, color:agent.requiresApproval?"#b45309":"#166534", margin:0 }}>
                        {agent.requiresApproval ? "Waits for human approval before sending emails or updating records." : "Acts automatically once activated. Review everything in Activity and Audit Log."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── AUTOMATIONS TAB ─────────────────────────────────────────────────────────

const AUTOMATION_CATEGORIES = [
  { label:"All",             color:"#374151" },
  { label:"Acquisitions",    color:"#2E75B6" },
  { label:"Leasing",         color:"#059669" },
  { label:"Asset Management",color:"#7c3aed" },
  { label:"Reporting",       color:"#ea580c" },
];

const AUTOMATION_CATEGORY_MAP = {
  1:"Acquisitions", 2:"Leasing", 3:"Leasing", 4:"Asset Management",
  5:"Leasing", 6:"Acquisitions", 7:"Leasing", 8:"Asset Management",
  9:"Reporting", 10:"Acquisitions", 11:"Asset Management",
  12:"Acquisitions", 13:"Asset Management", 14:"Reporting",
};

function AutomationsTab() {
  const [automations, setAutomations] = useState(ALL_AUTOMATIONS);
  const [catFilter, setCatFilter]     = useState("All");

  const toggleAuto = id => setAutomations(prev => prev.map(a => a.id===id ? {...a, active:!a.active} : a));

  const filtered = catFilter==="All" ? automations : automations.filter(a => AUTOMATION_CATEGORY_MAP[a.id]===catFilter);
  const activeCount = automations.filter(a=>a.active).length;

  return (
    <div>
      {/* Stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:20 }}>
        {[{label:"Total Automations",val:automations.length,color:"#374151"},{label:"Active",val:activeCount,color:"#059669"},{label:"Paused",val:automations.length-activeCount,color:"#9ca3af"},{label:"Runs Today",val:automations.filter(a=>a.lastRun.includes("Today")).length,color:"#2E75B6"}].map(s => (
          <div key={s.label} style={{ background:"white", borderRadius:10, border:"1px solid #e5e7eb", padding:"12px 16px" }}>
            <p style={{ fontSize:11, color:"#9ca3af", margin:"0 0 4px" }}>{s.label}</p>
            <p style={{ fontSize:22, fontWeight:700, color:s.color, margin:0 }}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Category filter + add button */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:8 }}>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {AUTOMATION_CATEGORIES.map(c => (
            <button key={c.label} onClick={() => setCatFilter(c.label)}
              style={{ fontSize:12, padding:"5px 12px", borderRadius:20, border:"1px solid", borderColor:catFilter===c.label?c.color:"#e5e7eb", background:catFilter===c.label?c.color+"18":"white", color:catFilter===c.label?c.color:"#6b7280", fontWeight:600, cursor:"pointer" }}>
              {c.label}
            </button>
          ))}
        </div>
        <button style={{ fontSize:12, padding:"7px 14px", borderRadius:8, border:"none", background:"#2E75B6", color:"white", fontWeight:600, cursor:"pointer" }}>+ New Automation</button>
      </div>

      {/* Automation cards */}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {filtered.map(rule => {
          const cat    = AUTOMATION_CATEGORY_MAP[rule.id] || "General";
          const catObj = AUTOMATION_CATEGORIES.find(c=>c.label===cat) || { color:"#6b7280" };
          return (
            <div key={rule.id} style={{ background:"white", borderRadius:12, border:"1px solid "+(rule.active?"#bbf7d0":"#e5e7eb"), padding:"16px 20px" }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, flexWrap:"wrap" }}>
                    <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, fontWeight:700, background:catObj.color+"18", color:catObj.color }}>{cat}</span>
                    <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>{rule.name}</p>
                    <span style={{ fontSize:11, padding:"2px 8px", borderRadius:10, fontWeight:600, background:rule.active?"#d1fae5":"#f3f4f6", color:rule.active?"#059669":"#9ca3af" }}>
                      {rule.active?"Active":"Paused"}
                    </span>
                  </div>
                  <div style={{ marginBottom:8 }}>
                    <div style={{ display:"flex", gap:8, marginBottom:4, alignItems:"flex-start" }}>
                      <span style={{ fontSize:11, fontWeight:700, color:"#2E75B6", background:"#eff6ff", padding:"2px 6px", borderRadius:4, flexShrink:0 }}>TRIGGER</span>
                      <p style={{ fontSize:12, color:"#374151", margin:0 }}>{rule.trigger}</p>
                    </div>
                    <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                      <span style={{ fontSize:11, fontWeight:700, color:"#059669", background:"#f0fdf4", padding:"2px 6px", borderRadius:4, flexShrink:0 }}>ACTION</span>
                      <p style={{ fontSize:12, color:"#374151", margin:0 }}>{rule.action}</p>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                    <div style={{ display:"flex", gap:6 }}>
                      {rule.apps.map(a => <span key={a} style={{ fontSize:11, padding:"2px 7px", borderRadius:6, background:"#f3f4f6", color:"#374151", fontWeight:500 }}>{a}</span>)}
                    </div>
                    <span style={{ fontSize:11, color:"#9ca3af" }}>{rule.runs > 0 ? `${rule.runs} runs · Last: ${rule.lastRun}` : "Never run"}</span>
                  </div>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
                  <button style={{ fontSize:12, padding:"5px 10px", borderRadius:6, border:"1px solid #e5e7eb", background:"white", color:"#374151", cursor:"pointer" }}>Edit</button>
                  <Toggle on={rule.active} onChange={() => toggleAuto(rule.id)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── PERMISSIONS TAB ────────────────────────────────────────────────────────

function PermissionsTab() {
  const [permissions, setPermissions]   = useState(PERMISSIONS_CONFIG);
  const [expandedPerm, setExpandedPerm] = useState("Microsoft SharePoint");

  const togglePerm = (appName, permName) => setPermissions(prev => prev.map(app => {
    if (app.app !== appName) return app;
    return {...app, permissions: app.permissions.map(p => p.name===permName ? {...p, enabled:!p.enabled} : p)};
  }));

  return (
    <div>
      <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:10, padding:"12px 16px", marginBottom:20 }}>
        <p style={{ fontSize:13, fontWeight:600, color:"#92400e", margin:0 }}>Permissions control what the AI can do — not just what it can see.</p>
        <p style={{ fontSize:12, color:"#b45309", margin:"4px 0 0" }}>Disabling a permission takes effect immediately. The AI will not perform that action until re-enabled.</p>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {permissions.map(app => {
          const isExpanded   = expandedPerm===app.app;
          const enabledCount = app.permissions.filter(p=>p.enabled).length;
          return (
            <div key={app.app} style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
              <button onClick={() => setExpandedPerm(isExpanded?null:app.app)}
                style={{ width:"100%", padding:"14px 20px", display:"flex", alignItems:"center", gap:14, background:"none", border:"none", cursor:"pointer", textAlign:"left" }}>
                <div style={{ width:36, height:36, borderRadius:8, background:app.appColor, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:11, fontWeight:700, flexShrink:0 }}>{app.logo}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>{app.app}</p>
                  <p style={{ fontSize:12, color:"#6b7280", margin:0 }}>{enabledCount} of {app.permissions.length} permissions enabled</p>
                </div>
                <span style={{ color:"#9ca3af" }}>{isExpanded?"▲":"▼"}</span>
              </button>
              {isExpanded && (
                <div style={{ borderTop:"1px solid #f3f4f6" }}>
                  {app.permissions.map(perm => (
                    <div key={perm.name} style={{ padding:"12px 20px 12px 70px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f9fafb" }}>
                      <div>
                        <p style={{ fontSize:13, fontWeight:600, color:"#111827", margin:0 }}>{perm.name}</p>
                        <p style={{ fontSize:12, color:"#6b7280", margin:"2px 0 0" }}>{perm.desc}</p>
                      </div>
                      <Toggle on={perm.enabled} onChange={() => togglePerm(app.app, perm.name)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── ACTIVITY TAB ───────────────────────────────────────────────────────────

function ActivityTab() {
  const [actFilter, setActFilter] = useState("All");
  const typeColors = {
    read:   { color:"#2E75B6", bg:"#dbeafe", label:"Read"   },
    write:  { color:"#059669", bg:"#d1fae5", label:"Write"  },
    send:   { color:"#7c3aed", bg:"#ede9fe", label:"Send"   },
    ingest: { color:"#ea580c", bg:"#ffedd5", label:"Ingest" },
  };
  const filteredActivity = actFilter==="All" ? ACTIVITY_FEED : ACTIVITY_FEED.filter(a=>a.type===actFilter.toLowerCase());

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
        <p style={{ fontSize:13, fontWeight:600, color:"#374151", margin:0 }}>Filter:</p>
        {["All","Read","Write","Send","Ingest"].map(f => {
          const tc = f==="All" ? null : typeColors[f.toLowerCase()];
          return (
            <button key={f} onClick={() => setActFilter(f)}
              style={{ fontSize:12, padding:"5px 12px", borderRadius:20, border:"1px solid", borderColor:actFilter===f?(tc?tc.color:"#111827"):"#e5e7eb", background:actFilter===f?(tc?tc.bg:"#111827"):"white", color:actFilter===f?(tc?tc.color:"white"):"#6b7280", fontWeight:600, cursor:"pointer" }}>
              {f}
            </button>
          );
        })}
      </div>
      <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
        {filteredActivity.map((item, i) => {
          const tc = typeColors[item.type] || typeColors.read;
          return (
            <div key={item.id} style={{ padding:"14px 20px", borderBottom:i<filteredActivity.length-1?"1px solid #f3f4f6":"none", display:"flex", alignItems:"flex-start", gap:14 }}>
              <div style={{ width:36, height:36, borderRadius:8, background:item.appColor, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:11, fontWeight:700, flexShrink:0 }}>
                {item.app.slice(0,2).toUpperCase()}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:"#111827", margin:0 }}>{item.app} — {item.action}</p>
                  <span style={{ fontSize:11, padding:"2px 7px", borderRadius:10, fontWeight:600, background:tc.bg, color:tc.color }}>{tc.label}</span>
                </div>
                <p style={{ fontSize:12, color:"#6b7280", margin:0, lineHeight:1.4 }}>{item.detail}</p>
                <p style={{ fontSize:11, color:"#9ca3af", margin:"4px 0 0" }}>{item.time} · {item.user}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── AUDIT LOG TAB ──────────────────────────────────────────────────────────

function AuditLogTab() {
  const typeColors = {
    read:   { color:"#2E75B6", bg:"#dbeafe", label:"Read"   },
    write:  { color:"#059669", bg:"#d1fae5", label:"Write"  },
    send:   { color:"#7c3aed", bg:"#ede9fe", label:"Send"   },
    ingest: { color:"#ea580c", bg:"#ffedd5", label:"Ingest" },
  };
  return (
    <div>
      <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:10, padding:"12px 16px", marginBottom:20 }}>
        <p style={{ fontSize:13, fontWeight:600, color:"#1e40af", margin:0 }}>Full audit trail of every AI action across all connected tools.</p>
        <p style={{ fontSize:12, color:"#2E75B6", margin:"4px 0 0" }}>Every read, write, send, and automation run is logged. Export at any time for compliance review.</p>
      </div>
      <div style={{ background:"white", borderRadius:12, border:"1px solid #e5e7eb", overflow:"hidden" }}>
        <div style={{ padding:"12px 20px", borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between", background:"#f8fafc" }}>
          <p style={{ fontSize:12, fontWeight:700, color:"#374151", margin:0 }}>Today — April 6, 2026 · {ACTIVITY_FEED.length} actions logged</p>
          <button style={{ fontSize:12, padding:"4px 12px", borderRadius:6, border:"1px solid #e5e7eb", background:"white", color:"#374151", cursor:"pointer" }}>Export CSV</button>
        </div>
        {ACTIVITY_FEED.map((item, i) => {
          const tc = typeColors[item.type] || typeColors.read;
          return (
            <div key={item.id} style={{ padding:"12px 20px", borderBottom:i<ACTIVITY_FEED.length-1?"1px solid #f9fafb":"none", display:"flex", alignItems:"flex-start", gap:14 }}>
              <span style={{ fontSize:11, color:"#9ca3af", whiteSpace:"nowrap", marginTop:2, width:120, flexShrink:0 }}>{item.time}</span>
              <span style={{ fontSize:11, padding:"2px 7px", borderRadius:10, fontWeight:600, background:tc.bg, color:tc.color, flexShrink:0 }}>{tc.label}</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:12, fontWeight:600, color:"#111827", margin:0 }}>{item.app} — {item.action}</p>
                <p style={{ fontSize:12, color:"#6b7280", margin:"2px 0 0" }}>{item.detail}</p>
                <p style={{ fontSize:11, color:"#9ca3af", margin:"3px 0 0" }}>Initiated by: {item.user}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── ROOT COMPONENT ─────────────────────────────────────────────────────────

export default function AiWorkspace() {
  const [tab, setTab] = useState("Agents");

  const activeAgents = AGENT_CATALOG.filter(a=>a.status==="active").length;
  const activeAutos  = ALL_AUTOMATIONS.filter(a=>a.active).length;

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, minHeight:0 }}>
      {/* Header */}
      <div style={{ flexShrink:0, background:"white", borderBottom:"1px solid #e5e7eb", padding:"16px 32px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
          <div>
            <p style={{ fontSize:18, fontWeight:700, color:"#111827", margin:0 }}>AI Workspace</p>
            <p style={{ fontSize:13, color:"#6b7280", marginTop:2 }}>Control what the AI does, when it acts, and how much autonomy it has.</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ textAlign:"center" }}><p style={{ fontSize:20, fontWeight:700, color:"#059669", margin:0 }}>{activeAgents}</p><p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>Agents Active</p></div>
            <div style={{ width:1, height:28, background:"#e5e7eb" }} />
            <div style={{ textAlign:"center" }}><p style={{ fontSize:20, fontWeight:700, color:"#2E75B6", margin:0 }}>{activeAutos}</p><p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>Automations On</p></div>
            <div style={{ width:1, height:28, background:"#e5e7eb" }} />
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"#10b981" }} />
              <span style={{ fontSize:12, color:"#059669", fontWeight:600 }}>AI Active</span>
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:4 }}>
          {["Agents","Automations","Permissions","Activity","Audit Log"].map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding:"8px 20px", fontSize:13, fontWeight:500, border:"none", borderBottom:tab===t?"2px solid #2E75B6":"2px solid transparent", color:tab===t?"#2E75B6":"#6b7280", background:"none", cursor:"pointer" }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex:1, minHeight:0, overflowY:"auto", padding:24, background:"#f8fafc" }}>
        {tab==="Agents"      && <AgentsTab />}
        {tab==="Automations" && <AutomationsTab />}
        {tab==="Permissions" && <PermissionsTab />}
        {tab==="Activity"    && <ActivityTab />}
        {tab==="Audit Log"   && <AuditLogTab />}
      </div>
    </div>
  );
}
