import type { LucideIcon } from "lucide-react";

export type WorkspaceType =
  | "document"
  | "spreadsheet" 
  | "kanban"
  | "video"
  | "chat";

export type WorkspaceOption = {
  id: WorkspaceType;
  label: string;
  description: string;
  icon: LucideIcon;
};

export type Participant = {
  id: string;
  name: string;
  initials: string;
  role: string;
  color: string;
};