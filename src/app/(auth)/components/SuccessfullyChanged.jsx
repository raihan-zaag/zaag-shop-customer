'use client';

import { Button } from '@/common/components';
import Typography from '@/common/components/Typography';
import { PATH_LOGIN } from '@/common/config/constants/routes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SuccessfullyChanged = () => {
  const router = useRouter();
  return (
    <div>
      <div className="w-full md:w-600px bg-background rounded-primary border border-border p-sp-md lg:p-sp-lg xl:p-sp-3xl">
        <div className="w-full flex justify-center xl:p-sp-3xl">
          <Image
            width={1000}
            height={1000}
            alt="successfullyChanged"
            src={'/images/auth/collaboration.png'}
            quality={100}
            className="size-62.5"
          />
        </div>

        <Typography.Title1 className="mb-3 text-center">
          Password Reset Successfully
        </Typography.Title1>

        <Typography.Description className="text-center mt-2 mb-6">
          Your password has been reset successfully. Please go back to sign in
          page and try to log in again with the new password.
        </Typography.Description>

        <Button
          type="submit"
          className="w-full mt-9"
          onClick={() => router.push(PATH_LOGIN)}
        >
          Go Back to Sign In
        </Button>
      </div>
    </div>
  );
};

export default SuccessfullyChanged;
