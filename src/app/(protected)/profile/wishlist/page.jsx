"use client";

import { useWishlist } from "@/contextProviders/useWishListProvider";
import useRemoveWishlist from "@/app/(protected)/profile/hooks/useDeleteWishlist";
import useGetWishlist from "@/app/(protected)/profile/hooks/useGetWishlist";
import { useConfirmation } from "@/contextProviders/confirmationProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { ShoppingCart, Trash2 } from "lucide-react";
import { PATH_PRODUCT_DETAILS_DYNAMIC } from "@/common/config/constants/routes";
import RowSkeleton from "@/common/components/shared/RowSkeleton";
import EmptyDataSkeleton from "@/common/components/shared/EmptyDataSkeleton";
import Typography from "@/common/components/Typography";
import { cn } from "@/common/lib/utils";
import { Button } from "@/common/components/ui/button";
import { handleImageError, getValidImageUrl } from "@/common/lib/imageUtils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationPreviousButton,
  PaginationNextButton,
} from "@/common/components/ui/pagination";
import { fetchSampleWishlistData, removeSampleWishlistItem } from "@/data/sampleWishlistData";

const MyWishlistPage = () => {
  const { getWishlists } = useGetWishlist();
  const { deleteWishlist } = useRemoveWishlist();
  const [wishlist, setWishlist] = React.useState([]);
  const { setWishlists } = useWishlist();
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const { showConfirmation } = useConfirmation();
  const ITEMS_PER_PAGE = 5;

  // Flag to use sample data for development
  const USE_SAMPLE_DATA = true;

  React.useEffect(() => {
    fetchWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      let response;

      if (USE_SAMPLE_DATA) {
        // Use sample data
        response = await fetchSampleWishlistData();
      } else {
        // Use real API
        response = await getWishlists();
      }

      setWishlist(response.data.content);
      setWishlists(response.data.content);
    } catch (error) {
      console.error("Error fetching wishlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWishlist = async (wishlistId, productName) => {
    try {
      // Show confirmation dialog
      const confirmed = await showConfirmation({
        // title: "Confirm Removal",
        message: `Are you sure you want to remove "${productName}" from your wishlist?`,
        // confirmText: "Remove",
        // cancelText: "Cancel",
      });

      // If not confirmed, exit early
      if (!confirmed) return;
      
      let response;

      if (USE_SAMPLE_DATA) {
        // Use sample data
        response = await removeSampleWishlistItem(wishlistId);
      } else {
        // Use real API
        response = await deleteWishlist(wishlistId);
      }

      if (response.status === 200) {
        // If using sample data, filter out the removed item locally
        if (USE_SAMPLE_DATA) {
          setWishlist(prev => prev.filter(item => item.product.id !== wishlistId));
          setWishlists(prev => prev.filter(item => item.product.id !== wishlistId));
        } else {
          fetchWishlist();
        }
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(wishlist.length / ITEMS_PER_PAGE);

  // Get current items for the page
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return wishlist.slice(startIndex, endIndex);
  };

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <Typography.Title2>My Wishlist</Typography.Title2>
        <Typography.Description className="mt-2">
          Stay updated with your latest notification
        </Typography.Description>
      </div>

      <div className="mt-4">
        {loading ? (
          <RowSkeleton count={3} />
        ) : (
          <>
            {wishlist.length > 0 ? (
              <>
                <div className="mb-4 pb-2 border-b border-border">
                  <Typography.Description>
                    My Wishlist ({wishlist.length})
                  </Typography.Description>
                </div>

                <>
                  {getCurrentItems().map((item, index) => (
                    <React.Fragment key={index}>
                      <WishlistCard
                        item={item}
                        handleRemoveWishlist={handleRemoveWishlist}
                      />
                    </React.Fragment>
                  ))}
                </>

                {totalPages > 1 && (
                  <Pagination className="mt-6">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPreviousButton
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationButton
                            isActive={currentPage === page}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </PaginationButton>
                        </PaginationItem>
                      ))}

                      <PaginationItem>
                        <PaginationNextButton
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <EmptyDataSkeleton title={"No Wishlist found"} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyWishlistPage;

const WishlistCard = ({ item, handleRemoveWishlist }) => {
  const router = useRouter();

  const goToPageDetails = () => {
    router.push(PATH_PRODUCT_DETAILS_DYNAMIC(item?.product?.id));
  };

  const handleRemove = () => {
    handleRemoveWishlist(item.product.id, item.product.name);
  };

  const isOutOfStock = item?.product?.stock <= 0;

  return (
    <div className="border-b border-border py-5 flex items-start justify-between">
      <div className="flex items-start gap-5">
        <div className="relative">
          <Image
            src={getValidImageUrl(item?.product?.thumbnailImage)}
            alt={item?.product?.name}
            width={1000}
            height={1000}
            className="w-[70px] h-[80px] object-cover rounded-sm"
            onError={(e) => handleImageError(e)}
          />
          {isOutOfStock && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
              <Typography.SmallText className="text-white font-medium text-center">
                Out of Stock
              </Typography.SmallText>
            </div>
          )}
        </div>
        <div>
          <Typography.BodyText className="font-medium text-gray-dark mb-1">
            {item?.product?.name}
          </Typography.BodyText>
          
          <Typography.Paragraph className="font-medium text-gray-dark">
            $
            {item?.product?.priceAfterDiscount
              ? item?.product?.priceAfterDiscount
              : item?.product?.regularPrice}
          </Typography.Paragraph>
          
          {isOutOfStock ? (
            <div className="bg-surface px-3 py-1.5 rounded-sm">
              <Typography.SmallText className="font-medium text-destructive">
                Out Of Stock
              </Typography.SmallText>
            </div>
          ) : (
            <Button 
              variant="text"
              size="sm"
              icon={<ShoppingCart className="size-4" />}
              className={cn(
                "text-primary hover:opacity-90 p-0"
              )}
              onClick={goToPageDetails}
            >
              Buy Now
            </Button>
          )}
        </div>
      </div>
      <Button
        variant="text"
        size="sm"
        icon={<Trash2 className="size-4" />}
        className={cn(
          "text-gray-medium hover:text-destructive"
        )}
        onClick={handleRemove}
        aria-label="Remove from wishlist"
      >
        <span className="text-base font-medium sm:inline hidden">Remove</span>
      </Button>
    </div>
  );
};
