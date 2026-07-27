import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { formatArticleDate, getArticleBySlug } from "@/lib/articles";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="bg-black text-white">
      <section className="relative isolate overflow-hidden px-5 py-20 lg:px-8 lg:py-28">
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(135deg,#020617_0%,#030712_50%,#000_100%)]" />
        <div className="animate-soft-pulse absolute right-[12%] top-[18%] -z-20 h-72 w-72 rounded-full bg-[#2563EB]/20 blur-3xl" />

        <div className="mx-auto max-w-4xl">
          <Link
            href="/artikel"
            className="text-sm font-black uppercase tracking-wide text-[#3874FF] transition hover:text-white"
          >
            Kembali ke Artikel
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-wide text-slate-400">
            <span className="text-[#3874FF]">{article.category}</span>
            <span className="h-4 w-px bg-white/20" />
            <span>{formatArticleDate(article.published_at)}</span>
          </div>
          <h1 className="mt-5 text-4xl font-black uppercase leading-tight tracking-tight sm:text-6xl lg:text-7xl">
            {article.title}
          </h1>
          <p className="mt-6 text-lg font-semibold leading-8 text-slate-300">
            {article.description}
          </p>
        </div>
      </section>

      <section className="bg-[#ece8e1] px-5 py-16 text-[#111827] lg:px-8">
        <article className="mx-auto max-w-4xl">
          <div
            className={`h-80 ${article.image_class}`}
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
            <div className="m-5 inline-block h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)] border border-white/30" />
          </div>
          <div className="mt-10 whitespace-pre-line text-lg font-semibold leading-9 text-[#111827]/80">
            {article.content || article.description}
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}
