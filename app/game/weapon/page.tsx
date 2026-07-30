import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const weapons = [
  {
    name: "Starter Blade",
    rarity: "Common",
    role: "Weapon awal untuk farming cepat.",
    stats: ["Damage stabil", "Cooldown ringan", "Cocok untuk pemula"],
    accent: "from-slate-500 to-slate-800",
  },
  {
    name: "Frost Fang",
    rarity: "Rare",
    role: "Serangan es dengan kontrol area.",
    stats: ["Slow effect", "Jarak menengah", "Bagus untuk crowd control"],
    accent: "from-cyan-300 to-blue-700",
  },
  {
    name: "Thunder Axe",
    rarity: "Epic",
    role: "Burst damage besar untuk lawan tebal.",
    stats: ["Critical tinggi", "Area splash", "Tempo serangan berat"],
    accent: "from-violet-400 to-indigo-900",
  },
  {
    name: "Beastfall Relic",
    rarity: "Legendary",
    role: "Weapon langka dengan power scaling kuat.",
    stats: ["Damage tinggi", "Efek visual unik", "Drop sangat langka"],
    accent: "from-amber-300 to-orange-700",
  },
];

const rarityGuide = [
  "Common mudah didapat dan cocok untuk awal game.",
  "Rare mulai punya efek khusus untuk farming lebih efisien.",
  "Epic fokus ke damage besar dan skill aktif lebih kuat.",
  "Legendary jadi target utama kolektor dan pemain endgame.",
];

export default function WeaponPage() {
  return (
    <main className="bg-black text-white">
      <section className="relative isolate overflow-hidden px-5 py-24 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.34),transparent_34%),linear-gradient(135deg,#020617_0%,#030712_52%,#000_100%)]" />
        <div className="animate-soft-pulse absolute right-[8%] top-[18%] -z-20 h-72 w-72 rounded-full bg-[#2563EB]/20 blur-3xl" />
        <div className="animate-slow-drift absolute bottom-[8%] left-[6%] -z-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="animate-fade-up max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.36em] text-[#60A5FA]">
              Beastfall RNG Arsenal
            </p>
            <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Weapon
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-300">
              Kumpulkan weapon dari hasil roll, naikkan power, dan pilih gaya
              bertarung paling cocok untuk farming maupun boss fight.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#ece8e1] px-5 py-20 text-[#111827] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-10 border-b border-[#111827]/15 pb-8">
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#2563EB]">
              Daftar Weapon
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Pilih Senjata Andalan
            </h2>
          </ScrollReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {weapons.map((weapon, index) => (
              <ScrollReveal key={weapon.name} delay={(index % 2) * 120}>
                <article className="group h-full overflow-hidden bg-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className={`h-32 bg-gradient-to-br ${weapon.accent}`} />
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wide">
                      <span className="text-[#2563EB]">{weapon.rarity}</span>
                      <span className="h-4 w-px bg-[#111827]/25" />
                      <span>Weapon</span>
                    </div>
                    <h3 className="mt-4 text-3xl font-black uppercase leading-tight transition group-hover:text-[#2563EB]">
                      {weapon.name}
                    </h3>
                    <p className="mt-3 text-base font-semibold leading-7 text-[#111827]/75">
                      {weapon.role}
                    </p>
                    <ul className="mt-6 space-y-3 text-sm font-bold text-[#111827]/80">
                      {weapon.stats.map((stat) => (
                        <li key={stat} className="flex items-center gap-3">
                          <span className="h-2 w-2 bg-[#2563EB]" />
                          {stat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <ScrollReveal>
            <p className="text-sm font-black uppercase tracking-[0.32em] text-[#60A5FA]">
              Rarity
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Semakin langka, semakin kuat
            </h2>
          </ScrollReveal>

          <div className="grid gap-4">
            {rarityGuide.map((item, index) => (
              <ScrollReveal key={item} delay={index * 80}>
                <div className="border border-white/10 bg-white/[0.04] p-5 text-base font-semibold leading-7 text-slate-300 transition hover:-translate-y-1 hover:bg-white/[0.07]">
                  {item}
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
