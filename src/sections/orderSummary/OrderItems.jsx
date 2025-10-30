"use client";

import Image from "next/image";
import { Star, Tag } from "lucide-react";
import Typography from "@/common/components/Typography";
import { Button } from "@/common/components/ui/button";
import { Badge } from "@/common/components/ui/badge";
import { cn } from "@/common/lib/utils";

const OrderItems = ({ orderItems, orderStatus }) => {
    return (
        <div>
            <Typography.Title3 className="font-semibold">
                Order Items
            </Typography.Title3>

            <div className="space-y-6">
                {orderItems?.map((item, index) => (
                    <div
                        key={item.id}
                        className={cn(
                            "border-b border-border py-3",
                        )}
                    >
                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="w-[100px] h-[110px] rounded-primary overflow-hidden bg-surface relative">
                                <Image
                                    src={item.product?.image || "/images/image_placeholder.png"}
                                    alt={item.product?.name || "Product"}
                                    width={100}
                                    height={110}
                                    className="object-cover w-full h-full"
                                />
                                {item.discount && (
                                    <Badge variant="warning" className="absolute top-2 left-2">
                                        {item.discount}% OFF
                                    </Badge>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="mb-1.5">
                                    <Typography.BodyText className="font-medium text-text-primary">
                                        {item.product?.name || "Handcrafted Item"}
                                    </Typography.BodyText>
                                    <div className="flex items-center mt-1.5">
                                        <Typography.SmallText className="text-text-primary font-medium">
                                            <Tag className="inline-block mr-1 h-3 w-3" />
                                            {item.quantity} x ${item.price.toFixed(2)}
                                        </Typography.SmallText>
                                    </div>
                                </div>

                                <div className="mt-2.5 flex flex-wrap gap-2">
                                    {item.color && (
                                        <Badge variant="secondary" size="lg">
                                            Color: {item.color}
                                        </Badge>
                                    )}
                                    {item.size && (
                                        <Badge variant="secondary" size="lg">
                                            Size: {item.size}
                                        </Badge>
                                    )}
                                </div>

                                <div className="flex items-center gap-3">
                                    {orderStatus === "DELIVERED" && (
                                        <>
                                            <div className="h-4 border-l border-border"></div>
                                            <Button
                                                variant="text"
                                                size="sm"
                                                icon={<Star className="size-4" />}
                                                className="text-warning font-medium"
                                            >
                                                Give Review
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderItems;
