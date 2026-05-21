import Image from "next/image";
import Link from "next/link";
import {SOCIALS as socials} from "@/lib/data"


export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-purple-500/10 bg-[#09090f]">
      <div className="pointer-events-none absolute inset-x-0 -top-20 flex justify-center">
        <div className="h-40 w-[700px] rounded-full bg-purple-700/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-8 px-6 py-8">
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/logo.png"
            alt="PrepHire Logo"
            width={220}
            height={60}
            className="h-20 w-auto object-contain drop-shadow-[0_0_12px_rgba(130,80,255,0.45)]"
          />
          <p className="flex items-center gap-2.5 text-[10.5px] font-light tracking-[0.28em] uppercase text-purple-200/35">
            <span>Prepare</span>
            <span className="inline-block h-[3px] w-[3px] rounded-full bg-violet-500/45" />
            <span>Practice</span>
            <span className="inline-block h-[3px] w-[3px] rounded-full bg-violet-500/45" />
            <span>Get Hired</span>
          </p>
        </div>

        <div className="h-px w-9 bg-gradient-to-r from-transparent via-violet-500/45 to-transparent" />

        <div className="flex items-center gap-2">
          {socials.map(({ href, label, svg }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-500/[0.18] bg-violet-500/[0.04] text-purple-200/45 transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-500/60 hover:bg-violet-500/10 hover:text-violet-300"
            >
              {svg}
            </Link>
          ))}
        </div>

        <div className="w-full border-t border-violet-500/[0.07] pt-5 text-center">
          <p className="text-[11px] font-light tracking-[0.12em] uppercase text-purple-200/[0.18]">
            © {new Date().getFullYear()} PrepHire — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}