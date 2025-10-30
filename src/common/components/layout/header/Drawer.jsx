"use client";

import { useUserContext } from "@/contextProviders/userContextProvider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
} from "@/common/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import { IMAGE_BASE_URL } from "@/common/config/constants/apiUrls";
import Icons from "@/public/icons";
import {
  PATH_HOME,
  PATH_PROFILE_MY_ACCOUNT,
  PATH_LOGIN,
  PATH_SIGN_UP,
  PATH_LANDING
} from "@/common/config/constants/routes";
import { getHeaderMenuItems } from "@/common/config/constants/headerMenuItems";
import { Button } from "../../ui";
import { cn } from "@/common/lib/utils";
import { LogOut } from "lucide-react";
import Typography from "../../Typography";

const HeaderDrawer = ({ open, setOpen }) => {
  // Get header menu items from configuration
  const headerMenuItem = getHeaderMenuItems();
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const { user, logout, isAuthenticated } = useUserContext();
  const isProfileActive = pathname?.includes(PATH_PROFILE_MY_ACCOUNT);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="left" className="w-300px sm:w-400px p-0">
        <SheetHeader className="px-6 py-4 border-b border-border-strong">
          <div className="flex items-center justify-between gap-5">
            {isAuthenticated ? (
              user &&
              (user?.profilePicture ? (
                <div className="flex items-center justify-center gap-3 cursor-pointer">
                  <div
                    className="flex items-center justify-center text-gray-500"
                    onClick={() => {
                      router.push(PATH_PROFILE_MY_ACCOUNT);
                      setOpen(false);
                    }}
                  >
                    {/* Outer circle with border */}
                    <div className="w-10 h-10 rounded-full border-2 border-primary overflow-hidden">
                      <Image
                        height={1000}
                        width={1000}
                        quality={100}
                        src={`${IMAGE_BASE_URL}/${user?.profilePicture}`}
                        className="w-full h-full object-cover rounded-full"
                        alt="Profile picture"
                      />
                    </div>
                  </div>

                  <p className="text-base font-medium">{user?.fullName}</p>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-6 cursor-pointer">
                  <div
                    className="flex items-center justify-center gap-4"
                    onClick={() => {
                      router.push(PATH_PROFILE_MY_ACCOUNT);
                      setOpen(false);
                    }}
                  >
                    {/* Outer circle with border */}
                    <div className="w-10 h-10 rounded-full border-2 border-border overflow-hidden">
                      <Image
                        height={1000}
                        width={1000}
                        quality={100}
                        src={Icons.default_profile_pic}
                        alt="Profile picture"
                      />
                    </div>
                    <p className="text-base">{user?.fullName}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col">
                <p className="text-base leading-5 text-dark-black font-medium p-0 m-0">
                  Northern Handicrafts
                </p>

                <p className="text-dark-black text-sm font-light">
                  Elevating your vision
                </p>
              </div>
            )}
          </div>
        </SheetHeader>
        <div className="flex flex-col items-start justify-start gap-4 h-full">
          <div className="flex flex-col  text-primary w-full">
            {headerMenuItem.map((menu, index) => {
              const isActive =
                (menu.link === PATH_HOME || menu.link === PATH_LANDING)
                  ? pathname === PATH_HOME
                  : pathname.includes(menu.link);

              return (
                <Link
                  href={menu.link}
                  className={cn(
                    "text-sm font-semibold cursor-pointer border-b border-border py-4 px-6 w-full flex items-center justify-between",
                    isActive ? "text-primary" : "text-text-primary"
                  )}
                  key={index}
                  onClick={() => setOpen(false)}
                >
                  <span
                    onClick={() => setOpen(false)}
                    className={cn(isActive ? "text-primary" : "text-text-primary")}
                  >
                    {menu.name}
                  </span>
                  <IoIosArrowRoundForward
                    className={cn(
                      "w-6 h-6",
                      isActive ? "text-primary" : "text-text-primary"
                    )}
                    onClick={() => setOpen(false)}
                  />
                </Link>
              );
            })}

            {user && (
              <Link
                href={PATH_PROFILE_MY_ACCOUNT}
                className={cn(
                  "text-sm font-semibold cursor-pointer border-b py-4 px-6 w-full flex items-center justify-between",
                  isProfileActive ? "text-primary" : "text-text-primary"
                )}
                onClick={() => setOpen(false)}
              >
                <span
                  onClick={() => setOpen(false)}
                  className={cn(isProfileActive ? "text-primary" : "text-text-primary")}
                >
                  My Profile
                </span>
                <IoIosArrowRoundForward
                  className={cn(
                    "w-6 h-6",
                    isProfileActive ? "text-primary" : "text-text-primary"
                  )}
                  onClick={() => setOpen(false)}
                />
              </Link>
            )}
          </div>

          <div className="flex flex-col items-center justify-between w-full">
            {!isAuthenticated ? (
              <div className="flex flex-col items-center justify-between gap-4 w-full px-4">
                <Button
                  className="w-full "
                  onClick={() => {
                    router.push(PATH_LOGIN);
                    setOpen(false);
                  }}
                >
                  Log In
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    router.push(PATH_SIGN_UP);
                    setOpen(false);
                  }}
                  variant="outline"
                >
                  Registration
                </Button>
              </div>
            ) : (


              <Button
                variant="ghost"
                onClick={logout}
                className="w-full justify-start gap-2 px-2 py-3 text-destructive hover:bg-red-50 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <Typography.BodyText className="font-medium text-destructive">
                  Logout
                </Typography.BodyText>
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderDrawer;
