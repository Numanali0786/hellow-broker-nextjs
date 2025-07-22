import React from 'react'
// import { Property,Media,PropertyList,User } from "@/utils/types";
import Image from 'next/image';
import { Property, Media, Favorite, Report, User } from "@prisma/client";

type FullProperty = Property & {
  media: Media[];
  Favorite: Favorite[];
  Report: Report[];
  user: User;
};



const PropertyCard = ({ele}:{ele:FullProperty}) => {
  return (
    <section className='grid grid-cols-7 bg-amber-50 min-h-[300px] min-w-[310px]'>
      {<Image src={ele.media[0].url} alt='' height={100} width={100} className='col-span-3 w-full h-full' />}
      <div className="p-4  col-span-4">
        <p>{ele.title}</p>
        <p>{ele.bedrooms} BHK {ele.type}</p>
        <p>{ele.price}</p>
        <p>{ele.age}</p>
        <p>{ele?.description}</p>
      </div>
    </section>
  )
}

export default PropertyCard