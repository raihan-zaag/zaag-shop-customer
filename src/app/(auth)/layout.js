import Footer from "@/common/components/layout/footer";
import HeaderComponent from "@/common/components/layout/header";
export default function AuthLayout({ children }) {
    return (
        <div className="bg-surface">
            {/* <TopHeading /> */}
            {/* <BreadcrumbWrapper /> */}
            <HeaderComponent />
            <div className="flex justify-center items-center my-sp-5xl">{children}</div>
            <Footer />
        </div>
    );
}