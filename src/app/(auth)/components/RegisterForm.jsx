'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  PATH_EMAIL_VERIFICATION,
  PATH_LOGIN,
} from '@/common/config/constants/routes';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form';
import { Input } from '@/common/components/ui/input';
import { PasswordInput } from '@/common/components/ui/password-input';
import { PhoneInput } from '@/common/components/ui/phone-input';
import { Button } from '@/common/components/ui/button';

import { register } from '@/app/(auth)/services/authService';
import useNotification from '@/common/hooks/useNotification';
import { setCookie } from 'cookies-next';
import {
  IS_RESET_PASSWORD,
  VERIFY_EMAIL,
} from '@/common/config/constants/cookiesKeys';
import SocialLoginForm from './SocialLoginForm';

// Validation schema
const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    mobileNumber: z
      .string()
      .optional()
      .refine((val) => !val || /^\+\d{1,4}\d{10,15}$/.test(val), {
        message: 'Please enter a valid phone number with country code',
      }),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      }),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const RegisterForm = () => {
  const router = useRouter();
  const { openErrorNotification, openSuccessNotification } = useNotification();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      // Remove confirmPassword from the data sent to API
      const { confirmPassword: _, ...registrationData } = values;

      // Remove mobileNumber if it's empty
      if (!registrationData.mobileNumber) {
        delete registrationData.mobileNumber;
      }

      const response = await register(registrationData);

      if (response.success) {
        openSuccessNotification(
          'Success',
          response.message ||
          'User successfully signed up. Now verify your email address.'
        );

        setCookie(VERIFY_EMAIL, response.data?.email);
        setCookie(IS_RESET_PASSWORD, false);
        router.refresh();
        router.push(PATH_EMAIL_VERIFICATION);
      }
    } catch (error) {
      openErrorNotification('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-600px bg-background rounded-primary border border-border p-sp-md lg:p-sp-lg xl:p-sp-3xl">
      <div className='space-y-sm'>
        <h2 className="text-2xl font-semibold text-left">Sign Up</h2>
        <p className="text-text-subtle text-left font-light">
          Please fill up the form to sign up!
        </p>
      </div>

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-lg space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-sm">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-sm">
                  Email Id
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-sm">
                  Phone Number (Optional)
                </FormLabel>
                <FormControl>
                  <PhoneInput 
                    placeholder="Enter phone number here" 
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark font-medium text-sm">
                  Password
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Min. 8 characters" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-dark font-medium text-sm">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Min. 8 characters" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-sp-md"
            loading={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>
      </Form>

      <div className="flex items-center w-full my-sp-lg">
        <div className="flex-1 border-t border-border"></div>
        <span className="px-3 text-xs font-normal">Or</span>
        <div className="flex-1 border-t border-border"></div>
      </div>

      {/* social login */}
      <SocialLoginForm />

      <p className="text-center text-sm mt-sp-xl">
        Already have an account?{' '}
        <Link
          href={PATH_LOGIN}
          className="text-primary font-semibold hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
