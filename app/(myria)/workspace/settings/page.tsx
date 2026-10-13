import { OrganizationSwitcher } from "@/components/labs-registry/workspace/organization-switcher";

export default function Page(){
    return <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#b9802c]">
            Workspace settings</p>
            
            <h1 className="mt-3 font-serif text-4xl text-[#12313a]">
                Organization context
                </h1>
                
                <p className="mt-4 max-w-2xl leading-7 text-[#5f6b6f]">
                    Better Auth stores the active organization on the session. 
                    Switch organization context here when a user belongs to more
                    than one workspace.
                    </p>
                    
                    <div className="mt-8">
                        <OrganizationSwitcher/>
                        </div>
                    </div>
                }
