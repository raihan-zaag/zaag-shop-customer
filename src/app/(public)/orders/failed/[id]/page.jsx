"use client";

import React from "react";
import { useUserContext } from "@/contextProviders/userContextProvider";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useOrderById from "@/common/hooks/order/useOrderById";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";
import { PATH_PROFILE_TRACK_ORDER_DYNAMIC, PATH_TRACK_ORDER } from "@/common/config/constants/routes";
import Container from "@/common/components/shared/Container";
import Typography from "@/common/components/Typography";
import { Button } from "@/common/components";

const OrderFailed = ({ params }) => {
    const router = useRouter();
    const { isAuthenticated } = useUserContext();

    const [orderDetails, setOrderDetails] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    const orderId = params.id;

    const { getOrderById } = useOrderById();

    React.useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            try {
                const response = await getOrderById(orderId);
                setOrderDetails(response);
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId]); // Only depend on orderId to prevent continuous API calls

    const handleGoToHomePage = () => {
        if (isAuthenticated) {
            router.push(PATH_PROFILE_TRACK_ORDER_DYNAMIC(orderId));
        } else {
            router.push(PATH_TRACK_ORDER);
        }
    };

    const handleReOpenPaymentLink = () => {
        // const paymentLink = orderDetails?.stripePaymentLink;
        // window.location.href = paymentLink;
        const paymentLink = orderDetails?.stripePaymentLink;
        if (paymentLink) {
            window.open(paymentLink, "_blank");
        }
    };

    return (
        <LoadingOverlay isLoading={loading}>
            <Container className="flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
                <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 max-w-2xl mx-auto px-4">
                    {/* Image Section */}
                    <div className="w-48 h-36 sm:w-56 sm:h-42 md:w-75 md:h-75">
                        <Image
                            src="/images/order_failed.png"
                            alt="Order failed illustration"
                            width={256}
                            height={192}
                            className="w-full h-full object-contain"
                            priority
                        />
                    </div>

                    {/* Content Section */}
                    <div className="space-y-4 sm:space-y-6">
                        <Typography.Title1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-red-500">
                            Oops! Payment Failed
                        </Typography.Title1>

                        <div className="space-y-2 sm:space-y-3">
                            <Typography.Paragraph className="text-sm sm:text-base md:text-lg">
                                Payment for Order ID <span className="font-semibold text-primary">#{orderId}</span> could not be processed.
                            </Typography.Paragraph>
                            <Typography.Paragraph className="text-sm sm:text-base md:text-lg">
                                Please try again to complete the payment.
                            </Typography.Paragraph>
                            <Typography.Description className="text-sm sm:text-base">
                                If you want to pay later, please visit the{" "}
                                <span
                                    className="text-primary hover:underline cursor-pointer font-medium"
                                    onClick={() =>
                                        router.push(
                                            "/profile/my-orders/track-order/" + orderId
                                        )
                                    }
                                >
                                    Order History page
                                </span>{" "}
                                and go to the{" "}
                                <span className="text-primary font-medium">#{orderId}</span> order
                                details page to complete payment.
                            </Typography.Description>
                        </div>
                    </div>

                    {/* Button Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md pt-4 sm:pt-6">
                        {isAuthenticated ? (
                            <Button
                                variant="outline"
                                className="w-full sm:w-auto px-14"
                                onClick={handleGoToHomePage}
                            >
                                Go To Order Details
                            </Button>
                        ) : null}

                        <Button
                            className="w-full sm:w-auto px-14"
                            onClick={handleReOpenPaymentLink}
                        >
                            Try Payment Again
                        </Button>
                    </div>
                </div>
            </Container>
        </LoadingOverlay>
    );
};

export default OrderFailed;
