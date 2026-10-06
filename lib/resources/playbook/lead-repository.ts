export type PlaybookLead = { name: string; company: string; email: string; source: "ai-enabled-enterprise-playbook"; };
export interface PlaybookLeadRepository { save(lead: PlaybookLead): Promise<void>; }
