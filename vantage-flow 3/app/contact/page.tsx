"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title="We're here to help"
        description="Questions about an order, a product, or a partnership — reach out and our team will respond within one business day."
      />

      <div className="container-flow grid grid-cols-1 gap-12 py-16 sm:py-24 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-1">
          <div className="flex gap-3">
            <Mail size={18} strokeWidth={1.5} className="mt-0.5 flex-none" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-stone-dark dark:text-stone">support@vantageflowllc.us</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Phone size={18} strokeWidth={1.5} className="mt-0.5 flex-none" />
            <div>
              <p className="text-sm font-medium">Phone</p>
              <p className="text-sm text-stone-dark dark:text-stone">Mon–Fri, 9am–6pm ET</p>
            </div>
          </div>
          <div className="flex gap-3">
            <MapPin size={18} strokeWidth={1.5} className="mt-0.5 flex-none" />
            <div>
              <p className="text-sm font-medium">Studio</p>
              <p className="text-sm text-stone-dark dark:text-stone">Vantage Flow LLC · United States</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {sent ? (
            <div className="border border-line dark:border-line-dark p-8 text-center">
              <p className="font-display text-2xl tracking-tightest">Message sent</p>
              <p className="mt-2 text-stone-dark dark:text-stone">
                Thanks for reaching out — we'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <input required placeholder="Name" className="input-flow" />
              <input required type="email" placeholder="Email" className="input-flow" />
              <select required defaultValue="" className="input-flow sm:col-span-2">
                <option value="" disabled>
                  Select a topic
                </option>
                <option>Order support</option>
                <option>Product question</option>
                <option>Returns & exchanges</option>
                <option>Wholesale / partnership</option>
                <option>Other</option>
              </select>
              <textarea
                required
                placeholder="Message"
                rows={6}
                className="input-flow sm:col-span-2"
              />
              <button type="submit" className="btn-primary sm:col-span-2">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
