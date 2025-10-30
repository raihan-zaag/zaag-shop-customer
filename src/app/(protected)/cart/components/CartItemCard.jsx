"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import { useCart } from "@/contextProviders/useCartContext";
import { useSingleCartProduct } from "@/contextProviders/useSingleCartProductProvider";
import useGetSize from "@/common/hooks/singleProduct/useGetSizes";

import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/common/components/ui/popover";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";
import { Button } from "@/common/components/ui/button";
import Typography from "@/common/components/Typography";
import PriceBreakdown from "@/sections/Checkout/PriceBreakdown";
import QuantityControl from "../../../../common/components/shared/QuantityControl";
import EditCartModal from "./EditCartModal";
import { formatNumber, cn } from "@/common/lib/utils";
import ProductOptions from "../../../../sections/orderSummary/ProductOptions";

const CartItemCard = ({
  cartInfo,
  onQuantityChange,
  onRemove,
  className,
}) => {
  const [quantity, setQuantity] = useState(cartInfo?.sellQty || 1);
  const [productPrice, setProductPrice] = useState(cartInfo?.productPrice);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { loading: sizeLoading, sizeList } = useGetSize();

  const {
    updateCartItem,
  } = useCart();

  const { setSelectedSize } = useSingleCartProduct();

  // Update local states when cartInfo changes
  useEffect(() => {
    if (cartInfo) {
      setQuantity(cartInfo?.sellQty || 1);
      setProductPrice(cartInfo?.productPrice || 0);
    }
  }, [cartInfo]);

    const handleQuantityChange = async (newQuantity) => {
    setQuantity(newQuantity);

    // Find the current size info for pricing
    const lenseIndexInfo = sizeList?.find(
      (size) => size?.value === cartInfo?.productSize
    );
    const lenseIndexPrice = lenseIndexInfo?.price || 0;

    // Calculate final price
    const finalPrice =
      (cartInfo?.productBasePrice + lenseIndexPrice) *
      newQuantity;

    setProductPrice(finalPrice);

    if (onQuantityChange) {
      await onQuantityChange();
    }

    // Update cart item
    updateCartItem(
      cartInfo?.uid,
      {
        ...cartInfo,
        sellQty: newQuantity,
        productPrice: finalPrice,
      }
    );
  };

  const handleRemoveItem = () => {
    if (onRemove) {
      onRemove(cartInfo?.uid);
    }
  };

  const handleEditModal = () => {
    setSelectedSize(sizeList[0]?.value);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleUpdateCartItem = () => {
    // Refresh parent component when cart item is updated
    if (onQuantityChange) {
      onQuantityChange();
    }
  };

  return (
    <LoadingOverlay isLoading={sizeLoading}>
      <div className={cn("bg-white border-b border-gray-100 py-5", className)}>
        <div className="flex gap-4 items-start">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <Image
              src={cartInfo?.thumbnailImage}
              alt={cartInfo?.productName}
              height={110}
              width={100}
              quality={100}
              className="w-[100px] h-[110px] object-cover bg-gray-50 rounded-primary"
            />
          </div>

          {/* Product Content */}
          <div className="flex-1 space-y-3">
            {/* Product Info */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-900 leading-tight">
                {cartInfo?.productName}
              </h3>

              <div className="flex items-center gap-3">
                <span className="text-base font-medium text-gray-900">
                  ${formatNumber(productPrice)}
                </span>

                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-xs font-medium text-gray-500 underline hover:text-gray-700 transition-colors">
                      Price Breakdown
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <PopoverArrow />
                    <PriceBreakdown cartInfo={cartInfo} />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Product Options */}
            <ProductOptions cartInfo={cartInfo} />

            {/* Edit Actions */}
            <div>
              <Button
                variant="ghost"
                onClick={handleEditModal}
                className="flex items-center gap-1.5 p-0 h-auto text-sm font-medium text-primary/90 hover:text-primary hover:bg-transparent transition-colors"
              >
                <Pencil className="h-4 w-4" />
                <Typography.BodyText className="text-sm font-medium text-primary">
                  Edit Item
                </Typography.BodyText>
              </Button>
            </div>

            {/* Mobile Quantity and Remove (visible on small screens) */}
            <div className="flex lg:hidden items-center justify-between pt-2">
              <QuantityControl
                quantity={quantity}
                maxQuantity={Number(cartInfo?.totalQuantity)}
                onQuantityChange={handleQuantityChange}
                disabled={false}
                className="scale-90"
              />

              <button
                onClick={handleRemoveItem}
                className="p-1 text-red-400 hover:text-red-500 transition-colors"
                aria-label="Remove item"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Desktop Quantity and Actions (hidden on small screens) */}
          <div className="hidden lg:flex items-center gap-12">
            <QuantityControl
              quantity={quantity}
              maxQuantity={Number(cartInfo?.totalQuantity)}
              onQuantityChange={handleQuantityChange}
              disabled={false}
            />

            <button
              onClick={handleRemoveItem}
              className="p-1 text-red-400 hover:text-red-500 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Edit Cart Modal */}
        <EditCartModal
          open={isEditModalOpen}
          onOpenChange={setIsEditModalOpen}
          cartInfo={cartInfo}
          onUpdate={handleUpdateCartItem}
        />
      </div>
    </LoadingOverlay>
  );
};

export default CartItemCard;
