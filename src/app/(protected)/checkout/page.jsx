"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";
import { Form } from "@/common/components/ui/form";
import { useCart } from "@/contextProviders/useCartContext";
import { useUserContext } from "@/contextProviders/userContextProvider";
import useCreateOrder from "@/common/hooks/order/useMakeOrder";
import useNotification from "@/common/hooks/useNotification";
import useUpdateCart from "@/app/(protected)/cart/hooks/useCartUpdate";
import useGetUserProfile from "@/app/(auth)/hooks/useGetUserInfo";
import Container from "@/common/components/shared/Container";
import DeliveryInformationForm from "./components/forms/DeliveryInformationForm";
import DeliveryMethodForm from "./components/forms/DeliveryMethodForm";
import PaymentMethodForm from "./components/forms/PaymentMethodForm";
import CheckoutOrderSummary from "./components/CheckoutOrderSummary";
import useGetDefaultSettings from "./hooks/useGetSettingsInfo";


// Checkout form schema for authenticated users only
const checkoutSchema = z.object({
    fullName: z
        .string()
        .min(1, "Full name is required")
        .min(2, "Please enter your full name")
        .max(100, "Name is too long"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    mobileNumber: z
        .string()
        .min(1, "Mobile number is required")
        .regex(/^(\+46|0)[0-9\s-]{8,15}$/, "Please enter a valid Swedish mobile number (e.g., +46 70 123 45 67)"),
    deliveryMethod: z.enum(["STANDARD", "EXPRESS"], {
        required_error: "Please select a delivery method",
    }),
    paymentMethod: z.literal("stripe"),
    promoCode: z.string().optional(),
    orderNote: z.string().optional(),
});

const CheckoutPage = () => {
    const [deliveryAddress, setDeliveryAddress] = useState();
    const [isInitialFetchDone, setIsInitialFetchDone] = useState(false);
    const { user } = useUserContext();

    const form = useForm({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: "",
            email: "",
            mobileNumber: "",
            deliveryMethod: "STANDARD",
            paymentMethod: "stripe",
            promoCode: "",
            orderNote: "",
        },
    });

    const {
        cart,
        handleGetOrderCalculateData,
        calculatedData,
        getCartListForAuthUser,
        loading: getCartLoading,
        getCalculationLoading,
        clearCart,
        handleUpdateCartInBackend,
    } = useCart();
    const { profile } = useGetUserProfile();
    const { createOrder, loading: orderLoading } = useCreateOrder();
    const { updateCart, loading: cartUpdateLoading } = useUpdateCart();
    const { configData, loading: settingLoading } = useGetDefaultSettings();
    const { openInfoNotification } = useNotification();

    // Get current delivery method value from form
    const deliveryMethod = form.watch("deliveryMethod");

    const handledeliveryMethodChange = (value) => {
        form.setValue("deliveryMethod", value);
    };

    // Initial cart fetch when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCartListForAuthUser();

                // Conditionally set promo code if it exists
                if (res?.promo?.code) {
                    form.setValue("promoCode", res.promo.code);
                } else {
                    form.setValue("promoCode", "");
                }
                setIsInitialFetchDone(true);
            } catch (error) {
                console.error("Failed to fetch cart list:", error);
            }
        };

        fetchData();
    }, [getCartListForAuthUser, form]);

    // Update calculations when delivery method changes or after initial fetch
    useEffect(() => {
        if (isInitialFetchDone && cart?.length > 0) {
            const promoCode = form.getValues("promoCode");
            handleGetOrderCalculateData(deliveryMethod, promoCode);
        }
    }, [deliveryMethod, isInitialFetchDone, cart?.length, handleGetOrderCalculateData, form]);

    const deliveryMethods = [
        {
            status: "Standard delivery",
            info: configData?.standardDeliveryTime
                ? `(${configData.standardDeliveryTime})`
                : "(3-5 business days)",
            value: "STANDARD",
            price: configData?.standardDeliveryPrice ?? 0,
        },
        {
            status: "Express delivery",
            info: configData?.expressDeliveryTime
                ? `(${configData.expressDeliveryTime})`
                : "(Within 24 hours)",
            value: "EXPRESS",
            price: configData?.expressDeliveryPrice ?? 0,
        },
    ];


    useEffect(() => {
        if (cart?.length > 0) {
            handleGetOrderCalculateData(deliveryMethod);
        }
    }, [deliveryMethod, cart?.length, handleGetOrderCalculateData]);

    // Order creation for authenticated users
    const handleMakeOrder = async () => {
        if (cart?.length === 0) {
            openInfoNotification(
                "info",
                "Please select some product for order."
            );
            return;
        }

        if (!deliveryAddress) {
            openInfoNotification("info", "Please select a delivery address.");
            return;
        }

        const formData = form.getValues();
        const isValid = await form.trigger(["fullName", "email", "mobileNumber"]);

        if (!isValid) {
            return;
        }

        const data = {
            customer: {
                id: Number(user?.id),
                fullName: formData.fullName,
                email: formData.email,
                mobileNumber: formData.mobileNumber,
            },
            savedAddress: {
                id: Number(deliveryAddress?.id),
            },
            orderNote: formData.orderNote,
            deliveryMethod: formData.deliveryMethod,
        };

        const res = await createOrder(data);

        if (res?.paymentLink) {
            clearCart();
            const paymentLink = res?.paymentLink;
            window.location.href = paymentLink;
        }
    };

    const handleGetPromoCode = async () => {
        const currentPromoCode = form.getValues("promoCode");
        if (currentPromoCode) {
            const res = await handleGetOrderCalculateData(
                deliveryMethod,
                currentPromoCode
            );

            if (res?.status === 201) {
                const productMap = cart?.map((product) => ({
                    product: { id: product.product.id },
                    ...(product.productColorId && {
                        productColorId: product.productColorId,
                    }),
                    sellQty: product.sellQty,
                    thumbnailImage: product.thumbnailImage,
                }));

                const cartData = {
                    customer: {
                        id: user?.id,
                        email: user?.email,
                    },
                    cartDetailsList: [...productMap],
                    promo: {
                        code: currentPromoCode,
                    },
                };

                await updateCart(cartData);
            } else {
                form.setValue("promoCode", "");
            }
        }
    };

    const handlePromoCodeChange = async (value) => {
        form.setValue("promoCode", value);

        if (!value) {
            const res = await handleGetOrderCalculateData(deliveryMethod);

            if (res?.status === 201) {
                handleUpdateCartInBackend();
            }
        }
    };

    const handleRemovePromoCode = async () => {
        form.setValue("promoCode", "");

        // Recalculate order without promo code
        const res = await handleGetOrderCalculateData(deliveryMethod);

        if (res?.status === 201) {
            // Update cart in backend without promo code
            const productMap = cart?.map((product) => ({
                product: { id: product.product.id },
                ...(product.productColorId && {
                    productColorId: product.productColorId,
                }),
                sellQty: product.sellQty,
                thumbnailImage: product.thumbnailImage,
            }));

            const cartData = {
                customer: {
                    id: user?.id,
                    email: user?.email,
                },
                cartDetailsList: [...productMap],
                // No promo code included
            };

            await updateCart(cartData);
        }
    };

    useEffect(() => {
        if (profile) {
            form.setValue("fullName", profile.fullName || profile.name || "");
            form.setValue("email", profile.email);
            form.setValue("mobileNumber", profile.mobileNumber);
        }
    }, [profile, form]);

    return (
        <LoadingOverlay
            isLoading={
                getCartLoading ||
                orderLoading ||
                cartUpdateLoading ||
                settingLoading ||
                getCalculationLoading
            }
        >
            <Container>
                <Form {...form}>
                    <div className="my-4 lg:my-16 flex flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-24">
                        {/* Left Column - Forms */}
                        <div className="flex-1 lg:max-w-[636px] space-y-6">
                            {/* Delivery Information Section */}
                            <DeliveryInformationForm
                                setDeliveryAddress={setDeliveryAddress}
                                deliveryAddress={deliveryAddress}
                            />

                            {/* Delivery Method Section */}
                            <DeliveryMethodForm
                                deliveryMethods={deliveryMethods}
                                onDeliveryMethodChange={handledeliveryMethodChange}
                            />

                            {/* Payment Method Section */}
                            <PaymentMethodForm />
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="w-full lg:w-[400px] lg:flex-shrink-0">
                            <CheckoutOrderSummary
                                cart={cart}
                                calculatedData={calculatedData}
                                onPromoCodeChange={handlePromoCodeChange}
                                onGetPromoCode={handleGetPromoCode}
                                onRemovePromoCode={handleRemovePromoCode}
                                onConfirmOrder={handleMakeOrder}
                                isLoading={orderLoading || cartUpdateLoading}
                            />
                        </div>
                    </div>
                </Form>
            </Container>
        </LoadingOverlay>
    );
};

export default CheckoutPage;
