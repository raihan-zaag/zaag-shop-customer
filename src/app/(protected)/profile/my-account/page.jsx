"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/common/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { DatePicker } from "@/common/components/ui/date-picker";
import { useUserContext } from "@/contextProviders/userContextProvider";
import useProfileUpdate from "@/app/(auth)/hooks/useProfileUpdate";
import { USER_INFO } from "@/common/config/constants/cookiesKeys";
import { setCookie } from "cookies-next";
import useGetUserProfile from "@/app/(auth)/hooks/useGetUserInfo";
import { Button } from "@/common/components";
import ImageUploader from "@/common/components/shared/ImageUploader";
import ProfileSkeleton from "@/common/components/shared/ProfileSkeleton";
import ChangePasswordModal from "@/common/components/modals/ChangePasswordModal";
import Typography from "@/common/components/Typography";

// Profile form schema
const profileSchema = z.object({
  fullName: z.string().min(1, "Please input your full name!"),
  email: z
    .string()
    .min(1, "Please input your email address!")
    .email("Please input valid email address!"),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.date().optional().or(z.string().optional()),
});

const AccountPage = () => {
  const { user, setUser } = useUserContext();
  const [profileImage, setProfileImage] = React.useState("https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww");
  const [isReadOnly, setIsReadOnly] = React.useState(true);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = React.useState(false);

  const { updateProfile } = useProfileUpdate();
  const { profile, loading } = useGetUserProfile();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: undefined,
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        fullName: profile?.fullName || user?.fullName || "",
        email: profile?.email || user?.email || "",
        phoneNumber: profile?.mobileNumber || "",
        dateOfBirth: profile?.dateOfBirth ? new Date(profile.dateOfBirth) : undefined,
      });
      setProfileImage(profile?.profilePicture || user?.profilePicture );
    } else if (user) {
      form.reset({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.mobileNumber || "",
        dateOfBirth: user?.dateOfBirth ? new Date(user.dateOfBirth) : undefined,
      });
      setProfileImage(user?.profilePicture);
    }
  }, [profile, user, form]);

  const onSubmit = async (values) => {
    const submitData = {
      ...values,
      profilePicture: profileImage,
      dateOfBirth: values.dateOfBirth instanceof Date ? values.dateOfBirth.toISOString().split('T')[0] : values.dateOfBirth,
    };
    delete submitData.phoneNumber; // Remove phone number as it might not be supported by the API

    const response = await updateProfile(submitData);
    setUser(response.info);
    setCookie(USER_INFO, response.info);
    setIsReadOnly(true);
  };

  const handleClickUpdate = () => {
    form.handleSubmit(onSubmit)();
  };

  const handleCancel = () => {
    setIsReadOnly(true);
    // Reset form to original values
    if (profile || user) {
      form.reset({
        fullName: profile?.fullName || user?.fullName || "",
        email: profile?.email || user?.email || "",
        phoneNumber: profile?.mobileNumber || user?.mobileNumber || "",
        dateOfBirth: (profile?.dateOfBirth || user?.dateOfBirth) ? new Date(profile?.dateOfBirth || user?.dateOfBirth) : undefined,
      });
      setProfileImage(user?.profilePicture || "");
    }
  };

  // Show loading skeleton while profile is loading
  const isLoading = loading && !user && !profile;

  return (
    <div>
      {/* Header Section */}
      <div className="mb-9">
        <Typography.Title2 className="text-gray-dark font-semibold mb-1">
          Account Management
        </Typography.Title2>
        <Typography.Description className="text-[#515151]">
          Stay updated with your latest notification
        </Typography.Description>
      </div>

      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <div className="space-y-10 lg:10 xl:mx-35">
          {/* Profile Picture and Change Password Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <ImageUploader
              profileImage={profileImage}
              setProfileImage={setProfileImage}
              isReadOnly={isReadOnly}
            />
            <Button
              className="py-3 px-10"
              onClick={() => setIsChangePasswordModalOpen(true)}
            >
              Change Password
            </Button>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        readOnly={isReadOnly}
                        className={` ${isReadOnly ? "bg-gray-50" : ""}`}
                        disabled={isReadOnly}
                        {...field}
                      />
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
                    <FormLabel>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        readOnly={isReadOnly}
                        className={` ${isReadOnly ? "bg-gray-50" : ""}`}
                        disabled={isReadOnly}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone number
                    </FormLabel>
                    <FormControl>
                      <Input
                        readOnly={isReadOnly}
                        className={` ${isReadOnly ? "bg-gray-50" : ""}`}
                        disabled={isReadOnly}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date of Birth
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                        disabled={isReadOnly}
                        placeholder="Select your date of birth"
                        className={`${isReadOnly ? "bg-gray-50" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {/* Edit Information Button */}
          {isReadOnly ? (
            <div className="mt-12">
              <Button
                variant="outline"
                className="w-full py-3 px-6  border-primary text-primary"
                onClick={() => setIsReadOnly(false)}
              >
                Edit Information
              </Button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
              <Button
                type="button"
                variant="outline"
                className="flex-1 w-full py-3 px-8"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 w-full py-3 px-8"
                onClick={handleClickUpdate}
              >
                Update
              </Button>
            </div>
          )}

          {/* Change Password Modal */}
          <ChangePasswordModal
            open={isChangePasswordModalOpen}
            onClose={() => setIsChangePasswordModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default AccountPage;
