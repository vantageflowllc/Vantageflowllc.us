"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // service worker registration is best-effort; ignore failures
      });
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      const alreadyDismissed = window.localStorage.getItem("vf_install_dismissed");
      if (!alreadyDismissed) setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
  };

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    window.localStorage.setItem("vf_install_dismissed", "true");
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          className="fixed bottom-4 left-4 right-4 z-40 flex items-center gap-3 border border-line bg-bone p-4 shadow-lg dark:border-line-dark dark:bg-ink-soft sm:left-auto sm:right-4 sm:w-96"
        >
          <div className="flex h-10 w-10 flex-none items-center justify-center bg-ink text-bone dark:bg-bone dark:text-ink">
            <Download size={18} strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Install Vantage Flow</p>
            <p className="text-xs text-stone-dark dark:text-stone">
              Add to your home screen for quicker access.
            </p>
          </div>
          <button onClick={install} className="text-xs uppercase tracking-wide underline">
            Install
          </button>
          <button aria-label="Dismiss install prompt" onClick={dismiss}>
            <X size={16} strokeWidth={1.5} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
