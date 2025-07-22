import React from "react";
import CarouserComp from "../CarouserComp";
import { getFilteredProperties } from "@/lib/db/properties";
// type PropertyWithMedia = Prisma.PropertyGetPayload<{
//   include: {
//     media: true;
//   };
// }>;
// type PropertyWithMedia = Property & {
//   media: Media[];
// };
const Popular = async ({ title, type }: { title: string; type: string }) => {
//  await new Promise((res)=>{
//     setTimeout(()=>{
//       res('resolved')
//     },2000)
//   })
    const lists = await getFilteredProperties(type);
    if (!lists) return "error";
    
    return (
      <div className="mt-6 mb-26">
      <p className="text-[24px] font-bold mx-auto">{title} Properties</p>
      <p className="text-[14px] text-primary-subheading">
        The most searched projects in Delhi South West
      </p>
      <CarouserComp lists={lists} />
    </div>
  );
};

export default Popular;
