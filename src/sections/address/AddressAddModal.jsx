"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/common/components/ui/dialog";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/common/components/ui/select";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/common/components/ui/form";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import statesData from "../../../libs/sweden-locations.json";
import { Button } from "@/common/components";

// Address form schema for Swedish addresses
const addressSchema = z.object({
    title: z.string().min(1, "Please enter your address title"),
    street: z.string().min(1, "Please enter your street address"),
    apartment: z.string().optional(),
    zipCode: z
        .string()
        .min(1, "Please enter a valid postal code")
        .regex(/^[0-9]{3}\s?[0-9]{2}$/, "Please enter a valid Swedish postal code (e.g., 123 45)"),
    city: z.string().min(1, "Please select your city"),
    county: z.string().min(1, "Please select your state"),
    country: z.literal("Sweden"),
});

const AddressModal = ({
    open,
    onClose,
    isCreate,
    selectedAddress,
    setSelectedAddress,
    onSubmit,
    totalAddressCount,
}) => {
    const router = useRouter();

    // Local state for city dropdown options
    const [availableCities, setAvailableCities] = useState([]);

    const form = useForm({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            title: "",
            street: "",
            apartment: "",
            zipCode: "",
            city: "",
            county: "",
            country: "Sweden",
        },
    });

    useEffect(() => {
        if (isCreate) {
            // When creating a new address, default title to "Address X"
            form.reset({
                title: `Address ${totalAddressCount + 1}`,
                street: "",
                apartment: "",
                zipCode: "",
                city: "",
                county: "",
                country: "Sweden",
            });
            setAvailableCities([]);
        } else if (selectedAddress) {
            // If editing an existing address, fill the fields
            form.reset({
                title: selectedAddress?.title || "",
                street: selectedAddress?.street || "",
                apartment: selectedAddress?.apartment || "",
                zipCode: selectedAddress?.zipCode || "",
                city: selectedAddress?.city || "",
                county: selectedAddress?.state || selectedAddress?.county || "",
                country: "Sweden",
            });

            // Also set the available cities if a state was provided
            if (selectedAddress?.state || selectedAddress?.county) {
                const matchedState = statesData.states.find(
                    (st) => st.name === (selectedAddress.state || selectedAddress.county)
                );
                setAvailableCities(matchedState ? matchedState.cities : []);
            }
        }
    }, [isCreate, selectedAddress, totalAddressCount, form, open]);

    /**
     * If user picks a state manually, set the cities and clear city selection
     */
    const handleCountyChange = (countyName) => {
        const matchedState = statesData.states.find(
            (st) => st.name === countyName
        );
        if (matchedState) {
            setAvailableCities(matchedState.cities);
        } else {
            setAvailableCities([]);
        }
        // Reset city field
        form.setValue("city", "");
    };

    /**
     * Handle postal code formatting for Swedish format
     */
    const handleZipChange = (value) => {
        // Remove any existing spaces and non-digits
        const cleaned = value.replace(/\D/g, '');

        // Format as "### ##" if 5 digits
        if (cleaned.length <= 5) {
            const formatted = cleaned.length > 3
                ? `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`
                : cleaned;
            form.setValue("zipCode", formatted);
        }

        // Note: Swedish postal codes don't have direct city mapping like US ZIP codes
        // So we don't auto-populate city/county based on postal code
    };

    /**
     * Submit form
     */
    const handleSubmit = async (values) => {
        onSubmit(values, isCreate, form);
        onClose();
        form.reset();
        router.refresh(); // if needed
    };

    /**
     * Close modal
     */
    const handleCloseModal = () => {
        form.reset();
        onClose();
        setSelectedAddress(null);
        setAvailableCities([]);
    };

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent className="sm:max-w-600px max-h-90vh overflow-y-auto"
                showCloseButton={false}
            >
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <span>Enter Address Details</span>
                        <IoClose
                            className="h-7 w-7 cursor-pointer"
                            onClick={handleCloseModal}
                        />
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        {/* Address Name */}
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g., Home, Work"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        {/* Country - Fixed to Sweden */}
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Sweden"
                                            className="h-12"
                                            disabled
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* State */}
                        <FormField
                            control={form.control}
                            name="county"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <Select onValueChange={(value) => {
                                        field.onChange(value);
                                        handleCountyChange(value);
                                    }} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a state" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {statesData.states.map((state) => (
                                                <SelectItem key={state.name} value={state.name}>
                                                    {state.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* City */}
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value} disabled={!availableCities.length}>
                                        <FormControl>
                                            <SelectTrigger className="h-12">
                                                <SelectValue placeholder={availableCities.length ? "Select a city" : "Select state first"} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {availableCities.map((city) => (
                                                <SelectItem key={city} value={city}>
                                                    {city}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Postal Code */}
                        <FormField
                            control={form.control}
                            name="zipCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="123 45"
                                            className="h-12"
                                            maxLength={6}
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                handleZipChange(e.target.value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Street Address */}
                        <FormField
                            control={form.control}
                            name="street"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="e.g. Kungsgatan 12A"
                                            className="min-h-80px"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Apartment/Suite Info (optional) */}
                        <FormField
                            control={form.control}
                            name="apartment"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apartment/Suite/Unit Info (Optional)</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="2tr, Apt 12A, etc."
                                            className="h-12"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Buttons */}
                        <div className="flex items-center gap-3 pt-6">
                            <Button
                                variant="outline"
                                className="flex-1 border-primary"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </Button>
                            <Button
                                htmlType="submit"
                                className="flex-1"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default AddressModal;
