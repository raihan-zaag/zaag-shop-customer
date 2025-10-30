
import Header from '@/common/components/layout/header';
import Footer from '@/common/components/layout/footer';
import BreadcrumbWrapper from '@/common/components/layout/breadcrumb/BreadcrumbWrapper';
import ProtectedLayout from '@/common/components/auth/ProtectedLayout';

export default function ProtectedRoutesLayout({ children }) {
    return (
        <ProtectedLayout>
            <Header />
            <BreadcrumbWrapper />
            {children}
            <Footer />
        </ProtectedLayout>
    );
}
