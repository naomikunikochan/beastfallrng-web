create table if not exists public.bug_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_name text not null,
  contact text not null default '',
  title text not null,
  description text not null,
  image_url text not null default '',
  image_urls jsonb not null default '[]'::jsonb,
  status text not null default 'bug baru',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.bug_reports enable row level security;

create policy "Anyone can create bug reports"
on public.bug_reports for insert
with check (true);

notify pgrst, 'reload schema';

alter table public.bug_reports
alter column status set default 'bug baru';

update public.bug_reports
set status = 'bug baru'
where status = 'baru';

notify pgrst, 'reload schema';

alter table public.bug_reports
add column if not exists image_url text not null default '';

alter table public.bug_reports
add column if not exists image_urls jsonb not null default '[]'::jsonb;

notify pgrst, 'reload schema';
