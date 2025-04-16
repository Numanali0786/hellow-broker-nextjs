// src/app/(admin)/admin/page.tsx
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function AdminPage() {
  // ✅ Step 1: Get current user from Clerk
  const user = await currentUser();

  if (!user) return redirect("/sign-in");

  // ✅ Step 2: Sync user to DB if not already present
  const existingUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!existingUser) {
    const userCount = await prisma.user.count();
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        role: userCount === 0 ? "admin" : "user",
      },
    });
  }

  // ✅ Step 3: Fetch the (now definitely existing) user
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (dbUser?.role === "admin") {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-green-600">Welcome, Admin!</h1>
        <p>You have full access to this dashboard.</p>
      </div>
    );
  }

  return (
    <div className="p-4 text-red-600">
      Access Denied. You are not authorized to view this page.
    </div>
  );
}

export default AdminPage;
