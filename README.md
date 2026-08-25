# Oorder

### Sistem Self-Ordering untuk Bisnis Food & Beverage Modern

<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Hono-E36002?style=for-the-badge&logo=hono&logoColor=white" alt="Hono" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" />
  <img src="https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white" alt="Turborepo" />
</p>

Oorder adalah platform self-ordering berbasis web untuk bisnis food & beverage. Pelanggan memindai QR Code, melihat menu, memilih produk, membuat pesanan, lalu menunggu pesanan diproses tanpa perlu membuat akun atau mengantre secara fisik.

Oorder juga menyediakan sistem terpusat untuk mengelola menu, pesanan, QR Code, serta identitas visual setiap bisnis.

## Overview

Alur pemesanan Oorder dibuat sederhana:

```text
Scan QR Code
     ↓
Lihat Menu
     ↓
Pilih Produk
     ↓
Buat Pesanan
     ↓
Pesanan Diproses
     ↓
Pesanan Selesai
```

Setiap meja atau ordering point memiliki QR Code sendiri. Pelanggan langsung masuk ke halaman pemesanan setelah melakukan scan.

Customer tidak membutuhkan akun untuk membuat pesanan.

## Fitur

### QR Code Management

Mengelola QR Code untuk meja atau ordering point.

- QR Code unik
- Identifikasi meja
- Akses langsung ke halaman ordering
- Pengelolaan QR Code melalui dashboard

### Order Management

Mengelola pesanan customer melalui satu dashboard.

- Melihat pesanan masuk
- Melihat detail pesanan
- Mengubah status pesanan
- Mengelola pesanan aktif
- Melihat alur pemrosesan pesanan

### Menu Management

Mengelola menu tanpa mengubah source code.

- Menambah menu
- Mengubah menu
- Menghapus menu
- Mengubah harga
- Mengubah nama dan gambar produk
- Mengatur ketersediaan produk
- Mengatur visibilitas produk

### Zero-Login Ordering

Customer tidak perlu membuat akun.

Customer cukup:

```text
Scan QR
   ↓
Pilih Menu
   ↓
Order
```

### White-Label Customization

Setiap bisnis memiliki tampilan dan identitas sendiri.

- Nama bisnis
- Logo
- Identitas visual
- Menu khusus bisnis
- Customer ordering page khusus
- Konfigurasi bisnis

## Tech Stack

| Technology     | Fungsi                         |
| -------------- | ------------------------------ |
| TypeScript     | Bahasa utama aplikasi          |
| Next.js        | Frontend framework             |
| React          | User interface                 |
| Hono           | Backend HTTP API               |
| Drizzle ORM    | Type-safe database access      |
| Bun            | Runtime dan package manager    |
| Turborepo      | Monorepo management            |
| Tailwind CSS   | Styling                        |
| shadcn/ui      | UI components                  |
| Better Auth    | Authentication                 |
| TanStack Query | Server state dan data fetching |

## Architecture

Oorder menggunakan monorepo dengan frontend dan backend terpisah.

```text
┌────────────────────────┐
│        Customer        │
│    QR Ordering Page    │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│        Next.js         │
│         React          │
│       Frontend         │
└────────────┬───────────┘
             │
             │ HTTP API
             ▼
┌────────────────────────┐
│          Hono          │
│       Backend API      │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│      Business Logic    │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│      Drizzle ORM       │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│       PostgreSQL       │
└────────────────────────┘
```

Authentication ditangani melalui Better Auth pada bagian aplikasi yang membutuhkan autentikasi seperti dashboard admin.

## Monorepo Architecture

Project dikelola menggunakan Turborepo.

```text
Oorder
│
├── apps
│   │
│   ├── web
│   │   └── Next.js
│   │
│   └── api
│       └── Hono
│
└── packages
    ├── db
    │   └── Drizzle ORM
    │
    ├── ui
    │   └── Shared UI
    │
    ├── eslint-config
    │
    └── typescript-config
```

Flow utama aplikasi:

```text
apps/web
   │
   │ HTTP
   ▼
apps/api
   │
   ▼
packages/db
   │
   ▼
Drizzle ORM
   │
   ▼
PostgreSQL
```

## Project Structure

```text
oorder/
│
├── apps/
│   │
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── public/
│   │   └── package.json
│   │
│   └── api/
│       ├── src/
│       │   ├── controllers/
│       │   ├── routes/
│       │   ├── services/
│       │   └── index.ts
│       │
│       └── package.json
│
├── packages/
│   │
│   ├── db/
│   │   ├── schema/
│   │   ├── migrations/
│   │   └── index.ts
│   │
│   ├── ui/
│   │
│   ├── eslint-config/
│   │
│   └── typescript-config/
│
├── package.json
├── turbo.json
├── bun.lock
└── README.md
```

Struktur dapat berubah mengikuti perkembangan project.

## Backend Structure

Backend menggunakan Hono dengan pemisahan tanggung jawab:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository / Database
  ↓
Drizzle
  ↓
