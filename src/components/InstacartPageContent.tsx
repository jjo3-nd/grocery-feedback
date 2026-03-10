"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

interface ReceiptItem {
  name: string;
  quantity?: number;
}

interface Retailer {
  retailer_key?: string;
  name?: string;
  retailer_logo_url?: string;
}

const STORAGE_KEY = "instacart-receipt-items";
const RECEIPT_ID_STORAGE_KEY = "instacart-receipt-id";

export default function InstacartPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [postalCode, setPostalCode] = useState("");
  const [items, setItems] = useState<ReceiptItem[]>([]);
  const [receiptId, setReceiptId] = useState("");
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [retailersLoading, setRetailersLoading] = useState(false);
  const [retailersError, setRetailersError] = useState("");
  const [shoppingUrl, setShoppingUrl] = useState("");
  const [shoppingLoading, setShoppingLoading] = useState(false);
  const [shoppingError, setShoppingError] = useState("");

  useEffect(() => {
    const storedItems = window.sessionStorage.getItem(STORAGE_KEY);
    const storedReceiptId = window.sessionStorage.getItem(RECEIPT_ID_STORAGE_KEY);

    if (!storedItems) {
      setItems([]);
    } else {
      try {
        const parsedItems = JSON.parse(storedItems) as ReceiptItem[];
        setItems(Array.isArray(parsedItems) ? parsedItems : []);
      } catch {
        setItems([]);
      }
    }

    if (storedReceiptId) {
      setReceiptId(storedReceiptId);
    }
  }, []);

  useEffect(() => {
    const postalCodeFromUrl = searchParams.get("postalCode");
    const receiptIdFromUrl = searchParams.get("receiptId");

    if (postalCodeFromUrl) {
      setPostalCode(postalCodeFromUrl);
    }

    if (receiptIdFromUrl) {
      setReceiptId(receiptIdFromUrl);
      window.sessionStorage.setItem(RECEIPT_ID_STORAGE_KEY, receiptIdFromUrl);
    }
  }, [searchParams]);

  const canSubmit = useMemo(() => items.length > 0 && postalCode.trim().length > 0, [items, postalCode]);

  const findNearbyStores = async () => {
    setRetailersLoading(true);
    setRetailersError("");
    setRetailers([]);

    try {
      const response = await fetch("/api/instacart/retailers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postalCode,
          countryCode: "US",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to load nearby retailers");
      }

      setRetailers(Array.isArray(data.retailers) ? data.retailers : []);
      const nextParams = new URLSearchParams();
      nextParams.set("postalCode", postalCode);
      if (receiptId) {
        nextParams.set("receiptId", receiptId);
      }
      router.replace(`/instacart?${nextParams.toString()}`);
    } catch (error) {
      setRetailersError(
        error instanceof Error ? error.message : "Failed to load nearby retailers",
      );
    } finally {
      setRetailersLoading(false);
    }
  };

  const createShoppingLink = async () => {
    setShoppingLoading(true);
    setShoppingError("");
    setShoppingUrl("");

    try {
      const response = await fetch("/api/instacart/products-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Receipt items",
          items,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to create shopping link");
      }

      setShoppingUrl(data.url);
    } catch (error) {
      setShoppingError(
        error instanceof Error ? error.message : "Failed to create shopping link",
      );
    } finally {
      setShoppingLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/40">
        <div className="flex flex-col gap-3 border-b border-blue-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
              Instacart
            </p>
            <h1 className="mt-2 text-3xl font-bold text-blue-900">Nearby stores for your receipt</h1>
            <p className="mt-2 max-w-2xl text-sm text-gray-600">
              We can show nearby Instacart retailers for your ZIP code and generate a shopping page
              for the receipt items. Exact matched products and prices appear on Instacart.
            </p>
          </div>
          <Link
            href={receiptId ? `/receipt-extraction?receiptId=${encodeURIComponent(receiptId)}` : "/receipt-extraction"}
            className="rounded-full border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
          >
            Back to receipt
          </Link>
        </div>

        <section className="mt-6">
          <h2 className="text-lg font-semibold text-blue-900">Receipt items</h2>
          {items.length === 0 ? (
            <p className="mt-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              No receipt items were found. Go back to the receipt summary and continue from there.
            </p>
          ) : (
            <div className="mt-3 flex flex-wrap gap-2">
              {items.map((item, index) => (
                <span
                  key={`${item.name}-${index}`}
                  className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900"
                >
                  {item.name}
                  {item.quantity && item.quantity > 1 ? ` x${item.quantity}` : ""}
                </span>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8 grid gap-4 rounded-3xl border border-blue-200 bg-blue-100 p-5 text-blue-900 md:grid-cols-[1.2fr_auto_auto] md:items-end">
          <div>
            <label htmlFor="postalCode" className="mb-2 block text-sm font-medium text-blue-800">
              ZIP code
            </label>
            <input
              id="postalCode"
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              placeholder="46204"
              className="w-full rounded-2xl border border-blue-300 bg-white px-4 py-3 text-blue-900 outline-none transition focus:border-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={findNearbyStores}
            disabled={!canSubmit || retailersLoading}
            className="rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:text-blue-100"
          >
            {retailersLoading ? "Finding stores..." : "Find nearby stores"}
          </button>
          <button
            type="button"
            onClick={createShoppingLink}
            disabled={items.length === 0 || shoppingLoading}
            className="rounded-2xl border border-blue-400 bg-white px-5 py-3 font-semibold text-blue-700 transition hover:border-blue-500 hover:bg-blue-50 disabled:cursor-not-allowed disabled:border-blue-200 disabled:bg-blue-50 disabled:text-blue-300"
          >
            {shoppingLoading ? "Creating link..." : "Shop on Instacart"}
          </button>
        </section>

        {retailersError ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {retailersError}
          </p>
        ) : null}

        {shoppingError ? (
          <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {shoppingError}
          </p>
        ) : null}

        {shoppingUrl ? (
          <section className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="text-lg font-semibold text-blue-900">Instacart shopping page</h2>
            <p className="mt-2 text-sm text-blue-800">
              Open Instacart to see the matched products and current pricing for your receipt items.
            </p>
            <a
              href={shoppingUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Open on Instacart
            </a>
          </section>
        ) : null}

        {retailers.length > 0 ? (
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-blue-900">Nearby Instacart retailers</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {retailers.map((retailer, index) => (
                <div
                  key={`${retailer.retailer_key ?? retailer.name ?? "retailer"}-${index}`}
                  className="rounded-2xl border border-blue-100 bg-blue-50 p-4"
                >
                  <p className="font-semibold text-blue-900">
                    {retailer.name ?? "Unnamed retailer"}
                  </p>
                  <p className="mt-1 text-sm text-blue-600">
                    {retailer.retailer_key ?? "Retailer key unavailable"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
