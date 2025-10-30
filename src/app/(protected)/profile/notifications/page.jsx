'use client';

import { useState } from 'react';
import Typography from '@/common/components/Typography';
import { Button } from '@/common/components/ui';
import PaginationWrapper from '@/common/components/pagination';
import { CheckCheck } from 'lucide-react';

// Sample notification data
const sampleNotifications = [
    {
        id: 1,
        title: 'You have successfully placed your order.',
        content: `Order ID: #12345
Date: 19 August 2025
Total: $249.00

We'll notify you once your package is shipped.

If this order was not made by you, please contact support`,
        isRead: false,
        timestamp: '2 hours ago'
    },
    {
        id: 2,
        title: 'Your order has been shipped.',
        content: `Order ID: #12346
Tracking Number: NH123456789
Estimated Delivery: 22 August 2025

You can track your package using the tracking number above.`,
        isRead: true,
        timestamp: '1 day ago'
    },
    {
        id: 3,
        title: 'New products available in your wishlist category.',
        content: `We've added new handcrafted items that match your interests.
Check out the latest collections from our featured artisans.

Visit our products page to explore more.`,
        isRead: false,
        timestamp: '3 days ago'
    },
    // Add more sample notifications...
    ...Array.from({ length: 20 }, (_, i) => ({
        id: i + 4,
        title: `Sample notification ${i + 4}`,
        content: `This is a sample notification content for notification ${i + 4}. It contains some placeholder text to demonstrate the layout.`,
        isRead: i % 3 === 0,
        timestamp: `${i + 1} days ago`
    }))
];

const NotificationPage = () => {
    const [activeTab, setActiveTab] = useState({ title: 'All' });
    const [currentPage, setCurrentPage] = useState(1);
    const [notifications, setNotifications] = useState(sampleNotifications);

    const itemsPerPage = 10;

    // Tab configuration
    const tabs = [
        { title: 'All' },
        { title: `Unread (${notifications.filter(n => !n.isRead).length})` }
    ];

    // Filter notifications based on active tab
    const filteredNotifications = activeTab.title === 'All'
        ? notifications
        : notifications.filter(n => !n.isRead);

    // Pagination
    const totalItems = filteredNotifications.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + itemsPerPage);

    // Mark all as read handler
    const handleMarkAllAsRead = () => {
        setNotifications(prev => prev.map(notification => ({ ...notification, isRead: true })));
    };

    // Handle pagination
    const handlePagination = (page) => {
        setCurrentPage(page);
    };

    // Reset pagination when tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
    };

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="bg-white mb-6">
                {/* Title and Subtitle */}
                <div className="mb-9">
                    <div className="mb-1">
                        <Typography.Title1 className="text-[20px] font-semibold leading-[24.2px] text-[#2A2A2A]">
                            Notifications
                        </Typography.Title1>
                    </div>
                    <Typography.Description className="text-[16px] font-normal leading-[24px] text-[#515151]">
                        Stay updated with your latest notification
                    </Typography.Description>
                </div>

                {/* Filter and Mark All Section */}
                <div className="flex justify-between items-center border-b border-[#E6E6E6] pb-2">
                    {/* Tabs */}
                    <div className="flex items-center gap-2">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => handleTabChange(tab)}
                                className={`px-0 py-2 text-[14px] font-medium leading-[21px] ${activeTab.title === tab.title
                                    ? 'text-primary'
                                    : 'text-text-primary'
                                    }`}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>

                    {/* Mark All as Read */}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMarkAllAsRead}
                        className="flex items-center gap-1.5 px-0 py-0 h-auto text-[14px] font-medium leading-[21px] text-[#3EB345] hover:bg-transparent"
                    >
                        <CheckCheck className="w-5 h-5 text-primary" />
                        Mark all as read
                    </Button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-0">
                {paginatedNotifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`flex w-full p-5 border-b ${notification.isRead
                            ? 'border-[#E6E6E6] bg-white'
                            : 'border-[#E4FFE4] bg-[#FBFFFB]'
                            }`}
                    >
                        <div className="flex flex-col justify-center flex-1 gap-[7px]">
                            <Typography.Title3 className="text-[14px] font-semibold leading-[16.94px] text-[#2A2A2A]">
                                {notification.title}
                            </Typography.Title3>
                            <div className="flex items-center gap-1.5">
                                <Typography.SmallText className="whitespace-pre-line">
                                    {notification.content}
                                </Typography.SmallText>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <PaginationWrapper
                        pageSize={totalItems}
                        handlePagination={handlePagination}
                        current={currentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default NotificationPage;