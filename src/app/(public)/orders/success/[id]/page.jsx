"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { PATH_HOME } from "@/common/config/constants/routes";
import Container from "@/common/components/shared/Container";
import Typography from "@/common/components/Typography";
import { Button } from "@/common/components";

function OrderSuccess() {
  const router = useRouter();
  const { id } = useParams();

  const handleGoToHomePage = () => {
    router.push(PATH_HOME);
  };

  return (
    <Container className="flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8 max-w-2xl mx-auto px-4">
        {/* Image Section */}
        <div className="w-48 h-36 sm:w-56 sm:h-42 md:w-75 md:h-75">
          <Image
            src="/images/order_success.png"
            alt="Order success illustration"
            width={694}
            height={461}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Content Section */}
        <div className="space-y-4 sm:space-y-6">
          <Typography.Title1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Thanks for your order!
          </Typography.Title1>

          <div className="space-y-2 sm:space-y-3">
            <Typography.Paragraph className="text-sm sm:text-base md:text-lg">
              Your order <span className="font-semibold text-primary">#{id}</span> has been placed successfully.
            </Typography.Paragraph>
            <Typography.Paragraph className="text-sm sm:text-base md:text-lg">
              Please be patient while we confirm your order.
            </Typography.Paragraph>
          </div>
        </div>

        {/* Button Section */}
        <div className="w-full max-w-sm sm:max-w-md pt-4 sm:pt-6">
          <Button
            className="w-full"
            onClick={handleGoToHomePage}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default OrderSuccess;
