"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { userTabs } from "@/utils/tabs";
import { redirect } from "next/navigation";
const SidebarProviderComp = () => {
  return (
      <Sidebar className="">
        <SidebarContent>
          <SidebarGroupLabel  className="text-lg pl-6 pt-6 ">
            <p className="cursor-pointer" onClick={()=>redirect('/')}>

            Hellow Broker
            </p>
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
  )
}

export default SidebarProviderComp