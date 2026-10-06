import type { PlaybookLead, PlaybookLeadRepository } from "./lead-repository";

 import { db } from "@/db";
 import { resourceLeads } from "@/db/schema/resource-leads";
export class DrizzlePlaybookLeadRepository implements PlaybookLeadRepository {
  async save(lead: PlaybookLead) {
     await db.insert(resourceLeads).values({ ...lead, resourceType: "playbook", resourceSlug: lead.source });
    console.info("[playbook-lead] persistence adapter placeholder", { email: lead.email, company: lead.company });
  }
}
