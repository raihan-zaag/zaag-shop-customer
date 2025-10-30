"use client";

import { useEffect } from "react";
import { useSingleCartProduct } from "@/contextProviders/useSingleCartProductProvider";
import { formatNumber } from "@/common/lib/utils";

function CheckoutProductCard({ cartInfo }) {
  const { setProdBasePrice } = useSingleCartProduct();

  useEffect(() => {
    setProdBasePrice(cartInfo?.productBasePrice);
  }, [cartInfo?.productBasePrice, setProdBasePrice]);

  return (
    <div className="flex gap-4 items-start">
      {/* Product Details */}
      <div className="flex flex-col flex-1 gap-2">
        {/* Title and Quantity/Price */}
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-medium text-[var(--color-text-primary)] flex-1">
            {cartInfo?.productName}
          </h3>
          <div className="text-sm font-medium text-[var(--color-text-primary)] ml-4">
            {cartInfo?.sellQty || 1} x $ {formatNumber(cartInfo?.singleProductPrice)}
          </div>
        </div>

        {/* Product Options */}
        <div className="flex gap-3">
          {cartInfo?.productColor && (
            <div className="bg-[#F2F2F2] px-3 py-2 rounded-primary text-xs font-medium text-[var(--color-text-primary)]">
              Color: {cartInfo?.productColor}
            </div>
          )}
          {cartInfo?.productSize && (
            <div className="bg-[#F2F2F2] px-3 py-2 rounded-primary text-xs font-medium text-[var(--color-text-primary)]">
              Size: {cartInfo?.productSize}
            </div>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="text-sm font-medium text-[var(--color-text-primary)]">
        $ {formatNumber(
          (cartInfo?.singleProductPrice || 0) * (cartInfo?.sellQty || 1)
        )}
      </div>
    </div>
  );
}

export default CheckoutProductCard;
