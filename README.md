type PropertyWithMedia = Prisma.PropertyGetPayload<{
  include: {
    media: true;
  };
}>;
type pp = Property & {
  media:Media[]
}

===========================
prisma
import {
  PropertyType,
  ListingCategory,
  Property,
  Prisma,
} from "@prisma/client"; 

import { prisma } from "@/lib/prisma";
===========================
neon
===========================
clerk
const { isLoaded, user } = useUser();
===========================
useRouter
===========================
useSearchParams
'use client'
import { useSearchParams } from 'next/navigation'
export default function SearchBar() {
  const searchParams = useSearchParams()
 
  const search = searchParams.get('search')
 
  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: {search}</>
}

===========================
URLSearchParams- .set(), .get(), .append(), .toString()

===========================
useState<string[]>([])
===========================
  // 🟥 Without include: You only get data from the property table itself. like media:[] will be literally absent, means np key val for media if not included.
  // ✅ With include: You also get related data from other tables (user, media, etc.).
  // Prisma will only return the fields defined directly in the property table.
 model Property {
  id        String   @id @default(cuid())
  approved  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  userId    String //passed while creating a property
  user      User     @relation(fields: [userId], references: [id]) 
  //take this userId and find an User whose id is same as this userId and fill it in user field
  //to populate these relations, by default relation key:val not available
  include: {
      media: true,
      Favorite: true,
      Report: true,
      user: true,
      city:true,
      state:true
    },
// user:{id: 'cmdj7iomm000dfc1kqveb5kuv', clerkId: 'user_30Nc1cZcEef4fIDUG34m1PbG0fM', email: 'numan4599322ali@gmail.com', name: null, address: null, …}
// userId:"cmdj7iomm000dfc1kqveb5kuv"

  title String
  type  PropertyType

  stateId         String
  cityId          String
  location        String // User enters manually
  city            City            @relation(fields: [cityId], references: [id]) 
  //find a city whose id equals passed(while creating property) cityId 
  
  state           State           @relation(fields: [stateId], references: [id])
  // rooms           Int // sqft or sq meters
  price           Int
  listingCategory ListingCategory // 🔥 Buy | Rent | 
  facing          String
  description     String?
  bedrooms        Int
  bathrooms       Int
  area            Int // sqft or sq meters
  age             String

  // 💥 Admin control related fields
  isFeatured     Boolean    @default(false)
  isHandpicked   Boolean    @default(false)
  isRecommended  Boolean    @default(false)
  isPopular      Boolean    @default(false)
  isReported     Boolean    @default(false)
  isBoosted      Boolean    @default(false)
  reportReason   String? // optional text if reported
  views          Int        @default(0) // for popularity
  favoritesCount Int        @default(0) // for tracking likes
  Favorite       Favorite[]
  Report         Report[]
  media          Media[]
}
model Media {
  id         String   @id @default(cuid())
  publicId   String
  url        String
  type       String // "image" or "video"
  format     String?
  width      Int?
  height     Int?
  createdAt  DateTime @default(now())
  property   Property @relation(fields: [propertyId], references: [id])
  propertyId String
}

===========================
    // api call
    // example
    // http://localhost:3000/properties?stateId=cm9zr78ye0000fchwy2o22faw&cityId=cm9zr79120001fchwuho57sf3&type=HOUSE&listingCategory=BUY&location=Jamia%2C+New+Delhi
    // http://localhost:3000/properties?stateId=cmdj717x50001fc1kyc2iws9k&cityId=cmdj717xa0002fc1k117uqfe8&type=HOUSE&price=0-930000&listingCategory=BUY&location=Muzaffarpur
    // http://localhost:3000/properties?price=0-1000000&bedrooms=1+BHK&bedrooms=2+BHK
    router.push(`/properties?${params.toString()}`);
===========================
how properties is being serched/filtered

-In HomeSearch.tsx taking all fiels input to filter a property like state, city, type, rooms count etc
-Now creating URL(filter so that it can be accepted as params and used as filter in properties page) using URLSearchParams and redirect to a page using router.push
// http://localhost:3000/properties?stateId=cmdj717x50001fc1kyc2iws9k&cityId=cmdj717xa0002fc1k117uqfe8&type=HOUSE&price=0-930000&listingCategory=BUY&location=Muzaffarpur
    // http://localhost:3000/properties?price=0-1000000&bedrooms=1+BHK&bedrooms=2+BHK
    router.push(`/properties?${params.toString()}`);

-In properties page querry db direcly bcs property is a server comp and db querry are async/awiat
-If it uses "use client" then need to hit api using axios as db query not allowed in client comp like add-listing page is client comp
await prisma.property.findMany()
===========================
creating a property

-In AddListing page take all inputs used to create a listing in temp and hit api
-await axios.post("/api/properties", temp);
-In /api/properties
await prisma.property.create()
add-listing page uses "use client" then need to hit api using axios as db query not allowed in client comp like add-listing page is client comp
-In short db can be querry direcltly in server comp not in client so in client use axios etc and querry db in a route handler.
===========================
===========================
===========================
===========================
===========================

import useSWR from "swr";
  // const { isLoaded, user } = useUser();
  // const shouldFetch = user && isLoaded;
  
  // axios fetcher
  // const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  // const {
  //   data: lists,
  //   error,
  //   isLoading,
  // } = useSWR<pp[]>(
  //   shouldFetch ? `/api/properties/filtered?type=${type}` : null,
  //   fetcher
  // );