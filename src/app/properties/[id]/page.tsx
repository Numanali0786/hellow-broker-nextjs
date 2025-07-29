import { CarouselComp } from '@/components/property-details/Carousel'
import { prisma } from '@/lib/prisma'
import React from 'react'

const PropertyDetail = async({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
    const property= await prisma.property.findUnique({
        where:{
            id
        },include:{
          media:true,
          city:true
        }
    })
    console.log(property?.media)
  return (
    <div className="grid grid-cols-3 max-w-[80vw] mx-auto">
    <div className='p-10 max-w-3xl col-span-2'>
      <div className="my-10">
        <p className='heading'>{property?.title}</p>
        <p>{property?.description}</p>
      </div>
      <p className='heading pb-2'>Gallery</p>
       {property?.media ? <CarouselComp media={property?.media}/>: <p>No image to see</p>}

       <div className="">
        <p className='heading mt-4'>Property Detals</p>
        <p>{property?.title}</p>
        <p>{property?.bedrooms} BHK {property?.type} in {property?.city.name}</p>
        <p>{property?.description}</p>
       </div>
    </div>
    <div className="bg-white">Filter</div>
    </div>
  )
}

export default PropertyDetail