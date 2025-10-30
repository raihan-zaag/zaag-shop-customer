"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import Typography from "@/common/components/Typography";

const OrderNotFound = ({ orderid, onBack }) => {
  return (
    <div className="bg-background rounded-primary shadow-sm p-8 text-center max-w-2xl mx-auto">
      <div className="mb-6">
        <Image 
          src="/images/page_not_found.png"
          alt="Order not found"
          width={250}
          height={250}
          className="mx-auto"
        />
      </div>
      
      <Typography.Title1 className="mb-2">Order Not Found</Typography.Title1>
      <Typography.BodyText className="text-text-secondary mb-6">
        We couldn&apos;t find the order with ID &quot;{orderid}&quot;. 
        This might be because:
      </Typography.BodyText>
      
      <div className="text-left max-w-md mx-auto mb-8">
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="bg-surface p-1 rounded-full mr-3 mt-1">
              <Check className="h-3 w-3 text-primary" />
            </span>
            <Typography.SmallText className="text-text-secondary">
              The order ID might be incorrect
            </Typography.SmallText>
          </li>
          <li className="flex items-start">
            <span className="bg-surface p-1 rounded-full mr-3 mt-1">
              <Check className="h-3 w-3 text-primary" />
            </span>
            <Typography.SmallText className="text-text-secondary">
              The order might have been deleted
            </Typography.SmallText>
          </li>
          <li className="flex items-start">
            <span className="bg-surface p-1 rounded-full mr-3 mt-1">
              <Check className="h-3 w-3 text-primary" />
            </span>
            <Typography.SmallText className="text-text-secondary">
              You might not have permission to access this order
            </Typography.SmallText>
          </li>
        </ul>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          variant="outline" 
          onClick={onBack}
        >
          View My Orders
        </Button>
        <Button>
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default OrderNotFound;
