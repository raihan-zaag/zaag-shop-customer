"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/common/components/ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/common/components/ui/form";
import SectionHeader from "./SectionHeader";
import SectionContainer from "./SectionContainer";
import AuthUserAddress from "../../sections/AuthUserAddress";

const DeliveryInformationForm = ({ setDeliveryAddress, deliveryAddress }) => {
    const form = useFormContext();

    return (
        <div className="space-y-2">
            <SectionHeader title="Delivery Information" />
            <SectionContainer >
                <div className="space-y-5">
                    {/* Full Name field */}
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Full Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Mr Smith"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email Address field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="mrsmith@mail.com"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Phone Number field */}
                    <FormField
                        control={form.control}
                        name="mobileNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel >
                                    Phone Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="+116556156"
                                        maxLength={20}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Delivery Address */}
                    <div className="space-y-4">
                        <FormLabel>
                            Delivery Address
                        </FormLabel>
                        <AuthUserAddress
                            setDeliveryAddress={setDeliveryAddress}
                            deliveryAddress={deliveryAddress}
                        />
                    </div>
                </div>
            </SectionContainer>
        </div>
    );
};

export default DeliveryInformationForm;
