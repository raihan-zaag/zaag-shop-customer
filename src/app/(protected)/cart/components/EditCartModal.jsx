"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

import { Dialog, DialogContent, DialogHeader } from "@/common/components/ui/dialog";
import { Button } from "@/common/components/ui/button";
import Typography from "@/common/components/Typography";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";
import { formatNumber, cn } from "@/common/lib/utils";
import QuantityControl from "@/common/components/shared/QuantityControl";

import { useCart } from "@/contextProviders/useCartContext";
import useGetSize from "@/common/hooks/singleProduct/useGetSizes";
import useGetAllColors from "@/common/hooks/color/useGetAllColors";

const EditCartModal = ({
    open,
    onOpenChange,
    cartInfo,
    onUpdate
}) => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const { loading: sizeLoading, sizeList } = useGetSize();
    const { colors, loading: colorLoading } = useGetAllColors();
    const {
        updateCartItem,
    } = useCart();

    // Initialize form data when modal opens
    useEffect(() => {
        if (open && cartInfo) {
            setSelectedColor(cartInfo?.productColor || null);
            setSelectedSize(cartInfo?.productSize || null);
            setQuantity(cartInfo?.sellQty || 1);
        }
    }, [open, cartInfo]);

    // Mock color options - replace with actual data
    const colorOptions = colors?.length > 0 ? colors : [
        { id: 1, label: "Beige", value: "beige", color: "#FCECD3" },
        { id: 2, label: "Brown", value: "brown", color: "#AD7E60" },
        { id: 3, label: "Peach", value: "peach", color: "#FFC2A7" },
        { id: 4, label: "Gray", value: "gray", color: "#A9A9A9" },
    ];

    // Mock size options - replace with actual data from sizeList
    const sizeOptions = sizeList?.length > 0
        ? sizeList.map(size => size.value)
        : ["S", "M", "L", "All"];

    const handleColorSelect = (color) => {
        setSelectedColor(color.label || color.value);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const calculatePrice = () => {
        if (!cartInfo) return 0;

        // Calculate lense index price
        const lenseIndexPrice = sizeList?.find(
            (size) => size?.value === selectedSize
        )?.price || 0;

        return (cartInfo?.productBasePrice + lenseIndexPrice) * quantity;
    };

    const handleUpdateItem = async () => {
        setIsLoading(true);

        try {
            const newPrice = calculatePrice();

            const updateData = {
                productPrice: newPrice,
                sellQty: quantity,
                productSize: selectedSize,
                productColor: selectedColor,
            };

            await updateCartItem(cartInfo?.uid, updateData);

            if (onUpdate) {
                onUpdate();
            }

            onOpenChange(false);
        } catch (error) {
            console.error("Error updating cart item:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const currentPrice = calculatePrice();
    const originalPrice = cartInfo?.productBasePrice * quantity;
    const discountPercentage = originalPrice > currentPrice
        ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
        : 0;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-[600px] p-9 rounded-primary border-0 shadow-lg"
                showCloseButton={false}
            >
                <LoadingOverlay isLoading={sizeLoading || colorLoading || isLoading}>
                    {/* Header */}
                    <DialogHeader className="flex flex-row items-center justify-between p-0 space-y-0 mb-0">
                        <Typography.Title2 className="text-xl font-medium text-[#222222]">
                            Edit Cart
                        </Typography.Title2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onOpenChange(false)}
                            className="h-6 w-6 p-0 hover:bg-transparent"
                        >
                            <X className="size-5 cursor-pointer" />
                        </Button>
                    </DialogHeader>

                    <div className="space-y-9 mt-9">
                        {/* Product Info */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Typography.BodyText className="text-base font-medium text-[#565656]">
                                        Women
                                    </Typography.BodyText>
                                </div>
                                <Typography.Title1 className="text-2xl font-semibold text-[#222222]">
                                    {cartInfo?.productName || "Mini Eve Bag"}
                                </Typography.Title1>
                            </div>

                            {/* Price and Stock */}
                            <div className="flex items-center gap-3">
                                <Typography.Title1 className="text-[32px] font-semibold text-[#2A2A2A]">
                                    ${formatNumber(currentPrice)}
                                </Typography.Title1>
                                {discountPercentage > 0 && (
                                    <>
                                        <Typography.BodyText className="text-base text-[#8A8A8A] line-through">
                                            ${formatNumber(originalPrice)}
                                        </Typography.BodyText>
                                        <Typography.BodyText className="text-base font-medium text-[#E91C24]">
                                            {discountPercentage}% off
                                        </Typography.BodyText>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Content Sections */}
                        <div className="space-y-6">
                            {/* Color Selection */}
                            <div className="space-y-3">
                                <Typography.BodyText className="text-sm font-semibold text-[#2A2A2A]">
                                    Select Color *
                                </Typography.BodyText>
                                <div className="flex items-center gap-3">
                                    {colorLoading ? (
                                        <div className="flex gap-3">
                                            {[...Array(4)].map((_, index) => (
                                                <div key={index} className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
                                            ))}
                                        </div>
                                    ) : (
                                        colorOptions.map((color) => (
                                            <button
                                                key={color.id}
                                                onClick={() => handleColorSelect(color)}
                                                className={cn(
                                                    "relative w-9 h-9 rounded-full border transition-all",
                                                    selectedColor === (color.label || color.value)
                                                        ? "border-2 border-[#3EB345]"
                                                        : "border border-[#3EB345]"
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        "w-full h-full rounded-full",
                                                        selectedColor === (color.label || color.value) ? "scale-75" : "scale-100"
                                                    )}
                                                    style={{ backgroundColor: color.color }}
                                                />
                                                {selectedColor === (color.label || color.value) && (
                                                    <div className="absolute inset-0 bg-white/30 rounded-full" />
                                                )}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Size Selection */}
                            <div className="space-y-3">
                                <Typography.BodyText className="text-base font-semibold">
                                    Size *
                                </Typography.BodyText>
                                <div className="grid grid-cols-4 gap-3">
                                    {sizeOptions.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => handleSizeSelect(size)}
                                            className={cn(
                                                "px-5 py-3 rounded-primary border text-xl font-medium transition-all",
                                                selectedSize === size
                                                    ? "border-primary text-primary"
                                                    : "border-border text-secondary"
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Quantity Selection */}
                        <div className="space-y-2 mt-8">
                            <Typography.BodyText className="text-sm font-semibold ">
                                Select Quantity *
                            </Typography.BodyText>
                            <QuantityControl
                                quantity={quantity}
                                maxQuantity={Number(cartInfo?.totalQuantity)}
                                onQuantityChange={setQuantity}
                                disabled={false}
                                className="w-40"
                            />
                        </div>
                    </div>

                    {/* Update Button */}
                    <div className="mt-9">
                        <Button
                            onClick={handleUpdateItem}
                            disabled={!selectedSize || !selectedColor || isLoading}
                            className="w-full h-12 text-white font-semibold text-base rounded-primary"
                        >
                            {isLoading ? "Updating..." : "Update Item"}
                        </Button>
                    </div>
                </LoadingOverlay>
            </DialogContent>
        </Dialog>
    );
};

export default EditCartModal;
