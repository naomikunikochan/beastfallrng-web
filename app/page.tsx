import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { formatArticleDate, getArticles } from "@/lib/articles";

type RobloxGame = {
  playing?: number;
  visits?: number;
};

type RobloxGamesResponse = {
  data?: RobloxGame[];
};

const heroActions = [
  {
    label: "Artikel",
    eyebrow: "Baca update",
    href: "/artikel",
    icon: "/news.png?v=2",
  },
  {
    label: "Mainkan",
    eyebrow: "Masuk game",
    href: "https://www.roblox.com/games/106592528242987",
    external: true,
    icon: "/play.png?v=2",
  },
  {
    label: "Cara Bermain",
    eyebrow: "Panduan awal",
    href: "/game/panduan",
    icon: "/book.png?v=2",
  },
];

const numberFormatter = new Intl.NumberFormat("id-ID");

const teamMembers = [
  {
    name: "Yoga",
    role: "Website Developer",
    initials: "YG",
  },
  {
    name: "5S Studio",
    role: "Game Creator",
    initials: "5S",
  },
  {
    name: "Community",
    role: "Player Support",
    initials: "CM",
  },
];

async function getRobloxStats() {
  try {
    const response = await fetch(
      "https://games.roblox.com/v1/games?universeIds=10259523338",
      {
        method: "GET",
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return { playing: 0, visits: 0 };
    }

    const result = (await response.json()) as RobloxGamesResponse;
    const game = result.data?.[0];

    return {
      playing: game?.playing ?? 0,
      visits: game?.visits ?? 0,
    };
  } catch {
    return { playing: 0, visits: 0 };
  }
}

export default async function Home() {
  const stats = await getRobloxStats();
  const latestArticles = (await getArticles()).slice(0, 3);

  return (
    <main className="bg-black text-white">
      <section className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden">
        <video
          className="absolute inset-0 -z-30 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.jpg"
          preload="metadata"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.52)_0%,rgba(0,0,0,0.68)_42%,rgba(0,0,0,0.94)_100%)]" />
        <div className="animate-soft-pulse absolute left-[8%] top-[18%] -z-20 h-56 w-56 rounded-full bg-[#2563EB]/25 blur-3xl" />
        <div className="animate-slow-drift absolute bottom-[14%] right-[10%] -z-20 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute inset-0 -z-40 bg-[linear-gradient(135deg,#0b1220_0%,#020617_42%,#000_100%)]" />

        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center justify-center px-5 py-16 text-center lg:px-8">
          <h1 className="animate-fade-up">
            <Image
              src="/logo.png"
              alt="Beastfall RNG"
              width={960}
              height={257}
              priority
              className="mx-auto h-auto w-[min(92vw,760px)] object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.55)]"
            />
          </h1>

          {/* <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-100 sm:text-2xl">
            Roll keberuntunganmu, kumpulkan weapon langka, dan jadilah yang
            terkuat.
          </p> */}

          <div className="animate-fade-up animation-delay-150 mt-12 grid w-full max-w-5xl grid-cols-3 gap-2 sm:gap-4">
            {heroActions.map((action) => {
              const content = (
                <>
                  <Image
                    src={action.icon}
                    alt=""
                    width={208}
                    height={208}
                    unoptimized
                    className="h-24 w-24 object-contain transition duration-300 group-hover:-translate-y-2 group-hover:scale-105 sm:h-48 sm:w-48"
                  />
                  <span className="mt-4 text-xs font-semibold text-slate-300 sm:mt-6 sm:text-sm">
                    {action.eyebrow}
                  </span>
                  <span className="text-lg font-black leading-tight text-white sm:text-3xl">
                    {action.label}
                  </span>
                </>
              );

              const className =
                "group flex min-h-44 flex-col items-center justify-center px-2 py-5 transition duration-300 hover:-translate-y-2 sm:min-h-72 sm:px-6 sm:py-8";

              if (action.external) {
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noreferrer"
                    className={className}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link key={action.label} href={action.href} className={className}>
                  {content}
                </Link>
              );
            })}
          </div>

          <div className="animate-fade-up animation-delay-300 mt-6 grid w-full max-w-5xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/[0.04] px-6 py-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
              <p className="text-sm font-semibold text-slate-400">Sedang Bermain</p>
              <p className="mt-2 text-4xl font-black text-white">
                {numberFormatter.format(stats.playing)}
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] px-6 py-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.07]">
              <p className="text-sm font-semibold text-slate-400">Pengunjung</p>
              <p className="mt-2 text-4xl font-black text-white">
                {numberFormatter.format(stats.visits)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ece8e1] px-5 py-20 text-[#111827] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-10 flex items-center justify-between gap-6">
            <h2 className="text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Artikel Terbaru
            </h2>
            <Link
              href="/artikel"
              className="hidden text-sm font-semibold uppercase tracking-wide transition hover:text-[#2563EB] sm:inline-flex"
            >
              Buka Halaman Artikel ↗
            </Link>
          </ScrollReveal>

          <div className="grid gap-8 lg:grid-cols-3">
            {latestArticles.map((article, index) => (
              <ScrollReveal key={article.title} delay={index * 120}>
              <Link href={`/artikel/${article.slug}`} className="group block transition duration-300 hover:-translate-y-2">
                <div
                  className={`relative h-56 overflow-hidden ${article.image_class}`}
                  style={
                    article.image_url
                      ? {
                          backgroundImage: `url(${article.image_url})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }
                      : undefined
                  }
                >
                  <div className="absolute inset-4 border border-white/30" />
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-black/70 text-white transition group-hover:bg-[#2563EB]">
                    ↗
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3 text-xs font-black uppercase">
                  <span className="text-[#2563EB]">{article.category}</span>
                  <span className="h-4 w-px bg-[#111827]/30" />
                  <span>{formatArticleDate(article.published_at)}</span>
                </div>

                <h3 className="mt-4 text-2xl font-black leading-snug transition group-hover:text-[#2563EB]">
                  {article.title}
                </h3>
                <p className="mt-3 max-w-md text-base font-medium leading-7 text-[#111827]/80">
                  {article.description}
                </p>
              </Link>
              </ScrollReveal>
            ))}
          </div>

          <Link
            href="/artikel"
            className="mt-10 inline-flex text-sm font-semibold uppercase tracking-wide transition hover:text-[#2563EB] sm:hidden"
          >
            Buka Halaman Artikel ↗
          </Link>
        </div>
      </section>

      <section
        className="relative isolate overflow-hidden px-5 py-24 text-white lg:px-8 lg:py-32"
        style={{
          backgroundImage:
            "linear-gradient(90deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.35)_40%,rgba(0,0,0,0.82)_100%),url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=2400&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_34%,rgba(37,99,235,0.22),transparent_30%)]" />

        <ScrollReveal className="mx-auto flex max-w-7xl justify-end">
          <div className="max-w-xl text-right">
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Akses Awal Beastfall RNG Telah Rilis
            </h2>
            <p className="mt-6 text-lg font-semibold leading-8 text-slate-200">
              Masuki dunia Beastfall RNG, roll keberuntunganmu, kumpulkan item
              langka, dan mulai progresmu dari sekarang sebelum update besar
              berikutnya hadir.
            </p>
            <a
              href="https://www.roblox.com/games/106592528242987"
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center justify-center bg-[#2563EB] px-8 py-4 text-base font-black uppercase text-white transition hover:bg-[#1D4ED8]"
            >
              Mainkan Sekarang
            </a>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-black px-5 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.36em] text-[#2563EB]">
              Our Team
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl">
              Tim di Balik Beastfall RNG
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-slate-400">
              Kami membangun pengalaman Beastfall RNG bersama komunitas, dari
              game, website, sampai dukungan pemain.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 120}>
              <article className="group border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-2 hover:border-[#2563EB]/70 hover:bg-white/[0.06]">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#2563EB] text-2xl font-black text-white transition group-hover:-translate-y-1">
                  {member.initials}
                </div>
                <h3 className="mt-8 text-2xl font-black text-white">
                  {member.name}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                  {member.role}
                </p>
              </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ece8e1] px-5 py-20 text-[#111827] lg:px-8">
        <ScrollReveal className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 border-y border-[#111827]/15 py-14 sm:flex-row sm:items-center">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl">
              Menemukan BUG?
            </h2>
            <p className="mt-5 text-lg font-semibold leading-8 text-[#111827]/75">
              Bantu kami membuat Beastfall RNG lebih stabil. Laporkan bug,
              error, atau masalah gameplay yang kamu temukan saat bermain.
            </p>
          </div>

          <Link
            href="/lapor-bug"
            className="inline-flex shrink-0 items-center justify-center bg-[#2563EB] px-8 py-4 text-base font-black uppercase text-white transition hover:bg-[#1D4ED8]"
          >
            Lapor Disini!
          </Link>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  );
}
