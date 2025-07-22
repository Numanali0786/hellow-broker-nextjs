"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";

type Property = {
  id: string;
  title: string;
  location?: string;
  // add other fields if needed (like images, price, etc.)
};
export default function ListingRequestsPage() {
  const { isSignedIn, isLoaded } = useUser();
  
  const [requests, setRequests] = useState<Property[]>([]);  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, isLoaded, router]);

  useEffect(() => {
    axios.get("/api/utils/approval").then((res) => {
      setRequests(res.data);
    });
  }, []);
  const handleApprove = async (id: string) => {
    try {
      await axios.post("/api/utils/approval", { id });
      setRequests((prev) => prev.filter((r) => r.id !== id)); // Optimistically update UI
    } catch (err) {
      console.error("Approval failed", err);
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Unapproved Listings</h2>
      <div className="space-y-4">
        {requests.map((item) => (
          <div key={item.id} className="flex justify-between items-center border p-4 rounded-md">
            <div>
              <p className="font-bold">{item.title}</p>
              <p className="text-sm text-gray-500">{item.location}</p>
            </div>
            <Button onClick={()=>handleApprove(item.id)}>Approve</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
