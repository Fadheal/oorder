# Oorder

### Sistem Self-Ordering untuk Bisnis Food & Beverage Modern

<p align="left">

  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />

  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />

  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />

  <img src="https://img.shields.io/badge/Hono-E36002?style=for-the-badge&logo=hono&logoColor=white" alt="Hono" />

  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />

  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />

  <img src="https://img.shields.io/badge/Drizzle\_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" />

  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" />

  <img src="https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white" alt="Turborepo" />

</p>

Oorder adalah platform self-ordering berbasis web untuk bisnis food & beverage. Pelanggan memindai QR Code, melihat menu, memilih produk, membuat pesanan, lalu menunggu pesanan diproses tanpa perlu membuat akun atau mengantre secara fisik.

Oorder juga menyediakan sistem terpusat untuk mengelola menu, pesanan, QR Code, serta identitas visual setiap bisnis.

---

## Overview

> Self-ordering sederhana untuk customer dan pengelolaan pesanan untuk admin.

Oorder adalah aplikasi self-ordering berbasis web. Customer dapat melihat menu, membuat pesanan, melakukan pembayaran, dan memantau status pesanan. Admin dapat mengelola menu dan pesanan.

**Alur utama**

`Customer` → `Pilih Menu` → `Checkout` → `Bayar` → `Diproses` → `Selesai`

## ✨ Fitur

- Menu makanan, snack, dan minuman
- Keranjang dan checkout
- Pembayaran
- Tracking status pesanan
- Dashboard admin
- Kelola menu
- Kelola pesanan
- QR Code ordering

## 🛠️ Tech Stack

- Next.js + React
- TypeScript
- Hono
- PostgreSQL + Drizzle ORM
- Tailwind CSS + shadcn/ui
- TanStack Query + axios
- Bun
- Turborepo (Monorepo)

## 📁 Struktur Project

```text
Oorder/
├── apps/
│   ├── web/     # Frontend
│   └── api/     # Backend
└── packages/
    └── db/      # Database
```

**Backend flow**

```text
Route → Controller → Service → Repository → Database
```

## 🚀 Installation

```bash
git clone https://github.com/Fadheal/oorder.git
cd oorder
bun install
```

Buat environment variable yang dibutuhkan:

```env
# Backend
DATABASE_URL="your-database-url"
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="midtrans-client-key"

# Frontend
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

Jalankan database schema:

```bash
cd packages/db
bunx drizzle-kit push
```

Jalankan project:

```bash
#run at root folder
turbo run dev
```

**Frontend:** `http://localhost:3000`  
**Backend:** `http://localhost:3001`

## 🔄 Order Flow

```text
Customer
   ↓
Pilih Menu
   ↓
Checkout
   ↓
Pembayaran
   ↓
Order Dibuat
   ↓
Admin Memproses
   ↓
Selesai
```
