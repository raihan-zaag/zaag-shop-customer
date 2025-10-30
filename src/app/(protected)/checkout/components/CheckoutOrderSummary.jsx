"use client";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/common/components/ui/textarea";
import { Button } from "@/common/components";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/common/components/ui/form";
import Typography from "@/common/components/Typography";
import { formatNumber } from "@/common/lib/utils";
import CartItemSummary from "@/sections/orderSummary/CartItemSummary";

const CheckoutOrderSummary = ({
    cart,
    calculatedData,
    onConfirmOrder,
    isLoading = false,
}) => {
    const form = useFormContext();

    return (
        <div className="bg-secondary rounded-primary p-8 space-y-6">
            <div className="space-y-6">
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

                {/* Order Summary Calculations */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <Typography.BodyText className="font-semibold text-[var(--color-text-primary)]">
                            Sub total ({cart?.length} items)
                        </Typography.BodyText>
                        <Typography.BodyText className="font-semibold text-text-primary">
                            $ {formatNumber(
                                cart?.length > 0
                                    ? calculatedData?.totalProductPrice + calculatedData?.totalExtraCharge
                                    : 0
                            )}
                        </Typography.BodyText>
                    </div>



                    <div className="flex justify-between items-center">
                        <Typography.BodyText className="text-[var(--color-text-secondary)]">
                            Vat ({calculatedData?.taxPercentage || 0}%)
                        </Typography.BodyText>
                        <Typography.BodyText className="text-[var(--color-text-secondary)]">
                            $ {formatNumber(cart?.length > 0 ? calculatedData?.taxAmount : 0)}
                        </Typography.BodyText>
                    </div>

                    <div className="flex justify-between items-center">
                        <Typography.BodyText className="text-[var(--color-text-secondary)]">
                            Tax ({calculatedData?.taxPercentage || 0}%)
                        </Typography.BodyText>
                        <Typography.BodyText className="text-[var(--color-text-secondary)]">
                            $ {formatNumber(cart?.length > 0 ? calculatedData?.taxAmount : 0)}
                        </Typography.BodyText>
                    </div>

                    <div className="flex justify-between items-center">
                        <Typography.BodyText className="text-[var(--color-text-secondary)]">
                            Shipping cost
                        </Typography.BodyText>
                        <Typography.BodyText className="text-[var(--color-text-secondary)]">
                            $ {formatNumber(cart?.length > 0 ? calculatedData?.shippingCost : 0)}
                        </Typography.BodyText>
                    </div>

                    <div className="flex justify-between items-center">
                        <Typography.BodyText className="text-[var(--color-text-secondary)]">
                            Discount
                        </Typography.BodyText>
                        <Typography.BodyText className="text-red-500 font-medium">
                            - $ {formatNumber(calculatedData?.promoDiscountAmount)}
                        </Typography.BodyText>
                    </div>
                </div>

                {/* Final Total */}
                <div className=" border-t border-border flex justify-between items-center py-2">
                    <Typography.Title3 className="font-bold text-[var(--color-text-primary)]">
                        Final Order Price
                    </Typography.Title3>
                    <Typography.Title3 className="font-bold text-[var(--color-primary)]">
                        $ {formatNumber(
                            cart?.length > 0
                                ? calculatedData?.totalProductPriceAfterPromo +
                                calculatedData?.taxAmount +
                                calculatedData?.shippingCost
                                : 0
                        )}
                    </Typography.Title3>
                </div>

                {/* Order Note */}
                <div>
                    <FormLabel required >
                        Order Note (Optional)
                    </FormLabel>
                    <FormField
                        control={form.control}
                        name="orderNote"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        rows={4}
                                        placeholder="Write your instructions here.."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Confirm Order Button */}
                <Button
                    className="w-full"
                    onClick={onConfirmOrder}
                    loading={isLoading}
                >
                    Confirm Order
                </Button>
            </div>
        </div>
    );
};

export default CheckoutOrderSummary;
