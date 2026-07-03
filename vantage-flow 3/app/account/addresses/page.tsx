"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Address } from "@/lib/types";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/addresses")
      .then((res) => res.json())
      .then((data) => setAddresses(data.addresses ?? []))
      .finally(() => setLoading(false));
  }, []);

  const addAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    const body = {
      label: form.get("label"),
      fullName: form.get("fullName"),
      line1: form.get("line1"),
      city: form.get("city"),
      state: form.get("state"),
      zip: form.get("zip"),
      country: form.get("country"),
      isDefault: addresses.length === 0
    };
    const res = await fetch("/api/addresses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data.address) setAddresses((prev) => [...prev, data.address]);
    setSaving(false);
    setShowForm(false);
    e.currentTarget.reset();
  };

  const removeAddress = async (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    await fetch(`/api/addresses/${id}`, { method: "DELETE" }).catch(() => {});
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl tracking-tightest">Saved Addresses</h2>
        <button onClick={() => setShowForm((s) => !s)} className="btn-secondary text-xs">
          <Plus size={14} /> Add Address
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={addAddress}
          className="grid grid-cols-1 gap-3 border border-line dark:border-line-dark p-6 sm:grid-cols-2"
        >
          <input name="label" required placeholder="Label (e.g. Home)" className="input-flow" />
          <input name="fullName" required placeholder="Full name" className="input-flow" />
          <input name="line1" required placeholder="Address line" className="input-flow sm:col-span-2" />
          <input name="city" required placeholder="City" className="input-flow" />
          <input name="state" required placeholder="State" className="input-flow" />
          <input name="zip" required placeholder="ZIP code" className="input-flow" />
          <input name="country" required placeholder="Country" defaultValue="United States" className="input-flow" />
          <button type="submit" disabled={saving} className="btn-primary sm:col-span-2 disabled:opacity-50">
            {saving ? "Saving…" : "Save Address"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-stone-dark dark:text-stone">Loading addresses…</p>
      ) : addresses.length === 0 ? (
        <p className="text-sm text-stone-dark dark:text-stone">No saved addresses yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div key={addr.id} className="border border-line dark:border-line-dark p-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-medium">{addr.label}</p>
                {addr.isDefault && (
                  <span className="text-[10px] uppercase tracking-widest2 text-flow">Default</span>
                )}
              </div>
              <p className="text-sm text-stone-dark dark:text-stone">{addr.fullName}</p>
              <p className="text-sm text-stone-dark dark:text-stone">{addr.line1}</p>
              <p className="text-sm text-stone-dark dark:text-stone">
                {addr.city}, {addr.state} {addr.zip}
              </p>
              <p className="text-sm text-stone-dark dark:text-stone">{addr.country}</p>
              <div className="mt-4 flex gap-4 text-xs uppercase tracking-wide">
                <button
                  onClick={() => removeAddress(addr.id)}
                  className="text-stone-dark dark:text-stone underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
