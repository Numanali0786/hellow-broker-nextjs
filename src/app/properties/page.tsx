// app/properties/page.tsx
import {
  PropertyType,
  ListingCategory,
  Property,
  Prisma,
} from "@prisma/client"; // import enums

import { prisma } from "@/lib/prisma";
import PropertyCard from "./PropertyCard";

// override bedrooms tempororly from bredrooms:number to string[]
type Props = {
  searchParams: Promise<
    Omit<Property, "bedrooms" | "price" | "area"> & {
      bedrooms: string[];
      price: string;
      area: string;
    }
  >;
};

export default async function PropertiesPage({ searchParams }: Props) {
  const {
    stateId,
    cityId,
    type,
    listingCategory,
    bedrooms,
    location,
    price,
    area,
  } = await searchParams;

  console.log(stateId, cityId);

  // Safely extract minPrice and maxPrice
  let minPrice: number | undefined;
  let maxPrice: number | undefined;

  if (price) {
    const [min, max] = price.split("-").map(Number);
    if (!isNaN(min)) minPrice = min;
    if (!isNaN(max)) maxPrice = max;
  }
  // Safely extract minArea and maxArea
  let minArea: number | undefined;
  let maxArea: number | undefined;

  if (area) {
    const [min, max] = area.split("-").map(Number);
    if (!isNaN(min)) minArea = min;
    if (!isNaN(max)) maxArea = max;
  }

  // Safely parse bedroom values if provided
  const bedroomParams = bedrooms
    ?.map((ele) => +ele.split(" ")[0])
    .filter(Boolean);

  // Build Prisma filters
  const filters: Prisma.PropertyWhereInput = {
    approved: true,
    ...(stateId && { stateId: { equals: stateId } }),
    ...(cityId && { cityId: { equals: cityId } }),
    ...(location && {
      OR: [
        { location: { contains: location, mode: "insensitive" } },
        { state: { name: { contains: location, mode: "insensitive" } } },
        { city: { name: { contains: location, mode: "insensitive" } } },
      ],
    }),
    ...(type && { type: { equals: type as PropertyType } }),
    ...(listingCategory && {
      listingCategory: { equals: listingCategory as ListingCategory },
    }),
    ...(minPrice !== undefined &&
      maxPrice !== undefined && {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      }),
    ...(minArea !== undefined &&
      maxArea !== undefined && {
        area: {
          gte: minArea,
          lte: maxArea,
        },
      }),
    ...(bedroomParams &&
      bedroomParams.length > 0 && {
        bedrooms: { in: bedroomParams },
      }),
  };

  console.log(filters);

  //   🟥 Without include: You only get data from the property table itself.
  // ✅ With include: You also get related data from other tables (user, media, etc.).
  // Prisma will only return the fields defined directly in the property table.
  const properties = await prisma.property.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
    include: {
      media: true,
      Favorite: true,
      Report: true,
      user: true,
    },
  });
  console.log("propery..............", properties[0]);

  return (
    <div className="grid grid-cols-4 gap-6 mx-auto md:w-[80vw] w-screen p-4">
      <div className="col-span-1">Filter Now</div>
      <div className="col-span-3">
        <h1 className="text-xl font-semibold mb-4">Filtered Properties</h1>

        {properties.length === 0 && <p>No properties found.</p>}

        <div className="grid gap-4">
          {properties?.map((ele, i) => (
            <PropertyCard key={i} ele={ele} />
          ))}
        </div>
      </div>
    </div>
  );
}
