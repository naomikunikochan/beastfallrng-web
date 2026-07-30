import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const maps = [
  {
    name: "Starter Forest",
    biome: "Forest",
    description: "Area awal untuk belajar roll, farming coin, dan memahami pola enemy.",
    details: ["Enemy ringan", "Spawn aman", "Cocok untuk pemula"],
    accent: "bg-emerald-500",
  },
  {
    name: "Crystal Cave",
    biome: "Cave",
    description: "Zona gelap berisi material langka dan jalur sempit untuk duel cepat.",
    details: ["Drop material", "Rute bercabang", "Visual kristal biru"],
    accent: "bg-cyan-400",
  },
  {
    name: "Lava Ruins",
    biome: "Volcanic",
    description: "Map panas untuk pemain midgame yang butuh tantangan lebih berat.",
    details: ["Enemy agresif", "Area hazard", "Reward lebih besar"],
    accent: "bg-orange-500",
  },
  {
    name: "Sky Arena",
    biome: "Arena",
    description: "Arena terbuka untuk boss fight, showcase weapon, dan push power.",
    details: ["Boss encounter", "Area luas", "Endgame target"],
    accent: "bg-violet-500",
  },
];

const routeTips = [
  "Mulai dari Starter Forest sampai weapon cukup stabil.",
  "Masuk Crystal Cave saat butuh material dan drop menengah.",
  "Gunakan weapon burst sebelum masuk Lava Ruins.",
  "Siapkan party atau power tinggi sebelum Sky Arena.",
];

export default function MapPage() {
  return (
    <main className="bg-black text-white">
      <section className="relative isolate overflow-hidden px-5 py-24 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(135deg,rgba(8,47,73,0.95)_0%,#020617_46%,#000_100%)]" />
        <div className="absolute inset-0 -z-20 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="animate-soft-pulse absolute left-[10%] top-[16%] -z-10 h-72 w-72 rounded-full bg-[#2563EB]/20 blur-3xl" />
        <div className="animate-slow-drift absolute bottom-[12%] right-[8%] -z-10 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="animate-fade-up max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.36em] text-[#60A5FA]">
              Beastfall RNG World
            </p>
            <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Map
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-300">
              Jelajahi area Beastfall RNG dari zona awal sampai arena endgame.
              Tiap map punya musuh, reward, dan ritme farming berbeda.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#ece8e1] px-5 py-20 text-[#111827] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-10 border-b border-[#111827]/15 pb-8">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#2563EB]">
              Area Game
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Eksplorasi Dunia
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 lg:grid-cols-4">
            {maps.map((map, index) => (
              <ScrollReveal key={map.name} delay={(index % 4) * 100}>
                <article className="group flex h-full flex-col bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className={`mb-8 h-3 w-24 ${map.accent}`} />
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2563EB]">
                    {map.biome}
                  </p>
                  <h3 className="mt-4 text-2xl font-black uppercase leading-tight transition group-hover:text-[#2563EB]">
                    {map.name}
                  </h3>
                  <p className="mt-4 text-sm font-semibold leading-7 text-[#111827]/75">
                    {map.description}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm font-bold text-[#111827]/80">
                    {map.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-3">
                        <span className={`h-2 w-2 ${map.accent}`} />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#60A5FA]">
              Progress Route
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Jalur farming disarankan
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {routeTips.map((tip, index) => (
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

      <Footer />
    </main>
  );
}
