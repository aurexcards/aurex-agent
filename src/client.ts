export const DEFAULT_BASE_URL = "https://aurex.cash/api/dashboard";

export class AurexClient {
  constructor(private apiKey: string, private baseUrl: string = DEFAULT_BASE_URL) {}

  private get headers() {
    return {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    };
  }

  async get(path: string, params?: Record<string, string | number>) {
    let url = `${this.baseUrl}${path}`;
    if (params && Object.keys(params).length > 0) {
      url += "?" + new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ).toString();
    }
    const res = await fetch(url, { headers: this.headers });
    return res.json();
  }

  async post(path: string, body?: unknown) {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    return res.json();
  }
}
