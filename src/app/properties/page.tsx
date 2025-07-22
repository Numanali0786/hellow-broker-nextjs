// app/properties/page.tsx
import { PropertyType, ListingCategory, Property, Prisma } from "@prisma/client"; // import enums

import { prisma } from "@/lib/prisma";
import PropertyCard from "./PropertyCard";

// override bedrooms tempororly from bredrooms:number to string[]
type Props = {
  searchParams: Promise<Omit<Property,"bedrooms"> & {
    bedrooms:string[]
  } >;
};

// type CustomProperty = Omit<Property, "bedrooms"> & {
//   bedrooms: string[];
// };
// function isValidPropertyType(value: any): value is PropertyType {
//   return Object.values(PropertyType).includes(value as PropertyType);
// }

// function isValidListingCategory(value: any): value is ListingCategory {
//   return Object.values(ListingCategory).includes(value as ListingCategory);
// }

export default async function PropertiesPage({ searchParams }: Props) {
  const { stateId, cityId, type, listingCategory, bedrooms,location } =
    await searchParams;
  console.log(stateId,cityId);
  const bedroomParams = bedrooms?.map((ele) => +ele.split(" ")[0]);
  // const filters: any = {
  //   approved: true,
  //   state: { equals: state, mode: "insensitive" },
  //   city: { equals: city, mode: "insensitive" },
  //   location: { contains: location, mode: "insensitive" },
  //   ...(propertyType && { type: { equals: propertyType as PropertyType } }),
  //   ...(listingCategories && {
  //     listingCategory: { equals: listingCategories as ListingCategory },
  //     ...(bedrooms && { bedrooms: { in: bedroomParams } }),
  //   }),

  //   // ...(isValidPropertyType(propertyType) && { type: { equals: propertyType } }),
  //   // ...(isValidListingCategory(listingCategories) && { listingCategory: { equals: listingCategories } }),
  // };


  const filters:  Prisma.PropertyWhereInput  = {
    approved: true,
    ...(stateId && { stateId: { equals: stateId } }),
    ...(cityId && { cityId: { equals: cityId } }),
    ...(location && { location: { contains: location, mode: "insensitive" } }),
    ...(type && { type: { equals: type as PropertyType } }),
    ...(listingCategory && { listingCategory: { equals: listingCategory as ListingCategory } }),
    ...(bedrooms && { bedrooms: { in: bedroomParams } }),
  };
  
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
