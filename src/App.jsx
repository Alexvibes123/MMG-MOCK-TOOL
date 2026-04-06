import { useState } from "react";
import { NAV_ITEMS } from "./data";
import { ProfileModal, ProfileDropdown } from "./shared";

import SmartDocAccess    from "./pages/SmartDocAccess";
import OmDiscovery       from "./pages/OmDiscovery";
import OmDetail          from "./pages/OmDetail";
import TenantProspecting from "./pages/TenantProspecting";
import OutreachPipeline  from "./pages/OutreachPipeline";
import Integrations      from "./pages/Integrations";
import AiWorkspace       from "./pages/AiWorkspace";

// ── SIDEBAR ────────────────────────────────────────────────────────────────

function Sidebar({ activeTool, setActiveTool, onProfileClick, onClose }) {
  return (
    <div style={{ width:224, flexShrink:0, display:"flex", flexDirection:"column", height:"100%", background:"#1B2A4A" }}>
      {/* Logo + collapse */}
      <div style={{ padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #2d4068" }}>
        <div>
          <p style={{ fontWeight:700, fontSize:13, color:"white", margin:0 }}>MMG Equity Partners</p>
          <p style={{ fontSize:11, color:"#7eb3e8", margin:0 }}>AI Platform</p>
        </div>
        <button onClick={onClose}
          style={{ background:"none", border:"none", color:"#7eb3e8", fontSize:18, cursor:"pointer", lineHeight:1 }}>
          ‹
        </button>
      </div>

      {/* Nav */}
      <div style={{ padding:"16px 12px 8px" }}>
        <p style={{ fontSize:10, color:"#7eb3e8", textTransform:"uppercase", letterSpacing:2, fontWeight:600, margin:"0 0 8px 4px" }}>Tools</p>
        {NAV_ITEMS.map(item => {
          const active = activeTool===item.id;
          return (
            <button key={item.id} onClick={() => setActiveTool(item.id)}
              style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"8px 10px", borderRadius:8, border:"none", background:active?"#2E75B6":"transparent", cursor:"pointer", textAlign:"left", marginBottom:2 }}
              onMouseEnter={e => { if(!active) e.currentTarget.style.background="rgba(255,255,255,0.07)"; }}
              onMouseLeave={e => { if(!active) e.currentTarget.style.background="transparent"; }}>
              <span style={{ width:22, height:22, borderRadius:5, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0, background:active?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.1)", color:active?"white":"#b0c8e8" }}>
                {item.icon}
              </span>
              <span style={{ fontSize:12, fontWeight:active?600:400, color:active?"white":"#c8ddf4", lineHeight:1.3 }}>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ flex:1 }} />

      {/* User row */}
      <button onClick={onProfileClick}
        style={{ padding:"12px 16px", display:"flex", alignItems:"center", gap:10, width:"100%", background:"none", border:"none", borderTop:"1px solid #2d4068", cursor:"pointer", textAlign:"left" }}
        onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.06)"}
        onMouseLeave={e => e.currentTarget.style.background="none"}>
        <div style={{ width:32, height:32, background:"#2E75B6", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:12, fontWeight:700, flexShrink:0 }}>SM</div>
        <div style={{ minWidth:0 }}>
          <p style={{ fontSize:13, fontWeight:600, color:"white", margin:0 }}>Sarah Mitchell</p>
          <p style={{ fontSize:11, color:"#7eb3e8", margin:0 }}>Asset Management</p>
        </div>
      </button>
    </div>
  );
}

// ── APP SHELL ──────────────────────────────────────────────────────────────

export default function App() {
  const [activeTool, setActiveTool]       = useState("docs");
  const [sidebarOpen, setSidebarOpen]     = useState(true);
  const [profileDropOpen, setProfileDropOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileSection, setProfileSection]   = useState("profile");

  const toolContent = {
    docs:         <SmartDocAccess />,
    om_discovery: <OmDiscovery />,
    om_detail:    <OmDetail />,
    prospecting:  <TenantProspecting />,
    pipeline:     <OutreachPipeline />,
    integrations: <Integrations />,
    workspace:    <AiWorkspace />,
  };

  const currentNav = NAV_ITEMS.find(n => n.id===activeTool) || NAV_ITEMS[0];

  const openModal = section => {
    setProfileSection(section);
    setProfileModalOpen(true);
    setProfileDropOpen(false);
  };

  return (
    <div style={{ display:"flex", height:"100vh", fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background:"#0F1B2D", overflow:"hidden" }}>

      {/* Sidebar */}
      {sidebarOpen && (
        <Sidebar
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          onProfileClick={() => setProfileDropOpen(o => !o)}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* Main area */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0, background:"white", overflow:"hidden" }}>

        {/* Top header */}
        <div style={{ flexShrink:0, background:"white", borderBottom:"1px solid #e5e7eb", padding:"0 20px", height:52, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            {/* Hamburger */}
            <button onClick={() => setSidebarOpen(o => !o)}
              style={{ width:28, height:28, borderRadius:6, border:"none", background:"#f3f4f6", color:"#6b7280", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <div>
              <p style={{ fontSize:15, fontWeight:700, color:"#111827", margin:0, lineHeight:1.2 }}>{currentNav.label}</p>
              <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>MMG Equity Partners · South Florida Portfolio · 40+ Properties</p>
            </div>
          </div>

          {/* Avatar + dropdown */}
          <div style={{ marginRight:8, position:"relative" }}>
            <div onClick={() => setProfileDropOpen(o => !o)}
              style={{ width:34, height:34, borderRadius:"50%", background:"#2E75B6", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:12, fontWeight:700, cursor:"pointer" }}>
              SM
            </div>
            {profileDropOpen && (
              <ProfileDropdown
                onClose={() => setProfileDropOpen(false)}
                onOpenModal={openModal}
              />
            )}
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex:1, minHeight:0, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          {toolContent[activeTool]}
        </div>
      </div>

      {/* Profile modal */}
      {profileModalOpen && (
        <ProfileModal
          onClose={() => setProfileModalOpen(false)}
          initialSection={profileSection}
        />
      )}
    </div>
  );
}
