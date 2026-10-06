"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import type { WorkspaceType } from "./types/workspace";

import { DocumentWorkspace } from "./experiences/document-workspace";
import { SpreadsheetWorkspace } from "./experiences/spreadsheet-workspace";
import { KanbanWorkspace } from "./experiences/kanban-workspace";
import { VideoWorkspace } from "./experiences/video-workspace";
import { AIChatWorkspace } from "./experiences/ai-chat-workspace";

const workspaces = {
  document: DocumentWorkspace,
  spreadsheet: SpreadsheetWorkspace,  
  kanban: KanbanWorkspace,
  video: VideoWorkspace,
  chat: AIChatWorkspace,
};

export function WorkspaceStage({
  active,
}: {
  active: WorkspaceType;
}) {
  const Workspace = workspaces[active];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={active}
        initial={{
          opacity: 0,
          y: 8,
          scale: 0.995,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: -5,
        }}
        transition={{
          duration: 0.28,
          ease: "easeOut",
        }}
        className="min-h-[430px]"
      >
        <Workspace />
      </motion.div>
    </AnimatePresence>
  );
}