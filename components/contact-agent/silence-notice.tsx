"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock3 } from "lucide-react";

export function SilenceNotice({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          className="absolute left-4 right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-[#b57b2a]/20 bg-[#fff8ea]/95 px-4 py-2 text-xs text-[#7b5b29] shadow-sm backdrop-blur">
          <Clock3 className="h-3.5 w-3.5" /> Still there? The voice session will close automatically after a period of silence.
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
