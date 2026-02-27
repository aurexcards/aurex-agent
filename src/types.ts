// ─── Config ───────────────────────────────────────────────────────────────────

export interface AurexAgentConfig {
  apiKey: string;
  baseUrl?: string;
}

// ─── Tool result ──────────────────────────────────────────────────────────────

export interface ToolResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// ─── Users ────────────────────────────────────────────────────────────────────

export interface CreateUserInput {
  firstName: string;
  lastName: string;
}

export interface GetUserInput {
  userId: string;
}

export interface GetWalletInput {
  userId: string;
}

// ─── Deposits ─────────────────────────────────────────────────────────────────

export type DepositCurrency = "SOL" | "USDT" | "USDC";

export interface CreateDepositInput {
  userId: string;
  amount: number;
  currency: DepositCurrency;
}

export interface ListDepositsInput {
  userId: string;
  limit?: number;
  offset?: number;
}

// ─── Cards ────────────────────────────────────────────────────────────────────

export interface CreateCardInput {
  userId: string;
  cardName: string;
  initialBalance: number;
}

export interface ListCardsInput {
  userId: string;
}

export interface GetCardInput {
  userId: string;
  cardId: string;
}

export interface TopUpCardInput {
  userId: string;
  cardId: string;
  amount: number;
}

export interface GetTransactionsInput {
  userId: string;
  cardId: string;
}

export interface GetOtpInput {
  userId: string;
  cardId: string;
}
