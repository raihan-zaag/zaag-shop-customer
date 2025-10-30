"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/common/lib/utils";
import Typography from "@/common/components/Typography";
import { Button } from "@/common/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/common/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/common/components/ui/select";
import { Textarea } from "@/common/components/ui/textarea";

const RefundRequestSheet = ({
  children,
  productInfo,
  onSubmit = () => { },
  onCancel = () => { }
}) => {
  const [requestType, setRequestType] = useState("return");
  const [refundReason, setRefundReason] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const refundReasons = [
    "Wrong item received",
    "Item damaged during shipping",
    "Product doesn't match description",
    "Product defective",
    "Size/fit issues",
    "Changed my mind",
    "Other"
  ];

  const handleRequestTypeChange = (type) => {
    setRequestType(type);
  };

  const handleSubmit = () => {
    if (!refundReason.trim()) {
      alert("Please provide a reason for your refund request.");
      return;
    }

    onSubmit({
      productId: productInfo?.id,
      requestType,
      reason: refundReason,
      description,
      quantity,
      fileAttachment: selectedFile
    });

    // Reset form
    setRefundReason("");
    setDescription("");
    setRequestType("return");
    setQuantity(1);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full md:w-[500px] p-6 flex flex-col justify-between overflow-y-auto" side="right">
        {/* Header section */}
        <div className="flex flex-col gap-9">
          <div className="flex justify-between items-center">
            <div>
              <Typography.Title1 className="text-2xl font-semibold mb-1">
                Refund request
              </Typography.Title1>
              <Typography.SmallText className="text-text-secondary">
                Add client details and site configuration
              </Typography.SmallText>
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-4 border border-border rounded-primary p-4">
            {/* Product info */}
            <div className="flex items-center gap-5">
              <div className="w-[100px] h-[110px] rounded-primary overflow-hidden">
                <Image
                  src={"/images/image_placeholder.png"}
                  alt={productInfo?.name || "Product"}
                  width={100}
                  height={110}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 space-y-2.5">
                <div>
                  <Typography.BodyText className="font-medium">
                    {productInfo?.name || "Mini Eve Bag"}
                  </Typography.BodyText>
                  <Typography.BodyText className="font-medium">
                    1 x ${productInfo?.price || "89.97"}
                  </Typography.BodyText>
                </div>

                <div className="bg-surface px-3 py-2 rounded-primary space-y-1">
                  <Typography.SmallText className="font-medium">
                    Color: {productInfo?.color || "Natural Beige"}
                  </Typography.SmallText>
                  <div className="h-px w-full bg-border"></div>
                  <Typography.SmallText className="font-medium">
                    Size: {productInfo?.size || "M"}
                  </Typography.SmallText>
                </div>
              </div>

              {/* Quantity control */}
              <div className="border border-border rounded-lg px-3 py-1 flex items-center gap-4">
                <button
                  className="w-3.5 h-3.5 flex items-center justify-center"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <div className="w-2.5 h-0.5 bg-border-strong rounded-full" />
                </button>
                <Typography.BodyText className="font-medium">
                  {quantity.toString().padStart(2, '0')}
                </Typography.BodyText>
                <button
                  className="w-3.5 h-3.5 flex items-center justify-center relative"
                  onClick={() => setQuantity(Math.min((productInfo?.quantity || 3), quantity + 1))}
                  disabled={quantity >= (productInfo?.quantity || 3)}
                >
                  <div className="w-2.5 h-0.5 bg-text-primary rounded-full" />
                  <div className="w-0.5 h-2.5 bg-text-primary rounded-full absolute" />
                </button>
              </div>
            </div>

            {/* Request type selection */}
            <div className="space-y-4">
              <Typography.BodyText className="font-medium">
                What is your request? <span className="text-red-500">*</span>
              </Typography.BodyText>

              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  className={cn(
                    "flex-1",
                    requestType === "return" && "text-primary border-primary"
                  )}
                  onClick={() => handleRequestTypeChange("return")}
                >
                  Return & Refunds
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "flex-1",
                    requestType === "refundOnly" && "text-primary border-primary"
                  )}
                  onClick={() => handleRequestTypeChange("refundOnly")}
                >
                  Refund only
                </Button>
              </div>
            </div>

            {/* Reason for refund */}
            <div className="space-y-2">
              <Typography.BodyText className="font-medium">
                Why do you want a refund <span className="text-red-500">*</span>
              </Typography.BodyText>

              <Select value={refundReason} onValueChange={setRefundReason}>
                <SelectTrigger className="bg-surface border border-border rounded-primary px-4 py-3">
                  <SelectValue placeholder="Select reason for return" />
                </SelectTrigger>
                <SelectContent>
                  {refundReasons.map((reason) => (
                    <SelectItem key={reason} value={reason}>
                      {reason}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notice */}
            <div className="space-y-2">
              <Typography.BodyText className="font-medium">
                Additional Details
              </Typography.BodyText>
              <Textarea
                placeholder="Provide additional details about your refund request"
                className="bg-surface border border-border rounded-primary px-4 py-3 min-h-[100px] resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Document upload */}
            <div className="space-y-4">
              <Typography.BodyText className="font-medium">
                Add document to support your case
              </Typography.BodyText>

              <div 
                className="bg-surface rounded-primary px-4 py-4 flex justify-between items-center cursor-pointer"
                onClick={triggerFileInput}
              >
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>

                  <div>
                    <Typography.BodyText className="font-medium">
                      {selectedFile ? selectedFile.name : "Upload Image"}
                    </Typography.BodyText>
                    <Typography.SmallText className="text-text-subtle">
                      {selectedFile 
                        ? `${Math.round(selectedFile.size / 1024)} KB` 
                        : "Drop image or video here or click browse to upload from your device"}
                    </Typography.SmallText>
                  </div>
                </div>

                {selectedFile && (
                  <button
                    className="w-5 h-5 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSelectedFile();
                    }}
                  >
                    <X className="w-4 h-4 text-text-subtle" />
                  </button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,video/*"
                className="hidden"
              />
            </div>

            <div className="flex justify-between items-center">
              <Typography.SmallText className="text-blue-600">
                Stripe fee (($460.00* 2.9%) + $0.30)
              </Typography.SmallText>
              <Typography.SmallText className="text-blue-600">
                - $ 29.30
              </Typography.SmallText>
            </div>
          </div>
        </div>

        {/* Footer with action buttons */}
        <div className="mt-12">
          <div className="flex gap-6">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleSubmit}
            >
              Place Request
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RefundRequestSheet;
