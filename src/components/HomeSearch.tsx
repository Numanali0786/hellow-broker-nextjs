"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

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
import { Check, ChevronsUpDown, EllipsisVertical } from "lucide-react";
// /properties?state=Bihar&&city=Patna

import { capitalize } from "@/lib/utils/functions";
import axios from "axios";
import useSWR from "swr";
import { useUser } from "@clerk/nextjs";
// import toast from "react-hot-toast";
import { Input } from "./ui/input";
import { City, State } from "@prisma/client";
import Spinner from "./Spinner";
import { Slider } from "./PriceRangeSlider";
// import PriceRangeSlider from "./PriceRangeSlider";

const listingCategories = ["BUY", "RENT"];
const propertyTypes = ["HOUSE", "VILLA", "APARTMENT", "COMMERCIAL"];
const advTabs = ["bedrooms", "bathrooms", "budget", "area", "postedBy"];
const bedRoomsList = ["1 BHK", "2 BHK", "3 BHK", "4 BHK"];
const bathRoomsList = ["1", "2", "3", "4"];
const postedByList = ["OWner", "Builder", "Dealer"];
const areaList = ["200", "300", "400", ">500"];

const HomeSearch = () => {
  const { isLoaded, user } = useUser();
  const shouldFetch = isLoaded && user;
  const router = useRouter();
  const searchParam = useSearchParams();

  const [price, setPrice] = useState<[number, number]>([0, 1000000]);
  console.log(price);
  const [selectedStateId, setSelectedStateId] = useState<string | null>("");
  const [selectedCityId, setSelectedCityId] = useState<string | null>("");
  const [location, setLocation] = useState("");

  const stateFetcher = (url: string) => axios.get(url).then((res) => res.data);
  const cityFetcher = (url: string) => axios.get(url).then((res) => res.data);
  const locationFetcher = (url: string) =>
    axios.get(url).then((res) => res.data);

  const {
    data: states,
    isLoading: isStateLoading,
    error,
  } = useSWR(shouldFetch ? "/api/states" : null, stateFetcher);

  const { data: cities } = useSWR(
    shouldFetch && states && selectedStateId
      ? `/api/cities?stateId=${selectedStateId}`
      : null,
    cityFetcher,
  );

  const { data: locations } = useSWR(
    shouldFetch ? "/api/locations" : null,
    locationFetcher,
  );
  console.log(locations);

  const [state, setState] = useState("");
  // const [city, setCity] = useState(states ? states[0].cities[0].name : "");
  const [city, setCity] = useState("");
  // console.log(states, cities, selectedStateId);
  const [propertyType, setPropertyType] = useState(
    searchParam.get("propertyTypes"),
  );
  const [listingCategory, setListingCategory] = useState(
    searchParam.get("listingCategories"),
  );

  const [opencity, setOpencity] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [advancePopup, setAdvancePopup] = useState(false);
  const [advanceTab, setAdvanceTab] = useState("");
  const [bedroomCont, setBedroomCount] = useState<string[]>([]);
  const [bathroomCount, setBathRoomsCount] = useState("");
  const [filteredLocs, setFilteredLocs] = useState([]);
  const [showSuggestedLocs, setShowSuggestedLocs] = useState(true);

  const handleSearch = () => {
    // if (!state || !city) {
    //   toast.error("Enter State and City");
    //   return;
    // }
    const params = new URLSearchParams();
    if (selectedStateId) params.set("stateId", selectedStateId);
    if (selectedCityId) params.set("cityId", selectedCityId);
    if (propertyType) params.set("type", propertyType);
    //
    if (price) params.set("price", price.join("-"));
    if (listingCategory) params.set("listingCategory", listingCategory);
    if (location) params.set("location", location);
    if (advanceTab === "bedrooms") {
      for (const i of bedroomCont) {
        params.append("bedrooms", i);
      }
    }
    if (advanceTab === "bathrooms") {
      for (const i of bathroomCount) {
        params.append("bathrooms", i);
      }
    }

    // api call
    // example
    // http://localhost:3000/properties?stateId=cm9zr78ye0000fchwy2o22faw&cityId=cm9zr79120001fchwuho57sf3&type=HOUSE&listingCategory=BUY&location=Jamia%2C+New+Delhi
    // http://localhost:3000/properties?stateId=cmdj717x50001fc1kyc2iws9k&cityId=cmdj717xa0002fc1k117uqfe8&type=HOUSE&price=0-930000&listingCategory=BUY&location=Muzaffarpur
    // http://localhost:3000/properties?price=0-1000000&bedrooms=1+BHK&bedrooms=2+BHK
    router.push(`/properties?${params.toString()}`);
  };

  const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (location === "") setFilteredLocs([]);
    setShowSuggestedLocs(true);
    setLocation(e.target.value);
    const filtered = locations.filter((loc: string) =>
      loc.toLowerCase().includes(location.toLowerCase()),
    );
    setFilteredLocs(filtered);
  };
  console.log(filteredLocs);

  const selectLocation = (data: string) => {
    console.log(data);
    setLocation(data);
    setShowSuggestedLocs(false);
  };

  // while state loading
  if (isStateLoading) return <Spinner />;

  if (error || !states || states.length < 1) return;
  return (
    <div className="flex justify-center">
      <div className="">
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
                        : "hover:bg-button-pink bg-white  hover:text-white"
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
          {/* 2 search related row */}
          <div className="max-w-[80vw] relative  items-start gap-2 text-primary-light px-10 bg-white py-8 outline-[10px] outline-[rgba(255,255,255,0.18)] rounded-[8px]">
            {/* 4 search elemen and search btn */}
            <div className="grid md:grid-cols-4 gap-4 sm:grid-cols-2 grid-cols-1">
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
                      {/* popover lists */}
                      <CommandGroup>
                        {states.map((item: State) => (
                          <CommandItem
                            key={item.id}
                            value={item.name}
                            onSelect={(currentValue) => {
                              setState(currentValue);
                              // or
                              // setState(item.name);
                              setSelectedStateId(item.id);
                              setOpenState(false);
                            }}
                          >
                            {item.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                item.name === state
                                  ? "opacity-100"
                                  : "opacity-0",
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
                        {cities &&
                          cities.map((item: City) => (
                            <CommandItem
                              key={item.id}
                              value={item.name}
                              onSelect={(currentValue) => {
                                setCity(currentValue);
                                setSelectedCityId(item.id);
                                setOpencity(false);
                              }}
                            >
                              {item.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  item.name === city
                                    ? "opacity-100"
                                    : "opacity-0",
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
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* advance search button */}
              <Button
                className="cursor-pointer py-6 flex"
                variant={"outline"}
                onClick={() => setAdvancePopup((prev) => !prev)}
              >
                <span className="">Advance Search</span>
                <EllipsisVertical size={"20"} className="text-button-pink" />
              </Button>

              {/* advance dropdown */}
              <div
                className={`rounded-b-sm bg-[rgba(255,255,255)] mt-[2px] absolute px-10 pt-4 pb-5 ${
                  advancePopup
                    ? "grid grid-cols-5 gap-10 top-60 md:top-44  shadow-sm w-[98.5%] ml-2 mx-auto left-0 transition-all  duration-100 ease-in-out"
                    : "-z-10 -top-0"
                }`}
              >
                {advTabs.map((ele, i) => (
                  <p
                    key={i}
                    onClick={() =>
                      setAdvanceTab((prev) => (prev === ele ? "" : ele))
                    }
                    className={`cursor-pointer ${
                      ele === advanceTab &&
                      " text-black bg-pink-100 border-2 rounded-lg border-pink-200"
                    }`}
                  >
                    {ele}
                  </p>
                ))}
                <div
                  className={`absolute bg-white transition-all ease-in-out
             top-16  ${advanceTab ? "flex w-full p-2" : "top-95 -z-20"}`}
                >
                  {advanceTab === "bedrooms" && (
                    <div className=" flex gap-4">
                      {bedRoomsList.length > 0 &&
                        bedRoomsList.map((bed, i) => (
                          <Button
                            onClick={() =>
                              setBedroomCount((prev) => [...prev, bed])
                            }
                            key={i}
                            variant={"outline"}
                            className={`cursor-pointer ${
                              bed in bedroomCont &&
                              "text-black bg-gray-100 border-2 border-gray-100"
                            }`}
                          >
                            {bed}
                          </Button>
                        ))}
                    </div>
                  )}
                  {advanceTab === "bathrooms" && (
                    <div className=" flex gap-4">
                      {bathRoomsList.map((bath, i) => (
                        <Button
                          className={`cursor-pointer ${
                            bath === bathroomCount &&
                            "text-black bg-gray-100 border-2 border-gray-100"
                          }`}
                          onClick={() => setBathRoomsCount(bath)}
                          key={i}
                          variant={"outline"}
                        >
                          {bath}
                        </Button>
                      ))}
                    </div>
                  )}

                  {advanceTab === "area" && (
                    <div className=" flex gap-4">
                      {areaList.map((area, i) => (
                        <Button key={i} variant={"outline"}>
                          {area}
                        </Button>
                      ))}
                    </div>
                  )}
                  {advanceTab === "budget" && (
                    <div className="w-full">
                      <div className="mb-2 font-medium text-sm text-gray-700 flex-1">
                        Price Range: ₹{price[0].toLocaleString()} – ₹
                        {price[1].toLocaleString()}
                      </div>
                      <Slider
                        min={0}
                        max={5000000}
                        step={10000}
                        value={price}
                        onValueChange={(val) =>
                          setPrice(val as [number, number])
                        }
                      />
                    </div>
                  )}
                  {advanceTab === "postedBy" && (
                    <div className=" flex gap-4">
                      {postedByList.map((user, i) => (
                        <Button key={i} variant={"outline"}>
                          {user}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* search  */}
            <div className="flex justify-between gap-6 mt-2 items-end">
              {/* search location */}
              <div className="relative w-full">
                <Input
                  placeholder="Search location..."
                  onChange={handleLocation}
                  className=""
                  value={location}
                />
                <div className="bg-amber-100 absolute top-10 w-full rounded-sm">
                  {showSuggestedLocs &&
                    location &&
                    filteredLocs.map((ele, i) => (
                      <p
                        className={`${
                          showSuggestedLocs ? "block cursor-pointer" : "hidden"
                        }`}
                        key={i}
                        onClick={() => selectLocation(ele)}
                      >
                        {ele}
                      </p>
                    ))}
                </div>
              </div>
              {/*Search button */}
              <Button
                className="transition-all font-bold text-white hover:cursor-pointer hover:ml-4 px-4 py-7 bg-button-pink"
                onClick={handleSearch}
              >
                Search Now
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomeSearch;
