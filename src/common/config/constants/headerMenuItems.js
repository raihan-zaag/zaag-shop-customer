import {
  PATH_HOME,
  PATH_TRACK_ORDER,
  PATH_PRODUCTS,
  PATH_CONTACT_US,
  PATH_PRODUCTS_SORT_BY,
} from "./routes";

import { Bell, Heart, MapPin, ShoppingBag, User } from "lucide-react";

/**
 * Header menu items configuration
 * This file contains the static menu items for the header navigation
 */

/**
 * Static menu items that don't require category data
 */
export const staticMenuItems = [


  { name: "Home", link: PATH_HOME },
  { name: "All Products", link: PATH_PRODUCTS },
  { name: "Best selling", link: PATH_PRODUCTS_SORT_BY("best-selling") },
  { name: "New Arrivals", link: PATH_PRODUCTS_SORT_BY("new-arrivals") },
  { name: "Track Order", link: PATH_TRACK_ORDER },
  { name: "Contact us", link: PATH_CONTACT_US },
];

export const getHeaderMenuItems = () => {
  const menuItems = [...staticMenuItems];
  return menuItems;
};


export const profileMenu = [
  {
    title: "My Profile",
    icon: <User className="text-gray size-5" />,
    activeIcon: <User className="text-primary size-5" />,
    url: "/profile/my-account",
  },
  {
    title: "Notifications",
    icon: <Bell className="text-gray size-5" />,
    activeIcon: <Bell className="text-primary size-5" />,
    url: "/profile/notifications",
  },
  {
    title: "Saved Addresses",
    icon: <MapPin className="text-gray size-5" />,
    activeIcon: <MapPin className="text-primary size-5" />,
    url: "/profile/address",
  },
  {
    title: "My Wishlist",
    icon: <Heart className="text-gray size-5" />,
    activeIcon: <Heart className="text-primary size-5" />,
    url: "/profile/wishlist",
  },
  {
    title: "My Orders",
    icon: <ShoppingBag className="text-gray size-5" />,
    activeIcon: <ShoppingBag className="text-primary size-5" />,
    url: "/profile/my-orders",
  },
  // {
  //     title: "Ongoing Orders",
  //     icon: <BsCart3 className="text-[#6A6A6A] size-5" />,
  //     activeIcon: <BsCart3 className="text-primary size-5" />,
  //     url: "/profile/ongoing-orders",
  // },
  // {
  //     title: "Order History",
  //     icon: <RxCounterClockwiseClock className="text-[#6A6A6A] size-5" />,
  //     activeIcon: (
  //         <RxCounterClockwiseClock className="text-primary size-5" />
  //     ),
  //     url: "/profile/order-history",
  // },
];


