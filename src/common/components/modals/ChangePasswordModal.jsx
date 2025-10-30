"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/common/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/common/components/ui/form";
import { PasswordInput } from "@/common/components/ui/password-input";
import { Button } from "@/common/components";
import useChangePassword from "@/app/(auth)/hooks/useChangePassword";
import Typography from "../Typography";

// Change password form schema
const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Please enter your current password"),
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const ChangePasswordModal = ({ open, onClose }) => {
    const { changePassword, loading } = useChangePassword();

    const form = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values) => {
        try {
            await changePassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            });
            form.reset();
            onClose();
        } catch {
            // Error is handled in the hook
        }
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-sm p-12">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Reset  password
                    </DialogTitle>

                    <Typography.Description>
                        Please enter your new password below
                    </Typography.Description>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <span className="text-dark font-medium text-sm">
                                            Current Password
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Enter your current password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <span className="text-dark font-medium text-sm">
                                            New Password
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Enter your new password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <span className="text-dark font-medium text-sm">
                                            Confirm New Password
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <PasswordInput
                                            placeholder="Confirm your new password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={handleClose}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Update Password"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default ChangePasswordModal;
