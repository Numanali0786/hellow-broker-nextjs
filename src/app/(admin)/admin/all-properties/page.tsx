import {  columns } from "@/components/tables/all-properties/columns"
import { DataTable } from "@/components/tables/all-properties/data-table"
import { getAllApprovedProperties } from "@/lib/db/properties";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// async function getData(): Promise<Item[]> {
// 

  // Fetch data from your API here.

 
  // return [
  //   {
  //     id: "728ed52f",
  //     name: 100,
  //     verified: false,
  //     email: "m@example.com",
  //   },
  //   // ...
  // ]
// }

export default async function DemoPage() {
  // const data = await getData()
  const user = await currentUser();
  if (!user) return redirect("/sign-in");
  const properties = await getAllApprovedProperties(user.id);
    if (!properties) {
  return <p>You are not authorized to see this page, login as Admin.</p>;
}
console.log(properties)
  return (
    <div className="container mx-auto py-10">
       {/* {properties.map((item,i)=>(
        <Card className="w-[350px] bg-red" key={i}>
          <CardContent>
          {item.title}
          </CardContent>
        </Card>
      ))} */}
      <DataTable columns={columns} data={properties} />
    </div>
  )
}
