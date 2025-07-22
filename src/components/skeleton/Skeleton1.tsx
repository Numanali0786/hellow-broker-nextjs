import React from 'react'
import { Skeleton } from '../ui/skeleton'

const Skeleton1 = () => {
  return (
    <div className="py-8">
    <div className="flex flex-col gap-2 w-full">
    <Skeleton className="h-5" />
    <Skeleton className="h-2 w-[200px]" />
     
     </div>
    <div className=" py-6 flex gap-4">
      <Skeleton className="h-50 w-[200px]" />
      <Skeleton className="h-50 w-[200px]" />
      <Skeleton className="h-50 w-[200px]" />
      <Skeleton className="h-50 w-[200px]" />
    </div>
  </div>
  )
}

export default Skeleton1