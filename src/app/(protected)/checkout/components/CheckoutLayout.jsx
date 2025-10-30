import { cn } from "@/common/lib/utils";
const CheckoutLayout = ({ children, className }) => (
    <div className={cn("flex flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-24", className)}>
        {children}
    </div>
);
const CheckoutFormsColumn = ({ children, className }) => (
    <div className={cn("flex-1 lg:max-w-[636px] space-y-6", className)}>
        {children}
    </div>
);
const CheckoutSummaryColumn = ({ children, className }) => (
    <div className={cn("w-full lg:w-[400px] lg:flex-shrink-0", className)}>
        {children}
    </div>
);

export { CheckoutLayout, CheckoutFormsColumn, CheckoutSummaryColumn };
