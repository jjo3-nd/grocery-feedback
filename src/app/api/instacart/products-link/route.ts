import { NextRequest, NextResponse } from "next/server";

import { instacartRequest, normalizeLineItems } from "@/lib/instacart";

interface ProductsLinkResponse {
  products_link_url?: string;
  url?: string;
  link_url?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      title?: string;
      items?: Array<{ name?: string; quantity?: number }>;
    };

    const items = normalizeLineItems(
      Array.isArray(body.items)
        ? body.items.map((item) => ({
            name: String(item.name ?? ""),
            quantity: Number(item.quantity ?? 1),
          }))
        : [],
    );

    if (!items.length) {
      return NextResponse.json({ error: "At least one product is required" }, { status: 400 });
    }

    const data = await instacartRequest<ProductsLinkResponse>(
      "/idp/v1/products/products_link",
      {
        method: "POST",
        body: JSON.stringify({
          title: body.title?.trim() || "Receipt items",
          line_items: items,
          landing_page_configuration: {
            partner_linkback_url: "http://localhost:3000/receipt-extraction",
            enable_pantry_items: true,
          },
        }),
      },
    );

    const url = data.products_link_url ?? data.url ?? data.link_url ?? null;

    if (!url) {
      return NextResponse.json(
        { error: "Instacart did not return a shopping link" },
        { status: 502 },
      );
    }

    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create shopping link";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
