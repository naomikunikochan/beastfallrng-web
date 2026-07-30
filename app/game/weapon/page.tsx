import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";

const weapons = [
  {
    name: "Dagger",
    rarity: "Common",
    role: "Weapon utama Beastfall RNG untuk mulai farming dan bertarung.",
    stats: ["Serangan cepat", "Cooldown ringan", "Cocok untuk awal game"],
    image: "/dagger.png",
  },
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
            <p className="text-sm font-black uppercase tracking-wide text-[#111827]">
              Daftar Weapon
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
              Pilih Senjata Andalan
            </h2>
          </ScrollReveal>

          <div className="grid gap-6">
            {weapons.map((weapon, index) => (
              <ScrollReveal key={weapon.name} delay={(index % 2) * 120}>
                <article className="group grid overflow-hidden bg-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="relative min-h-[420px] bg-[#0f172a] p-8 sm:min-h-[520px]">
                    <Image
                      src={weapon.image}
                      alt={weapon.name}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      quality={100}
                      priority
                      className="object-contain p-8 transition duration-500 group-hover:scale-[1.02]"
                    />
                    <div className="absolute bottom-4 left-4 h-2 w-20 bg-[#2563EB]" />
                  </div>
                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wide">
                      <span className="text-[#2563EB]">{weapon.rarity}</span>
                      <span className="h-4 w-px bg-[#111827]/25" />
                      <span>Weapon</span>
                    </div>
                    <h3 className="mt-4 text-5xl font-black uppercase leading-none tracking-tight transition group-hover:text-[#2563EB] sm:text-6xl">
                      {weapon.name}
                    </h3>
                    <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-[#111827]/75">
                      {weapon.role}
                    </p>
                    <ul className="mt-8 space-y-4 text-base font-bold text-[#111827]/80">
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

      <Footer />
    </main>
  );
}
