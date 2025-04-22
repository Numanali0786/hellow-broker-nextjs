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
import { adminTabs } from "@/utils/tabs";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ✅ Step 1: Get current user from Clerk
  const user = await currentUser();

  if (!user) return redirect("/sign-in");

  // ✅ Step 3: Fetch the (now definitely existing) user
  const dbUser = await getUserByClerkId(user.id);

  if (dbUser?.role === "ADMIN") {
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
                  {adminTabs.map((item) => (
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
  }
  return (
    <div className="p-4 text-red-600">
      Access Denied. You are not authorized to view this page.
    </div>
  );
}
