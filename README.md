# Oorder

### Self-Ordering System for Modern Food & Beverage Businesses

<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Hono-E36002?style=for-the-badge&logo=hono&logoColor=white" alt="Hono" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" />
</p>

Oorder is a web-based self-ordering platform designed for food and beverage businesses. Customers scan a QR code, browse the menu, place an order, and wait for their order without creating an account or waiting in a physical queue.

The platform provides businesses with centralized order and menu management alongside white-label customization.

## Overview

Traditional ordering requires customers to queue and interact with staff before their order enters the kitchen.

Oorder simplifies this flow:

```text
Scan QR Code
     ↓
Browse Menu
     ↓
Place Order
     ↓
Order Processing
     ↓
Ready for Pickup
```

Customers access the ordering page directly from a QR code assigned to their table or ordering point.

No customer account is required.

## Features

### QR Code Management

Generate and manage QR codes for tables or ordering points.

- Unique QR codes
- Direct access to the ordering page
- Simple table identification

### Order Management

Manage incoming customer orders from a centralized interface.

- View incoming orders
- Track order status
- Organize active orders
- Manage the order workflow

### Menu Management

Control the menu without modifying application code.

- Create and update menu items
- Change prices
- Update product names and images
- Control product visibility
- Manage item availability

### Zero-Login Ordering

Customers place orders without creating an account.

This reduces friction between scanning the QR code and submitting an order.

### White-Label Customization

Businesses configure the platform around their own brand identity.

- Business branding
- Custom visual identity
- Business-specific menu
- Independent customer-facing experience

## Tech Stack

| Technology     | Purpose                                   |
| -------------- | ----------------------------------------- |
| TypeScript     | Primary programming language              |
| React          | Frontend user interface                   |
| Vite           | Frontend development and build tooling    |
| Hono           | Backend HTTP framework                    |
| Drizzle ORM    | Type-safe database access                 |
| Bun            | JavaScript runtime and package manager    |
| Better Auth    | Authentication                            |
| TanStack Query | Server-state management and data fetching |
| Tailwind CSS   | Styling                                   |
| Radix UI       | Accessible UI primitives                  |

## Architecture

```text
┌──────────────────────┐
│      Customer        │
│   QR Ordering Page   │
└──────────┬───────────┘
           │
           │ HTTP
           ▼
┌──────────────────────┐
│    React + Vite      │
│      Frontend        │
└──────────┬───────────┘
           │
           │ API
           ▼
┌──────────────────────┐
│        Hono          │
│       Backend        │
└──────────┬───────────┘
           │
     ┌─────┴─────┐
     ▼           ▼
┌─────────┐ ┌─────────────┐
│ Drizzle │ │ Better Auth │
│   ORM   │ │             │
└────┬────┘ └─────────────┘
     │
     ▼
┌──────────────────────┐
│       Database       │
└──────────────────────┘
```

## Project Structure

A typical project structure:

```text
oorder/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── App.tsx
│   └── package.json
│
├── server/
│   ├── db/
│   ├── routes/
│   ├── middleware/
│   └── index.ts
│
├── drizzle/
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

Adjust this section to match the repository's actual structure.

## Getting Started

### Prerequisites

Install the following before running Oorder:

- Bun
- A supported SQL database
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/Fadheal/oorder.git
cd oorder
```

Install dependencies:

```bash
bun install
```

### Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="your-database-connection-string"

BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

Never commit `.env` files or production credentials to the repository.

### Database Setup

Apply the database schema:

```bash
bunx drizzle-kit push
```

For migration-based environments:

```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
```

### Development

Start the development server:

```bash
bun run dev
```

Open the application using the local URL shown in your terminal.

## Available Scripts

| Command                     | Description                         |
| --------------------------- | ----------------------------------- |
| `bun install`               | Install dependencies                |
| `bun run dev`               | Start development environment       |
| `bun run build`             | Create a production build           |
| `bun run start`             | Start the production server         |
| `bunx drizzle-kit generate` | Generate database migrations        |
| `bunx drizzle-kit migrate`  | Apply database migrations           |
| `bunx drizzle-kit push`     | Push schema changes to the database |

Script names depend on the project's `package.json`.

## Core Ordering Flow

```text
Customer
   │
   ├── Scan QR Code
   │
   ▼
Menu
   │
   ├── Select Items
   │
   ▼
Cart
   │
   ├── Submit Order
   │
   ▼
Backend API
   │
   ├── Validate Order
   ├── Store Order
   │
   ▼
Order Management
   │
   ├── Process Order
   ├── Update Status
   │
   ▼
Ready for Pickup
```

## Security

For production deployments:

- Keep credentials inside environment variables.
- Validate API request payloads.
- Protect administrative routes with authentication and authorization.
- Apply database constraints for critical data.
- Restrict CORS to trusted origins.
- Use HTTPS in production.
- Apply rate limiting to public endpoints.
- Keep dependencies updated.
- Never expose database credentials to the frontend.

## Deployment

Oorder consists of a frontend application, backend API, and database.

Before deploying:

1. Configure production environment variables.
2. Configure the production database.
3. Apply database migrations.
4. Build the application.
5. Start the production server.
6. Configure HTTPS and your domain.

Example:

```bash
bun run build
bun run start
```

## Roadmap

- [ ] QR-based ordering
- [ ] Menu management
- [ ] Order management
- [ ] Zero-login customer ordering
- [ ] White-label support
- [ ] Real-time order updates
- [ ] Order analytics
- [ ] Payment gateway integration
- [ ] Receipt generation
- [ ] Multi-branch management
- [ ] Kitchen display system
- [ ] Inventory management

Update the roadmap based on the current development status.

## Contributing

Contributions, bug reports, and feature proposals are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "feat: add your feature"
```

4. Push the branch.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

For commit messages, the project should follow [Conventional Commits](https://www.conventionalcommits.org/).

---

<p align="center">
  Built for faster and simpler self-ordering.
</p>
