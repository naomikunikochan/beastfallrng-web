export type MediaItem = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  created_at: string;
};

const fallbackMedia: MediaItem[] = [
  {
    id: "fallback-1",
    title: "Beastfall Arena",
    category: "Wallpaper",
    image_url:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "fallback-2",
    title: "Night Raid",
    category: "Wallpaper",
    image_url:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    created_at: new Date().toISOString(),
  },
  {
    id: "fallback-3",
    title: "Crystal Cave",
    category: "Wallpaper",
    image_url:
      "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=1200&q=80",
    created_at: new Date().toISOString(),
  },
];

export async function getMediaItems(admin = false) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = admin
    ? process.env.SUPABASE_SERVICE_ROLE_KEY
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return admin ? [] : fallbackMedia;
  }

  const response = await fetch(
    `${url}/rest/v1/media_items?select=*&order=created_at.desc`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      next: { revalidate: admin ? 0 : 60 },
    },
  );

  if (!response.ok) {
    return admin ? [] : fallbackMedia;
  }

  const items = (await response.json()) as MediaItem[];

  return items.length > 0 ? items : admin ? [] : fallbackMedia;
}
