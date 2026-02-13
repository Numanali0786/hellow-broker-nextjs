// "use client";
// import React, { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { useUser } from "@clerk/nextjs";
// import axios from "axios";
// import Image from "next/image";
// import { capitalize } from "@/utils/functions";
// import { Property,Media,PropertyList } from "@/utils/types";

// const HomeSection = ({title,type}:{title:string,type:string}) => {
//   const [lists, setLists] = useState<PropertyList>([]);
//   console.log(lists);

//   const { isLoaded, user } = useUser();

//   useEffect(() => {
//     const getLists = async () => {
//       const data = await axios.get(
//         `/api/properties/filtered?type=${type}`
//       );
//       setLists(data.data);
//     };
//     isLoaded && user && getLists();
//   }, [isLoaded, user]);
//   if (lists?.length < 1) return;
//   return (
//     <div className="mt-6 mb-26">
//       <p className="text-[24px] font-bold mx-auto">{title} Properties</p>
//       <p className="text-[14px] text-primary-subheading">The most searched projects in Delhi South West</p>
//       <Carousel
//         opts={{
//           align: "start",
//         }}
//         className="w-full max-w-4xl"
//       >
//         <CarouselContent>
//           {lists.map((item, index) => (
//             <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
//               <div className="">
//                 <Card className="">
//                   <CardContent className="cursor-pointer w-full aspect-square items-center justify-center">
//                     <Image src={item.media[0].url} alt="" width='190' height={'100'} className="w-full rounded-lg mt-6 pb-4"/>
//                     <p className="text-primary-heading text-[14px] font-[700]">{capitalize(item.title)}</p>{" "}
//                     <p className="text-primary-subheading text-[12px] ">This is a test sentence.</p>
//                     <div className="flex gap-2 text-primary-subheading text-[12px]">
//                       <p>kjdsjd</p>
//                       <p>kjdsjd</p>
//                     </div>
//                     <p className="text-primary-heading text-[12px] font-[700]">Price</p>

//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </div>
//   );
// };

// export default HomeSection;

"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useUser } from "@clerk/nextjs";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import { capitalize } from "@/lib/utils/functions";
import { PropertyList } from "@/lib/utils/types";
import Skeleton1 from "../skeleton/Skeleton1";

// axios fetcher
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const HomeSection = ({ title, type }: { title: string; type: string }) => {
  const { isLoaded, user } = useUser();

  const shouldFetch = isLoaded && user;

  const {
    data: lists,
    error,
    isLoading,
  } = useSWR<PropertyList>(
    shouldFetch ? `/api/properties/filtered?type=${type}` : null,
    fetcher,
  );

  if (isLoading) return <Skeleton1 />;
  if (error || !lists || lists.length < 1) return null;

  return (
    <div className="mt-6 mb-26">
      <p className="text-[24px] font-bold mx-auto">{title} Properties</p>
      <p className="text-[14px] text-primary-subheading">
        The most searched projects in Delhi South West
      </p>
      <Carousel opts={{ align: "start" }} className="w-full max-w-4xl">
        <CarouselContent>
          {lists.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card>
                <CardContent className="cursor-pointer w-full aspect-square items-center justify-center">
                  <div className="h-[150px] object-cover">
                    {item.media.length > 0 ? (
                      <Image
                        src={item.media[0].url}
                        alt=""
                        width={100}
                        height={150}
                        className="w-full rounded-lg mt-6 pb-4 h-[150px]"
                        objectFit="cover"
                      />
                    ) : (
                      <Image
                        src={
                          "data:image/jpeg;base64,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"
                        }
                        alt="img"
                        className="w-full rounded-lg mt-6 pb-4 h-[150px]"
                      />
                    )}
                  </div>
                  <p className="text-primary-heading text-[14px] font-[700]">
                    {capitalize(item.title)}
                  </p>
                  <p className="text-primary-subheading text-[12px]">
                    This is a test sentence.
                  </p>
                  <div className="flex gap-2 text-primary-subheading text-[12px]">
                    <p>kjdsjd</p>
                    <p>kjdsjd</p>
                  </div>
                  <p className="text-primary-heading text-[12px] font-[700]">
                    Price
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HomeSection;
