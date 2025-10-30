import { cn } from "@/common/lib/utils";

const SectionHeader = ({ title, className }) => (
    <div className={cn("bg-surface px-6 py-4 rounded-primary", className)}>
        <h3 className="text-text-primary font-semibold text-3.75 leading-tight">
            {title}
        </h3>
    </div>
);

export default SectionHeader;
