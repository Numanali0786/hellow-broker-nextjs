import { prisma } from '@/lib/prisma'
import React from 'react'

const PropertyDetail = async({params}:{params:Promise<{id:string}>}) => {
    const {id} = await params
    const property= await prisma.property.findUnique({
        where:{
            id
        }
    })
    console.log(property)
  return (
    <div>
        <p>{property?.title}</p>
    </div>
  )
}

export default PropertyDetail