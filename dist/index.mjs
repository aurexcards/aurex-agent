// src/client.ts
var DEFAULT_BASE_URL = "https://aurex.cash/api/dashboard";
var AurexClient = class {
  constructor(apiKey, baseUrl = DEFAULT_BASE_URL) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }
  get headers() {
    return {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json"
    };
  }
  async get(path, params) {
    let url = `${this.baseUrl}${path}`;
    if (params && Object.keys(params).length > 0) {
      url += "?" + new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ).toString();
    }
    const res = await fetch(url, { headers: this.headers });
    return res.json();
  }
  async post(path, body) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: this.headers,
      body: body ? JSON.stringify(body) : void 0
    });
    return res.json();
  }
};

// src/tools.ts
function createAurexTools(config) {
  const client = new AurexClient(config.apiKey, config.baseUrl);
  return {
    // ─── Users ─────────────────────────────────────────────────────────────
    aurex_create_user: {
      description: "Create a new user in the Aurex system. Returns a userId needed for all subsequent operations like deposits and cards.",
      parameters: {
        type: "object",
        properties: {
          firstName: { type: "string", description: "User's first name" },
          lastName: { type: "string", description: "User's last name" }
        },
        required: ["firstName", "lastName"]
      },
      execute: async (input) => {
        try {
          const res = await client.post("/users", input);
          if (!res.success) return { success: false, error: res.error };
          return { success: true, data: res.data };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }
    },
    aurex_get_user: {
      description: "Get information about an existing Aurex user by their userId.",
      parameters: {
        type: "object",
        properties: {
          userId: { type: "string", description: "The user's unique ID" }
        },
        required: ["userId"]
      },
      execute: async (input) => {
        try {
          const res = await client.get(`/users/${input.userId}`);
          if (!res.success) return { success: false, error: res.error };
          return { success: true, data: res.data };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }
    },
    aurex_get_wallet: {
      description: "Get the wallet balance for a user. Returns available balance, pending balance, and amount allocated to cards.",
      parameters: {
        type: "object",
        properties: {
          userId: { type: "string", description: "The user's unique ID" }
        },
        required: ["userId"]
      },
      execute: async (input) => {
        try {
          const res = await client.get(`/users/${input.userId}/wallet`);
          if (!res.success) return { success: false, error: res.error };
          return { success: true, data: res.data };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }
    },
    // ─── Deposits ──────────────────────────────────────────────────────────
    aurex_create_deposit: {
      description: "Create a crypto deposit request for a user. Returns a deposit address to send funds to. Supported currencies: SOL, USDT, USDC. Funds appear in wallet after blockchain confirmation.",
      parameters: {
        type: "object",
        properties: {
          userId: { type: "string", description: "The user's unique ID" },
          amount: { type: "number", description: "Amount to deposit in USD" },
          currency: {
            type: "string",
            enum: ["SOL", "USDT", "USDC"],
            description: "Cryptocurrency to deposit"
          }
        },
        required: ["userId", "amount", "currency"]
      },
      execute: async (input) => {
        try {
          const res = await client.post(`/users/${input.userId}/deposits`, {
            amount: input.amount,
            currency: input.currency
          });
          if (!res.success) return { success: false, error: res.error };
          return { success: true, data: res.data };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }
    },
    aurex_list_deposits: {
      description: "List all deposits for a user with pagination support.",
      parameters: {
        type: "object",
        properties: {
          userId: { type: "string", description: "The user's unique ID" },
          limit: { type: "number", description: "Number of records to return (default 10)" },
          offset: { type: "number", description: "Pagination offset (default 0)" }
        },
        required: ["userId"]
      },
      execute: async (input) => {
        try {
          const params = {};
          if (input.limit) params.limit = input.limit;
          if (input.offset) params.offset = input.offset;
          const res = await client.get(`/users/${input.userId}/deposits`, params);
          if (!res.success) return { success: false, error: res.error };
          return { success: true, data: res.data };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }
    },
    // ─── Cards ─────────────────────────────────────────────────────────────
    aurex_create_card: {
      description: "Issue a new virtual card for a user. Minimum balance: $25, maximum: $100,000. Funds are deducted from the user's wallet including service and issuance fees.",
      parameters: {
        type: "object",
        properties: {
          userId: { type: "string", description: "The user's unique ID" },
          cardName: { type: "string", description: "A name for the card (e.g. 'Marketing Card')" },
          initialBalance: {
            type: "number",
            description: "Initial balance to load on the card in USD (min: 25, max: 100000)"
          }
        },
        required: ["userId", "cardName", "initialBalance"]
      },
      execute: async (input) => {
        try {
          const res = await client.post(`/users/${input.userId}/cards`, {
            cardName: input.cardName,
            initialBalance: input.initialBalance
          });
          if (!res.success) return { success: false, error: res.error };
          return { success: true, data: res.data };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }
    },
    aurex_list_cards: {
      description: "List all virtual cards for a user.",
      parameters: {
        type: "object",
        properties: {
          userId: { type: "string", description: "The user's unique ID" }
        },
        required: ["userId"]
      },
      execute: async (input) => {
        try {
          const res = await client.get(`/users/${input.userId}/cards`);
          if (!res.success) return { success: false, error: res.error };
          return { success: true, data: res.data };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }
    },
    aurex_get_card: {
      description: "Get full card details including card number, expiry, and CVV. IMPORTANT: Only call this server-side. Never expose card details to client-side code.",
      parameters: {
        type: "object",
        properties: {
          userId: { type: "string", description: "The user's unique ID" },
          cardId: { type: "string", description: "The card's unique ID" }
        },
        required: ["userId", "cardId"]
      },
      execute: async (input) => {
        try {
          const res = await client.get(`/users/${input.userId}/cards/${input.cardId}`);
          if (!res.success) return { success: false, error: res.error };
          return { success: true, data: res.data };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }
    },
    aurex_topup_card: {
      description: "Top up a card with additional funds from the user's wallet. Minimum: $10, maximum: $10,000. A 3% service fee is applied.",
      parameters: {
        type: "object",
        properties: {
          userId: { type: "string", description: "The user's unique ID" },
          cardId: { type: "string", description: "The card's unique ID" },
          amount: {
            type: "number",
            description: "Amount to add to the card in USD (min: 10, max: 10000)"
          }
        },
        required: ["userId", "cardId", "amount"]
      },
      execute: async (input) => {
        try {
          const res = await client.post(
            `/users/${input.userId}/cards/${input.cardId}/topup`,
            { amount: input.amount }
          );
          if (!res.success) return { success: false, error: res.error };
          return { success: true, data: res.data };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }
    },
    aurex_get_transactions: {
      description: "Get transaction history for a specific card.",
      parameters: {
        type: "object",
        properties: {
          userId: { type: "string", description: "The user's unique ID" },
          cardId: { type: "string", description: "The card's unique ID" }
        },
        required: ["userId", "cardId"]
      },
      execute: async (input) => {
        try {
          const res = await client.get(
            `/users/${input.userId}/cards/${input.cardId}/transactions`
          );
          if (!res.success) return { success: false, error: res.error };
          return { success: true, data: res.data };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }
    },
    aurex_get_otp: {
      description: "Get a one-time password (OTP) for card authentication. OTP expires in 300 seconds \u2014 use immediately.",
      parameters: {
        type: "object",
        properties: {
          userId: { type: "string", description: "The user's unique ID" },
          cardId: { type: "string", description: "The card's unique ID" }
        },
        required: ["userId", "cardId"]
      },
      execute: async (input) => {
        try {
          const res = await client.get(`/users/${input.userId}/otp`, {
            cardId: input.cardId
          });
          if (!res.success) return { success: false, error: res.error };
          return { success: true, data: res.data };
        } catch (e) {
          return { success: false, error: e.message };
        }
      }
    }
  };
}
export {
  createAurexTools
};
