create table if not exists public.media_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'Wallpaper',
  image_url text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.media_items enable row level security;

create policy "Media items readable"
on public.media_items for select
using (true);

notify pgrst, 'reload schema';
