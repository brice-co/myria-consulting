// src/components/myria-os/os-logo.tsx

import Image from "next/image";
import Link from "next/link";

export function OSLogo() {
  return (
    <Link
      href="/myria-os"
      className="flex items-center gap-3"
    >
      <Image
        src="/images/myria-logo.png"
        alt="Myria"
        width={34}
        height={34}
        className="object-contain"
        priority
      />

      <div>
        <div className="font-serif text-lg text-white">
          Myria OS
        </div>

        <div className="text-[10px] uppercase tracking-[0.2em] text-white/45">
          Collaborative Intelligence
        </div>
      </div>
    </Link>
  );
}