"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import Typography from "@/common/components/Typography";
import OrderItems from "@/sections/orderSummary/OrderItems";
import PriceBreakdown from "@/sections/orderSummary/PriceBreakdown";
import OrderInformation from "@/sections/orderSummary/OrderInformation";
import OrderNotFound from "@/sections/orderSummary/OrderNotFound";
import TrackOrderTimeline from "@/sections/orderSummary/TrackOrderTimeline";
import { sampleOrderHistory, sampleActiveOrders } from "@/data/sampleOrdersData";

const OrderDetailsPage = () => {
    const router = useRouter();
    const { orderid } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would be an API call
        const fetchOrderDetails = async () => {
            setLoading(true);
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 800));

                // Find the order from sample data (combining active and history orders)
                const foundOrder = [...sampleActiveOrders, ...sampleOrderHistory].find(
                    (order) => order.invoiceNumber === orderid
                );

                // Set the order if found, otherwise it remains null
                setOrder(foundOrder || null);
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (orderid) {
            fetchOrderDetails();
        }
    }, [orderid]);

    // Get status text to display
    const getStatusText = (status) => {
        switch (status) {
            case "ORDER_PLACED":
                return "Order Placed";
            case "DELIVERED":
                return "Delivered";
            case "ORDER_CANCELED":
                return "Canceled";
            case "PAYMENT_PENDING":
                return "Payment Pending";
            case "PAYMENT_FAILED":
                return "Payment Failed";
            case "SHIPPED":
                return "Order Shipped";
            default:
                return status?.replace(/_/g, " ") || "Processing";
        }
    };



    // Handler for retrying payment
    const handleRetryPayment = () => {
        // In a real app, this would redirect to payment gateway or retry payment process

        // For now, we'll simulate redirecting to checkout/payment page
        // You can replace this with actual payment retry logic
        alert("Redirecting to payment gateway...");

        // Example: redirect to checkout with order ID
        // router.push(`/checkout?retry=true&orderId=${orderid}`);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-surface rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-surface rounded w-1/2 mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="h-64 bg-surface rounded"></div>
                        <div className="h-64 bg-surface rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="container mx-auto px-4 py-8">
                <Button
                    variant="ghost"
                    onClick={() => router.push("/profile/my-orders")}
                    className="mb-4 flex items-center gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Orders
                </Button>

                <OrderNotFound
                    orderid={orderid}
                    onBack={() => router.push("/profile/my-orders")}
                />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-4">
                <Typography.Title2>Order Details</Typography.Title2>
                <Typography.Description>
                    Stay updated with your latest order information
                </Typography.Description>
            </div>

            {/* Track Order Component */}
            <TrackOrderTimeline order={order} onRetryPayment={handleRetryPayment} />

            {/* Main content grid */}
            <div className="flex flex-col md:flex-row gap-6">
                <OrderInformation
                    order={order}
                    getStatusText={getStatusText}
                />
                <div className="flex-1 flex flex-col gap-6 bg-secondary p-4 md:p-8">
                    <OrderItems
                        orderItems={order.orderItems}
                        orderStatus={order.orderStatus}
                    />
                    <PriceBreakdown
                        invoice={order.invoice}
                        orderItems={order.orderItems}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderDetailsPage;
