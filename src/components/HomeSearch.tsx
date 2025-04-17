"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const propertyTypes = ["HOUSE", "VILLA", "APARTMENT"];
const listingCategories = ["BUY", "RENT", "COMMERCIAL"];
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
        <section className="flex flex-col gap-1">
          {/* categ section */}
          <div className="flex justify-between gap-4">
            {listingCategories.map((cat, i) => {
              return (
                <p
                  className={`flex-1 hover:cursor-pointer ${
                    listingCategory === cat
                      ? "border-b-2 border-b-amber-600  border-r-2"
                      : " border-r-2"
                  } `}
                  key={i}
                  onClick={() => setListingCategory(cat)}
                >
                  {capitalize(cat)}
                </p>
              );
            })}
          </div>

          <div className="flex">
            {/* state section */}
            <Popover open={openState} onOpenChange={setOpenState}>
              <PopoverTrigger asChild className="hover:cursor-pointer">
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openState}
                  className="w-[200px] justify-between"
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
                            setState(
                              currentValue
                            );
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
                  className="w-[200px] justify-between"
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
          </div>
          {/* type section  */}
          <div className="flex justify-between border-b-1 gap-4">
            {propertyTypes.map((prop, i) => {
              return (
                <p
                  className={`flex-1 hover:cursor-pointer ${
                    propertyType === prop
                      ? "border-b-2 border-b-amber-600  border-r-2"
                      : " border-r-2"
                  } `}
                  key={i}
                  onClick={() => setPropertyType(prop)}
                >
                  {capitalize(prop)}
                </p>
              );
            })}
          </div>
        </section>
        {/*Search button */}
        <Button className="hover:cursor-pointer" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default HomeSearch;
