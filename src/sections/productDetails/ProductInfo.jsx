"use client";

import { useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";
import Typography from "@/common/components/Typography";
import QuantityControl from "@/common/components/shared/QuantityControl";
import { cn } from "@/common/lib/utils";
import { useCart } from "@/contextProviders/useCartContext";
import useNotification from "@/common/hooks/useNotification";

const ProductInfo = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Cart and notification hooks
  const { addToCart } = useCart();
  const { openSuccessNotification, openErrorNotification } = useNotification();

  // Available sizes for the product
  const availableSizes = ["S", "M", "L", "All"];

  // Initialize selected color
  useEffect(() => {
    if (product?.colorList?.length > 0) {
      setSelectedColor(product.colorList[0]);
    }
  }, [product]);

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Build product structure for cart
  const buildProductStructure = () => {
    const basePrice = product?.priceAfterDiscount || product?.price || product?.regularPrice || 0;
    const colorPrice = selectedColor?.price || 0;
    
    // Calculate total price including color and size options
    const totalPrice = basePrice + colorPrice;

    return {
      product: { id: product?.id },
      productId: product?.id,
      ...(selectedColor?.color?.name && {
        productColor: selectedColor.color.name,
        productColorId: selectedColor.id,
      }),
      ...(selectedSize && selectedSize !== "All" && {
        productSize: selectedSize,
      }),
      sellQty: quantity,
      thumbnailImage: product?.thumbnailImage || "/images/image_placeholder.png",
      productName: product?.name,
      productPrice: totalPrice * quantity,
      singleProductPrice: totalPrice,
      totalQuantity: product?.availableQty || 0,
      productBasePrice: basePrice,
      uid: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    };
  };

  const handleAddToCart = async () => {
    // Check if product is available
    if (!product || product.availableQty === 0) {
      openErrorNotification("Error", "This product is currently out of stock");
      return;
    }

    // Check if required selections are made
    if (!selectedColor) {
      openErrorNotification("Error", "Please select a color");
      return;
    }

    if (!selectedSize) {
      openErrorNotification("Error", "Please select a size");
      return;
    }

    try {
      const productStructure = buildProductStructure();
      addToCart(productStructure);
      
      openSuccessNotification(
        "Success", 
        `${product.name} has been added to your cart!`
      );
    } catch {
      openErrorNotification(
        "Error", 
        "Failed to add product to cart. Please try again."
      );
    }
  };

  const handleBuyNow = () => {
    // Buy now logic  
    // TODO: Implement actual buy now functionality
  };

  if (!product) {
    return <div>Loading product information...</div>;
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-6 w-full">
      {/* Product Title and Category */}
      <div className="flex flex-col gap-3">
        {/* Category */}
        {product.categoryList?.length > 0 && (
          <div className="flex gap-1">
            {product.categoryList.map((category, index) => (
              <Typography.Paragraph key={index} className="text-text-subtle">
                {category.name}
                {index < product.categoryList.length - 1 && ", "}
              </Typography.Paragraph>
            ))}
          </div>
        )}

        {/* Product Name and Subtitle */}
        <div className="flex flex-col gap-2">
          <Typography.Title1 className="text-xl md:text-2xl lg:text-3xl">
            {product.name}
          </Typography.Title1>
          <Typography.Paragraph className="text-base lg:text-lg">
            Mini Eve Bag
          </Typography.Paragraph>
        </div>
      </div>

      {/* Rating and Reviews */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Star Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={cn(
                    "size-4",
                    index < Math.floor(product.averageRating || 0)
                      ? "fill-orange-500 text-orange-500"
                      : "text-orange-500"
                  )}
                />
              ))}
            </div>
            <Typography.SmallText className="text-sm font-medium text-text-primary">
              {product.averageRating || "4.0"}
            </Typography.SmallText>
          </div>

          <span className="text-text-subtle">•</span>
          {/* Review Count */}
          <Typography.SmallText className="text-sm">
            {product.totalReviewCount || 0} reviews
          </Typography.SmallText>
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleWishlistToggle}
        >
          <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
          <Typography.SmallText className="text-sm font-medium">
            {isWishlisted ? "Wishlisted" : "Wishlist"}
          </Typography.SmallText>
        </Button>
      </div>

      {/* Pricing */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Typography.Title1 className="text-2xl md:text-3xl text-text-primary">
            ${product.priceAfterDiscount || product.price || "8.75"}
          </Typography.Title1>
          {product.regularPrice && product.priceAfterDiscount && (
            <>
              <Typography.Paragraph className="text-base lg:text-lg text-text-subtle line-through">
                ${product.regularPrice}
              </Typography.Paragraph>
              <Badge variant="outline" size="xl"
                className="text-destructive border-none"
              >
                {product.discount}% off
              </Badge>
            </>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center">
          <Typography.SmallText className="text-sm font-semibold text-success">
            Available stock {product.availableQty || 6}
          </Typography.SmallText>
        </div>
      </div>

      {/* Color Selection */}
      {product.colorList?.length > 0 && (
        <div className="flex flex-col gap-3">
          <Typography.BodyText className="font-semibold text-text-primary">
            Select Color <span className="text-destructive">*</span>
          </Typography.BodyText>
          <div className="flex items-center gap-3">
            {product.colorList.map((colorOption, index) => (
              <button
                key={index}
                className={cn(
                  "relative w-9 h-9 rounded-full border-2 transition-all duration-200",
                  selectedColor?.id === colorOption.id
                    ? "border-success scale-110"
                    : "border-border hover:border-border-strong"
                )}
                onClick={() => setSelectedColor(colorOption)}
              >
                <div
                  className="w-7 h-7 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ backgroundColor: colorOption.color.value }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selection */}
      <div className="flex flex-col gap-3">
        <Typography.BodyText className="font-semibold text-text-primary">
          Size <span className="text-destructive">*</span>
        </Typography.BodyText>
        <div className="flex flex-wrap gap-3">
          {availableSizes.map((size) => (
            <Button
              key={size}
              variant="outline"
              className={cn(
                "py-3 px-5 rounded-primary text-lg font-medium min-w-26.5",
                selectedSize === size
                  ? "border-primary text-primary"
                  : "text-text-secondary"
              )}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Quantity Selection */}
      <div className="flex flex-col gap-3">
        <Typography.BodyText className="font-semibold text-text-primary">
          Select Quantity <span className="text-destructive">*</span>
        </Typography.BodyText>

        <div className="flex items-center gap-4">
          <QuantityControl
            quantity={quantity}
            maxQuantity={product?.availableQty || 10}
            onQuantityChange={setQuantity}
            disabled={false}
          />

          <Typography.Paragraph className="text-text-secondary">
            Total: ${((product.priceAfterDiscount || product.price || 8.75) * quantity).toFixed(2)}
          </Typography.Paragraph>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <Button
          className="flex-1 h-12"
          onClick={handleAddToCart}
          disabled={product.availableQty === 0}
        >
          Add to Cart
        </Button>

        <Button
          variant="outline"
          className="flex-1 h-12"
          onClick={handleBuyNow}
          disabled={product.availableQty === 0}
        >
          Buy Now
        </Button>
      </div>

      {/* Stock Warning */}
      {product.availableQty === 0 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-primary p-2">
          <Typography.Paragraph className="text-destructive font-medium text-center">
            This product is currently out of stock
          </Typography.Paragraph>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