PostgreSQL
```

Contoh:

```text
GET /api/orders
       ↓
Order Route
       ↓
Order Controller
       ↓
Order Service
       ↓
Drizzle
       ↓
PostgreSQL
```

## Getting Started

### Prerequisites

Pastikan environment berikut tersedia:

- Bun
- Git
- PostgreSQL atau database PostgreSQL-compatible

### Installation

Clone repository:

```bash
git clone https://github.com/Fadheal/oorder.git
cd oorder
```

Install seluruh dependency workspace:

```bash
bun install
```

## Environment Variables

Buat file environment sesuai kebutuhan aplikasi.

Contoh backend:

```env
DATABASE_URL="your-database-connection-string"

BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3001"
```

Contoh frontend:

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

Jangan commit file `.env` atau credential production ke repository.

## Database

Database layer menggunakan Drizzle ORM.

Contoh flow:

```text
Hono
 ↓
Service
 ↓
Drizzle ORM
 ↓
PostgreSQL
```

Generate migration:

```bash
bunx drizzle-kit generate
```

Jalankan migration:

```bash
bunx drizzle-kit migrate
```

Untuk development, schema juga dapat di-push langsung:

```bash
bunx drizzle-kit push
```

Jalankan command database dari workspace tempat konfigurasi Drizzle berada.

## Development

Dari root monorepo:

```bash
bun run dev
```

Turborepo akan menjalankan development task pada workspace terkait.

Contoh:

```text
web:dev
api:dev
```

Frontend:

```text
http://localhost:3000
```

Backend API:

```text
http://localhost:3001
```

## Workspace Development

Menjalankan frontend saja:

```bash
bun run dev --filter=web
```

Menjalankan backend saja:

```bash
bun run dev --filter=api
```

Atau masuk langsung ke workspace:

```bash
cd apps/api
bun run dev
```

## Available Scripts

| Command                     | Fungsi                              |
| --------------------------- | ----------------------------------- |
| `bun install`               | Install seluruh dependencies        |
| `bun run dev`               | Menjalankan development environment |
| `bun run build`             | Build seluruh workspace             |
| `bun run lint`              | Menjalankan linting                 |
| `bunx drizzle-kit generate` | Generate migration                  |
| `bunx drizzle-kit migrate`  | Menjalankan migration               |
| `bunx drizzle-kit push`     | Push schema ke database             |

Script mengikuti konfigurasi `package.json` masing-masing workspace.

## Core Ordering Flow

```text
Customer
   │
   ├── Scan QR Code
   │
   ▼
Ordering Page
   │
   ├── Lihat Menu
   │
   ▼
Menu
   │
   ├── Pilih Produk
   │
   ▼
Cart
   │
   ├── Submit Order
   │
   ▼
Hono API
   │
   ├── Validasi Order
   ├── Simpan Order
   │
   ▼
Database
   │
   ▼
Order Management
   │
   ├── Pesanan Diterima
   ├── Pesanan Diproses
   ├── Pesanan Selesai
   │
   ▼
Customer
```

## Security

Beberapa aturan keamanan utama:

- Simpan credential dalam environment variable.
- Jangan expose `DATABASE_URL` ke frontend.
- Validasi setiap request API.
- Lindungi endpoint administratif.
- Terapkan authentication dan authorization.
- Batasi CORS ke origin yang dipercaya.
- Terapkan database constraint untuk data penting.
- Gunakan HTTPS pada production.
- Terapkan rate limiting pada public endpoint.
- Jangan menyimpan secret dalam source code.

## Deployment

Oorder terdiri dari beberapa bagian:

```text
Frontend
   ↓
Next.js

Backend
   ↓
Hono

Database
   ↓
PostgreSQL
```

Sebelum deployment:

1. Siapkan production environment variables.
2. Siapkan production database.
3. Jalankan database migration.
4. Build project.
5. Deploy frontend dan backend.
6. Konfigurasi domain dan HTTPS.

Build seluruh monorepo:

```bash
bun run build
```

## Roadmap

- [ ] QR-based ordering
- [ ] Menu management
- [ ] Order management
- [ ] Zero-login customer ordering
- [ ] Authentication dashboard
- [ ] White-label customization
- [ ] Real-time order updates
- [ ] Order analytics
- [ ] Payment gateway integration
- [ ] Receipt generation
- [ ] Multi-branch management
- [ ] Kitchen Display System
- [ ] Inventory management

Roadmap akan diperbarui mengikuti perkembangan Oorder.

## Contributing

Contribution, bug report, dan feature proposal terbuka untuk project ini.

1. Fork repository.

2. Buat branch baru.

```bash
git checkout -b feature/your-feature
```

3. Commit perubahan.

```bash
git commit -m "feat: add your feature"
```

4. Push branch.

```bash
git push origin feature/your-feature
```

5. Buat Pull Request.

Project mengikuti format [Conventional Commits](https://www.conventionalcommits.org/).

---

<p align="center">
  Built for faster and simpler self-ordering.
</p>
