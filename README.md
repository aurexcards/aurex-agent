# @aurexcash/agent

Official Aurex tools for AI agents.

Give any AI agent the ability to create users, issue virtual crypto-funded cards, handle deposits, and manage card balances — all through the [Aurex](https://aurex.cash) API.

Compatible with **Claude**, **OpenAI**, **Vercel AI SDK**, and any framework that supports tool calling.

## Install

```bash
npm install @aurexcash/agent
```

## Usage

### With Vercel AI SDK

```typescript
import { createAurexTools } from "@aurexcash/agent";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const aurexTools = createAurexTools({ apiKey: process.env.AUREX_API_KEY! });

const result = await generateText({
  model: anthropic("claude-sonnet-4-6"),
  tools: aurexTools,
  prompt: "Create a user named John Doe, deposit 100 USDC, then issue a $50 virtual card.",
});
```

### With OpenAI Agents SDK

```typescript
import { createAurexTools } from "@aurexcash/agent";
import { Agent, run } from "@openai/agents";

const aurexTools = createAurexTools({ apiKey: process.env.AUREX_API_KEY! });

const agent = new Agent({
  name: "Aurex Agent",
  instructions: "You help users manage their Aurex virtual cards.",
  tools: Object.values(aurexTools),
});

const result = await run(agent, "Issue a card named 'Travel Card' with $100 for user_123");
```

### With Anthropic SDK directly

```typescript
import Anthropic from "@anthropic-ai/sdk";
import { createAurexTools } from "@aurexcash/agent";

const client = new Anthropic();
const aurexTools = createAurexTools({ apiKey: process.env.AUREX_API_KEY! });

// Convert to Anthropic tool format
const tools = Object.entries(aurexTools).map(([name, tool]) => ({
  name,
  description: tool.description,
  input_schema: tool.parameters,
}));

const response = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  tools,
  messages: [{ role: "user", content: "Create a new user and fund their wallet" }],
});
```

## Available Tools

| Tool | Description |
|------|-------------|
| `aurex_create_user` | Create a new Aurex user |
| `aurex_get_user` | Get user details by ID |
| `aurex_get_wallet` | Get wallet balance (available, pending, in cards) |
| `aurex_create_deposit` | Create a crypto deposit request (SOL, USDT, USDC) |
| `aurex_list_deposits` | List deposits with pagination |
| `aurex_create_card` | Issue a new virtual card (min $25) |
| `aurex_list_cards` | List all cards for a user |
| `aurex_get_card` | Get full card details (number, CVV) — server-side only |
| `aurex_topup_card` | Top up card balance (min $10, 3% fee) |
| `aurex_get_transactions` | Get card transaction history |
| `aurex_get_otp` | Get one-time password for card auth |

## Example Agent Flow

```typescript
import { createAurexTools } from "@aurexcash/agent";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const tools = createAurexTools({ apiKey: process.env.AUREX_API_KEY! });

// The agent handles the full flow autonomously:
// 1. Creates a user
// 2. Creates a deposit
// 3. Waits for confirmation
// 4. Issues a card
// 5. Returns card details

const { text } = await generateText({
  model: anthropic("claude-sonnet-4-6"),
  tools,
  maxSteps: 10,
  prompt: `
    Create a new Aurex user named Alice Smith.
    Set up a USDC deposit of $200.
    Once the wallet is funded, issue a virtual card named 'Alice Card' with $100.
    Return the deposit address and card ID when done.
  `,
});

console.log(text);
```

## Security

- Never expose your `AUREX_API_KEY` in client-side code
- `aurex_get_card` returns card number and CVV — only call this server-side
- Store API keys in environment variables only

## Aurex API

- **Docs:** [docs.aurex.cash](https://docs.aurex.cash)
- **Rate limit:** 60 requests/minute
- **Deposit currencies:** SOL, USDT, USDC

Get your API key at [aurex.cash](https://aurex.cash) → Dashboard → API Keys.

## License

MIT
