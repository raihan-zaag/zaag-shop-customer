"use client";
import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useUserContext } from "@/contextProviders/userContextProvider";
import { useCart } from "@/contextProviders/useCartContext";
import { IMAGE_BASE_URL } from "@/common/config/constants/apiUrls";
import Icons from "@/public/icons";
import HeaderDrawer from "./Drawer";
import SearchPopover from "./SearchPopover";
import NotificationPopover from "./NotificationPopover";
import {
  PATH_PROFILE_MY_ACCOUNT,
  PATH_LOGIN,
  PATH_CART,
  PATH_HOME
} from "@/common/config/constants/routes";
import { getHeaderMenuItems } from "@/common/config/constants/headerMenuItems";
import { Bell, Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import { debounce, cn } from "@/common/lib/utils";
import { getUnreadCount } from "@/data/sampleNotifications";
import { Popover, PopoverTrigger, PopoverContent } from "@/common/components/ui/popover";
import Container from "../../shared/Container";

const HeaderComponent = () => {
  const router = useRouter();
  const paths = usePathname();

  const { isAuthenticated, user } = useUserContext();
  const { cart } = useCart();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState("");
  const [openNavigationDrawer, setOpenNavigationDrawer] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchPopover, setShowSearchPopover] = useState(false);
  const [showNotificationPopover, setShowNotificationPopover] = useState(false);
  const [notificationCount, setNotificationCount] = useState(getUnreadCount());
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll behavior for header visibility
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;

        // Show header when scrolling up or at the top
        if (currentScrollY < lastScrollY || currentScrollY < 10) {
          setIsVisible(true);
        } else {
          // Hide header when scrolling down
          setIsVisible(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // Cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  // Get header menu items from configuration
  const headerMenuItem = getHeaderMenuItems();

  // Create a debounced function to update search params and handle search
  const debouncedUpdateSearch = useCallback(
    (value) => {
      const searchFunction = debounce(async (searchValue) => {
        if (searchValue.trim()) {
          setIsSearching(true);

          try {
            // Simulate search API call - replace with actual search implementation
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay

            // Mock search results - replace with actual search results
            const mockResults = [
              { id: 1, name: `Handcrafted Bowl matching "${searchValue}"`, price: "$29.99", category: "Pottery" },
              { id: 2, name: `Woven Basket with "${searchValue}"`, price: "$49.99", category: "Textiles" },
              { id: 3, name: `Artisan "${searchValue}" Collection`, price: "$19.99", category: "Jewelry" },
              { id: 4, name: `Traditional "${searchValue}" Design`, price: "$39.99", category: "Woodwork" },
              { id: 5, name: `Hand-painted "${searchValue}" Art`, price: "$59.99", category: "Paintings" }
            ];

            setSearchResults(mockResults);
          } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
          } finally {
            setIsSearching(false);
          }

          // Update URL with search params
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("name", searchValue);
          router.push(`/?${newSearchParams.toString()}`);
        } else {
          setSearchResults([]);
          setIsSearching(false);

          // Clear URL params
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.delete("name");
          router.push(`${paths}`);
        }
      }, 300);

      searchFunction(value);
    },
    [paths, router, searchParams]
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedUpdateSearch(value);
  };

  const handleSearchToggle = () => {
    setShowSearchPopover(!showSearchPopover);

    if (showSearchPopover) {
      // Clear search when closing
      handleClearSearch();
    }
  };

  const handleClearSearch = () => {
    setInputValue("");
    setSearchResults([]);
    setIsSearching(false);
    debouncedUpdateSearch("");
  };

  const handleMarkAllRead = () => {
    setNotificationCount(0);
  };

  const handleViewAllNotifications = () => {
    // Navigate to notifications page or open notifications panel
    // TODO: Implement navigation to notifications page
    setShowNotificationPopover(false);
  };

  return (
    <>
      <div className={cn(
        "bg-background h-20 border-b border-border sticky top-0 z-50 transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}>
        <Container className="flex justify-between items-center py-3">

          <Link href={PATH_HOME}>
            <Image
              src="/logo/brand_logo.png"
              alt="Brand Logo"
              width={100}
              height={54}
              className="hover:opacity-80 transition-opacity"
              priority
            />
          </Link>

          {/*Left Item*/}
          <div>
            <div className="hidden lg:flex flex-row justify-start items-center gap-9 transition-all duration-300">
              {headerMenuItem?.map((item, index) => {
                const isActive = paths === item?.link;
                return (
                  <Link href={item?.link} key={index}
                    className={cn(
                      "hover:text-primary transition-colors duration-300 font-medium",
                      isActive && "text-primary"
                    )}
                  >
                    {item?.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/*Right Item */}
          <div className="flex items-center justify-center gap-3 md:gap-6 relative">

            {/* Search Icon */}
            <Search
              className="size-5 cursor-pointer hover:text-primary transition-colors duration-300"
              onClick={handleSearchToggle}
            />



            <div className="relative cursor-pointer hover:text-primary transition-colors duration-300">
              {cart?.length > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-primary text-white text-xs h-4 min-w-4 px-1 font-semibold">
                  {cart.length > 99 ? '99+' : cart.length}
                </span>
              )}
              <Link href={PATH_CART}>
                <ShoppingCart className="size-5" />
              </Link>
            </div>

            <Popover open={showNotificationPopover} onOpenChange={setShowNotificationPopover}>
              <PopoverTrigger asChild>
                <div className="relative cursor-pointer hover:text-primary transition-colors duration-300">
                  {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 inline-flex items-center justify-center rounded-full bg-primary text-white text-xs h-4 min-w-4 px-1 font-semibold">
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </span>
                  )}
                  <Bell className="size-5 cursor-pointer hover:text-primary transition-colors duration-300" />
                </div>
              </PopoverTrigger>
              <PopoverContent 
                align="end" 
                className="w-80 md:w-96 p-0 max-h-[34rem] overflow-hidden"
                sideOffset={8}
              >
                <NotificationPopover
                  onMarkAllRead={handleMarkAllRead}
                  onViewAll={handleViewAllNotifications}
                  onNotificationCountChange={setNotificationCount}
                />
              </PopoverContent>
            </Popover>


            {isAuthenticated ? (
              <div
                className="hidden md:flex flex-row items-center justify-center gap-2 cursor-pointer"
                onClick={() => {
                  router.push(PATH_PROFILE_MY_ACCOUNT);
                }}
              >
                {user?.profilePicture ? (
                  <Image
                    height={1000}
                    width={1000}
                    quality={100}
                    src={`${IMAGE_BASE_URL}/${user?.profilePicture}`}
                    className="w-10 h-10 object-cover rounded-full"
                    alt="Profile picture"
                  />
                ) : (
                  <Image
                    height={1000}
                    width={1000}
                    quality={100}
                    src={Icons.default_profile_pic}
                    alt="Profile_picture"
                    className="h-10 w-10"
                  />
                )}
                <p className="hidden lg:block">{user?.fullName}</p>
              </div>
            ) : (
              <UserRound className="hidden md:flex size-5 cursor-pointer hover:text-primary transition-colors duration-300"
                onClick={() => router.push(PATH_LOGIN)}
              />
            )}

            <div
              className="flex lg:hidden"
              onClick={() => {
                setOpenNavigationDrawer(true);
              }}
            >
              <Menu className="size-5" />
            </div>
          </div>
        </Container>
      </div>

      {/* Search Popover */}
      <SearchPopover
        showSearchPopover={showSearchPopover}
        setShowSearchPopover={setShowSearchPopover}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleInputChange={handleInputChange}
        handleClearSearch={handleClearSearch}
        searchResults={searchResults}
        isSearching={isSearching}
        setSearchResults={setSearchResults}
      />

      {/* Notification Popover */}


      {openNavigationDrawer && (
        <HeaderDrawer
          open={openNavigationDrawer}
          setOpen={setOpenNavigationDrawer}
        />
      )}
    </>
  );
};

export default HeaderComponent;
