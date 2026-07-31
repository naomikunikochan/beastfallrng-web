import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111] px-5 py-14 text-center text-white lg:px-8">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        <a
          href="https://www.tiktok.com/@5s.stud1o"
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
          </svg>
        </a>

        <Image
          src="/logo.png"
          alt="Beastfall RNG"
          width={480}
          height={129}
          className="mt-12 h-auto w-[min(78vw,320px)] object-contain"
        />

        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">
            Supported by
          </p>
          <a
            href="https://slashtech.id/"
            target="_blank"
            rel="noreferrer"
            aria-label="Slash Tech"
            className="transition hover:opacity-80"
          >
            <Image
              src="/slash-logo.png"
              alt="Slash logo"
              width={180}
              height={64}
              className="h-10 w-auto object-contain"
            />
          </a>
        </div>

        <p className="mt-8 max-w-2xl text-sm font-medium leading-6 text-slate-400">
          © 2026 Beastfall RNG.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-black uppercase tracking-wide text-white">
          <Link href="/artikel" className="hover:text-[#2563EB]">
            Artikel
          </Link>
          <Link href="/game/panduan" className="hover:text-[#2563EB]">
            Cara Bermain
          </Link>
          <Link href="/media" className="hover:text-[#2563EB]">
            Media
          </Link>
        </div>
      </div>
    </footer>
  );
}
