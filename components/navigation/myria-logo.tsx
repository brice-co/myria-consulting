import Link from "next/link";
import Image from "next/image";

export function MyriaLogo() {
  return (
    <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Myria Consulting home"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary">
          <Image
            src="/images/myria-logo.png"
            alt="Myria Consulting"
            width={140}
            height={40}
            priority
            className="h-6 w-6 object-contain brightness-0 invert"
          />
          </span>

          <span className="font-serif text-xl tracking-tight">
            Myria Consulting
          </span>
        </Link>
  );
}