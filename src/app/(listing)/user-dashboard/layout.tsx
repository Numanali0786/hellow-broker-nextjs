import {

  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import SidebarProviderComp from "@/components/SidebarProviderComp";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ Step 1: Get current user from Clerk
  const user = await currentUser();

  if (!user) return redirect("/sign-in");

  // // ✅ Step 2: Sync user to DB if not already present
  // const existingUser = await getUserByClerkId(user.id);

  // if (!existingUser) {
  //   const userCount = await prisma.user.count();
  //   await prisma.user.create({
  //     data: {
  //       clerkId: user.id,
  //       email: user.emailAddresses[0].emailAddress,
  //       role: userCount === 0 ? "ADMIN" : "USER",
  //     },
  //   });
  // }

  // // ✅ Step 3: Fetch the (now definitely existing) user
  // const dbUser = await prisma.user.findUnique({
  //   where: { clerkId: user.id },
  // });

  return (
    
    <SidebarProvider>
      <SidebarProviderComp/>
      <main className="w-full h-full">
        <SidebarTrigger className="z-20 md:hidden mt-[18px] nl-4" />
        <Toaster position="top-right" />

        {children}
      </main>
    </SidebarProvider>
  );

  //  if (dbUser?.role === "ADMIN") {
  //   return redirect('/admin')
  //  }
}
