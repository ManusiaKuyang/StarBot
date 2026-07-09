# StarBot 🌟

Discord Bot modular dan scalable yang dibangun menggunakan **TypeScript**, **discord.js v14**, dan **Prisma ORM** (SQLite) untuk server Discord **Star Syndrome**.

## 🚀 Fitur Utama
- **Self Role System** (menggunakan buttons/select menus)
- **Ticket System**
- **Guild Application & Auto Recommendation**
- **Moderation & Logging**

## 🛠️ Cara Memulai

### 1. Instalasi & Konfigurasi
Clone repository, install dependency, dan salin file environment:
```bash
npm install
cp .env.example .env
```
*Isi token bot Discord dan konfigurasi lainnya di dalam file `.env`.*

### 2. Setup Database
Inisialisasi database SQLite menggunakan Prisma:
```bash
npm run prisma:generate
npm run prisma:migrate
```

### 3. Jalankan Bot
- **Mode Development** (dengan hot-reloading):
  ```bash
  npm run dev
  ```
- **Mode Production**:
  ```bash
  npm run build
  npm run start
  ```

---
Dibuat dengan ❤️ untuk server **Star Syndrome**.
