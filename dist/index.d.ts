interface AurexAgentConfig {
    apiKey: string;
    baseUrl?: string;
}
interface ToolResult<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
}
interface CreateUserInput {
    firstName: string;
    lastName: string;
}
interface GetUserInput {
    userId: string;
}
interface GetWalletInput {
    userId: string;
}
type DepositCurrency = "SOL" | "USDT" | "USDC";
interface CreateDepositInput {
    userId: string;
    amount: number;
    currency: DepositCurrency;
}
interface ListDepositsInput {
    userId: string;
    limit?: number;
    offset?: number;
}
interface CreateCardInput {
    userId: string;
    cardName: string;
    initialBalance: number;
}
interface ListCardsInput {
    userId: string;
}
interface GetCardInput {
    userId: string;
    cardId: string;
}
interface TopUpCardInput {
    userId: string;
    cardId: string;
    amount: number;
}
interface GetTransactionsInput {
    userId: string;
    cardId: string;
}
interface GetOtpInput {
    userId: string;
    cardId: string;
}

/**
 * Creates all Aurex tools ready to be passed to any AI agent.
 * Compatible with Claude (Anthropic), OpenAI, and Vercel AI SDK.
 */
declare function createAurexTools(config: AurexAgentConfig): {
    aurex_create_user: {
        description: string;
        parameters: {
            type: string;
            properties: {
                firstName: {
                    type: string;
                    description: string;
                };
                lastName: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        execute: (input: CreateUserInput) => Promise<ToolResult>;
    };
    aurex_get_user: {
        description: string;
        parameters: {
            type: string;
            properties: {
                userId: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        execute: (input: GetUserInput) => Promise<ToolResult>;
    };
    aurex_get_wallet: {
        description: string;
        parameters: {
            type: string;
            properties: {
                userId: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        execute: (input: GetWalletInput) => Promise<ToolResult>;
    };
    aurex_create_deposit: {
        description: string;
        parameters: {
            type: string;
            properties: {
                userId: {
                    type: string;
                    description: string;
                };
                amount: {
                    type: string;
                    description: string;
                };
                currency: {
                    type: string;
                    enum: string[];
                    description: string;
                };
            };
            required: string[];
        };
        execute: (input: CreateDepositInput) => Promise<ToolResult>;
    };
    aurex_list_deposits: {
        description: string;
        parameters: {
            type: string;
            properties: {
                userId: {
                    type: string;
                    description: string;
                };
                limit: {
                    type: string;
                    description: string;
                };
                offset: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        execute: (input: ListDepositsInput) => Promise<ToolResult>;
    };
    aurex_create_card: {
        description: string;
        parameters: {
            type: string;
            properties: {
                userId: {
                    type: string;
                    description: string;
                };
                cardName: {
                    type: string;
                    description: string;
                };
                initialBalance: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        execute: (input: CreateCardInput) => Promise<ToolResult>;
    };
    aurex_list_cards: {
        description: string;
        parameters: {
            type: string;
            properties: {
                userId: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        execute: (input: ListCardsInput) => Promise<ToolResult>;
    };
    aurex_get_card: {
        description: string;
        parameters: {
            type: string;
            properties: {
                userId: {
                    type: string;
                    description: string;
                };
                cardId: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        execute: (input: GetCardInput) => Promise<ToolResult>;
    };
    aurex_topup_card: {
        description: string;
        parameters: {
            type: string;
            properties: {
                userId: {
                    type: string;
                    description: string;
                };
                cardId: {
                    type: string;
                    description: string;
                };
                amount: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        execute: (input: TopUpCardInput) => Promise<ToolResult>;
    };
    aurex_get_transactions: {
        description: string;
        parameters: {
            type: string;
            properties: {
                userId: {
                    type: string;
                    description: string;
                };
                cardId: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        execute: (input: GetTransactionsInput) => Promise<ToolResult>;
    };
    aurex_get_otp: {
        description: string;
        parameters: {
            type: string;
            properties: {
                userId: {
                    type: string;
                    description: string;
                };
                cardId: {
                    type: string;
                    description: string;
                };
            };
            required: string[];
        };
        execute: (input: GetOtpInput) => Promise<ToolResult>;
    };
};

export { type AurexAgentConfig, type CreateCardInput, type CreateDepositInput, type CreateUserInput, type DepositCurrency, type GetCardInput, type GetOtpInput, type GetTransactionsInput, type GetUserInput, type GetWalletInput, type ListCardsInput, type ListDepositsInput, type ToolResult, type TopUpCardInput, createAurexTools };
