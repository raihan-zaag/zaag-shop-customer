// =============================================================================
// CENTRALIZED ROUTE CONSTANTS
// =============================================================================
// This file contains all route constants used throughout the application.
// Use these constants instead of hardcoding paths in your components.

// =============================================================================
// STATIC ROUTES
// =============================================================================

// Auth Routes
export const PATH_LOGIN = "/login";
export const PATH_SIGN_UP = "/sign-up";
export const PATH_EMAIL_VERIFICATION = "/email-verification";
export const PATH_FORGOT_PASSWORD = "/forgot-password";
export const PATH_RESET_PASSWORD = "/reset-password";
export const PATH_RESET_PASSWORD_SUCCESS = "/reset-successfully";

// Public Routes
export const PATH_HOME = "/";
export const PATH_LANDING = "/landing";
export const PATH_PRODUCTS = "/products";
export const PATH_PRODUCT_DETAILS = "/products";
export const PATH_CART = "/cart";
export const PATH_CHECKOUT = "/checkout";
export const PATH_TRACK_ORDER = "/track-order";

// Order Routes
export const PATH_ORDER_SUCCESS = "/orders/success";
export const PATH_ORDER_FAILED = "/orders/failed";


// Profile Routes
export const PATH_PROFILE_BASE = "/profile";
export const PATH_PROFILE_MY_ACCOUNT = "/profile/my-account";
export const PATH_PROFILE_ADDRESS = "/profile/address";
export const PATH_PROFILE_WISHLIST = "/profile/wishlist";
export const PATH_PROFILE_MY_ORDERS = "/profile/my-orders";
export const PATH_PROFILE_ORDER_HISTORY = "/profile/order-history";
export const PATH_PROFILE_TRACK_ORDER = "/profile/track-order";
export const PATH_PROFILE_MY_ORDERS_TRACK_ORDER = "/profile/my-orders/track-order";
export const PATH_PROFILE_ORDER_DETAILS = "/profile/my-orders/order-details";

// Legal Routes
export const PATH_TERMS_AND_CONDITION = "/terms-and-condition";
export const PATH_ABOUT_US = "/about-us";
export const PATH_CONTACT_US = "/contact-us";
export const PATH_PRIVACY_POLICY = "/privacy-policy";
export const PATH_SHIPPING_POLICY = "/shipping-policy";
export const PATH_REFUND_POLICY = "/refund-policy";
export const PATH_COOKIE_POLICY = "/cookie-policy";
export const PATH_ACCESSIBILITY_STATEMENT = "/accessibility-statement";

// Support Routes
export const PATH_CUSTOMER_SUPPORT = "/customer-support";

// =============================================================================
// DYNAMIC ROUTES (Functions)
// =============================================================================

// Product Routes
export const PATH_PRODUCT_DETAILS_DYNAMIC = (id) => `${PATH_PRODUCTS}/${id}`;
export const PATH_ORDER_DETAILS_DYNAMIC = (id) => `${PATH_PROFILE_ORDER_DETAILS}/${id}`;

// Category Routes
export const PATH_PRODUCTS_SORT_BY = (sortBy) => `${PATH_PRODUCTS}?sortBy=${sortBy}`;
export const PATH_SEARCH = (searchQuery) => `/?name=${searchQuery}`;

// Order Routes
export const PATH_ORDER_FAILED_DYNAMIC = (orderId) => `/orders/failed/${orderId}`;
export const PATH_PROFILE_TRACK_ORDER_DYNAMIC = (orderId) => `/profile/my-orders/track-order/${orderId}`;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================


/**
 * Get profile URL based on user authentication status
 * @param {boolean} isAuthenticated - Whether user is authenticated
 * @returns {string} - Profile URL or login URL
 */
export const getProfileUrl = (isAuthenticated) => {
  return isAuthenticated ? PATH_PROFILE_MY_ACCOUNT : PATH_LOGIN;
};

/**
 * Get checkout URL with optional redirect parameter
 * @param {string} redirectUrl - Optional redirect URL after login
 * @returns {string} - Checkout URL with or without redirect
 */
export const getCheckoutUrl = (redirectUrl) => {
  return redirectUrl ? `${PATH_CHECKOUT}?redirect=${encodeURIComponent(redirectUrl)}` : PATH_CHECKOUT;
};
