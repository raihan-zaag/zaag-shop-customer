import Typography from "@/common/components/Typography";
import { formatNumber } from "@/common/lib/utils";
import ProductOptions from "./ProductOptions";

const CartItemSummary = ({ key, item }) => {
    return (

        <div key={key} className="border-b border-border pb-5">
            {/* Product Name */}
            <div className="mb-2">
                <Typography.Title3 className="text-sm font-medium ">
                    {item.productName}
                </Typography.Title3>
            </div>

            {/* Quantity and Total Price in same row */}
            <div className="flex justify-between items-center mb-3">
                <Typography.BodyText className="text-sm font-medium ">
                    {item.sellQty} x ${formatNumber(item.singleProductPrice)}
                </Typography.BodyText>
                <Typography.Title3 className="text-sm font-medium ">
                    ${formatNumber(item.productPrice)}
                </Typography.Title3>
            </div>

            {/* Product Options */}
            <ProductOptions
                cartInfo={item}
                className="rounded-primary"
            />
        </div>
    );
};

export default CartItemSummary;