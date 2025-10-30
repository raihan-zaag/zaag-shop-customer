'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import {
  PATH_HOME,
  PATH_SIGN_UP,
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
import { Button } from '@/common/components/ui/button';
import { Checkbox } from '@/common/components/ui/checkbox';

import { login } from '@/app/(auth)/services/authService';
import { useUserContext } from '@/contextProviders/userContextProvider';
import useNotification from '@/common/hooks/useNotification';
import {
  USER_INFO,
  USER_PERMISSION,
  USER_TOKEN,
} from '@/common/config/constants/cookiesKeys';
import SocialLoginForm from './SocialLoginForm';

// Validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  remember: z.boolean().optional(),
});

const LoginForm = () => {
  const router = useRouter();
  const { setUser, setToken, setIsAuthenticated, fetchUserInfo } = useUserContext();
  const { openErrorNotification, openSuccessNotification } = useNotification();
  const [redirectUrl, setRedirectUrl] = useState('/');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  useEffect(() => {
    // Get the redirect URL from the query parameters if it exists
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');

    if (redirect) {
      setRedirectUrl(redirect);
    }
  }, []);

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      const response = await login(values);
      if (response.success) {
        openSuccessNotification('Success', response.message);

        // Set user context
        setUser(response.data.user);
        setToken(response.data.token?.access);
        setIsAuthenticated(true);

        // Set cookies
        setCookie(USER_TOKEN, response.data.token?.access);
        setCookie(USER_INFO, JSON.stringify(response.data.user));
        setCookie(USER_PERMISSION, response.data.user?.roles);

        // Fetch updated user profile after login
        try {
          await fetchUserInfo();
        } catch (profileError) {
          console.error('Failed to fetch user profile after login:', profileError);
          // Don't block login flow if profile fetch fails
        }

        // Redirect
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push(PATH_HOME);
        }
      }
    } catch (error) {
      openErrorNotification('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleGoToCheckoutPage = () => {
  //   if (cart?.length > 0) {
  //     router.push(PATH_CHECKOUT);
  //   } else {
  //     router.push(PATH_HOME);
  //   }
  // };

  return (
    <div className=" w-full md:w-600px bg-background border border-border rounded-primary p-sp-md lg:p-sp-lg xl:p-sp-3xl">
      <div className="mb-5">
        <h2 className="text-2xl font-semibold text-left mb-2">Sign In</h2>
        <span className="text-text-subtle text-left mb-6 font-light">
          Please fill up the form to sign in!
        </span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="flex items-center justify-between mb-4">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      Keep me logged in
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="text-xs md:text-sm text-primary font-semibold hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full mt-sp-md">
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </Form>

      <div className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center w-full my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-xs font-normal text-gray-600">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social login */}
        <SocialLoginForm page='login' />

        <div className="flex flex-col gap-4 mt-9 w-full">
          <p className="text-center text-sm text-light-font2">
            {`New Customer?`}{' '}
            <Link
              href={PATH_SIGN_UP}
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
