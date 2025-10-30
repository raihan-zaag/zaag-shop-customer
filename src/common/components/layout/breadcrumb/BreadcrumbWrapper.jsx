"use client";

import { usePathname } from "next/navigation";
import BreadcrumbComponent from "./index";
import { cn } from "@/common/lib/utils";
import Container from "../../shared/Container";
import { PATH_HOME, PATH_LANDING } from "@/common/config/constants/routes";

const BreadcrumbWrapper = ({
    hideOnHome = true,
    className = "",
    showContainer = true
}) => {
    const paths = usePathname();

    if (hideOnHome && paths === PATH_HOME) {
        return null;
    }
    if (hideOnHome && paths === PATH_LANDING) {
        return null;
    }

    if (!showContainer) {
        return <BreadcrumbComponent />;
    }

    return (
        <div className={cn("bg-white py-5", className)}>
            <Container className={className}>
                <BreadcrumbComponent />
            </Container>
        </div>
    );
};

export default BreadcrumbWrapper;
