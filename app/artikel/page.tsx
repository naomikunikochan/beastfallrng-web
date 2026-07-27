import Link from "next/link";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { formatArticleDate, getArticles } from "@/lib/articles";

const categories = ["Semua", "Pembaruan", "Event", "Panduan", "Komunitas"];

export default async function ArtikelPage() {
  const articles = await getArticles();

  return (
    <main className="bg-black text-white">
      <section className="relative isolate overflow-hidden px-5 py-24 lg:px-8 lg:py-32">
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(135deg,#020617_0%,#030712_45%,#000_100%)]" />
        <div className="animate-soft-pulse absolute left-[10%] top-[20%] -z-20 h-64 w-64 rounded-full bg-[#2563EB]/25 blur-3xl" />
        <div className="animate-slow-drift absolute bottom-[10%] right-[8%] -z-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <div className="animate-fade-up max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.38em] text-[#3874FF]">
              Beastfall RNG News
            </p>
            <h1 className="mt-5 text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl lg:text-8xl">
              Artikel
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-slate-300">
              Update game, event, panduan, dan kabar komunitas Beastfall RNG
              dikumpulkan dalam satu tempat.
            </p>
          </div>

          <div className="animate-fade-up animation-delay-150 mt-10 flex flex-wrap gap-3">
            {categories.map((category) => (
              <a
                key={category}
                href="#semua"
                className="border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-200 transition hover:-translate-y-1 hover:border-[#3874FF] hover:bg-[#3874FF] hover:text-white"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="semua" className="bg-[#ece8e1] px-5 py-20 text-[#111827] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-10 flex flex-col justify-between gap-4 border-b border-[#111827]/15 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.32em] text-[#2563EB]">
                Semua Artikel
              </p>
              <h2 className="mt-3 text-4xl font-black uppercase tracking-tight sm:text-5xl">
                Update Terbaru
              </h2>
            </div>
            <p className="text-base font-semibold text-[#111827]/65">
              {articles.length} artikel tersedia
            </p>
          </ScrollReveal>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ScrollReveal key={article.id} delay={(index % 3) * 120}>
                <Link href={`/artikel/${article.slug}`} className="block h-full">
                  <article className="group h-full bg-white transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div
                      className={`relative h-52 overflow-hidden ${article.image_class}`}
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
                    <div className="p-6">
                      <div className="flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wide">
                        <span className="text-[#2563EB]">{article.category}</span>
                        <span className="h-4 w-px bg-[#111827]/25" />
                        <span>{formatArticleDate(article.published_at)}</span>
                      </div>
                      <h3 className="mt-4 text-2xl font-black leading-tight transition group-hover:text-[#2563EB]">
                        {article.title}
                      </h3>
                      <p className="mt-3 text-base font-medium leading-7 text-[#111827]/75">
                        {article.description}
                      </p>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
