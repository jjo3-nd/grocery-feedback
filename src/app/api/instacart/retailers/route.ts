import { NextRequest, NextResponse } from "next/server";

import { instacartRequest, normalizePostalCode } from "@/lib/instacart";

interface InstacartRetailer {
  retailer_key?: string;
  name?: string;
  retailer_logo_url?: string;
}

interface NearbyRetailersResponse {
  retailers?: InstacartRetailer[];
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      postalCode?: string;
      countryCode?: string;
    };

    const postalCode = normalizePostalCode(body.postalCode ?? "");
    const countryCode = (body.countryCode ?? "US").trim().toUpperCase();
    const query = new URLSearchParams({
      postal_code: postalCode,
      country_code: countryCode,
    });

    const data = await instacartRequest<NearbyRetailersResponse>(
      `/idp/v1/retailers?${query.toString()}`,
      { method: "GET" },
    );

    return NextResponse.json({
      retailers: Array.isArray(data.retailers) ? data.retailers : [],
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load nearby retailers";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
