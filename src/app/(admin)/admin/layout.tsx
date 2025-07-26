import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserByClerkId } from "@/lib/db/user";
import SidebarProviderComp from "@/components/SidebarProviderComp";
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
        <SidebarProviderComp tabs={adminTabs}/>
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
