import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

const quickSteps = [
  {
    title: "Masuk Game",
    text: "Klik Mainkan Sekarang, tunggu spawn di Lobby, lalu kenali tombol dan area sekitar.",
  },
  {
    title: "Roll Weapon",
    text: "Gunakan fitur roll untuk mendapatkan weapon. Weapon awal sudah cukup untuk mulai farming.",
  },
  {
    title: "Mulai Farming",
    text: "Kalahkan enemy di area awal untuk menaikkan progress dan membiasakan ritme serangan.",
  },
  {
    title: "Naik Area",
    text: "Saat damage terasa stabil, lanjut eksplorasi map berikutnya untuk target lebih besar.",
  },
];

const beginnerTips = [
  "Mulai dari Lobby sampai paham posisi roll, spawn, dan jalur keluar map.",
  "Jangan buang waktu mengejar area jauh kalau weapon masih terlalu lemah.",
  "Cek weapon yang didapat dari roll, lalu pakai yang paling nyaman untuk farming.",
  "Fokus progress kecil tapi konsisten sebelum mengejar target endgame.",
  "Laporkan bug kalau stuck, reward tidak masuk, atau gameplay terasa bermasalah.",
];

const routeCards = [
  {
    label: "Tahap 01",
    title: "Lobby",
    text: "Tempat mulai, roll weapon, dan persiapan sebelum masuk jalur farming.",
  },
  {
    label: "Tahap 02",
    title: "Weapon Awal",
    text: "Pakai Dagger atau weapon hasil roll untuk melawan enemy pertama.",
  },
  {
    label: "Tahap 03",
    title: "Map Lanjutan",
    text: "Masuk Giant Palace atau Serpent Tunnel setelah power terasa cukup.",
  },
];

export default function GuidePage() {
  return (
    <main className="bg-black text-white">
      <section className="relative isolate overflow-hidden px-5 py-24 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.32),transparent_34%),linear-gradient(135deg,#020617_0%,#020617_42%,#000_100%)]" />
        <div className="absolute inset-0 -z-20 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="animate-soft-pulse absolute right-[10%] top-[15%] -z-10 h-72 w-72 rounded-full bg-[#2563EB]/20 blur-3xl" />
        <div className="animate-slow-drift absolute bottom-[10%] left-[7%] -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="animate-fade-up max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.36em] text-[#60A5FA]">
              Panduan Awal
            </p>
            <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Cara Bermain
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-300">
              Panduan cepat untuk pemain baru Beastfall RNG: masuk game, roll
              weapon, farming enemy, lalu naik ke area berikutnya saat power
              sudah siap.
            </p>
            <Link
              href="https://www.roblox.com/games/106592528242987"
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center justify-center bg-[#2563EB] px-8 py-4 text-base font-black uppercase text-white transition hover:-translate-y-1 hover:bg-[#1D4ED8]"
            >
              Mainkan Sekarang
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#ece8e1] px-5 py-20 text-[#111827] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-10 border-b border-[#111827]/15 pb-8">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#111827]">
              Langkah Dasar
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Dari spawn sampai farming
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {quickSteps.map((step, index) => (
              <ScrollReveal key={step.title} delay={index * 90}>
                <article className="h-full bg-white p-7 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="mb-8 flex items-center justify-between border-b border-[#111827]/10 pb-5">
                    <span className="text-4xl font-black text-[#2563EB]">
                      0{index + 1}
                    </span>
                    <span className="h-2 w-16 bg-[#2563EB]" />
                  </div>
                  <h3 className="text-2xl font-black uppercase leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-[#111827]/75">
                    {step.text}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <ScrollReveal>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#60A5FA]">
              Tips Pemula
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Fokus yang perlu dijaga
            </h2>
            <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-300">
              Beastfall RNG lebih enak dimainkan kalau progress dibuat bertahap.
              Pahami area awal, kuatkan weapon, lalu pindah map saat siap.
            </p>
          </ScrollReveal>

          <div className="grid gap-4">
            {beginnerTips.map((tip, index) => (
              <ScrollReveal key={tip} delay={index * 80}>
                <div className="border border-white/10 bg-white/[0.04] p-5 text-base font-semibold leading-7 text-slate-300 transition hover:-translate-y-1 hover:bg-white/[0.07]">
                  <span className="mr-4 text-xl font-black text-[#60A5FA]">
                    0{index + 1}
                  </span>
                  {tip}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1120] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-10 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#60A5FA]">
              Jalur Awal
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Route progress disarankan
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {routeCards.map((card, index) => (
              <ScrollReveal key={card.title} delay={index * 100}>
                <article className="h-full border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#2563EB]/50 hover:bg-white/[0.07]">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#60A5FA]">
                    {card.label}
                  </p>
                  <h3 className="mt-5 text-3xl font-black uppercase leading-tight">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-slate-300">
                    {card.text}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
