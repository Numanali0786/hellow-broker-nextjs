"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const typeColor = ["bg-blue-100", "bg-green-100", "bg-yellow-100"];
const propertyType = [
  "APARTMENT",
  "HOUSE",
  "VILLA",
  "STUDIO",
  "LAND",
  "FLOOR",
  "COMMERCIAL",
];
const PropertyType = () => {
  const router = useRouter();
  return (
    <div className="">
      <p className="text-[24px] font-bold mx-auto">
        Apartments, Villas and more
      </p>
      <p className="text-[14px] text-primary-subheading">
        The most searched projects in Delhi South West
      </p>
      <br />
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {propertyType.map((prop, i) => (
            <CarouselItem
              key={prop}
              className="md:basis-1/2 lg:basis-1/3 w-full"
            >
              <div className="p-2 ">
                <Card className={typeColor[i % 3]}>
                  <CardContent
                    className="flex flex-col gap-2 aspect-square items-center justify-center p-6 w-full cursor-pointer
                  "
                    onClick={() => router.push(`/properties?type=${prop}`)}
                  >
                    <p className="text-lg font-semibold">{prop}</p>
                    <p>20+ properties</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default PropertyType;
