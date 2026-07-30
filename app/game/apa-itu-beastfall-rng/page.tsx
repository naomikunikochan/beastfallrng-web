import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";

const highlights = [
  {
    title: "Roll Weapon",
    text: "Gunakan sistem RNG untuk mendapatkan weapon dan tingkatkan peluang mendapat item lebih bagus.",
  },
  {
    title: "Farming Area",
    text: "Jelajahi map, kalahkan enemy, dan kumpulkan progress untuk membuka target berikutnya.",
  },
  {
    title: "Progress Power",
    text: "Naikkan kekuatan karakter lewat weapon, reward, dan rutinitas farming yang konsisten.",
  },
];

const steps = [
  "Masuk game lewat tombol Mainkan Sekarang.",
  "Mulai dari Lobby untuk roll dan persiapan awal.",
  "Gunakan Dagger untuk farming area pertama.",
  "Naikkan progress sampai siap masuk map berikutnya.",
];

export default function AboutGamePage() {
  return (
    <main className="bg-black text-white">
      <section className="relative isolate overflow-hidden px-5 py-24 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.34),transparent_34%),linear-gradient(135deg,#020617_0%,#030712_52%,#000_100%)]" />
        <div className="absolute inset-0 -z-20 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="animate-soft-pulse absolute left-[8%] top-[18%] -z-10 h-72 w-72 rounded-full bg-[#2563EB]/20 blur-3xl" />
        <div className="animate-slow-drift absolute bottom-[10%] right-[10%] -z-10 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="animate-fade-up max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.36em] text-[#60A5FA]">
              Beastfall RNG Guide
            </p>
            <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Apa Itu Beastfall RNG?
            </h1>
            <p className="mt-6 max-w-3xl text-lg font-semibold leading-8 text-slate-300">
              Beastfall RNG adalah game Roblox berbasis keberuntungan, farming,
              dan progres power. Pemain melakukan roll untuk mendapat weapon,
              lalu memakai weapon itu untuk menjelajahi map dan menjadi lebih kuat.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#ece8e1] px-5 py-20 text-[#111827] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-10 border-b border-[#111827]/15 pb-8">
            <p className="text-sm font-black uppercase tracking-wide text-[#111827]">
              Tentang Game
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Roll, Farming, Progress
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-3">
            {highlights.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 100}>
                <article className="h-full bg-white p-7 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="mb-8 h-2 w-20 bg-[#2563EB]" />
                  <h3 className="text-2xl font-black uppercase leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base font-semibold leading-7 text-[#111827]/75">
                    {item.text}
                  </p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <ScrollReveal>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#60A5FA]">
              Cara Mulai
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Langkah awal pemain baru
            </h2>
            <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-slate-300">
              Fokus awal adalah memahami roll, mencoba Dagger, lalu membuka
              route farming dari Lobby ke area berikutnya.
            </p>
          </ScrollReveal>

          <div className="grid gap-4">
            {steps.map((step, index) => (
              <ScrollReveal key={step} delay={index * 80}>
                <div className="border border-white/10 bg-white/[0.04] p-5 text-base font-semibold leading-7 text-slate-300 transition hover:-translate-y-1 hover:bg-white/[0.07]">
                  <span className="mr-4 text-xl font-black text-[#60A5FA]">
                    0{index + 1}
                  </span>
                  {step}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-5 py-24 text-white lg:px-8 lg:py-32">
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center"
          style={{ backgroundImage: "url('/wisteria_blossom.png')" }}
        />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.5)_44%,rgba(0,0,0,0.14)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_35%,rgba(37,99,235,0.18),transparent_30%)]" />

        <ScrollReveal className="mx-auto max-w-7xl">
          <div className="max-w-2xl text-left">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#60A5FA]">
              Siap Main?
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Masuk ke Beastfall RNG sekarang
            </h2>
            <Link
              href="https://www.roblox.com/games/106592528242987"
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex items-center justify-center bg-[#2563EB] px-8 py-4 text-base font-black uppercase text-white transition hover:-translate-y-1 hover:bg-[#1D4ED8]"
            >
              Mainkan Sekarang
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </main>
  );
}
