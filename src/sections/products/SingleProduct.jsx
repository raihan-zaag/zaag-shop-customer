"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import { useWishlist } from "@/contextProviders/useWishListProvider";
import { useCart } from "@/contextProviders/useCartContext";
import Typography from "@/common/components/Typography";
import { Button } from "@/common/components";
import useNotification from "@/common/hooks/useNotification";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/common/components/ui/carousel";
import { PATH_PRODUCT_DETAILS_DYNAMIC } from "@/common/config/constants/routes";
import { formatNumber } from "@/common/lib/utils";

const SingleProduct = ({ product, defaultSizePrice = 0 }) => {
  const { isProductInWishlist, makeWishlist, removeWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { openSuccessNotification, openErrorNotification } = useNotification();

  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const getDefaultColorPrice = () => {
    if (product?.colorList?.length > 0) {
      return product?.colorList[0]?.price;
    }
    return 0;
  };

  // Price calculation
  const productPrice = product?.priceAfterDiscount
    ? product?.priceAfterDiscount
    : product?.regularPrice;

  const calculatedPrice =
    productPrice + defaultSizePrice + getDefaultColorPrice();

  // Sample images array - replace with actual product images
  const productImages = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=center',
    // Add more images here from product
  ];

  const buildProductStructure = () => {
    const selectedColor = product?.colorList?.[0];
    const quantity = 1; // Default quantity for single product card

    return {
      productId: product?.id,
      ...(selectedColor?.color?.name && {
        productColor: selectedColor?.color?.name,
      }),
      sellQty: quantity,
      thumbnailImage: product?.thumbnailImage || productImages[0],
      productName: product?.name,
      productPrice: calculatedPrice * quantity,
      singleProductPrice: calculatedPrice,
      totalQuantity: product?.availableQty,
      productBasePrice: productPrice,
      uid: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    };
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if product is available
    if (product?.availableQty === 0) {
      openErrorNotification("Error", "This product is currently out of stock");
      return;
    }

    setIsAddingToCart(true);

    try {
      const productStructure = buildProductStructure();
      addToCart(productStructure);

      openSuccessNotification(
        "Success",
        "Product successfully added to cart"
      );
    } catch {
      openErrorNotification(
        "Error",
        "Failed to add product to cart. Please try again."
      );
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isProductInWishlist(product?.id)) {
      removeWishlist(product?.id);
    } else {
      makeWishlist(product?.id);
    }
  };

  return (
    <div className="relative">
      {/* Product Image Carousel */}
      <div className="group relative">
        <Carousel className="w-full">
          <CarouselContent>
            {productImages.map((image, index) => (
              <CarouselItem key={index}>
                <Link
                  href={PATH_PRODUCT_DETAILS_DYNAMIC(product?.id)}
                  aria-label={product?.name}
                >
                  <Image
                    src={image}
                    alt={`${product?.name} - ${index + 1}`}
                    className="w-full h-[350px] object-cover transition-transform duration-300 ease-in-out rounded-primary"
                    height={1000}
                    width={1000}
                    quality={100}
                    loading="lazy"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots className="top-6" activeDotClassName="bg-primary" />
        </Carousel>

        {/* Wishlist Button - visible on mobile, shows on hover on desktop */}
        <div className="absolute right-4 top-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400">
          {isProductInWishlist(product?.id) ? (
            <button
              onClick={handleWishlistToggle}
              className="size-11 rounded-full bg-background flex items-center justify-center shadow hover:bg-muted transition"
              aria-label="Remove from wishlist"
            >
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            </button>
          ) : (
            <button
              onClick={handleWishlistToggle}
              className="size-11 rounded-full bg-background flex items-center justify-center shadow hover:bg-muted transition"
              aria-label="Add to wishlist"
            >
              <Heart className="w-6 h-6 text-gray-600" />
            </button>
          )}
        </div>

        {/* Add To Cart Button - visible on mobile, shows on hover on desktop */}
        <div className="absolute bottom-3.75 left-0 w-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-400 px-3.75">
          <Link href={PATH_PRODUCT_DETAILS_DYNAMIC(product?.id)}
            className="block w-full cursor-pointer text-base text-center font-semibold rounded-primary p-4 bg-secondary text-text-on-secondary hover:bg-secondary-hover"
          >
            Choose Options
          </Link>

        </div>

        {/* Stock Status Indicator */}
        {product?.availableQty === 0 && (
          <div className="absolute top-4 left-4">
            <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
              Out of Stock
            </div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-4 space-y-2">
        <Typography.Title3>{product?.name}</Typography.Title3>
        <div className="flex items-center gap-x-2">

          <Typography.Paragraph className="text-text-primary font-bold mb-0 text-xl">
            ${formatNumber(calculatedPrice ?? 0)}
          </Typography.Paragraph>
          {product?.discount && (
            <Typography.Description className="font-medium line-through mb-0 text-border-strong text-lg">
              ${formatNumber(product?.regularPrice ?? 0)}
            </Typography.Description>
          )}
        </div>

        {/* Stock Info */}
        <div className="">
          {product?.availableQty > 0 && product?.availableQty <= 5 && (
            <Typography.Description className="text-orange-600 text-sm">
              Only {product.availableQty} left in stock
            </Typography.Description>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
