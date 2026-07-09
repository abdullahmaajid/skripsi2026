"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, X } from "lucide-react"
import Sidebar from "@/components/layout/Sidebar"
import AIChatPanel from "@/components/layout/AIChatPanel"
import MobileNavbar from "@/components/layout/MobileNavbar"

import { usePathname } from "next/navigation"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const [leftOpen, setLeftOpen] = useState(true)
  const [rightOpen, setRightOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDiagnosticOnboarding, setIsDiagnosticOnboarding] = useState(false)

  // Auto close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false)
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search)
      setIsDiagnosticOnboarding(searchParams.get("onboarding") === "true")
    }
  }, [pathname])

  // Hide right panel completely on active tryout routes (not list, not review) AND admin routes
  const isActiveTryout = /^\/tryout\/[^/]+$/.test(pathname) && !pathname.includes("/list")
  const isAdmin = pathname.startsWith("/admin")
  const actualRightOpen = (isActiveTryout || isAdmin) ? false : rightOpen
  const showRightPanel = !isActiveTryout && !isAdmin
  const showLeftPanel = !(isActiveTryout && isDiagnosticOnboarding)

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[var(--background)]">
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden px-4 lg:px-4 py-4 lg:py-5 gap-4 lg:gap-4 relative">
        
        {/* Floating Open Buttons (Visible when panels are closed) */}
        <AnimatePresence>
          {!leftOpen && showLeftPanel && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => setLeftOpen(true)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-3 rounded-r-2xl hover:bg-slate-50 transition-colors"
            >
              <PanelLeftOpen className="w-5 h-5 text-slate-500" />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRightPanel && !actualRightOpen && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => setRightOpen(true)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-3 rounded-l-2xl hover:bg-slate-50 transition-colors"
            >
              <PanelRightOpen className="w-5 h-5 text-slate-500" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Left: Sidebar Navigation (Desktop) */}
        <AnimatePresence>
          {leftOpen && showLeftPanel && (
            <motion.div
              initial={{ width: 0, opacity: 0, marginLeft: -20 }}
              animate={{ width: "16rem", opacity: 1, marginLeft: 0 }}
              exit={{ width: 0, opacity: 0, marginLeft: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0 hidden lg:flex relative overflow-hidden"
            >
              <div className="w-64 h-full shrink-0">
                <Sidebar onClose={() => setLeftOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Left: Sidebar Navigation (Mobile Drawer) */}
        <AnimatePresence>
          {mobileMenuOpen && showLeftPanel && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] lg:hidden"
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed inset-y-0 left-0 w-72 bg-white z-[70] shadow-2xl flex flex-col lg:hidden"
              >
                <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                  <Sidebar onClose={() => setMobileMenuOpen(false)} />
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Middle: Page Content */}
        <main className="flex-1 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] overflow-y-auto no-scrollbar relative z-0 transition-all duration-300 ease-in-out lg:mb-0 mb-[70px]">
          {children}
        </main>

        {/* Right: AI Chat Panel (hidden on tryout routes) */}
        <AnimatePresence>
          {showRightPanel && actualRightOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0, marginRight: -20 }}
              animate={{ width: "380px", opacity: 1, marginRight: 0 }}
              exit={{ width: 0, opacity: 0, marginRight: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0 flex hidden lg:flex relative overflow-hidden"
            >
              <div className="w-[380px] h-full shrink-0">
                <AIChatPanel onClose={() => setRightOpen(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Bottom Navigation */}
        <MobileNavbar onMenuClick={() => setMobileMenuOpen(true)} />

      </div>
    </div>
  )
}
