"use client";

import { useState, useEffect } from "react";
import { Button } from "@/common/components/ui/button";
import { Spinner } from "@/common/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/common/components/ui/select";
import { X, Edit2, Trash2, MapPin } from "lucide-react";
import useGetAddress from "@/common/hooks/address/useGetUserAddress";
import useCreateAddress from "@/common/hooks/address/useCreateAddress";
import useUpdateAddress from "@/common/hooks/address/useUpdateAddress";
import useDeleteAddress from "@/common/hooks/address/useDeleteAddress";
import AddressModal from "@/sections/address/AddressAddModal";
import { cn } from "@/common/lib/utils";

// Dummy data for testing
const DUMMY_ADDRESSES = [
  {
    id: "1",
    title: "Home",
    street: "Kungsgatan 12A",
    city: "Stockholm",
    state: "Stockholm County",
    zipCode: "111 57",
    country: "Sweden",
    apartment: "2tr"
  },
  {
    id: "2",
    title: "Work",
    street: "Drottninggatan 95",
    city: "Stockholm",
    state: "Stockholm County",
    zipCode: "111 60",
    country: "Sweden",
    apartment: "5th Floor"
  },
  {
    id: "3",
    title: "Mom's House",
    street: "Götgatan 78",
    city: "Stockholm",
    state: "Stockholm County",
    zipCode: "118 30",
    country: "Sweden",
    apartment: ""
  }
];

