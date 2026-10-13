import type { ReactNode } from "react";
import { WorkspaceShell } from "@/components/labs-registry/workspace/workspace-shell";
import { requireWorkspace } from "@/lib/labs-registry/access/require-workspace";

type Props = { children: ReactNode };

export default async function WorkspaceLayout({ children }: Props) {
  await requireWorkspace();
  return <WorkspaceShell>{children}</WorkspaceShell>;
}
