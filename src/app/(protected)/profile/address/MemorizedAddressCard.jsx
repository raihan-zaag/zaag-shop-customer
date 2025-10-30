import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import Typography from "@/common/components/Typography";
import { Button } from "@/common/components/ui/button";
import { useConfirmation } from "@/contextProviders/confirmationProvider";
import { cn } from "@/common/lib/utils";

const AddressCard = ({
    address,
    setSelectedAddress,
    setOpenAddressModal,
    handleRemoveDelete,
}) => {
    const { showConfirmation } = useConfirmation();

    const handleEdit = () => {
        setSelectedAddress(address);
        setOpenAddressModal(true);
    };

    const handleDelete = async () => {
        const confirmed = await showConfirmation({
            title: "Confirm Delete",
            message: `Are you sure you want to delete address "${address?.title}"?`,
            confirmText: "Delete",
            cancelText: "Cancel",
        });

        if (confirmed) {
            handleRemoveDelete(address.id);
        }
    };

    return (
        <div className="flex flex-col gap-2 border-b border-border py-5">
            <div className="flex justify-between items-center">
                <Typography.Title3 className="font-semibold text-base">
                    {address?.title}
                </Typography.Title3>
                <div className="flex items-center gap-12">
                    <Button
                        variant="text"
                        size="sm"
                        icon={<Pencil className="size-4" />}
                        onClick={handleEdit}
                        className="text-primary"
                    >
                        Edit Address
                    </Button>
                    <Button
                        variant="text"
                        size="sm"
                        icon={<Trash2 className="size-4" />}
                        onClick={handleDelete}
                        className="text-text-subtle"
                    >
                        Delete
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Typography.Description >
                    Street Address: {address?.street || "N/A"}
                </Typography.Description>
                <Typography.Description >
                    Postal Code: {address?.zipCode || "N/A"}
                </Typography.Description>
                <Typography.Description >
                    City: {address?.city || "N/A"}
                </Typography.Description>
                <Typography.Description>
                    Country: {address?.country || "Sweden"}
                </Typography.Description>
                {address?.apartment && (
                    <Typography.Description >
                        Additional Information: {address?.apartment}
                    </Typography.Description>
                )}
            </div>
        </div>
    );
};

export const MemoizedAddressCard = React.memo(AddressCard);
