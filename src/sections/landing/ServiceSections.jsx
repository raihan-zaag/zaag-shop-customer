'use client'

import Container from "@/common/components/shared/Container";
import Typography from "@/common/components/Typography";
import Image from "next/image";


const ServiceSections = () => {
    const services = [
        {
            id: 1,
            icon: '/icons/fast_delivery.svg',
            title: 'Fast Delivery',
            description: 'Get Fast and hassle-free delivery of your orders to your doorstep.'
        },
        {
            id: 2,
            icon: '/icons/hand_shake.svg',
            title: 'Super Deals',
            description: 'Stay updated on all our latest news, offers, and campaigns.'
        },
        {
            id: 3,
            icon: '/icons/online_shopping.svg',
            title: 'Free Shopping',
            description: 'Nothing to Lose, Everything to Gain'
        },
        {
            id: 4,
            icon: '/icons/return.svg',
            title: '03 days Return',
            description: 'Unlock a world of exciting benefits with Never End loyalty program.'
        }
    ];

    return (
        <Container className="py-sp-md md:py-sp-lg xl:py-sp-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="flex flex-col items-center text-center "
                    >
                        {/* Icon Container */}
                        <div className="flex items-center justify-center mb-sp-lg">
                            <Image
                                src={service.icon}
                                alt={service.title}
                                width={70}
                                height={70}
                            />
                        </div>

                        {/* Service Title */}
                        <Typography.Title3 className="my-3 text-md font-medium">
                            {service.title}
                        </Typography.Title3>

                        {/* Service Description */}
                        <Typography.BodyText className="text-text-secondary">
                            {service.description}
                        </Typography.BodyText>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default ServiceSections;