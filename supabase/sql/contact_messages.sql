-- Mensajes del formulario de contacto. Solo escribe/lee la Edge Function
-- (service role); sin políticas RLS, nadie más puede acceder desde el cliente.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  emailed boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
