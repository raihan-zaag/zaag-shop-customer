"use client";

import React from "react";
import { UserProvider } from "./userContextProvider";
import { CartProvider } from "./useCartContext";
import { WishlistProvider } from "./useWishListProvider";
import { SingleCartProductProvider } from "./useSingleCartProductProvider";
import { ConfirmationProvider } from "./confirmationProvider";

const ContextWrapper = ({ children }) => {
  return (
    <React.Suspense fallback={<h1>Loading....</h1>}>
      <UserProvider>
        <WishlistProvider>
          <CartProvider>
            <SingleCartProductProvider>
              <ConfirmationProvider>
                {children}
              </ConfirmationProvider>
            </SingleCartProductProvider>
          </CartProvider>
        </WishlistProvider>
      </UserProvider>
    </React.Suspense>
  );
};

export default ContextWrapper;
