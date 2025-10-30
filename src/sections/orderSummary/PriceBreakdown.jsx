"use client";

import Typography from "@/common/components/Typography";

const PriceBreakdown = ({ invoice, orderItems }) => {
    return (
        <div className="h-full">
            <div className="space-y-3">
                <div className="flex justify-between">
                    <Typography.BodyText>
                        Sub total ({orderItems?.length || 0} items)
                    </Typography.BodyText>
                    <Typography.BodyText>
                        ${invoice?.subtotal || invoice?.totalFinalPrice || "0.00"}
                    </Typography.BodyText>
                </div>

                {invoice?.discount > 0 && (
                    <div className="flex justify-between">
                        <Typography.BodyText className="text-text-primary">
                            Discount
                        </Typography.BodyText>
                        <Typography.BodyText className="text-destructive">
                            - ${invoice?.discount || "0.00"}
                        </Typography.BodyText>
                    </div>
                )}

                <div className="flex justify-between">
                    <Typography.BodyText>
                        Tax ({invoice?.taxRate || 6}%)
                    </Typography.BodyText>
                    <Typography.BodyText>
                        ${invoice?.tax || "0.00"}
                    </Typography.BodyText>
                </div>

                <div className="flex justify-between">
                    <Typography.BodyText >
                        Shipping cost
                    </Typography.BodyText>
                    <Typography.BodyText >
                        ${invoice?.shippingCost || "0.00"}
                    </Typography.BodyText>
                </div>

                <div className="pt-4 border-t border-border">
                    <div className="flex justify-between">
                        <Typography.BodyText >
                            Total Price
                        </Typography.BodyText>
                        <Typography.BodyText >
                            ${invoice?.totalFinalPrice || "0.00"}
                        </Typography.BodyText>
                    </div>
                </div>

                <div className="pt-2">
                    <div className="flex justify-between">
                        <Typography.Title3 className="text-text-primary font-semibold">
                            Final Order Price
                        </Typography.Title3>
                        <Typography.Title3 className="text-primary font-semibold">
                            ${invoice?.totalFinalPrice || "0.00"}
                        </Typography.Title3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceBreakdown;
