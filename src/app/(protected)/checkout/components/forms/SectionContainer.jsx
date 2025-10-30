import { cn } from "@/common/lib/utils";

const SectionContainer = ({ children, className = "" }) => (
    <div className={cn("bg-white px-6 py-0", className)}>
        {children}
    </div>
);

export default SectionContainer;