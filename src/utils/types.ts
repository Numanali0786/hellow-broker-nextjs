


// export type Role = 'USER' | 'ADMIN';

// export type PropertyType =
// | 'APARTMENT'
// | 'HOUSE'
// | 'VILLA'
// | 'STUDIO'
// | 'LAND'
// | 'FLOOR'
// | 'COMMERCIAL';

// export type ListingCategory = 'BUY' | 'RENT';

// export interface User {
//   id: string;
//   clerkId: string;
//   email: string;
//   name?: string | null;
//   address?: string | null;
//   title?: string | null;
//   role: Role;
//   createdAt: Date;
//   updatedAt: Date;

//   // Relations
//   properties?: Property[];
//   favorites?: Favorite[];
//   reports?: Report[];
// }
// export interface Property {
//   id: string;
//   approved: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   userId: string;
//   user: User;

//   title: string;
//   type: PropertyType;
//   state: string;
//   price: number;
//   listingCategory: ListingCategory;
//   facing: string;
//   description?: string | null;
//   city: string;
//   bedrooms: number;
//   bathrooms: number;
//   area: number;
//   age: string;
//   location: string;
  
//   // Admin controls
//   isFeatured: boolean;
//   isHandpicked: boolean;
//   isRecommended: boolean;
//   isPopular: boolean;
//   isReported: boolean;
//   isBoosted: boolean;
//   reportReason?: string | null;
//   views: number;
//   favoritesCount: number;
  
//   // Relations
//   Favorite: Favorite[];
//   Report: Report[];
//   media: Media[];
// }
// export interface Favorite {
//   id: string;
//   userId: string;
//   user?: User;
//   propertyId: string;
//   property?: Property;
//   createdAt: Date;
// }
// export interface Report {
//   id: string;
//   reason: string;
//   userId: string;
//   user?: User;
//   propertyId: string;
//   property?: Property;
//   createdAt: Date;
// }
// export interface Media {
//   id: string;
//   publicId: string;
//   url: string;
//   type: string; // "image" | "video"
//   format?: string | null;
//   width?: number | null;
//   height?: number | null;
//   createdAt: Date;
//   propertyId: string;
//   property?: Property;
// }

// export type PropertyList = Property[];


///////////////////////////////

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN"
}

export enum PropertyType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  VILLA = "VILLA",
  STUDIO = "STUDIO",
  LAND = "LAND",
  FLOOR = "FLOOR",
  COMMERCIAL = "COMMERCIAL"
}

export enum ListingCategory {
  BUY = "BUY",
  RENT = "RENT"
}

export type User = {
  id: string;
  clerkId: string;
  email: string;
  name?: string;
  address?: string;
  title?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  properties?: Property[];
  favorites?: Favorite[];
  reports?: Report[];
};

export type Property = {
  id: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  title: string;
  type: PropertyType;
  stateId: string;
  cityId: string;
  location: string;
  city: City;
  state: State;
  price: number;
  listingCategory: ListingCategory;
  facing: string;
  description?: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  age: string;
  isFeatured: boolean;
  isHandpicked: boolean;
  isRecommended: boolean;
  isPopular: boolean;
  isReported: boolean;
  isBoosted: boolean;
  reportReason?: string;
  views: number;
  favoritesCount: number;
  Favorite: Favorite[];
  Report: Report[];
  media: Media[];
};

export type Favorite = {
  id: string;
  userId: string;
  user: User;
  propertyId: string;
  property: Property;
  createdAt: Date;
};

export type Report = {
  id: string;
  reason: string;
  userId: string;
  user: User;
  propertyId: string;
  property: Property;
  createdAt: Date;
};

export type Media = {
  id: string;
  publicId: string;
  url: string;
  type: string;
  format?: string;
  width?: number;
  height?: number;
  createdAt: Date;
  propertyId: string;
  property: Property;
};

export type State = {
  id: string;
  name: string;
  cities: City[];
  Property: Property[];
};

export type City = {
  id: string;
  name: string;
  stateId: string;
  state: State;
  Property: Property[];
};
export type PropertyList = Property[];