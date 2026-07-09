<div align="center">
  <img src="./assets/StarBot.gif" alt="StarBot Banner" width="600px" style="border-radius: 10px; box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.5);" />

  # 🌟 **StarBot** 🌟
  
  [![Discord.js](https://img.shields.io/badge/discord.js-v14.15.3-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.js.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-v5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-ORM-123547?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![Status](https://img.shields.io/badge/Status-Premium-FFD700?style=for-the-badge&logo=github-sponsors&logoColor=white)](#)

  <p align="center">
    <b>Bot Discord modular, cepat, dan mewah khusus untuk komunitas eksklusif Star Syndrome.</b>
  </p>

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
</div>

## ✨ **Fitur Mewah & Utama**

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🌱 <b>Self Role System</b></h3>
      <p>Menggunakan komponen tombol & select menu interaktif yang responsif dengan efek visual yang menawan.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🎫 <b>Ticket & Recruitment System</b></h3>
      <p>Manajemen pengajuan guild dan bantuan terpadu dengan integrasi database cepat.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>📊 <b>Live Guild Metrics</b></h3>
      <p>Statistik real-time performa server dan alokasi memori bot secara instan.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🛡️ <b>Premium Security & Log</b></h3>
      <p>Sistem audit log aktivitas server yang mendalam dengan kartu embed khusus.</p>
    </td>
  </tr>
</table>

## 🛠️ **Panduan Memulai**

### 🔌 **Prasyarat Sistem**
Pastikan perangkat Anda telah terinstal:
- **Node.js** v18+ (LTS)
- **MongoDB** / **SQLite**

### 📦 **Langkah Instalasi**

1. **Clone & Install Dependency**
   ```bash
   git clone https://github.com/ManusiaKuyang/StarBot.git
   cd StarBot
   npm install
   ```

2. **Pengaturan Environment**
   Salin `.env.example` menjadi `.env` dan masukkan kredensial rahasia Anda:
   ```bash
   cp .env.example .env
   ```

3. **Inisialisasi Database**
   Sinkronkan skema Prisma dengan database Anda:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Jalankan Bot**
   - **Development (Hot Reloading)**
     ```bash
     npm run dev
     ```
   - **Production Mode**
     ```bash
     npm run build
     npm run start
     ```

## 📂 **Struktur Proyek**

```
StarBot/
├── 📁 prisma/           # Skema & Migrasi Database
├── 📁 assets/           # Media & Aset Animasi
├── 📁 src/
│   ├── 📁 adminPanel/   # Kontrol Panel Admin Terintegrasi
│   ├── 📁 commands/     # Slash Commands modular
│   ├── 📁 events/       # Sistem Event Handler
│   ├── 📁 services/     # Logika Bisnis & Fitur
│   └── 📁 database/     # Pengaturan Database & Model
```

---
<div align="center">
  Dibuat dengan penuh dedikasi untuk <b>Star Syndrome Community</b> 💜
</div>
