import {
  getApprovedProperties,
  getUnapprovedProperties,
} from "@/lib/db/approval";
import { getUserByClerkId } from "@/lib/db/user";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const MyProperties = async () => {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const dbUser = await getUserByClerkId(user.id);

  if (!dbUser) return <p>Unauthorized! cant access!</p>;

  const approveProperties = await getApprovedProperties(dbUser.id);
  const unApproveProperties = await getUnapprovedProperties(dbUser.id);
  console.log(unApproveProperties);

  return (
    <div className="my-8 mx-6">
      <p className="heading">My Properties</p>
                <div className="grid grid-cols-12 my-4 font-semibold bg-primary-superlight p-2">
                  <p className="col-span-2">Approved</p>
                  <p className="col-span-4">Description</p>
                  <p className="col-span-1">Date</p>
                  <p className="col-span-3">Actions</p>
                </div>

      <div className="flex flex-col gap-8">
        {approveProperties.map((item, i) => (
          <div key={i} className="grid grid-cols-12 items-center justify-center">
            <Image className="col-span-2" src={item.media[0].url} 
            height={90} width={90} alt="img"/>
            <div className="col-span-4">
              <p>{item.title}</p>
              <p>{item.description}</p>
            </div>
            <p className="col-span-1 text-gray-800">Date</p>
            <p className="col-span-1 text-gray-800">Edit</p>
            <p className="col-span-1 text-gray-800">Delete</p>
            <p className="col-span-1 text-gray-800">Favorite</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 my-4 font-semibold bg-primary-superlight p-2">
                  <p className="col-span-2">Unapproved</p>
                  <p className="col-span-4">Description</p>
                  <p className="col-span-1">Date</p>
                  <p className="col-span-3">Actions</p>
                </div>
      <div className="">
        {unApproveProperties.map((item, i) => (
          <div key={i} className="">
            <p>{item.title}</p>
            <div className="">
              {item.media.map((data, i) => (
                <Image
                  key={i}
                  src={data.url}
                  alt="img"
                  width={50}
                  height={50}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
