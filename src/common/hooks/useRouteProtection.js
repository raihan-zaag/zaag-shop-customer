'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/contextProviders/userContextProvider';
import { PATH_LOGIN } from '@/common/config/constants/routes';

/**
 * Custom hook for protecting routes
 * @param {Object} options - Configuration options
 * @param {boolean} options.redirectToLogin - Whether to redirect to login page
 * @param {string} options.fallbackUrl - Custom fallback URL if not redirecting to login
 * @returns {Object} - Object containing loading state and authentication status
 */
export const useRouteProtection = (options = {}) => {
  const { redirectToLogin = true, fallbackUrl = PATH_LOGIN } = options;
  const { isAuthenticated, user, token, isInitializing } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    // Don't do anything while still initializing
    if (isInitializing) {
      return;
    }

    // If user is not authenticated after initialization, redirect
    if (!isAuthenticated || !token) {
      if (redirectToLogin) {
        const currentPath = window.location.pathname;
        const loginUrl = `${PATH_LOGIN}?redirect=${encodeURIComponent(currentPath)}`;
        router.replace(loginUrl);
      } else {
        router.replace(fallbackUrl);
      }
    }
  }, [isAuthenticated, token, isInitializing, router, redirectToLogin, fallbackUrl]);

  return {
    isAuthenticated,
    isLoading: isInitializing,
    user,
  };
};

export default useRouteProtection;
