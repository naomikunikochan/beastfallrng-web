export type Article = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  content: string;
  image_url: string;
  image_class: string;
  published_at: string;
};

const fallbackArticles: Article[] = [
  {
    id: "fallback-1",
    slug: "catatan-update-beastfall-rng",
    title: "Catatan Update Beastfall RNG",
    category: "Pembaruan",
    description:
      "Ringkasan perubahan terbaru, balancing roll, peningkatan performa, dan perbaikan kecil untuk pengalaman bermain lebih stabil.",
    content:
      "Update Beastfall RNG membawa beberapa penyesuaian untuk membuat progres lebih nyaman.",
    image_url: "",
    image_class:
      "bg-[radial-gradient(circle_at_28%_24%,rgba(56,116,255,0.95),transparent_27%),radial-gradient(circle_at_78%_70%,rgba(255,255,255,0.5),transparent_18%),linear-gradient(135deg,#020617_0%,#1d4ed8_55%,#93c5fd_100%)]",
    published_at: "2026-07-25T00:00:00.000Z",
  },
];

function getSupabaseConfig(admin = false) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = admin
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return null;
  }

  return { url, key };
}

export function formatArticleDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export async function getArticles(admin = false) {
  const config = getSupabaseConfig(admin);

  if (!config) {
    return fallbackArticles;
  }

  const response = await fetch(
    `${config.url}/rest/v1/articles?select=*&order=published_at.desc`,
    {
      headers: {
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
      },
      next: { revalidate: admin ? 0 : 60 },
    },
  );

  if (!response.ok) {
    return fallbackArticles;
  }

  const articles = (await response.json()) as Article[];

  return articles.length > 0 ? articles : fallbackArticles;
}

export async function getArticleBySlug(slug: string) {
  const articles = await getArticles();

  return articles.find((article) => article.slug === slug) || null;
}
