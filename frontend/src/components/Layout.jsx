import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ToastProvider } from "../context/ToastContext";

function Layout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchGlobal, setSearchGlobal] = useState("");

  return (
    <ToastProvider>
      <div className="app-shell">
        <Sidebar
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />
        <div className="main-wrapper">
          <Header
            onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
            searchGlobal={searchGlobal}
            setSearchGlobal={setSearchGlobal}
          />
          <main className="page-content">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}

export default Layout;