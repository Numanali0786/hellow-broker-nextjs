"use client";
import React from "react";
// import { Property,Media,PropertyList,User } from "@/utils/types";
import Image from "next/image";
import {
  Property,
  Media,
  Favorite,
  Report,
  User,
  City,
  State,
} from "@prisma/client";
import { useRouter } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type FullProperty = Property & {
  media: Media[];
  Favorite: Favorite[];
  Report: Report[];
  user: User;
  city: City;
  state: State;
};

const PropertyCard = ({ ele }: { ele: FullProperty }) => {
  const router = useRouter();
   const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // ✅ Prevents card click
    console.log("Button clicked without redirect");
  };
  return (
    <Card className="z-0 w-full shadow-md rounded-xl cursor-pointer"  onClick={()=>router.push(`/properties/${ele.id}`)}>
      <CardContent className="flex gap-4 p-4 h-60">
        <Image
          src={ele.media[0].url}
          alt=""
          height={200}
          width={375}
          className="object-fil rounded-xl"
        />
        <div className="flex-1 rounded-xl">
          <div className="">
            <p className="font-bold">{ele.title}</p>
            <p>
              {ele.bedrooms} BHK {ele.type} in {ele.city.name}
            </p>
            <p>&#8377; {ele.price}</p>
            <p className="text-gray-600 text-sm">{ele.age}</p>
            <p className="text-gray-600 text-sm">{ele?.description}</p>
          </div>
          <div className="z-10 mt-8 flex gap-4">
            <Button className="z-10 cursor-pointer" onClick={handleButtonClick} variant={"default"}>View Number</Button>
            <Button className="z-10 cursor-pointer" onClick={handleButtonClick} variant={"secondary"}>Contact</Button>
          </div>
        </div>
      </CardContent>
    </Card>
    // <section className='grid grid-cols-7 bg-amber-50 min-h-[300px] min-w-[310px]' onClick={()=>router.push(`/properties/${ele.id}`)}>
    //   <Image src={ele.media[0].url} alt='' height={100} width={100} className='col-span-3' />
    //   <div className="p-4  col-span-4">
    //     <p>{ele.title}</p>
    //     <p>{ele.bedrooms} BHK {ele.type}</p>
    //     <p>{ele.price}</p>
    //     <p>{ele.age}</p>
    //     <p>{ele?.description}</p>
    //   </div>
    // </section>
  );
};

export default PropertyCard;
