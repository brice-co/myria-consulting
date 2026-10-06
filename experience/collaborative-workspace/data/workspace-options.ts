import {
  FileText,
  GitBranch,
  KanbanSquare,
  MessageSquare,
  Sheet,
  Video,
  Workflow,
} from "lucide-react";

import type { WorkspaceOption } from "../types/workspace";

export const workspaceOptions: WorkspaceOption[] = [
  {
    id: "document",
    label: "Document",
    description: "Think and write together",
    icon: FileText,
  },
  {
    id: "spreadsheet",
    label: "Spreadsheet",
    description: "Analyze business data",
    icon: Sheet,
  },
   
  {
    id: "kanban",
    label: "Kanban",
    description: "Turn decisions into work",
    icon: KanbanSquare,
  },
  {
    id: "video",
    label: "Video",
    description: "Meet and decide live",
    icon: Video,
  },
  {
    id: "chat",
    label: "AI Chat",
    description: "Work with Myria AI",
    icon: MessageSquare,
  },
];