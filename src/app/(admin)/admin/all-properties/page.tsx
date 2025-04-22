import { getAllApprovedProperties } from "@/lib/db/properties";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const properties = await getAllApprovedProperties(user.id);
  if (!properties) {
    return <p>You are not authorized to see this page, login as Admin.</p>;
  }
  return <div className="">
    <p>All Authorized Users of HelloW Broker!</p>
    <div className="">
      {properties.map((item,i)=>(
        <p key={i}>{item.title}</p>
      ))}
    </div>

  </div>;
}

export default page;
