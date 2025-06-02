# 🍽️ Mam Kuy - To-Eat List Planner

Mam Kuy adalah website perencana menu makan mingguan yang membantu pengguna menentukan makanan yang akan dimakan setiap hari, lengkap dengan resep dan bahan masakan. Solusi ideal untuk mengurangi kebingungan. 

---

## 🧩 Problem Statement

Banyak orang sering bingung memutuskan ingin makan apa setiap harinya. Akibatnya:

- Tidak ada perencanaan makan yang baik.
- Bahan makanan sering terbuang sia-sia.
- Pengeluaran membengkak tanpa disadari.
- Sulit mengingat resep dan bahan masakan.

---

## 💡 Solusi

Mam Kuy menawarkan solusi praktis:

- Merencanakan menu makan mingguan secara interaktif.
- Memilih resep dari galeri makanan yang tersedia.
- Menjadwalkan makanan ke waktu makan (sarapan, makan siang, makan malam).
- Melihat detail resep dan bahan masakan.
- Menyimpan rencana makan secara personal dengan autentikasi pengguna.

---

## 🛠️ Fitur Utama

- 📅 **Perencana Menu Makan Mingguan**  
  Jadwalkan makanan ke dalam kalender mingguan.

- 📖 **Detail Resep & Bahan Masakan**  
  Setiap resep dilengkapi dengan bahan dan langkah memasak.

- ✅ **Tambah/Hapus Menu Harian (To-Eat List)**  
  Sistem seperti to-do list tapi untuk kebutuhan makan harian.

- 🔐 **Autentikasi Pengguna**  
  Login & simpan rencana makan pribadi.

---

## 🗃️ Entitas Aplikasi

### 🥘 Resep
- `id`: ID unik resep  
- `nama_resep`: Nama makanan  
- `kategori`: Jenis makanan (sarapan, makan siang, dll.)  
- `bahan`: Daftar bahan masakan  
- `langkah_memasak`: Langkah-langkah memasak  
- `gambar`: URL gambar resep  

### 🍱 Menu Makan
- `id`: ID menu  
- `user_id`: ID pengguna  
- `hari`: Hari dalam seminggu  
- `waktu_makan`: Waktu makan (sarapan/lunch/dinner)  
- `resep_id`: ID resep yang dijadwalkan
- `gambar` : URL gambar makanan

---

## ⚙️ Teknologi yang Digunakan

### Backend
- **Python Pyramid** - Web framework
- **PostgreSQL** - Basis data relasional
- **RESTful API** - Untuk komunikasi dengan frontend

### Frontend
- **ReactJS** - Library UI
- **React Router DOM** - Navigasi halaman
- **Context API** - Manajemen state global
- **TailwindCSS** - Styling responsif

## Link Repository Github

### https://github.com/harisya14/UAS_pemrograman-web_Harisya-Miranti_122140049 
