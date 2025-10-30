"use client";

import { useState } from "react";
// Replaced with shadcn-style Input OTP
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/common/components/ui/input-otp";
import TimerDisplay from "./TimerDisplay";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/common/lib/utils";
import { Button } from "@/common/components";


const VerificationForm = ({ title, verifyShortForm, handleUpdate }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();

  const handleFinish = async () => {
    handleUpdate && handleUpdate(verificationCode);
  };

  return (
    <div className="w-full md:w-500px bg-background rounded-primary border border-border p-sp-md lg:p-sp-lg xl:p-sp-3xl">
      <h1 className="flex w-full justify-center font-semibold text-xl text-text-primary py-3 border-b border-border">
        Verification Code
      </h1>

      <div className="w-full flex justify-center xl:p-sp-3xl">
        <Image
          width={1000}
          height={1000}
          alt="verifyOTP"
          src={"/images/auth/OTP-verification-image.png"}
          quality={100}
          className="size-62.5"
        />
      </div>

      <div className="space-y-3">
        <h1 className="text-neutral-700 text-base md:text-xl font-semibold leading-5 md:leading-8">
          Verify your Email Address
        </h1>
        <p className="text-light-font2 text-sm font-normal leading-5 whitespace-normal md:whitespace-nowrap">
          We just sent a verification code to
          <span className="text-primary text-xs font-semibold">
            &nbsp;{`"${verifyShortForm}"`}
          </span>
        </p>
      </div>

      <div className="w-full flex flex-col gap-y-4 py-9">
        <div className="w-full flex justify-between">
          <p className="text-dark text-sm font-medium">
            Verification Code
          </p>
        </div>

        <InputOTP
          maxLength={6}
          value={verificationCode}
          onChange={setVerificationCode}
          containerClassName="w-full"
        >
          <InputOTPGroup className="w-full justify-between gap-x-2 md:gap-x-6">
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <div className="w-full flex justify-between items-center">
          <p
            className="text-primary text-sm font-bold leading-18px cursor-pointer hover:underline"
            onClick={() => router.back()}
          >
            Wrong Email?
          </p>
          <TimerDisplay />
        </div>
      </div>

      <Button
        onClick={handleFinish}
        type="primary"
        disabled={verificationCode.length < 6}
        className={cn(
          "w-full",
          verificationCode.length < 6 ? "bg-primary/60" : "bg-primary"
        )}
      >
        Verify Code
      </Button>
    </div>
  );
};

export default VerificationForm;
