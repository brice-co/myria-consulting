import { EmailOtpSignIn } from "@/components/labs-registry/auth/email-otp-sign-in";

type Props = { searchParams: Promise<{ returnTo?: string }> };

export default async function SignInPage({ searchParams }: Props) {
  const { returnTo } = await searchParams;
  return <main className="min-h-screen bg-[#f6f1e7] px-6 py-16 sm:py-24">
    <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center"><div>
      <p className="text-[10px] uppercase tracking-[0.28em] text-[#b9802c]">Myria Consulting</p>
      <h1 className="mt-5 max-w-2xl font-serif text-5xl leading-[1.05] tracking-[-0.035em] text-[#12313a] sm:text-6xl">
        Your private advisory workspace.
        </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f6b6f]">
        Access is reserved for invited participants working with Myria.
        </p>
      </div>
      <EmailOtpSignIn returnTo={returnTo}/>
      </div>
      </main>;
}
