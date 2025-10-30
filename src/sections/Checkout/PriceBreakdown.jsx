"use client";

import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

import useGetColorList from "@/hooks/color/useGetColorList";
import useGetSize from "@/common/hooks/singleProduct/useGetSizes";
import { formatNumber } from "@/common/lib/utils";

const PriceBreakdown = ({ cartInfo }) => {
  const { sizeList, loading: sizeLoading } = useGetSize();
  const { fetchColors, colors, loading: colorLoading } = useGetColorList();

  useEffect(() => {
    if (cartInfo && "productColorId" in cartInfo && cartInfo.productColorId) {
      fetchColors(cartInfo.productColorId);
    }
  }, [cartInfo, fetchColors]);

  if (sizeLoading || colorLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-foreground">
        <Spinner className="text-primary" />
        <span>Loading price breakdown...</span>
      </div>
    );
  }

  const calculateTotalPrice = () => {
    const basePrice = cartInfo.productBasePrice || 0;
    const sizePrice =
      sizeList.find((size) => size.value === cartInfo.productSize)?.price || 0;

    const colorPrice =
      colors.id === String(cartInfo.productColorId) ? colors.price : 0;

    return basePrice + sizePrice + colorPrice;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <div className="min-w-52">
      <h2 className="font-semibold text-sm mb-4">{cartInfo.productName}</h2>

      {/* Base price info */}
      <div className="flex flex-row items-center justify-between font-semibold text-sm mb-2">
        <p>Base Price:</p>
        <p>${formatNumber(cartInfo.productBasePrice)}</p>
      </div>

      {/* Size info */}
      {sizeList.find((size) => size.value === cartInfo.productSize)?.price > 0 && (
        <div className="flex flex-row items-center justify-between text-sm">
          <p>
            Size (
            <span className="text-blue-500">
              {cartInfo.productSize}{" "}
            </span>
            )
          </p>
          <p>
            ${sizeList.find((size) => size.value === cartInfo.productSize)?.price}
          </p>
        </div>
      )}

      {/* Color info */}
      {cartInfo.productColorId && colors.price > 0 && (
        <div className="flex flex-row items-center justify-between text-sm">
          <p>
            Color : (
            <span className="text-blue-500">{cartInfo.productColor}</span>){" "}
          </p>
          <p> ${colors.price}</p>
        </div>
      )}

      {/* Total and subtotal Info */}
      <div className="h-0.5 w-full bg-border-gray my-2" />
      <div className="flex flex-row items-center justify-between text-sm">
        <p>Subtotal Price Unit:</p>
        <p>${formatNumber(totalPrice)}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-sm">
        <p>Quantity</p>
        <p>{cartInfo?.sellQty}</p>
      </div>

      <div className="h-0.5 w-full bg-border-gray my-2" />

      <div className="flex flex-row items-center justify-between text-sm">
        <p className="text-sm">Total Price</p>
        <p className="text-blue-500">
          $ {formatNumber(totalPrice * cartInfo?.sellQty)}
        </p>
      </div>
    </div>
  );
};

export default PriceBreakdown;
