"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCookie } from "cookies-next";

import { CART_INFO, USER_INFO } from "@/common/config/constants/cookiesKeys";
import useUpdateCart from "@/app/(protected)/cart/hooks/useCartUpdate";
import useGetOrderCalculatedData from "@/common/hooks/order/useGetCalculation";
import useCreateGuestUserOrder from "@/common/hooks/order/useMakeGuestUserOrder";
import { GET_CART_ITEM_URL } from "@/common/config/constants/apiUrls";
import axiosPrivate from "@/common/config/axios.publicInstance";
import { useUserContext } from "../userContextProvider";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState();
  const [loading, setLoading] = useState(false);

  const { updateCart } = useUpdateCart();
  const {
    getCalculatedData,
    calculatedData,
    loading: getCalculationLoading,
  } = useGetOrderCalculatedData();
  const { createGuestOrder, createGuestOrderLoading } =
    useCreateGuestUserOrder();
  const { user, isAuthenticated } = useUserContext();

  // Load cart from localStorage only on the client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem(CART_INFO);
      try {
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error("Failed to parse cart data from localStorage:", error);
        setCart();
      }
    }
  }, []);

  // Sync cart with localStorage whenever it changes
  useEffect(() => {
    if (cart) {
      localStorage.setItem(CART_INFO, JSON.stringify(cart));
    }
  }, [cart]);



  const syncCartWithBackend = () => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        handleUpdateCartInBackend();
      }, 10);

      return () => clearTimeout(timer); // Return a cleanup function
    }
  };

  // Add product to cart (allow duplicates)
  const addToCart = (product) => {
    const isArray = Array.isArray(cart);
    if (isArray) {
      setCart((prevCart) => [
        ...prevCart,
        product,
        // { ...product, quantity: product.quantity || 1 },
      ]);
    } else {
      setCart([product]);
    }

    syncCartWithBackend();
  };

  // Remove a specific cart item by its unique ID
  const removeFromCart = (uid) => {
    setCart((prevCart) => prevCart.filter((item) => item.uid !== uid));

    syncCartWithBackend();
  };

  // Update an existing cart item's quantity or details
  const updateCartItem = (uid, updatedFields) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.uid === uid ? { ...item, ...updatedFields } : item
      )
    );

    syncCartWithBackend();
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_INFO);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const total = cart?.reduce((total, item) => total + item.productPrice, 0);
    return total;
  };

  // This function use for transform the update cart response like my cart list data
  const transformCartResponse = useCallback((response) => {
    const transformedCart = response?.cartDetailsList?.map((item) => {
      return {
        product: {
          id: item.product?.id,
        },
        ...(item?.productColorId && {
          productColorId: Number(item?.productColorId),
        }),
        productColor: item.productColor,
        productSize: item.productSize,
        sellQty: Number(item.sellQty),
        thumbnailImage: item.thumbnailImage,
        productName: item.productName,
        productPrice: item.totalFinalProductPrice,
        singleProductPrice: item.totalPrice / item.sellQty,
        productBasePrice:
          item?.product?.priceAfterDiscount ?? item?.product?.regularPrice,
        totalQuantity: item?.currentStockQty,
        uid: `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      };
    });

    setCart(transformedCart);

    return transformedCart;
  }, []);

  // call this fuction for cart drawer component and after login user
  const handleUpdateCartInBackend = useCallback(async (promoCode = null) => {
    let _cartInfo = null;
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem(CART_INFO);
      try {
        if (storedCart) {
          _cartInfo = JSON.parse(storedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart data from localStorage:", error);
      }
    }

    // Retrieve user info from cookies
    const _user = getCookie(USER_INFO);

    // Check if the cookie exists and parse it safely
    let user_info = null;
    if (_user) {
      try {
        user_info = JSON.parse(_user);
      } catch (error) {
        console.error("Failed to parse user info from cookies:", error);
        user_info = null;
      }
    }

    setLoading(true);

    const productMap = _cartInfo?.map((product) => ({
      product: { id: product.product.id },
      ...(product.productColorId && { productColorId: product.productColorId }),
      sellQty: product.sellQty,
      thumbnailImage: product.thumbnailImage,
    }));

    const cartData = {
      customer: {
        id: user_info?.id,
        email: user_info?.email,
      },
      cartDetailsList: [...productMap],
      ...(promoCode && { promo: { code: promoCode } }),
    };

    const response = await updateCart(cartData);

    transformCartResponse(response);

    setLoading(false);
  }, [updateCart, transformCartResponse]);

  const handleGetOrderCalculateData = useCallback(async (deliveryMethod, promoCode) => {
    // cart info
    let _cartInfo = null;
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem(CART_INFO);
      try {
        if (storedCart) {
          _cartInfo = JSON.parse(storedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart data from localStorage:", error);
      }
    }

    const productMap = _cartInfo?.map((product) => ({
      product: { id: product.product.id },
      ...(product.productColorId && {
        productColorId: Number(product.productColorId),
      }),
      productSize: product.productSize,
      sellQty: product.sellQty,
      thumbnailImage: product.thumbnailImage,
    }));

    const data = {
      cartDetailsList: [...productMap],
      ...(promoCode && { promo: { code: promoCode } }),
      deliveryMethod,
      ...(user
        ? { customer: { id: user.id, email: user.email } }
        : { customer: null }),
    };

    const res = await getCalculatedData(data);

    return res;
  }, [ user]);

  // Order for guest
  const handleMakeOrderForGuestUser = async (data) => {
    const response = await createGuestOrder(data);
    return response;
  };

  // Get Cart Item for auth user.
  const getCartListForAuthUser = useCallback(async () => {
    setLoading(true);
    // Retrieve user info from cookies
    const _user = getCookie(USER_INFO);

    let user_info = null;
    if (_user) {
      try {
        user_info = JSON.parse(_user);
      } catch (error) {
        console.error("Failed to parse user info from cookies:", error);
        user_info = null;
      }
    }

    try {
      const response = await axiosPrivate.get(
        `${GET_CART_ITEM_URL}/${user_info?.id}`
      );
      // console.log(response?.data);
      transformCartResponse(response?.data);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch cart items"
      );
    } finally {
      setLoading(false);
    }
  }, [transformCartResponse]);

  return (
    <CartContext.Provider
      value={{
        cart,
        calculatedData,
        getCalculationLoading,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        calculateTotalPrice,
        handleUpdateCartInBackend,
        handleGetOrderCalculateData,
        handleMakeOrderForGuestUser,
        getCartListForAuthUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use CartContext
export const useCart = () => useContext(CartContext);
