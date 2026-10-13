import { MyInvitations } from "@/components/labs-registry/invitations/my-invitations";
import { requireSession } from "@/lib/labs-registry/access/require-session";

export default async function InvitationsPage(){
    await requireSession();
    return <main className="min-h-screen bg-[#f6f1e7] px-6 py-16">
        <div className="mx-auto max-w-5xl"><MyInvitations/>
        </div>
        </main>}
