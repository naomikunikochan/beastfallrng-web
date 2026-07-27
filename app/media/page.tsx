import Footer from "@/components/Footer";
import MediaGallery from "@/components/MediaGallery";
import { getMediaItems } from "@/lib/media";

export default async function MediaPage() {
  const items = await getMediaItems();

  return (
    <main className="min-h-screen bg-[#071525] text-white">
      <section className="relative isolate overflow-hidden px-5 py-24 lg:px-8">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-45"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=2400&q=80')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-[#071525]/80" />

        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl font-black uppercase tracking-tight drop-shadow sm:text-6xl">
              Media
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base font-semibold text-slate-300">
              Koleksi wallpaper dan media Beastfall RNG. Klik ikon kaca untuk
              preview gambar.
            </p>
          </div>

          <MediaGallery items={items} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
