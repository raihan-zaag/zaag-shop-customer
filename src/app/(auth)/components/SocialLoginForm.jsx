'use client';

import { useCart } from '@/contextProviders/useCartContext';
import { useUserContext } from '@/contextProviders/userContextProvider';
import useNotification from '@/common/hooks/useNotification';
import { Spinner } from '@/common/components/ui/spinner';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Icons from '../../../../public/icons/index.js';
import { PATH_HOME } from '@/common/config/constants/routes.js';

const SocialLoginForm = ({
  page = '',
}) => {
  const router = useRouter();

  const [isSocialLoading, setIsSocialLoading] = useState({
    google: false,
    facebook: false,
  });

  const { handleUpdateCartInBackend, getCartListForAuthUser, cart } = useCart();

  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const { openSuccessNotification, openErrorNotification } = useNotification();
  const { googleSingIn, facebookSignIn } = useUserContext();

  // handle Social login
  const handleSocialSignIn = async (signInFunction, platform) => {
    try {
      setIsSocialLoading({ ...isSocialLoading, [platform]: true });
      const res = await signInFunction();

      setIsSocialLoading({ ...isSocialLoading, [platform]: false });
      openSuccessNotification('success', 'Login successfully');

      if (res?.status === 200) {
        if (cart?.length > 0) {
          handleUpdateCartInBackend();
        } else {
          getCartListForAuthUser();
        }

        if (redirect) {
          router.push(redirect);
        } else {
          router.push(PATH_HOME);
        }
      }
    } catch (e) {
      setIsSocialLoading({ ...isSocialLoading, [platform]: false });

      if (
        platform === 'google' &&
        e.message !== 'Firebase: Error (auth/popup-closed-by-user).'
      ) {
        openErrorNotification('error', e?.message);
      }
    }
  };

  const handleGoogleSignIn = () => handleSocialSignIn(googleSingIn, 'google');
  const handleFaceBookSignIn = () =>
    handleSocialSignIn(facebookSignIn, 'facebook');

  const loginWithSocialMedia = [
    {
      title: 'google',
      icon: Icons.googleIcon,
      isLoading: isSocialLoading.google,
      showTitle: page === 'login' ? 'Sign in with Google' : 'Sign up with Google',
    },
    // { title: "apple", icon: Icons.apple },
    {
      title: 'facebook',
      icon: Icons.facebookIcon,
      isLoading: isSocialLoading.facebook,
      showTitle: page === 'login' ? 'Sign in with Facebook' : 'Sign up with Facebook',
    },
  ];

  return (
    <div className="w-full">
      <div className="space-y-sp-md w-full">
        {loginWithSocialMedia.map((ele, id) => {
          const handleSocialMediaLogin = () => {
            if (ele.title === 'google') {
              handleGoogleSignIn();
            } else if (ele.title === 'facebook') {
              handleFaceBookSignIn();
            }
          };

          return (
            <button
              key={id}
              disabled={ele.isLoading}
              className="rounded-primary border border-border w-full py-3 flex items-center justify-center gap-3 hover:bg-surface/60 bg-surface cursor-pointer disabled:opacity-50"
              onClick={handleSocialMediaLogin}
            >
              {ele.isLoading && <Spinner size="sm" />}
              <Image
                alt={ele.title}
                src={ele.icon}
                height={1000}
                width={1000}
                quality={100}
                className="w-5 h-5"
              />
              {ele.showTitle}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLoginForm;
