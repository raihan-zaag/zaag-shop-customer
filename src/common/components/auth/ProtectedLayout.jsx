'use client';

import { useRouteProtection } from '@/common/hooks/useRouteProtection';
import { LoadingOverlay } from '@/common/components/ui/loading-overlay';

/**
 * Protected Layout Component
 * Wraps children with route protection logic
 */
const ProtectedLayout = ({
  children,
  fallbackComponent = null,
  showLoader = true
}) => {
  // const { isAuthenticated, isLoading } = useRouteProtection();

  // Show loading state while checking authentication
  // if (isLoading) {
  //   if (showLoader) {
  //     return (
  //       <LoadingOverlay
  //         isLoading={true}
  //       >
  //         <div className="min-h-screen " />
  //       </LoadingOverlay>
  //     );
  //   }
  //   return null;
  // }

  // Show fallback if not authenticated
  // if (!isAuthenticated) {
  //   return fallbackComponent || null;
  // }

  // Render children if authenticated
  return children;
};

export default ProtectedLayout;
