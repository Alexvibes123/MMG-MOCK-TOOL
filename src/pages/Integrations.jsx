import { useState } from "react";
import { INTEGRATION_GROUPS } from "../data";

export default function Integrations() {
  const [connectedMap, setConnectedMap] = useState(() => {
    const m = {};
    INTEGRATION_GROUPS.forEach(g => g.integrations.forEach(i => { m[i.name] = i.status==="connected"; }));
    return m;
  });
  const [connectingMap, setConnectingMap] = useState({});
  const [search, setSearch]               = useState("");
  const [filterStatus, setFilterStatus]   = useState("All");

  const totalConnected = Object.values(connectedMap).filter(Boolean).length;
  const totalAvailable = Object.values(connectedMap).filter(v => !v).length;

  const handleConnect = name => {
    setConnectingMap(p => ({...p, [name]:true}));
    setTimeout(() => {
      setConnectingMap(p => ({...p, [name]:false}));
      setConnectedMap(p => ({...p, [name]:true}));
    }, 1500);
  };

  const handleDisconnect = name => setConnectedMap(p => ({...p, [name]:false}));

  return (
    <div style={{ flex:1, overflowY:"auto", background:"#f8fafc" }}>
      {/* Sticky header */}
      <div style={{ background:"white", borderBottom:"1px solid #e5e7eb", padding:"20px 32px", position:"sticky", top:0, zIndex:10 }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
          <div>
            <p style={{ fontSize:18, fontWeight:700, color:"#111827", margin:0 }}>Integrations</p>
            <p style={{ fontSize:13, color:"#6b7280", margin:"4px 0 0" }}>Connect your tools so the AI can work across your entire stack.</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <div style={{ textAlign:"center" }}>
              <p style={{ fontSize:22, fontWeight:700, color:"#059669", margin:0 }}>{totalConnected}</p>
              <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>Connected</p>
            </div>
            <div style={{ width:1, height:28, background:"#e5e7eb" }} />
            <div style={{ textAlign:"center" }}>
              <p style={{ fontSize:22, fontWeight:700, color:"#9ca3af", margin:0 }}>{totalAvailable}</p>
              <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>Available</p>
            </div>
          </div>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ flex:1, maxWidth:340, display:"flex", alignItems:"center", gap:8, border:"1px solid #e5e7eb", borderRadius:8, padding:"8px 12px", background:"white" }}>
            <svg width="15" height="15" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              style={{ flex:1, fontSize:13, color:"#111827", outline:"none", border:"none" }} placeholder="Search integrations..." />
          </div>
          {["All","Connected","Available"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{ fontSize:12, padding:"6px 14px", borderRadius:20, border:"1px solid", borderColor:filterStatus===s?"#111827":"#e5e7eb", background:filterStatus===s?"#111827":"white", color:filterStatus===s?"white":"#6b7280", fontWeight:600, cursor:"pointer" }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Integration groups */}
      <div style={{ padding:"24px 32px" }}>
        {INTEGRATION_GROUPS.map(group => {
          const visibleItems = group.integrations.filter(item => {
            const ms = item.name.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase());
            const mf = filterStatus==="All" || (filterStatus==="Connected"&&connectedMap[item.name]) || (filterStatus==="Available"&&!connectedMap[item.name]);
            return ms && mf;
          });
          if (!visibleItems.length) return null;

          return (
            <div key={group.cat} style={{ marginBottom:28 }}>
              <div style={{ marginBottom:12 }}>
                <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>{group.cat}</p>
                <p style={{ fontSize:12, color:"#9ca3af", margin:"2px 0 0" }}>{group.desc}</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {visibleItems.map(item => {
                  const isC   = connectedMap[item.name];
                  const isCing = connectingMap[item.name];
                  return (
                    <div key={item.name} style={{ background:"white", borderRadius:12, border:"1px solid "+(isC?item.color+"44":"#e5e7eb"), padding:16, display:"flex", alignItems:"flex-start", gap:14 }}>
                      {/* Logo */}
                      <div style={{ width:40, height:40, borderRadius:8, background:item.color, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:12, fontWeight:700, flexShrink:0 }}>
                        {item.logo}
                      </div>

                      {/* Info */}
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:4 }}>
                          <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>{item.name}</p>
                          {item.tag && (
                            <span style={{ fontSize:11, padding:"2px 6px", borderRadius:4, fontWeight:700, background:item.tag==="Core"?"#1B2A4A":"#eff6ff", color:item.tag==="Core"?"white":"#2E75B6" }}>
                              {item.tag}
                            </span>
                          )}
                          {isC && (
                            <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                              <div style={{ width:6, height:6, borderRadius:"50%", background:"#10b981" }} />
                              <span style={{ fontSize:11, color:"#059669", fontWeight:600 }}>Connected</span>
                            </div>
                          )}
                        </div>
                        <p style={{ fontSize:12, color:"#9ca3af", lineHeight:1.5, margin:"0 0 10px" }}>{item.desc}</p>
                        <div style={{ display:"flex", gap:8 }}>
                          {isC ? (
                            <>
                              <button style={{ fontSize:12, padding:"4px 10px", borderRadius:6, border:"1px solid #e5e7eb", background:"white", color:"#374151", cursor:"pointer" }}>Configure</button>
                              <button onClick={() => handleDisconnect(item.name)} style={{ fontSize:12, padding:"4px 10px", borderRadius:6, border:"1px solid #fca5a5", background:"white", color:"#ef4444", cursor:"pointer" }}>Disconnect</button>
                            </>
                          ) : (
                            <button onClick={() => handleConnect(item.name)}
                              style={{ fontSize:12, padding:"4px 12px", borderRadius:6, border:"none", background:isCing?"#f3f4f6":item.color, color:isCing?"#9ca3af":"white", cursor:"pointer", fontWeight:600 }}>
                              {isCing ? "Connecting..." : "Connect"}
                            </button>
                          )}
                          <button style={{ fontSize:12, color:"#9ca3af", background:"none", border:"none", cursor:"pointer" }}>Learn more</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
