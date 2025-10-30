import Header from "@/common/components/layout/header";
import Footer from "@/common/components/layout/footer";
import BreadcrumbWrapper from "@/common/components/layout/breadcrumb/BreadcrumbWrapper";

export default function PublicLayout({ children }) {
    return (
        <>
            <Header />
            <BreadcrumbWrapper />
            {children}
            <Footer />
        </>
    );
}