"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { listingCategory, propertyType } from "@/utils/property";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

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
    }
  ),
  rooms: z.coerce.number().min(1, { message: "Please select number of rooms" }),
  price: z.coerce.number().min(10000, { message: "Price too small" }),
  area: z.coerce.number().min(50, { message: "Area too small" }),
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
    { errorMap: () => ({ message: "Please select property age" }) }
  ),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  facing: z.enum(["East", "West", "North", "South"], {
    errorMap: () => ({ message: "Please select property facing" }),
  }),
});

export default function AddProperty() {
  const [media, setMedia] = useState<any[]>([]);
  // 1. Define your form.
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
      state: "", // Initially empty
      city: "", // Initially empty
      address: "", // Initially empty
      facing: "East", // Default facing
    },
  });
  

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log({...values,media});
    let t ={...values,media}
    await axios.post("/api/properties", t);
    console.log('done...........')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (₹)</FormLabel>
              <FormControl>
                <Input
                  type="number"
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
                <Input type="number" placeholder="Sqft" min={50} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="Enter state" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Enter city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter full address" {...field} />
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
        <CldUploadWidget
        uploadPreset="hellow-broker"
        options={{
          folder: "hellobroker",
          sources: ["local", "url", "camera"],
          resourceType: "auto",
          clientAllowedFormats: ["jpg", "png", "webp", "mp4"],
        }}
        onSuccess={(result: any) => {
          console.log("Upload success:", result);
          setMedia((prev) => [...prev, result.info]);
        }}
      >
        {({ open }) => (
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => open()}
          >
            Upload Image / Video
          </button>
        )}
      </CldUploadWidget>



        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