const AuthUserAddress = ({ setDeliveryAddress, deliveryAddress }) => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const { address, loading, fetchAddress } = useGetAddress();
  const { createAddress, loading: createLoading } = useCreateAddress();
  const { updateAddress, loading: updateLoading } = useUpdateAddress();
  const { deleteAddress, loading: deleteLoading } = useDeleteAddress();

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  // Get addresses from API response or use dummy data for testing
  const savedAddresses = address?.content || DUMMY_ADDRESSES;

  const handleRemoveAddress = () => {
    setDeliveryAddress(null);
  };

  const handleAddNewAddress = () => {
    setSelectedAddress(null);
    setIsEditMode(false);
    setIsAddressModalOpen(true);
  };

  const handleEditAddress = (addressToEdit) => {
    setSelectedAddress(addressToEdit);
    setIsEditMode(true);
    setIsAddressModalOpen(true);
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteAddress(addressId);
        await fetchAddress(); // Refresh the list

        // If the deleted address was selected, clear it
        if (deliveryAddress?.id === addressId) {
          setDeliveryAddress(null);
        }
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
  };

  const handleAddressSubmit = async (values, isCreate, form) => {
    try {
      if (isCreate) {
        const addressData = {
          title: values.title,
          street: values.street,
          city: values.city,
          state: values.county, // Map county to state for backend compatibility
          zipCode: values.zipCode,
          country: "Sweden",
          apartment: values.apartment || "",
        };

        await createAddress(addressData);
      } else {
        // Update existing address
        const addressData = {
          title: values.title,
          street: values.street,
          city: values.city,
          state: values.county, // Map county to state for backend compatibility
          zipCode: values.zipCode,
          country: "Sweden",
          apartment: values.apartment || "",
        };

        await updateAddress(selectedAddress.id, addressData);
      }

      // Refresh the address list
      await fetchAddress();

      // Close modal and reset form
      setIsAddressModalOpen(false);
      setSelectedAddress(null);
      setIsEditMode(false);
      form.reset();
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  if (loading || createLoading || updateLoading || deleteLoading) {
    return (
      <div className="space-y-3">
        <div className="flex gap-2 h-12">
          <div className="flex-1 flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-primary">
            <Spinner size="sm" />
          </div>
          <Button
            variant="outline"
            className="h-12 px-6 rounded-primary font-semibold text-sm whitespace-nowrap"
            disabled
            loading
          >
            Add new address
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Address Selection Row */}
      <div className="flex gap-2 h-12">
        {/* Selected Address Display or Dropdown */}
        {deliveryAddress ? (
          <div className="flex-1 flex items-center justify-between px-4 bg-[var(--color-secondary)] border border-[var(--color-border)] rounded-primary">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[var(--color-text-subtle)]" />
              <span className="text-sm font-medium text-[var(--color-text-primary)]">
                {deliveryAddress.title || deliveryAddress.name || 'Home'}
              </span>
            </div>
            <Button
              variant="icon"
              size="icon"
              onClick={handleRemoveAddress}
              className="text-[var(--color-text-subtle)] hover:text-[var(--color-text-primary)] transition-colors h-6 w-6"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex-1 relative">
            <Select
              onValueChange={(value) => {
                if (value) {
                  const selectedAddr = savedAddresses.find(addr => addr.id === value);
                  if (selectedAddr) {
                    setDeliveryAddress(selectedAddr);
                  }
                }
              }}
              value=""
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={
                    savedAddresses.length > 0 ? 'Select a saved address' : 'No saved addresses available'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {savedAddresses.map((address) => (
                  <SelectItem key={address.id} value={address.id}>
                    {address.title || address.name || 'Address'} - {address.street}, {address.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Add New Address Button */}
        <Button
          type="button"
          onClick={handleAddNewAddress}
          variant="outline"
          className="h-12 px-6 rounded-primary font-semibold text-sm whitespace-nowrap"
        >
          Add new address
        </Button>
      </div>

      {/* Selected Address Details Card */}
      {deliveryAddress && (
        <div className="bg-[var(--color-surface)] rounded-primary p-6 border-0">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold text-sm text-[var(--color-text-primary)]">
                {deliveryAddress.title || deliveryAddress.name || 'Home'}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditAddress(deliveryAddress)}
                  className="flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 transition-colors text-xs"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAddress(deliveryAddress.id)}
                  className="flex items-center gap-1 text-[var(--color-destructive)] hover:text-[var(--color-destructive)]/80 transition-colors text-xs"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              {deliveryAddress.country && (
                <div>
                  <span className="font-medium">Country:</span> {deliveryAddress.country}
                </div>
              )}

              {deliveryAddress.state && (
                <div>
                  <span className="font-medium">State:</span> {deliveryAddress.state}
                </div>
              )}

              {deliveryAddress.city && (
                <div>
                  <span className="font-medium">City:</span> {deliveryAddress.city}
                </div>
              )}

              {deliveryAddress.zipCode && (
                <div>
                  <span className="font-medium">Postal Code:</span> {deliveryAddress.zipCode}
                </div>
              )}

              {deliveryAddress.street && (
                <div>
                  <span className="font-medium">Street Address:</span> {deliveryAddress.street}
                </div>
              )}

              {deliveryAddress.apartment && (
                <div>
                  <span className="font-medium">Apartment:</span> {deliveryAddress.apartment}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Saved Addresses List */}
      {savedAddresses.length > 0 && !deliveryAddress && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-[var(--color-text-primary)]">
            Your Saved Addresses ({savedAddresses.length})
          </h3>
          <div className="space-y-3 max-h-60 pr-2.5 overflow-y-auto">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                className={cn(
                  "p-4 border border-[var(--color-border)] rounded-primary cursor-pointer transition-all",
                  "hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)]"
                )}
                onClick={() => setDeliveryAddress(address)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-4 h-4 text-[var(--color-text-subtle)]" />
                      <span className="font-medium text-sm text-[var(--color-text-primary)]">
                        {address.title || address.name || 'Address'}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] space-y-0.5">
                      <div>{address.street}</div>
                      <div>{address.city}, {address.state} {address.zipCode}</div>
                      {address.apartment && <div>Apartment: {address.apartment}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditAddress(address);
                      }}
                      className="flex items-center gap-1 text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 transition-colors text-xs px-2 py-1 rounded"
                    >
                      <Edit2 className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteAddress(address.id);
                      }}
                      className="flex items-center gap-1 text-[var(--color-destructive)] hover:text-[var(--color-destructive)]/80 transition-colors text-xs px-2 py-1 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Address Creation/Edit Modal */}
      <AddressModal
        open={isAddressModalOpen}
        onClose={() => {
          setIsAddressModalOpen(false);
          setSelectedAddress(null);
          setIsEditMode(false);
        }}
        isCreate={!isEditMode}
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
        onSubmit={handleAddressSubmit}
        totalAddressCount={savedAddresses.length}
      />
    </div>
  );
};

export default AuthUserAddress;
