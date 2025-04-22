import {
    LayoutDashboard,
    PlusSquare,
    Heart,
    UserCog,
    MessageSquare,
    Settings,
    Home,
    Hourglass,
    Star,
    Diamond,
    Flame,
    AlertTriangle,
    HandCoins,
    TrendingUp,
    Rocket,
    Users,
    BarChart3,
  } from "lucide-react";


  
  export const adminTabs = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "All Properties",
      url: "/admin/all-properties",
      icon: Home,
    },
    {
      title: "Pending Approvals",
      url: "/admin/pending",
      icon: Hourglass,
    },
    {
      title: "Featured",
      url: "/admin/featured",
      icon: Star,
    },
    {
      title: "Handpicked",
      url: "/admin/handpicked",
      icon: Diamond,
    },
    {
      title: "Most Popular",
      url: "/admin/popular",
      icon: Flame,
    },
    {
      title: "Recommended",
      url: "/admin/recommended",
      icon: Heart,
    },
    {
      title: "Reported",
      url: "/admin/reported",
      icon: AlertTriangle,
    },
    {
      title: "Demands",
      url: "/admin/demands",
      icon: HandCoins,
    },
    {
      title: "Trends",
      url: "/admin/trends",
      icon: TrendingUp,
    },
    {
      title: "Boosted Listings",
      url: "/admin/boosted",
      icon: Rocket,
    },
    {
      title: "Manage Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: BarChart3,
    },
  ];
export const userTabs = [
  {
    title: "Dashboard",
    url: "/user-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Listings",
    url: "/user-dashboard/my-listings",
    icon: LayoutDashboard,
  },
  {
    title: "Add New Listing",
    url: "/user-dashboard/add-listing",
    icon: PlusSquare,
  },
  {
    title: "Favorite Listings",
    url: "/user-dashboard/favorites",
    icon: Heart,
  },
  {
    title: "Messages",
    url: "/user-dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Settings",
    url: "/user-dashboard/settings",
    icon: Settings,
  },
];

