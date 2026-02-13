"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { CloudinaryUploadWidgetResults } from "next-cloudinary";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Check, ChevronsUpDown, UploadCloud } from "lucide-react";

import { cn } from "@/lib/utils";
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

type UploadInfo = CloudinaryUploadWidgetResults["info"];

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { listingCategory, propertyType } from "@/lib/utils/property";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { City, State } from "@prisma/client";
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  listingCategory: z.enum(["BUY", "RENT"], {
    errorMap: () => ({ message: "Please select a Listing" }),
  }),
  type: z.enum(
    ["APARTMENT", "HOUSE", "VILLA", "Studio", "LAND", "FLOOR", "COMMERCIAL"],
    {
      errorMap: () => ({ message: "Please select a valid type" }),
    },
  ),
  rooms: z.coerce.number().min(1, { message: "Please select number of rooms" }),
  price: z.coerce
    .number({ message: "Price must be in number!" })
    .min(10000, { message: "Price too small" }),
  area: z.coerce
    .number({ message: "Area must be in number!" })
    .min(50, { message: "Area too small" }),
  bathrooms: z.coerce
    .number()
    .min(1, { message: "Please select number of batrooms" }),
  bedrooms: z.coerce
    .number()
    .min(1, { message: "Please select number of batrooms" }),
  age: z.enum(
    [
      "0-1 years",
      "1-2 years",
      "2-3 years",
      "3-5 years",
      "5-10 years",
      "10+ years",
    ],
    { errorMap: () => ({ message: "Please select property age" }) },
  ),
  // state: z.string().min(1, { message: "State is required" }),
  // city: z.string().min(1, { message: "City is required" }),
  location: z.string().min(1, { message: "location is required" }),
  facing: z.enum(["East", "West", "North", "South"], {
    errorMap: () => ({ message: "Please select property facing" }),
  }),
});

const statefetcher = (url: string) => axios.get(url).then((res) => res.data);
const cityfetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function AddListing() {
  const [media, setMedia] = useState<UploadInfo[]>([]);
  // 1. Define your form.
  const [selectedStateId, setSelectedStateId] = useState<string | null>("");

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [value] = useState("");
  const { data: states, isLoading: isStateLoading } = useSWR(
    "/api/states",
    statefetcher,
  );
  console.log("states", states);
  const { data: cities, isLoading: isCityLoading } = useSWR(
    state ? `/api/cities?stateId=${selectedStateId}` : null,
    cityfetcher,
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      listingCategory: undefined, // or "Buy" if you want a default
      type: undefined,
      rooms: undefined,
      price: 0, // 👈 make sure this is here
      area: 0, // 👈 make sure this is here
      bathrooms: undefined, // 👈 make sure this is here
      bedrooms: undefined, // 👈 make sure this is here
      age: undefined, // or set a default like "0-1 years"
      // state: "", // Initially empty
      // city: "", // Initially empty
      location: "", // Initially empty
      facing: "East", // Default facing
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!state || !city) {
      toast.error("Need state and city both!");
      return;
    }
    console.log({ ...values, media, state, city });
    const temp = { ...values, media, state, city };
    await axios.post("/api/properties", temp);
    toast.success("Property Created!");
  }

  // if (isStateLoading) return <p>Loading.............</p>; // or a loader
  // if (!states || states.length < 1) return null;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6">
        <div className=" flex flex-col gap-6 p-6">
          <p className="heading text-2xl">Property description and price</p>
          {/* title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your property title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* desc */}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe about your property..."
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* categ type room selectors*/}
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="listingCategory"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel></FormLabel> */}
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {listingCategory.map((item) => (
                          <SelectItem key={item} value={item.toUpperCase()}>
                            {item.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel></FormLabel> */}
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyType.map((item) => (
                          <SelectItem key={item} value={item.toUpperCase()}>
                            {item.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel></FormLabel> */}
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Rooms" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((item) => (
                          <SelectItem key={item} value={item.toString()}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (₹)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      placeholder="Amount"
                      min={10000}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Sqft"
                      min={50}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel></FormLabel> */}
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Bathrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5].map((item) => (
                          <SelectItem key={item} value={item.toString()}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel></FormLabel> */}
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5].map((item) => (
                          <SelectItem key={item} value={item.toString()}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Property Age" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "0-1 years",
                          "1-2 years",
                          "2-3 years",
                          "3-5 years",
                          "5-10 years",
                          "10+ years",
                        ].map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* state */}
        <div className=" flex flex-col gap-6 p-6">
          <p className="heading text-2xl">Property Address</p>
          <p className="flex gap-6">
            {" "}
            <Popover open={openState} onOpenChange={setOpenState}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openState}
                  className="w-[200px] justify-between"
                >
                  {state ? state : "Select State..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search State..." />
                  <CommandList>
                    <CommandEmpty>No state found.</CommandEmpty>
                    <CommandGroup>
                      {!isStateLoading &&
                        states &&
                        states.map((state: State) => (
                          <CommandItem
                            key={state.id}
                            value={state.name}
                            onSelect={(currentValue) => {
                              console.log("current val", currentValue);
                              // setValue(currentValue === value ? "" : currentValue);
                              setState(
                                currentValue === value ? "" : currentValue,
                              );
                              setSelectedStateId(state.id);
                              setOpenState(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === state.name
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {state.name}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {/* city */}
            <Popover open={openCity} onOpenChange={setOpenCity}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCity}
                  className="w-[200px] justify-between"
                >
                  {city ? city : "Select City..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search City..." />
                  <CommandList>
                    <CommandEmpty>
                      {cities ? "No city found." : "Loading...."}
                    </CommandEmpty>
                    <CommandGroup>
                      {!isStateLoading &&
                        states &&
                        !isCityLoading &&
                        cities &&
                        cities.map((city: City) => (
                          <CommandItem
                            key={city.id}
                            value={city.name}
                            onSelect={(currentValue) => {
                              console.log("current val", currentValue);
                              // setValue(currentValue === value ? "" : currentValue);
                              setCity(
                                currentValue === value ? "" : currentValue,
                              );
                              setOpenCity(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === city.name
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {city.name}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </p>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>location</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter full location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="facing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Facing</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Facing" />
                    </SelectTrigger>
                    <SelectContent>
                      {["East", "West", "North", "South"].map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" flex flex-col gap-6 p-6">
          <p className="heading text-2xl">Property Media</p>
          <CldUploadWidget
            uploadPreset="hellow-broker"
            options={{
              folder: "hellobroker",
              resourceType: "auto",
              clientAllowedFormats: ["jpg", "png", "webp", "mp4"],
            }}
            onSuccess={(result: CloudinaryUploadWidgetResults) => {
              setMedia((prev) => [...prev, result.info]);
              console.log("Upload success info:", result);
              console.log("media", media);
            }}
          >
            {({ open }) => (
              <button
                type="button"
                className="flex flex-col items-center justify-center border-green-400 bg-white text-green-400 text-xl border-2 px-4 py-2 rounded cursor-pointer border-dashed h-[200px] hover:bg-green-50 transition"
                onClick={() => open()}
              >
                <UploadCloud size={64} className="text-green-400 mb-4" />
                <span>Upload Image / Video</span>
              </button>
            )}
          </CldUploadWidget>
        </div>

        <Button type="submit" className="bg-button-pink p-6 cursor-pointer">
          Submit
        </Button>
      </form>
    </Form>
  );
}
