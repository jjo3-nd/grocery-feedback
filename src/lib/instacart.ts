const INSTACART_BASE_URL =
  process.env.INSTACART_BASE_URL ?? "https://connect.dev.instacart.tools";

export interface InstacartLineItem {
  name: string;
  quantity?: number;
}

function getInstacartApiKey() {
  const apiKey = process.env.INSTACART_API_KEY;

  if (!apiKey) {
    throw new Error("INSTACART_API_KEY is not configured");
  }

  return apiKey;
}

export function normalizePostalCode(input: string) {
  const match = input.trim().match(/\b\d{5}(?:-\d{4})?\b/);

  if (!match) {
    throw new Error("Enter a valid US ZIP code");
  }

  return match[0].slice(0, 5);
}

export function normalizeLineItems(items: InstacartLineItem[]) {
  return items
    .map((item) => ({
      name: item.name.trim(),
      quantity:
        typeof item.quantity === "number" && Number.isFinite(item.quantity) && item.quantity > 0
          ? Math.floor(item.quantity)
          : 1,
    }))
    .filter((item) => item.name.length > 0);
}

export async function instacartRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${INSTACART_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${getInstacartApiKey()}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const rawText = await response.text();
  const data = rawText ? JSON.parse(rawText) : null;

  if (!response.ok) {
    const message =
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : `Instacart request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data as T;
}
