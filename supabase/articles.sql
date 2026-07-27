create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  description text not null,
  content text not null default '',
  image_url text not null default '',
  image_class text not null default 'bg-[linear-gradient(135deg,#020617_0%,#1d4ed8_55%,#93c5fd_100%)]',
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.articles enable row level security;

create policy "Published articles readable"
on public.articles for select
using (true);

insert into public.articles (slug, title, category, description, content, image_class, published_at)
values
  (
    'catatan-update-beastfall-rng',
    'Catatan Update Beastfall RNG',
    'Pembaruan',
    'Ringkasan perubahan terbaru, balancing roll, peningkatan performa, dan perbaikan kecil untuk pengalaman bermain lebih stabil.',
    'Update Beastfall RNG membawa beberapa penyesuaian untuk membuat progres lebih nyaman. Balancing roll diperbaiki, beberapa reward dibuat lebih jelas, dan performa area awal ditingkatkan.',
    'bg-[radial-gradient(circle_at_28%_24%,rgba(56,116,255,0.95),transparent_27%),radial-gradient(circle_at_78%_70%,rgba(255,255,255,0.5),transparent_18%),linear-gradient(135deg,#020617_0%,#1d4ed8_55%,#93c5fd_100%)]',
    '2026-07-25 00:00:00+00'
  ),
  (
    'event-roll-dan-reward-mingguan',
    'Event Roll dan Reward Mingguan',
    'Event',
    'Ikuti misi mingguan, kumpulkan bonus, dan buka peluang reward langka selama event berlangsung.',
    'Event mingguan memberi pemain target baru untuk login, roll, dan mengumpulkan reward. Pastikan progres event diklaim sebelum periode berakhir.',
    'bg-[radial-gradient(circle_at_68%_32%,rgba(250,204,21,0.95),transparent_24%),radial-gradient(circle_at_28%_72%,rgba(20,184,166,0.7),transparent_25%),linear-gradient(135deg,#020617_0%,#0f766e_50%,#1e3a8a_100%)]',
    '2026-07-25 00:00:00+00'
  ),
  (
    'cara-bermain-untuk-pemula',
    'Cara Bermain untuk Pemula',
    'Panduan',
    'Pelajari dasar roll, upgrade, target progres awal, dan cara membaca peluang item supaya tidak bingung di awal game.',
    'Mulai dari memahami sistem roll, pilih upgrade penting, lalu fokus pada target yang memberi peningkatan besar. Pemain baru sebaiknya tidak menghabiskan resource tanpa rencana.',
    'bg-[radial-gradient(circle_at_50%_34%,rgba(255,255,255,0.85),transparent_20%),radial-gradient(circle_at_76%_72%,rgba(245,158,11,0.8),transparent_23%),linear-gradient(135deg,#14532d_0%,#2563eb_48%,#f59e0b_100%)]',
    '2026-07-25 00:00:00+00'
  )
on conflict (slug) do nothing;

alter table public.articles
add column if not exists image_url text not null default '';

notify pgrst, 'reload schema';
