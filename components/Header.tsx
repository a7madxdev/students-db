"use client";

import { Settings as SettingsIcon } from "lucide-react";
import Settings from "./Settings";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

function Header() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  return (
    <header className="flex items-center bg-light border-b border-secondary p-3 text-slate-800">
      <div className="flex-1 flex items-center gap-2">
        <h3 className="font-semibold">أحمد بدرالدين</h3>
        <p className="text-xs text-slate-200 bg-slate-600 py-0.5 px-2 rounded-full">
          زول ساي
        </p>
      </div>
      <button onClick={() => setIsSettingsOpen((prev) => !prev)}>
        <SettingsIcon />
      </button>
      <AnimatePresence>
        {isSettingsOpen && <Settings close={() => setIsSettingsOpen(false)} />}
      </AnimatePresence>
    </header>
  );
}

export default Header;
