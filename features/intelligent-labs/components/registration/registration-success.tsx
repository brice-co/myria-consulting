export function RegistrationSuccess() {
  return (
    <section
      role="status"
      className="rounded-3xl border border-[#dcd4c6] bg-white p-10"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-[#b9802c]">
        Registration received
      </p>
      <h2 className="mt-4 font-serif text-3xl text-[#12313a]">
        Thank you for your interest.
      </h2>
      <p className="mt-4 leading-7 text-[#5f6b6f]">
        Your preferences have been recorded. We will contact selected participants
        when sessions are scheduled.
      </p>
    </section>
  );
}
