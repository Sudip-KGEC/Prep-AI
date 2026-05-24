import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function OnboardingLayout({ children }) {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");

  
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { role: true },
  });

  // User exists and already has a role — redirect away
  if (user && user.role !== "UNASSIGNED") {
    redirect(user.role === "INTERVIEWER" ? "/dashboard" : "/explore");
  }

  return <div className="mt-20">{children}</div>;
}