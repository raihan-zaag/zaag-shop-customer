"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/accordion";
import { Button } from "@/common/components/ui/button";
import Typography from "@/common/components/Typography";
import { useUserContext } from "@/contextProviders/userContextProvider";
import { useCart } from "@/contextProviders/useCartContext";
import { cn } from "@/common/lib/utils";
import { profileMenu } from "@/common/config/constants/headerMenuItems";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [accordionValue, setAccordionValue] = React.useState("");

  const { logout, user } = useUserContext();
  const { clearCart } = useCart();

  const handleLogout = () => {
    logout();
    clearCart();
    router.push("/");
  };

  const handleMenuItemClick = () => {
    // Close the accordion when a menu item is clicked
    setAccordionValue("");
  };

  const pageLabels = {
    "my-account": "My Account",
    address: "My Address",
    wishlist: "My Wishlist",
    "my-orders": "My Orders",
    "notifications": "Notifications"
  };

  const pathSegment = pathname.split("/")[2];
  const currentLabel = pageLabels[pathSegment] || "Profile";

  // Get the current menu item icon based on current page
  const getCurrentIcon = () => {
    const currentItem = profileMenu.find(item => {
      const itemPath = item.url.split("/")[2]; // Extract path segment from URL
      return itemPath === pathSegment;
    });
    return currentItem?.icon || null;
  };

  // Categorize menu items based on Figma design
  const accountItems = profileMenu.filter(item =>
    ['My Profile', 'Saved Addresses', 'My Wishlist', 'Notifications'].includes(item.title)
  );

  const orderItems = profileMenu.filter(item =>
    ['My Orders'].includes(item.title)
  );

  // Profile avatar/image placeholder
  const ProfileAvatar = () => (
    <div className="w-12 h-12 rounded-full bg-surface border border-border overflow-hidden">
      {user?.profileImage ? (
        <Image
          src={user.profileImage}
          alt={user.name || 'Profile'}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary to-green-600 flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
      )}
    </div>
  );

  // Menu item component
  const MenuItem = ({ item, isActive }) => (
    <Link href={item.url} onClick={handleMenuItemClick}>
      <div
        className={cn(
          "flex items-center gap-2 px-2 py-3 rounded-md transition-all duration-200",
          isActive
            ? "bg-surface text-primary"
            : "text-text-secondary hover:bg-surface/50 hover:text-primary"
        )}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          {isActive ? item.activeIcon : item.icon}
        </div>
        <Typography.BodyText
          className={cn(
            "font-medium",
            isActive ? "text-primary" : "text-text-secondary hover:text-primary"
          )}
        >
          {item.title}
        </Typography.BodyText>
      </div>
    </Link>
  );

  // Section header component
  const SectionHeader = ({ title }) => (
    <div className="px-2 py-1.5">
      <Typography.SmallText className="text-[var(--color-text-subtle)] font-medium uppercase tracking-wider">
        {title}
      </Typography.SmallText>
    </div>
  );

  return (
    <div className="lg:col-span-4 xl:col-span-3 h-full">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block bg-white border-r border-border  px-6 py-12 h-full">
        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-6 px-2">
          <ProfileAvatar />
          <div>
            <Typography.Title3 className="text-primary font-semibold">
              {user?.name || 'User Name'}
            </Typography.Title3>
          </div>
        </div>

        {/* Account Section */}
        <div className="mb-6">
          <SectionHeader title="Account" />
          <div className="space-y-1">
            {accountItems.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isActive={pathname?.includes(item.url)}
              />
            ))}
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-border my-4"></div>

        {/* Orders Section */}
        <div className="mb-6">
          <SectionHeader title="Order" />
          <div className="space-y-1">
            {orderItems.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                isActive={pathname?.includes(item.url)}
              />
            ))}
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-border my-4"></div>

        {/* Logout */}
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start gap-2 px-2 py-3 text-destructive hover:bg-red-50 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          <Typography.BodyText className="font-medium text-destructive">
            Logout
          </Typography.BodyText>
        </Button>
      </div>

      {/* Mobile Accordion */}
      <div className="block lg:hidden py-2 bg-background my-2 px-3">
        <Accordion 
          type="single" 
          collapsible 
          className="border-none"
          value={accordionValue}
          onValueChange={setAccordionValue}
        >
          <AccordionItem value="profile-menu" className="border-none">
            <AccordionTrigger className="font-semibold text-sm md:text-base text-primary hover:no-underline">
              <div className="flex items-center gap-2">
                {getCurrentIcon() && (
                  <div className="w-5 h-5 flex items-center justify-center">
                    {getCurrentIcon()}
                  </div>
                )}
                {currentLabel}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 py-4">
                <div className="mb-4">
                  <div className="px-2 py-1.5 mb-2">
                    <Typography.SmallText className="text-[var(--color-text-subtle)] font-medium uppercase tracking-wider">
                      Account
                    </Typography.SmallText>
                  </div>
                  <div className="space-y-1">
                    {accountItems.map((item, index) => (
                      <MenuItem
                        key={index}
                        item={item}
                        isActive={pathname?.includes(item.url)}
                      />
                    ))}
                  </div>
                </div>

                {/* Separator Line */}
                <div className="border-t border-border my-4"></div>

                {/* Orders Section */}
                <div className="mb-4">
                  <div className="px-2 py-1.5 mb-2">
                    <Typography.SmallText className="text-[var(--color-text-subtle)] font-medium uppercase tracking-wider">
                      Order
                    </Typography.SmallText>
                  </div>
                  <div className="space-y-1">
                    {orderItems.map((item, index) => (
                      <MenuItem
                        key={index}
                        item={item}
                        isActive={pathname?.includes(item.url)}
                      />
                    ))}
                  </div>
                </div>
                <div className="hidden md:block border-t border-border my-2"></div>

                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="hidden md:block w-full justify-start gap-2 px-2 py-3 text-destructive hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <Typography.BodyText className="font-medium text-destructive">
                    Logout
                  </Typography.BodyText>
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Sidebar;
