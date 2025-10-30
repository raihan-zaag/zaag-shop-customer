import { cn } from "@/common/lib/utils";

const TabButton = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div>
            <div className="flex items-center gap-4 border-b border-border">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={cn(
                            "cursor-pointer flex-grow border-b-2 duration-300 py-3.5 text-md2 font-semibold",
                            activeTab.title === tab.title
                                ? "border-primary text-primary"
                                : "text-text-primary border-transparent"
                        )}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabButton;
