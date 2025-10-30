"use client";

import OrderCard from "@/common/components/cards/OrderCard";
import PaginationWrapper from "@/common/components/pagination";
// Uncomment when using actual API
// import useGetOnGoingOrder from "@/app/(public)/orders/hooks/useGetOnGoingOrder";
// import useGetOrderHistory from "@/common/hooks/order/useGetOrderHistory ";
import { Input } from "@/common/components/ui/input";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { IoIosSearch } from "react-icons/io";
import { debounce } from "@/common/lib/utils";
import TabButton from "@/common/components/shared/TabButton";
import RowSkeleton from "@/common/components/shared/RowSkeleton";
import EmptyDataSkeleton from "@/common/components/shared/EmptyDataSkeleton";
import Typography from "@/common/components/Typography";
// Import sample data for development/testing
import { sampleActiveOrders, sampleOrderHistory, getPagedOrders } from "@/data/sampleOrdersData";

const MyOrders = () => {
  const [activeTab, setActiveTab] = React.useState(profileOrderTabList[0]);
  const [ongoingOrders, setOngoingOrders] = React.useState([]);
  const [orderHistory, setOrderHistory] = React.useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const [onGoingOrderLoading, setOnGoingOrderLoading] = React.useState(true);
  const [orderHistoryLoading, setOrderHistoryLoading] = React.useState(false);

  // For development/testing, set fixed page sizes
  const onGoingPageSize = sampleActiveOrders.length;
  const orderHistoryPageSize = sampleOrderHistory.length;

  // When using actual API, uncomment these:
  // const { getOnGoingOrder, onGoingPageSize } = useGetOnGoingOrder();
  // const { getOrderHistory, orderHistoryPageSize } = useGetOrderHistory();

  const fetchOngoingOrders = useCallback(async (page = 0, size = 10) => {
    // For development, using sample data instead of API call
    setOnGoingOrderLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Use sample data with the helper function for pagination
      const response = getPagedOrders(sampleActiveOrders, page, size);
      setOngoingOrders(response);
    } catch (error) {
      console.error("Error fetching ongoing orders:", error);
    } finally {
      setOnGoingOrderLoading(false);
    }

    // When ready to use real API:
    // const response = await getOnGoingOrder(page, size);
    // setOngoingOrders(response);
    // setOnGoingOrderLoading(false);
  }, [/* getOnGoingOrder */]);

  const fetchOrderHistory = useCallback(async (page = 0, size = 10) => {
    // For development, using sample data instead of API call
    setOrderHistoryLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Use sample data with the helper function for pagination
      const response = getPagedOrders(sampleOrderHistory, page, size);
      setOrderHistory(response);
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setOrderHistoryLoading(false);
    }

    // When ready to use real API:
    // const response = await getOrderHistory(page, size);
    // setOrderHistory(response);
    // setOrderHistoryLoading(false);
  }, [/* getOrderHistory */]);

  useEffect(() => {
    if (activeTab?.id === 1) {
      fetchOngoingOrders(0, 10);
    } else {
      fetchOrderHistory(0, 10);
    }

    setCurrentPage(1);
  }, [activeTab, fetchOngoingOrders, fetchOrderHistory]);

  const fetchFilteredOrders = useCallback(async (query) => {
    // For development, using sample data instead of API call
    if (activeTab.title === "Active Orders") {
      setOnGoingOrderLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Use sample data with search filtering
        const response = getPagedOrders(sampleActiveOrders, 0, 10, query);
        setOngoingOrders(response);
      } catch (error) {
        console.error("Error searching ongoing orders:", error);
      } finally {
        setOnGoingOrderLoading(false);
      }
    } else {
      setOrderHistoryLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Use sample data with search filtering
        const response = getPagedOrders(sampleOrderHistory, 0, 10, query);
        setOrderHistory(response);
      } catch (error) {
        console.error("Error searching order history:", error);
      } finally {
        setOrderHistoryLoading(false);
      }
    }

    // When ready to use real API:
    // if (activeTab.title === "Active Orders") {
    //   setOnGoingOrderLoading(true);
    //   const response = await getOnGoingOrder(0, 10, query);
    //   setOngoingOrders(response);
    //   setOnGoingOrderLoading(false);
    // } else {
    //   setOrderHistoryLoading(true);
    //   const response = await getOrderHistory(0, 10, query);
    //   setOrderHistory(response);
    //   setOrderHistoryLoading(false);
    // }
  }, [activeTab]);

  // Custom debounce search handler
  const debouncedSearch = useMemo(() =>
    debounce((query) => {
      fetchFilteredOrders(query);
    }, 1000),
    [fetchFilteredOrders]
  );

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handlePagination = (page, size) => {
    if (activeTab?.id === 1) {
      fetchOngoingOrders(page - 1, size);
      setCurrentPage(page);
    } else {
      fetchOrderHistory(page - 1, size);
      setCurrentPage(page);
    }
  };

  return (
    <div >
      <div className="space-y-1">
        <Typography.Title1>
          Order History
        </Typography.Title1>
        <Typography.Description>
          Stay updated with your latest orders
        </Typography.Description>
      </div>

      <div className="md:container mx-auto md:px-6">
        <div className="bg-background rounded-md md:p-6">
          <div className="mb-6">
            <TabButton
              tabs={profileOrderTabList}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Search */}
          <div className="flex justify-end mb-6">
            <div className="relative">
              <Input
                placeholder="Search by Ticket Number"
                className="w-[300px] h-[45px] border border-[var(--color-border)] rounded-[8px] pl-4 pr-10 text-[14px] focus:ring-[var(--color-primary)]"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <IoIosSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-[var(--color-text-subtle)] opacity-50" />
            </div>
          </div>

          <div className="space-y-5">
            {activeTab.title === "Active Orders" ? (
              <div>
                {onGoingOrderLoading ? (
                  <RowSkeleton count={3} />
                ) : (
                  <>
                    {ongoingOrders?.length > 0 ? (
                      ongoingOrders.map((order) => (
                        <OrderCard
                          key={order.id}
                          order={order}
                          ongoingOrders={ongoingOrders}
                          setOngoingOrders={setOngoingOrders}
                        />
                      ))
                    ) : (
                      <EmptyDataSkeleton title="No active orders" />
                    )}
                  </>
                )}
              </div>
            ) : (
              <div>
                {orderHistoryLoading ? (
                  <RowSkeleton count={3} />
                ) : (
                  <>
                    {orderHistory?.length > 0 ? (
                      orderHistory.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))
                    ) : (
                      <EmptyDataSkeleton title="No previous orders" />
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="mt-8">
            <PaginationWrapper
              pageSize={
                activeTab?.id === 1 ? onGoingPageSize : orderHistoryPageSize
              }
              handlePagination={handlePagination}
              current={currentPage}
              className="flex justify-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

const profileOrderTabList = [
  {
    id: 1,
    title: "Active Orders",
    path: "/profile/ongoing-orders",
  },
  {
    id: 2,
    title: "Previous Orders",
    path: "/profile/order-history",
  },
];
