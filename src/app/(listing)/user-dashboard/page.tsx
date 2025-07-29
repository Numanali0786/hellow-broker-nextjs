import { BookCheck, Heart, MessageCircle, Star } from "lucide-react";
import React from "react";

const dashboardData = [
  {
    id: 1,
    icon: BookCheck,
    count: 100,
    title: "Published Property",
    bgColor: "#1ec38b",
  },

  { id: 2, icon: Star, count: 100, title: "Total Reviews", bgColor: "#ff9911" },
  {
    id: 3,
    icon: MessageCircle,
    count: 100,
    title: "Messages",
    bgColor: "#66aaee",
  },
  {
    id: 4,
    icon: Heart,
    count: 100,
    title: "Times Bookmarked",
    bgColor: "#f91942",
  },
];
const ListingHomePage = () => {
  return (
      <div className="bg-white max-w-5xl p-6 my-10 mx-auto">
        <p className="heading py-4">Manage Dashboard</p>
        <div className="grid grid-cols-2 gap-4 text-white text-md">
        {dashboardData.map((item) => (
          <div className="p-8 rounded-lg flex gap-4" key={item.id} style={{ backgroundColor: item.bgColor }}>
            {<item.icon size={50} color="white"/>}
            <p></p>
            <div className="">
              <span className="text-xl font-semibold">{item.count}</span>
              <br />
              <span>{item.title}</span>
            </div>
          </div>
        ))}
        </div>
      </div>
  );
};

export default ListingHomePage;
