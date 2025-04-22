"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useSearchParams, useRouter } from "next/navigation";
import React, { MouseEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
// data/indiaLocations.ts

// /properties?state=Bihar&&city=Patna
export const indiaLocations: Record<string, string[]> = {
  Delhi: ["New Delhi", "Dwarka", "Connaught Place"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
  Bihar: ["Patna", "Gaya", "Bhagalpur"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  Karnataka: ["Bengaluru", "Mysore", "Mangalore"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur"],
};

const propertyTypes = ["HOUSE", "VILLA", "APARTMENT","COMMERCIAL"];
const listingCategories = ["BUY", "RENT"];
const capitalize = (str: string) => {
  return str[0] + str.slice(1).toLocaleLowerCase();
};
const HomeSearch = () => {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [state, setState] = useState(searchParam.get("state") || "Delhi");
  const [city, setCity] = useState(
    searchParam.get("city") || indiaLocations[state][0]
  );
  const [propertyType, setPropertyType] = useState(
    searchParam.get("propertyTypes") || "HOUSE"
  );
  const [listingCategory, setListingCategory] = useState(
    searchParam.get("listingCategories") || "BUY"
  );

  const [opencity, setOpencity] = React.useState(false);
  const [openState, setOpenState] = React.useState(false);
  const [openType, setOpenType] = React.useState(false);

  const handleState = (event: MouseEvent, val: string) => {
    setState(val);
    setCity("");
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (state) params.set("state", state);
    if (city) params.set("city", city);
    if (propertyType) params.set("propertyType", propertyType);
    if (listingCategory) params.set("listingCategories", listingCategory);

    router.push(`/properties?${params.toString()}`);
  };
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-4">
        <section className="flex flex-col gap-10">
          {/* categ section */}
          <div className="flex justify-center gap-4">
            {listingCategories.map((cat, i) => {
              return (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`${
                      listingCategory === cat
                        ? "bg-button-pink text-white"
                        : "hover:bg-button-pink bg-white  hover:text-white transform:1s"
                    } font-semibold w-[130px] h-[50px] flex items-center justify-center rounded-[8px] hover:cursor-pointer transition-transform duration-100 ease-linear hover:scale-105`}
                    onClick={() => setListingCategory(cat)}
                  >
                    <p>{capitalize(cat)}</p>
                  </div>
                  {/* traingle */}
                  {listingCategory === cat && (
                    <p
                      className="w-0 h-0 
                        border-l-[15px] border-l-transparent 
                        border-r-[15px] border-r-transparent 
                        border-t-[15px] border-button-pink"
                    ></p>
                  )}
                </div>
              );
            })}
          </div>

          {/* 3 search elemen and search btn */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 items-center gap-20 text-primary-light px-10 bg-white py-8 outline-[10px] outline-[rgba(255,255,255,0.18)] rounded-[8px]">
            {/* state section */}
            <Popover open={openState} onOpenChange={setOpenState}>
              <PopoverTrigger asChild className="hover:cursor-pointer">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openState}
                  className="w-[200px] justify-between p-6"
                >
                  {state || "Select state..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search state..." />
                  <CommandList>
                    <CommandEmpty>No state found.</CommandEmpty>
                    <CommandGroup>
                      {Object.keys(indiaLocations).map((item) => (
                        <CommandItem
                          key={item}
                          value={item}
                          onSelect={(currentValue) => {
                            setState(currentValue);
                            setCity(indiaLocations[currentValue]?.[0]);
                            setOpenState(false);
                          }}
                        >
                          {item}
                          <Check
                            className={cn(
                              "ml-auto",
                              item === state ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* City section */}
            <Popover open={opencity} onOpenChange={setOpencity}>
              <PopoverTrigger asChild className="hover:cursor-pointer">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={opencity}
                  className="w-[200px] justify-between p-6"
                >
                  {city || "Select city..."}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search City..." />
                  <CommandList>
                    <CommandEmpty>No city found.</CommandEmpty>
                    <CommandGroup>
                      {indiaLocations[state].map((item) => (
                        <CommandItem
                          key={item}
                          value={item}
                          onSelect={(currentValue) => {
                            setCity(currentValue);
                            setOpencity(false);
                          }}
                        >
                          {item}
                          <Check
                            className={cn(
                              "ml-auto",
                              item === city ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {/* type section  */}
            <Popover open={openType} onOpenChange={setOpenType}>
              <PopoverTrigger asChild className="hover:cursor-pointer">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={opencity}
                  className="w-[200px] justify-between p-6"
                >
                  {propertyType || "Property Type"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Property Type..." />
                  <CommandList>
                    <CommandEmpty>No type found.</CommandEmpty>
                    <CommandGroup>
                      {propertyTypes.map((item) => (
                        <CommandItem
                          key={item}
                          value={item}
                          onSelect={(currentValue) => {
                            setPropertyType(currentValue);
                            setOpenType(false);
                          }}
                        >
                          {item}
                          <Check
                            className={cn(
                              "ml-auto",
                              item === propertyType
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/*Search button */}
            <Button
              className="font-bold text-white hover:cursor-pointer px-11 py-7 bg-button-pink"
              onClick={handleSearch}
            >
              Search Now
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeSearch;
