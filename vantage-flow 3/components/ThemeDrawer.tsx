"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun, X, Check } from "lucide-react";
import { useTheme, accentOptions } from "@/context/ThemeContext";

export default function ThemeDrawer({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { darkMode, toggleDarkMode, accent, setAccent } = useTheme();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-bone dark:bg-ink"
          >
            <div className="flex items-center justify-between border-b border-line dark:border-line-dark p-5">
              <h2 className="font-display text-xl tracking-tightest">Display</h2>
              <button aria-label="Close display settings" onClick={onClose}>
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <div className="mb-8">
                <p className="eyebrow mb-3">Appearance</p>
                <button
                  onClick={toggleDarkMode}
                  className="flex w-full items-center justify-between border border-line dark:border-line-dark px-4 py-3.5"
                >
                  <span className="flex items-center gap-2 text-sm">
                    {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                    {darkMode ? "Dark Mode" : "Light Mode"}
                  </span>
                  <span
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      darkMode ? "bg-flow" : "bg-line dark:bg-line-dark"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-bone shadow transition-transform ${
                        darkMode ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </span>
                </button>
              </div>

              <div>
                <p className="eyebrow mb-3">Accent Color</p>
                <div className="grid grid-cols-5 gap-3">
                  {accentOptions.map((opt) => (
                    <button
                      key={opt.key}
                      aria-label={opt.label}
                      onClick={() => setAccent(opt.key)}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all"
                        style={{
                          backgroundColor: opt.swatch,
                          borderColor: accent === opt.key ? opt.swatch : "transparent"
                        }}
                      >
                        {accent === opt.key && <Check size={16} className="text-bone" />}
                      </span>
                      <span className="text-[10px] text-stone-dark dark:text-stone">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-8 text-xs text-stone-dark dark:text-stone leading-relaxed">
                Your display preferences are saved to this device and applied
                automatically next time you visit.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
