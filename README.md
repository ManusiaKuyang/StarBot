# StarBot

StarBot is a modular, scalable Discord Bot built with TypeScript, `discord.js` v14, and Prisma ORM, designed specifically for the **Star Syndrome** Discord server.

## Features (Roadmap)
- Self Role System (using select menus/buttons)
- Ticket System
- Guild Application
- Auto Guild Recommendation
- Logging
- Moderation
- Dashboard Web App (future)

---

## Tech Stack
- **Runtime**: Node.js (LTS)
- **Language**: TypeScript
- **Framework**: `discord.js` v14
- **ORM**: Prisma (with SQLite database)
- **Linter**: ESLint (Flat Config)
- **Formatter**: Prettier

---

## Getting Started

### 1. Installation

Clone the repository and install dependencies:

```bash
npm install
```

### 2. Configuration Setup

Copy `.env.example` to `.env` and fill in the required variables:

```bash
cp .env.example .env
```

Define the variables:
- `DISCORD_TOKEN`: Your Discord Bot credentials.
- `CLIENT_ID`: The application client ID.
- `GUILD_ID`: Target server guild ID.
- `DATABASE_URL`: Path to SQLite database (defaults to `"file:./dev.db"`).

### 3. Database Initialization

Generate the Prisma Client code and deploy schema tables onto the local SQLite database:

```bash
# Generate Prisma Client
npm run prisma:generate

# Sync database schema (runs prisma db push / migration)
npm run prisma:migrate
```

### 4. Running the Application

To run the application in development mode (hot reloading via `tsx`):

```bash
npm run dev
```

To compile and execute the production build:

```bash
# Build TypeScript
npm run build

# Start bot
npm run start
```

### 5. Code Styling & Quality

Ensure code quality using ESLint and format with Prettier:

```bash
# Run ESLint check
npm run lint

# Auto-format codebase
npm run format
```

---

## Project Structure

```
StarBot/
├── prisma/
│   └── schema.prisma        # Database schema models
├── src/
│   ├── index.ts             # Application entrypoint & error traps
│   ├── config/
│   │   └── config.ts        # Configuration reader (dotenv wrapper)
│   ├── commands/            # Slash Commands category folders
│   ├── events/              # Event folders (client, guild, interaction)
│   │   ├── client/          # Connection/client events (ready, etc.)
│   │   ├── guild/           # Guild events (guildMemberAdd, etc.)
│   │   └── interaction/     # Interaction triggers (interactionCreate, etc.)
│   ├── handlers/
│   │   ├── commandHandler.ts # Slash command loader
│   │   └── eventHandler.ts   # Client event listener loader
│   ├── interactions/        # Raw components handlers (buttons, selectMenus, modals)
│   ├── services/            # Business logic layers (Tickets, Role assignments, etc.)
│   ├── database/            # Database configurations & Prisma clients
│   ├── utils/               # Logger & small utility code
│   └── types/               # TypeScript interfaces & client extensions
├── .env.example
├── tsconfig.json
├── eslint.config.js
├── .prettierrc
├── .gitignore
├── package.json
└── README.md
```
