"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contextProviders/useCartContext";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import Typography from "@/common/components/Typography";
import { formatNumber, cn } from "@/common/lib/utils";
import { PATH_CHECKOUT, PATH_PRODUCTS } from "@/common/config/constants/routes";
import CartItemSummary from "../../../../sections/orderSummary/CartItemSummary";

const CartOrderSummary = ({
  total,
  subTotal,
  taxPercentage,
  taxAmount,
  shippingCost,
  discount,
  promoCode,
  onPromoCodeChange,
  onApplyPromoCode,
  onRemovePromoCode,
  fromCartPage = false,
  appliedCoupons = [],
  className = "",
}) => {
  const router = useRouter();
  const { cart } = useCart();
  const [localPromoCode, setLocalPromoCode] = useState(promoCode || "");

  const handlePromoCodeSubmit = () => {
    if (onApplyPromoCode && localPromoCode.trim()) {
      onApplyPromoCode(localPromoCode);
    }
  };

  const handlePromoCodeChange = (e) => {
    const value = e.target.value;
    setLocalPromoCode(value);
    if (onPromoCodeChange) {
      onPromoCodeChange(value);
    }
  };

  const handleRemoveCoupon = (couponCode) => {
    if (onRemovePromoCode) {
      onRemovePromoCode(couponCode);
    }
  };

  const handleCheckout = () => {
    router.push(PATH_CHECKOUT);
  };

  const itemCount = cart?.length || 0;

  return (
    <div className="bg-secondary rounded-primary p-8 space-y-6">
      {/* Header */}
      <Typography.Title1 className="text-xl font-bold ">
        Order Summary
      </Typography.Title1>

      {/* Cart Items Summary */}
      <div className="space-y-6">
        {cart?.map((item, index) => (
          <CartItemSummary key={index} item={item} />
        ))}
      </div>

      {/* Order Totals */}
      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <Typography.BodyText className="text-sm font-semibold ">
            Sub total ({itemCount} item{itemCount !== 1 ? 's' : ''})
          </Typography.BodyText>
          <Typography.Title3 className="text-sm font-semibold ">
            ${formatNumber(subTotal)}
          </Typography.Title3>
        </div>

        <div className="flex justify-between items-center">
          <Typography.BodyText className="text-sm font-medium ">
            Vat (5%)
          </Typography.BodyText>
          <Typography.Title3 className="text-sm font-medium ">
            ${formatNumber(taxAmount)}
          </Typography.Title3>
        </div>

        <div className="flex justify-between items-center">
          <Typography.BodyText className="text-sm font-medium ">
            Tax (5%)
          </Typography.BodyText>
          <Typography.Title3 className="text-sm font-medium ">
            ${formatNumber(taxAmount)}
          </Typography.Title3>
        </div>

        {/* Applied Coupons Display */}
        {appliedCoupons?.length > 0 && (
          <div className="space-y-2">
            {appliedCoupons.map((coupon, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Typography.BodyText className="text-sm font-normal ">
                    Discount ({coupon.code})
                  </Typography.BodyText>
                  <button
                    onClick={() => handleRemoveCoupon(coupon.code)}
                    className="text-destructive hover:text-destructive/80 text-xs"
                  >
                    Remove
                  </button>
                </div>
                <Typography.BodyText className="text-sm font-normal text-destructive">
                  -${formatNumber(coupon.amount)}
                </Typography.BodyText>
              </div>
            ))}
          </div>
        )}

        {/* Legacy Discount (fallback) */}
        {discount > 0 && appliedCoupons?.length === 0 && (
          <div className="flex justify-between items-center">
            <Typography.BodyText className="text-sm font-normal ">
              Discount
            </Typography.BodyText>
            <Typography.BodyText className="text-sm font-normal text-destructive">
              -${formatNumber(discount)}
            </Typography.BodyText>
          </div>
        )}

        {/* Tax (if not from cart page) */}
        {!fromCartPage && taxAmount > 0 && (
          <div className="flex justify-between items-center">
            <Typography.BodyText className="text-sm font-medium ">
              Tax ({taxPercentage}%)
            </Typography.BodyText>
            <Typography.Title3 className="text-sm font-medium ">
              ${formatNumber(taxAmount)}
            </Typography.Title3>
          </div>
        )}

        {/* Shipping Cost (if not from cart page) */}
        {!fromCartPage && shippingCost > 0 && (
          <div className="flex justify-between items-center">
            <Typography.BodyText className="text-sm font-medium ">
              Shipping cost
            </Typography.BodyText>
            <Typography.Title3 className="text-sm font-medium ">
              ${formatNumber(shippingCost)}
            </Typography.Title3>
          </div>
        )}
      </div>

      {/* Total Price */}
      <div className="border-t border-border flex justify-between items-center h-8">
        <Typography.Title2 className="text-lg font-semibold ">
          Total Price
        </Typography.Title2>
        <Typography.Title2 className="text-lg font-semibold ">
          ${formatNumber(total)}
        </Typography.Title2>
      </div>

      {fromCartPage && (
        <>
          {/* Promo Code Section */}
          <div className="space-y-2">
            <Typography.Title3 className="text-sm font-medium ">
              Discount code
            </Typography.Title3>
            <div className="flex gap-3">
              <Input
                placeholder="Enter a promo code"
                value={localPromoCode}
                onChange={handlePromoCodeChange}
                className="flex-1 h-12"
              />
              <Button
                variant="outline"
                onClick={handlePromoCodeSubmit}
                disabled={!localPromoCode.trim()}
                className={cn(
                  "px-6 h-12 bg-gray-200  border-border",
                  localPromoCode.trim() && "bg-primary text-white hover:bg-primary/90"
                )}
              >
                Apply
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleCheckout}
              className="w-full h-12 text-base font-semibold bg-primary text-white hover:bg-primary/90 shadow-lg"
              disabled={itemCount === 0}
            >
              Checkout
            </Button>

            <button
              onClick={() => router.push(PATH_PRODUCTS)}
              className="w-full text-sm font-semibold hover:text-primary transition-colors underline"
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartOrderSummary;
