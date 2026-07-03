"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { mockAddresses } from "@/lib/data";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [showForm, setShowForm] = useState(false);

  const removeAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
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
          onSubmit={(e) => {
            e.preventDefault();
            setShowForm(false);
          }}
          className="grid grid-cols-1 gap-3 border border-line dark:border-line-dark p-6 sm:grid-cols-2"
        >
          <input required placeholder="Label (e.g. Home)" className="input-flow" />
          <input required placeholder="Full name" className="input-flow" />
          <input required placeholder="Address line" className="input-flow sm:col-span-2" />
          <input required placeholder="City" className="input-flow" />
          <input required placeholder="State" className="input-flow" />
          <input required placeholder="ZIP code" className="input-flow" />
          <input required placeholder="Country" defaultValue="United States" className="input-flow" />
          <button type="submit" className="btn-primary sm:col-span-2">
            Save Address
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {addresses.map((addr) => (
          <div key={addr.id} className="border border-line dark:border-line-dark p-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-medium">{addr.label}</p>
              {addr.isDefault && (
                <span className="text-[10px] uppercase tracking-widest2 text-flow">
                  Default
                </span>
              )}
            </div>
            <p className="text-sm text-stone-dark dark:text-stone">{addr.fullName}</p>
            <p className="text-sm text-stone-dark dark:text-stone">{addr.line1}</p>
            <p className="text-sm text-stone-dark dark:text-stone">
              {addr.city}, {addr.state} {addr.zip}
            </p>
            <p className="text-sm text-stone-dark dark:text-stone">{addr.country}</p>
            <div className="mt-4 flex gap-4 text-xs uppercase tracking-wide">
              <button className="underline">Edit</button>
              <button onClick={() => removeAddress(addr.id)} className="text-stone-dark dark:text-stone underline">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
