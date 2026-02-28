# @aurexcash/agent

> Official Aurex tools for AI agents — give any agent the ability to create users, issue virtual cards, handle deposits, and more.

[![npm version](https://img.shields.io/npm/v/@aurexcash/agent)](https://www.npmjs.com/package/@aurexcash/agent)
[![npm downloads](https://img.shields.io/npm/dm/@aurexcash/agent)](https://www.npmjs.com/package/@aurexcash/agent)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

---

## What is Aurex?

[Aurex](https://aurex.cash) is a fintech platform that lets AI agents autonomously manage virtual cards, handle crypto deposits, and perform financial operations on behalf of users — no human in the loop required.

## Features

- 🤖 **AI-native** — designed for Claude, OpenAI, Vercel AI SDK and any tool-calling agent
- 💳 **Virtual cards** — issue and manage virtual Visa/Mastercard cards programmatically
- 💸 **Deposits** — handle crypto and fiat deposits
- 👤 **User management** — create and manage users via agent tools
- 🔑 **No KYC friction** — streamlined onboarding for agents
- 📦 **TypeScript-first** — full type safety and autocompletion

## Installation

```bash
npm install @aurexcash/agent
# or
pnpm add @aurexcash/agent
# or
yarn add @aurexcash/agent
```

## Quick Start

```typescript
import { aurexTools } from '@aurexcash/agent'

// Use with Vercel AI SDK
const tools = aurexTools({ apiKey: 'your-api-key' })

// Use with Claude / OpenAI
const { createUser, issueCard, deposit } = aurexTools({ apiKey: 'your-api-key' })
```

## Available Tools

| Tool | Description |
|------|-------------|
| `createUser` | Create a new user account |
| `issueCard` | Issue a virtual card for a user |
| `deposit` | Handle a crypto or fiat deposit |
| `getBalance` | Check account balance |
| `getTransactions` | List recent transactions |

## Framework Support

Works out of the box with:

- **Claude** (tool use / function calling)
- **OpenAI** (function calling)
- **Vercel AI SDK** (`useTools`)
- **LangChain** (tool agents)
- Any agent framework that supports JSON tool schemas

## Requirements

- Node.js >= 18.0.0
- An Aurex API key — get one at [aurex.cash](https://aurex.cash)

## Links

- 🌐 Website: [aurex.cash](https://aurex.cash)
- 📦 npm: [@aurexcash/agent](https://www.npmjs.com/package/@aurexcash/agent)
- 🐛 Issues: [GitHub Issues](https://github.com/aurexcards/aurex-agent/issues)
- 📧 Support: [support@aurex.cash](mailto:support@aurex.cash)

## License

MIT © [Aurex](https://aurex.cash)
