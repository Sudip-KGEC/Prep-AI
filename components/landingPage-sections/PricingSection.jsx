"use client";

import { useAuth } from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/data";

export default function PricingSection() {
  const { has, userId } = useAuth();

  const isSignedIn = !!userId;
  const isOnStarter = isSignedIn && has({ plan: "starter" });
  const isOnPro = isSignedIn && has({ plan: "pro" });
  const isOnFree = isSignedIn && !isOnStarter && !isOnPro;

  const activePlanSlug = isOnPro
    ? "pro"
    : isOnStarter
    ? "starter"
    : isOnFree
    ? "free"
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {PLANS.map((plan) => {
        const isActive = activePlanSlug === plan.slug;

        return (
          <div
            key={plan.name}
            className={`relative rounded-2xl p-8 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 ${
              plan.featured
                ? "bg-[#141417] border border-violet-500/25"
                : "bg-[#0f0f11] border border-white/10 hover:border-violet-500/15"
            } ${isActive ? "ring-1 ring-violet-400/30" : ""}`}
          >
            {plan.featured && !isActive && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-[11px] font-semibold tracking-widest uppercase px-4 py-1 rounded-full whitespace-nowrap shadow-[0_0_16px_rgba(139,92,246,0.4)]">
                Most Popular
              </span>
            )}

            <p className="text-[11px] font-semibold text-stone-600 tracking-[0.2em] uppercase mb-4">
              {plan.name}
            </p>

            <div className="flex items-end gap-1 mb-1">
              <span
                className={`font-serif text-5xl leading-none tracking-tight ${
                  plan.featured
                    ? "bg-linear-to-br from-violet-400 to-purple-600 bg-clip-text text-transparent"
                    : "bg-linear-to-br from-stone-100 to-stone-400 bg-clip-text text-transparent"
                }`}
              >
                {plan.price}
              </span>
              <span className="text-sm text-stone-500 font-light mb-1.5">
                /month
              </span>
            </div>

            <p className="text-xs text-violet-400/70 mb-6">{plan.credits}</p>

            <div className="h-px bg-violet-500/10 mb-6" />

            <ul className="space-y-2.5 mb-8 flex-1">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-stone-400 font-light"
                >
                  <span className="text-violet-400 text-xs mt-0.5">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            {isActive ? (
              <Button
                variant={plan.featured ? "purple" : "default"}
                disabled
                className="w-full opacity-50 cursor-not-allowed rounded-full"
              >
                ✓ Current plan
              </Button>
            ) : plan.planId === null ? (
              isSignedIn ? (
                <Button
                  variant="outline"
                  disabled
                  className="w-full opacity-50 cursor-not-allowed rounded-full"
                >
                  Default plan
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full rounded-full border-violet-500/25 text-purple-200/70 hover:border-violet-500/60 hover:bg-violet-500/10 hover:text-purple-100 transition-all duration-300 bg-transparent">
                    Get started free
                  </Button>
                </SignInButton>
              )
            ) : isSignedIn ? (
              <CheckoutButton
                planId={plan.planId}
                planPeriod="month"
                checkoutProps={{
                  appearance: {
                    elements: {
                      drawerRoot: {
                        zIndex: 2000,
                      },
                    },
                  },
                }}
              >
                <Button
                  variant={plan.featured ? "purple" : "outline"}
                  className={`w-full rounded-full transition-all duration-300 ${
                    plan.featured
                      ? "shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_28px_rgba(139,92,246,0.5)]"
                      : "border-violet-500/25 text-purple-200/70 hover:border-violet-500/60 hover:bg-violet-500/10 hover:text-purple-100 bg-transparent"
                  }`}
                >
                  {activePlanSlug === "pro" && plan.slug === "starter"
                    ? "Downgrade"
                    : activePlanSlug === "starter" && plan.slug === "pro"
                    ? "Upgrade →"
                    : "Get started →"}
                </Button>
              </CheckoutButton>
            ) : (
              <SignInButton mode="modal">
                <Button
                  variant={plan.featured ? "purple" : "outline"}
                  className={`w-full rounded-full transition-all duration-300 ${
                    plan.featured
                      ? "shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_28px_rgba(139,92,246,0.5)]"
                      : "border-violet-500/25 text-purple-200/70 hover:border-violet-500/60 hover:bg-violet-500/10 hover:text-purple-100 bg-transparent"
                  }`}
                >
                  Get started →
                </Button>
              </SignInButton>
            )}
          </div>
        );
      })}
    </div>
  );
}