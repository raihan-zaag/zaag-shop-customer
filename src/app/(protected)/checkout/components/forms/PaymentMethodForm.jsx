"use client";

import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/common/components/ui/radio-group";
import { Label } from "@/common/components/ui/label";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/common/components/ui/form";
import SectionHeader from "./SectionHeader";
import SectionContainer from "./SectionContainer";

const PaymentMethodForm = () => {
    const form = useFormContext();

    return (
        <div className="space-y-2">
            <SectionHeader title="Payment Method" />
            <SectionContainer>
                <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex flex-col w-full"
                                >
                                    <div className="flex items-center gap-2 py-2">
                                        <RadioGroupItem
                                            value="stripe"
                                            id="stripe"
                                        />
                                        <Label htmlFor="stripe">
                                            Stripe
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </SectionContainer>
        </div>
    );
};

export default PaymentMethodForm;
