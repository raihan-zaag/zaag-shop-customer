import Image from 'next/image'
import Link from 'next/link'
import Container from '@/common/components/shared/Container'
import { Button } from '@/common/components/ui/button'
import BreadcrumbWrapper from '@/common/components/layout/breadcrumb/BreadcrumbWrapper'
import HeaderComponent from '@/common/components/layout/header'
import Footer from '@/common/components/layout/footer'

export default function NotFound() {
    return (
        <>
            <HeaderComponent/>
            <BreadcrumbWrapper />
            <div className="h-full flex items-center justify-center">
                <Container >
                    <div className="flex flex-col items-center justify-center gap-8 md:gap-12 text-center py-8 md:py-12">
                        {/* Image Section */}
                        <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl">
                            <Image
                                src="/images/page_not_found.png"
                                alt="Page not found illustration"
                                width={694}
                                height={461}
                                className="w-full h-auto object-contain max-h-[60vh]"
                                priority
                            />
                        </div>

                        {/* Button Section */}
                        <div className="flex flex-col items-center">
                            <Button
                                variant="text"
                                className="text-primary font-semibold text-lg hover:bg-primary/10"
                            >
                                <Link href="/">
                                    Go to Home page
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
           <Footer />
        </>
    )
}