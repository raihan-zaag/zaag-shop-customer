import Typography from '@/common/components/Typography';
import { cn } from '@/common/lib/utils';

const ProductOptions = ({ cartInfo, className }) => {
    return (
        <div className={cn("flex flex-wrap items-center gap-2 bg-surface w-fit  px-3 h-7.5", className)}>
            <Typography.BodyText >
                Color: <span>{cartInfo?.productColor}</span>
            </Typography.BodyText>

            <span>|</span>

            <Typography.BodyText >
                Size: <span >{cartInfo?.productSize}</span>
            </Typography.BodyText>
        </div>
    );
};

export default ProductOptions;