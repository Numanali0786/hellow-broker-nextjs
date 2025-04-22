import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserByClerkId } from "@/lib/db/user";


import { userTabs } from "@/utils/tabs";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ Step 1: Get current user from Clerk
  const user = await currentUser();

  if (!user) return redirect("/sign-in");

  // ✅ Step 2: Sync user to DB if not already present
  const existingUser = await getUserByClerkId(user.id);

  if (!existingUser) {
    const userCount = await prisma.user.count();
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        role: userCount === 0 ? "ADMIN" : "USER",
      },
    });
  }

  // ✅ Step 3: Fetch the (now definitely existing) user
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  return (
    <SidebarProvider>
      <Sidebar className="">
        <SidebarContent>
          <SidebarGroupLabel className="text-lg pl-6 pt-6 ">
            Hellow Broker
          </SidebarGroupLabel>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {userTabs.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="w-full h-full">
        <SidebarTrigger className="z-20 md:hidden mt-[18px] nl-4" />

        {children}
      </main>
    </SidebarProvider>
  );

  //  if (dbUser?.role === "ADMIN") {
  //   return redirect('/admin')
  //  }
}
