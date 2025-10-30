"use client";

import { useFormContext } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/common/components/ui/radio-group";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/common/components/ui/form";
import SectionHeader from "./SectionHeader";
import SectionContainer from "./SectionContainer";
import { cn } from "@/common/lib/utils";
import Typography from "@/common/components/Typography";

const DeliveryMethodForm = ({ deliveryMethods, onDeliveryMethodChange }) => {
    const form = useFormContext();

    return (
        <div className="space-y-2">
            <SectionHeader title="Delivery Method" />
            <SectionContainer>
                <FormField
                    control={form.control}
                    name="deliveryMethod"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormControl>
                                <RadioGroup
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        onDeliveryMethodChange({ target: { value } });
                                    }}
                                    value={field.value}
                                    className="flex flex-col w-full"
                                >
                                    {deliveryMethods?.map((delivery, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "flex items-center justify-between py-2"
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem
                                                    value={delivery.value}
                                                    id={`delivery-${index}`}
                                                />
                                                <Typography.Paragraph>{delivery.status}</Typography.Paragraph>
                                                <Typography.BodyText className="text-text-subtle">{delivery.info}</Typography.BodyText>
                                            </div>
                                            <Typography.BodyText>
                                                $ {delivery.price}
                                            </Typography.BodyText>
                                        </div>
                                    ))}
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

export default DeliveryMethodForm;
