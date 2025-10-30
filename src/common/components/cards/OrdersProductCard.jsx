"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/common/components/ui/dialog";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";
import Image from "next/image";
import { TiStarFullOutline } from "react-icons/ti";
import ProductReviewForm from "./ProductReviewForm";
import { useMakeOrderReview } from "@/common/hooks/reviews/useMakeProductReview";
import { useUserContext } from "@/contextProviders/userContextProvider";

const OrdersProductCard = ({ data, orderId, allOrderInfo }) => {
  const [isWriteReview, setIsWriteReview] = useState(false);
  const [isProductReview, setIsProductReview] = useState(data?.productReview);

  const { createProductReview, loading } = useMakeOrderReview();
  const { isAuthenticated } = useUserContext();

  const handleWriteReviewToggleModal = () => {
    setIsWriteReview(!isWriteReview);
  };

  const handleMakeReview = async (rating) => {
    const res = await createProductReview(rating, data?.product?.id, orderId);

    if (res?.status === 201) {
      setIsProductReview(true);
      setIsWriteReview(false);
    }
  };

  const isOrderDelivered = allOrderInfo?.orderStatus === "ORDER_DELIVERED";
  // const isPartiallyReturned =
  //   allOrderInfo?.orderStatus === "PARTIALLY_RETURNED";
  // const isOrderReturned = allOrderInfo?.orderStatus === "ORDER_RETURNED";

  const isShowReviewButton =
    isAuthenticated && !isProductReview && isOrderDelivered;

  return (
    <LoadingOverlay isLoading={loading}>
      <div className="flex items-start gap-4">
        <Image
          src={data?.thumbnailImage}
          alt="product image"
          width={1000}
          height={1000}
          className="w-90px h-110px"
        />

      <div>
  <h3 className="text-sm font-medium text-gray-dark">
          {data?.productName}
        </h3>
        <div className="flex items-center gap-1 mt-0.5">
          <p className="text-sm font-semibold text-blue">
            {data?.sellQty} x
          </p>
          <p className="text-sm font-medium text-gray-dark">
            {data?.productPrice}
          </p>
        </div>

        {data?.returnQty > 0 && (
          <h3 className="text-sm font-medium text-gray-dark">
            Initial Qty : {data?.sellQty + data?.returnQty}
          </h3>
        )}

        <div className="flex items-center gap-3 mt-2">
          {data?.addOn?.color && (
            <p className="text-xs font-medium text-gray-dark2 py-2 px-3 bg-gray-light">
              Color:{data?.addOn?.color}
            </p>
          )}

          {data?.returnQty > 0 && (
            <p className="text-xs text-center font-medium text-red-variant2 py-2 px-3 bg-red/10">
              Returned : {data?.returnQty}
            </p>
          )}

          {/* <p className="text-xs font-medium text-[#3A3A3A] py-2 px-3 bg-[#F2F2F2]">
            Thick:{data?.addOn?.size}
          </p> */}
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="border-r border-border-gray h-3 w-0.5" />

          {isShowReviewButton ? (
            <button
              onClick={handleWriteReviewToggleModal}
              className={`text-xs font-semibold text-orange flex items-center gap-1.5 sm:no-underline cursor-pointer`}
            >
              <TiStarFullOutline className="text-orange sm:inline hidden" />
              <span className="text-xs font-semibold text-orange">
                Give Review
              </span>
            </button>
          ) : null}
        </div>
      </div>

      {isWriteReview && (
        <Dialog open={isWriteReview} onOpenChange={(open) => !open && handleWriteReviewToggleModal()}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="w-full flex justify-center pt-4">Write Review</DialogTitle>
            </DialogHeader>
            <ProductReviewForm
              submit={handleMakeReview}
              productName={data?.productName}
              image={data?.thumbnailImage}
              data={data}
              closeModal={handleWriteReviewToggleModal}
            />
          </DialogContent>
        </Dialog>
      )}
      </div>
    </LoadingOverlay>
  );
};

export default OrdersProductCard;
