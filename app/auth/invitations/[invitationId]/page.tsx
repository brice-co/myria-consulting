import { InvitationDetail } from "@/components/labs-registry/invitations/invitation-detail";

type Props={params:Promise<{invitationId:string}>};
export default async function InvitationPage({params}:Props){
    const {invitationId}=await params;
    return <main className="min-h-screen bg-[#f6f1e7] px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#b9802c]">Myria Consulting</p>
                <h1 className="mt-5 font-serif text-5xl leading-[1.05] tracking-[-0.035em] text-[#12313a]">Humans and AI specialists, working in the same advisory room.</h1>
                <p className="mt-6 leading-7 text-[#5f6b6f]">Your invitation gives you access to a private Myria workspace.</p>
                </div>
                <InvitationDetail invitationId={invitationId}/>
                </div>
                </main>}
