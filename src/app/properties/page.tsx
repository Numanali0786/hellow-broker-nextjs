// app/properties/page.tsx
import { PropertyType, ListingCategory } from "@prisma/client"; // import enums

import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: Promise<{
    state?: string;
    city?: string;
    propertyType?: string;
    listingCategories?: string;
  }>;
};
function isValidPropertyType(value: any): value is PropertyType {
  return Object.values(PropertyType).includes(value as PropertyType);
}

function isValidListingCategory(value: any): value is ListingCategory {
  return Object.values(ListingCategory).includes(value as ListingCategory);
}

export default async function PropertiesPage({ searchParams }: Props) {
  const { state, city, propertyType, listingCategories } = await searchParams;
  const filters: any = {
    ...(state && { state: { equals: state, mode: "insensitive" } }),
    ...(city && { city: { equals: city, mode: "insensitive" } }),
    ...(propertyType && { type: { equals: propertyType as PropertyType } }),
    ...(listingCategories && {
      listingCategory: { equals: listingCategories as ListingCategory},
    }),

    // ...(isValidPropertyType(propertyType) && { type: { equals: propertyType } }),
    // ...(isValidListingCategory(listingCategories) && { listingCategory: { equals: listingCategories } }),
  };
  const properties = await prisma.property.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Filtered Properties</h1>

      {properties.length === 0 && <p>No properties found.</p>}

      <div className="grid gap-4">
        {properties.map((p) => (
          <div key={p.id} className="border p-4 rounded">
            <h2 className="font-bold">{p.title}</h2>
            <p>
              {" "}
              {p.city}, {p.state}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
