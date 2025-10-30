"use client";

import { useEffect, useState, useCallback } from "react";
import PaginationWrapper from "@/common/components/pagination";
import { LoadingOverlay } from "@/common/components/ui/loading-overlay";
import { MemoizedAddressCard } from "./MemorizedAddressCard";
import AddressModal from "@/sections/address/AddressAddModal";
import { Button } from "@/common/components/ui/button";
import Typography from "@/common/components/Typography";
import EmptyDataSkeleton from "@/common/components/shared/EmptyDataSkeleton";
import RowSkeleton from "@/common/components/shared/RowSkeleton";
// Import sample data for testing
import { sampleAddresses } from "@/data/sampleData";

const AddressPage = () => {
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch addresses - using sample data
    const fetchAddress = useCallback(() => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            setAddress(sampleAddresses);
            setLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        fetchAddress();
    }, [fetchAddress]);

    // Delete an address
    const handleRemoveDelete = useCallback(async (id) => {
        setLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Update local state by removing the address
        setAddress(prevAddresses => ({
            ...prevAddresses,
            content: prevAddresses.content.filter(addr => addr.id !== id),
            totalElements: prevAddresses.totalElements - 1
        }));

        setLoading(false);
        return { status: 200 };
    }, []);

    // Handle paginated address fetching
    const handleGetPaginatedAddress = (page, _size) => {
        setCurrentPage(page);
        setLoading(true);

        // Simulate pagination API call
        setTimeout(() => {
            // For testing, we'll just use the same data
            setLoading(false);
        }, 500);
    };

    // Close modal
    const onClose = () => {
        setOpenAddressModal(false);
        setSelectedAddress(null);
    };

    // Handle form submission (create or update address)
    const handleFinish = async (values, isCreate) => {
        try {
            setLoading(true);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            if (isCreate) {
                // Create new address
                const newAddress = {
                    id: Math.floor(Math.random() * 1000) + 10,
                    ...values
                };

                setAddress(prevState => ({
                    ...prevState,
                    content: [...prevState.content, newAddress],
                    totalElements: prevState.totalElements + 1
                }));
            } else {
                // Update address
                setAddress(prevState => ({
                    ...prevState,
                    content: prevState.content.map(addr =>
                        addr.id === selectedAddress.id ? { ...addr, ...values } : addr
                    )
                }));
            }

            setLoading(false);
            onClose();
        } catch (error) {
            console.error("Error creating/updating address:", error);
            setLoading(false);
        }
    };

    return (
        <LoadingOverlay isLoading={loading}>
            <div>
                <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
                    <div>
                        <Typography.Title2>
                            My Saved Address
                        </Typography.Title2>
                        <Typography.Description>
                            Manage your saved addresses for a smoother checkout experience.
                        </Typography.Description>
                    </div>
                    <Button
                        onClick={() => setOpenAddressModal(true)}
                        className="w-full md:w-fit md:px-4"
                    >
                        Add new address
                    </Button>
                </div>
                <div className="mt-9">
                    {loading ? (
                        <RowSkeleton count={3} />
                    ) : (
                        <>
                            {address?.content?.length > 0 ? (
                                address.content.map((addr, index) => (
                                    <MemoizedAddressCard
                                        address={addr}
                                        key={index}
                                        setOpenAddressModal={setOpenAddressModal}
                                        setSelectedAddress={setSelectedAddress}
                                        handleRemoveDelete={handleRemoveDelete}
                                    />
                                ))
                            ) : (
                                <EmptyDataSkeleton title={"No Address found"} />
                            )}
                        </>
                    )}
                </div>

                {address?.totalPages > 1 && (
                    <div className="mt-4">
                        <PaginationWrapper
                            pageSize={address.totalElements}
                            handlePagination={handleGetPaginatedAddress}
                            current={currentPage}
                        />
                    </div>
                )}

                <AddressModal
                    totalAddressCount={address?.content?.length || 0}
                    open={openAddressModal}
                    onClose={onClose}
                    isCreate={!selectedAddress}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                    onSubmit={handleFinish}
                />
            </div>
        </LoadingOverlay>
    );
};

export default AddressPage;
