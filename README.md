
# DevPort | Alaika Portfolio

Portfolio modern yang dibangun dengan Next.js, Tailwind CSS, dan Supabase. Dilengkapi dengan Admin Dashboard, Blog, dan Project Showcase.

## 🚀 Fitur Utama
- **CRUD Content**: Kelola Blog dan Project langsung dari dashboard admin.
- **Supabase Auth**: Login aman khusus untuk Admin.
- **Supabase Storage**: Upload gambar artikel dan thumbnail project dengan mudah.
- **Dark Mode**: Desain minimalis modern berbasis Zinc & Primary Blue.
- **Responsive**: Optimal untuk mobile, tablet, dan desktop.

---

## 🛠️ Langkah Setup (Supabase)

1. **Buat Proyek Baru** di [Supabase Dashboard](https://supabase.com).
2. **Setup Database**:
   Buka menu **SQL Editor**, buat query baru, lalu salin dan jalankan script SQL yang ada di file `lib/supabase.ts` bagian komentar. Ini akan membuat tabel `blogs`, `projects`, dan `profile`.
3. **Setup Storage**:
   - Pergi ke menu **Storage**.
   - Buat bucket baru bernama `uploads`.
   - Pastikan bucket diset menjadi **Public** agar gambar bisa diakses oleh pengunjung web.
4. **Setup Auth**:
   - Pergi ke menu **Authentication** > **Users**.
   - Tambahkan user baru (email & password) secara manual untuk dijadikan akun Admin Anda.

---

## 💻 Cara Menjalankan Lokal

1. Clone repositori ini.
2. Buat file `.env` di root folder:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Install dependencies: `npm install`.
4. Jalankan aplikasi: `npm run dev`.

---

## 🌐 Deployment ke Vercel

1. **Push ke GitHub**: Pastikan kode Anda sudah berada di repositori GitHub.
2. **Import ke Vercel**:
   - Login ke [Vercel](https://vercel.com).
   - Klik **New Project** dan pilih repositori Anda.
3. **Konfigurasi Environment Variables**:
   Di tab **Environment Variables**, masukkan 2 variabel berikut:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy**: Klik tombol **Deploy** dan tunggu proses selesai.

## 📝 Catatan Penting
- **RLS (Row Level Security)**: Pastikan RLS diaktifkan di Supabase. Script SQL di `lib/supabase.ts` sudah menyertakan policy agar publik hanya bisa membaca (Read) dan admin (Authenticated) bisa melakukan CRUD.
- **Slug**: Sistem akan otomatis membuat slug dari judul (title) saat Anda menyimpan konten.
