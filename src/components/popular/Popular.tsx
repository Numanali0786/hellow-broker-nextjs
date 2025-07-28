import React from "react";
import CarouserComp from "./CarouserComp";
import { getFilteredProperties } from "@/lib/db/properties";
const popularSections = [
  {
    type: "popular",
    title: "Popular",
  },
];
const Popular = async () => {

  const lists = await getFilteredProperties(popularSections[0].type);
  console.log(popularSections[0].type);
  if (!lists) return "error";

  return (
    <div className="mt-6 mb-26">
      <p className="text-[24px] font-bold mx-auto">{popularSections[0].title} Properties</p>
      <p className="text-[14px] text-primary-subheading">
        The most searched projects in Delhi South West
      </p>
      <CarouserComp lists={lists} />
    </div>
  );
};

export default Popular;
