import arcjet, { detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/appointments(.*)",
  "/explore(.*)",
  "/dashboard(.*)",
  "/onboarding(.*)",
]);

const isWebhookRoute = createRouteMatcher([
  "/api/webhooks/stream(.*)",
]);

const aj = arcjet({
  key: process.env.ARCJET_KEY,

  characteristics: ["ip.src"],

  rules: [
    shield({
      mode: "LIVE",
    }),

    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "CATEGORY:PREVIEW",
      ],
    }),
  ],
});

export default clerkMiddleware(async (auth, req) => {
  // Skip trusted webhook routes
  if (!isWebhookRoute(req)) {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }
  }

  const { userId, redirectToSignIn } = await auth();

  // Protect private routes
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|webp|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};