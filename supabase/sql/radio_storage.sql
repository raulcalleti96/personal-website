-- Private bucket for the album tracks 2-9 (track 1 stays public in /public/radio).
-- Run this in Supabase -> SQL Editor. Then upload the 8 MP3 files to the
-- "radio" bucket (Storage -> radio -> Upload files), keeping the file names.

insert into storage.buckets (id, name, public)
values ('radio', 'radio', false)
on conflict (id) do update set public = false;

-- Only the signed-in accounts listed here can read the files. Put the email you
-- sign in to Empire with. Anyone else (Edu, visitors) gets nothing.
drop policy if exists "radio: listen" on storage.objects;
create policy "radio: listen"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'radio'
    and lower(auth.jwt() ->> 'email') in ('raulcalleti96@icloud.com')
  );
