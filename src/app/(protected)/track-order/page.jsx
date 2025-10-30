"use client";
import { useState } from "react";
import { Input } from "@/common/components/ui/input";
import { Button } from "@/common/components/ui/button";
import Typography from "@/common/components/Typography";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/common/components/ui/form";
import { useRouter } from "next/navigation";
import { PATH_ORDER_DETAILS_DYNAMIC } from "@/common/config/constants/routes";

const TrackOrderPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      trackingId: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Here you would typically handle the tracking request
    // For example: await trackOrder(data.trackingId);

    // Using allowed console method
    if (process.env.NODE_ENV !== 'production') {
      console.warn("Debug - Tracking order with ID:", data.trackingId);
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate or display results
    }, 1000);

    router.push(PATH_ORDER_DETAILS_DYNAMIC("3513511"));
  };

  return (
    <div className="bg-surface min-h-[calc(100vh-200px)] flex justify-center items-center py-12">
      <div className="w-full md:w-600px bg-background p-8 px-4 sm:px-10 md:px-12 border border-border rounded-primary">
        <div className="flex flex-col space-y-8">
          {/* Header */}
          <div className="flex flex-col space-y-2">
            <Typography.Title1>Track Order</Typography.Title1>
            <Typography.Description>
              Enter your tracking id below to know the latest status of your delivery
            </Typography.Description>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
              <FormField
                control={form.control}
                name="trackingId"
                rules={{
                  required: "Tracking ID is required",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      required
                    >
                      Tracking ID
                    </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your tracking id here.."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full py-3 rounded-primary"
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                Track Order
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
