import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Media } from "@prisma/client"
import Image from "next/image"

export function CarouselComp({media}:{
    media:Media[]
}) {
  return (
    <Carousel className="w-full">
      <CarouselContent className="">
        {media.map((item) => (
          <CarouselItem key={item.id}>
            <div className="pl-3">
                
              <Card className="">
                <CardContent className="h-[540px] flex aspect-square items-center justify-center p-6">
               <Image src={item.url} alt="img" width={620} height="300" className="h-[500px]"/>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
