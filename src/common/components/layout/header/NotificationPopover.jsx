"use client";
import { useState, useEffect } from "react";
import {
    Bell,
    Package,
    Tag,
    CheckCircle,
    CreditCard,
    Heart,
    RefreshCw,
    Star,
    Settings
} from "lucide-react";
import { cn } from "@/common/lib/utils";
import Typography from "@/common/components/Typography";
import { Button } from "@/common/components/ui/button";
import { getRecentNotifications, getUnreadCount, formatRelativeTime } from "@/data/sampleNotifications";

// Icon mapping for notification types
const iconMap = {
    package: Package,
    tag: Tag,
    "check-circle": CheckCircle,
    "credit-card": CreditCard,
    heart: Heart,
    "refresh-cw": RefreshCw,
    star: Star,
};

const NotificationPopover = ({ onMarkAllRead, onViewAll, onNotificationCountChange }) => {
    const [notifications, setNotifications] = useState(getRecentNotifications());
    const [unreadCount, setUnreadCount] = useState(getUnreadCount());

    // Update parent component when unread count changes
    useEffect(() => {
        if (onNotificationCountChange) {
            onNotificationCountChange(unreadCount);
        }
    }, [unreadCount, onNotificationCountChange]);

    const handleMarkAllRead = () => {
        // Update local state to mark all as read
        const updatedNotifications = notifications.map(notification => ({
            ...notification,
            isRead: true
        }));
        setNotifications(updatedNotifications);
        setUnreadCount(0);
        onMarkAllRead();
    };

    const handleNotificationClick = (notificationId) => {
        // Mark single notification as read
        const updatedNotifications = notifications.map(notification =>
            notification.id === notificationId
                ? { ...notification, isRead: true }
                : notification
        );
        setNotifications(updatedNotifications);

        // Update unread count
        const newUnreadCount = updatedNotifications.filter(n => !n.isRead).length;
        setUnreadCount(newUnreadCount);
    };

    const getNotificationIcon = (iconName) => {
        const IconComponent = iconMap[iconName] || Bell;
        return <IconComponent className="w-4 h-4" />;
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'success':
                return 'text-success';
            case 'warning':
                return 'text-warning';
            case 'promotion':
                return 'text-primary';
            default:
                return 'text-text-secondary';
        }
    };

    return (
        <>
            {/* Header */}
            <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-primary" />
                        <Typography.Title2 className="text-text-primary">
                            Notifications
                        </Typography.Title2>
                        {unreadCount > 0 && (
                            <span className="bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="p-4 border-b border-border">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleMarkAllRead}
                        disabled={unreadCount === 0}
                        className="flex-1"
                    >
                        Mark all read
                    </Button>
                </div>
            </div>

            {/* Notifications list */}
            <div className="flex-1 overflow-y-auto scrollbar-thin max-h-80 lg:max-h-64">
                {notifications.length > 0 ? (
                    <div className="divide-y divide-border">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                onClick={() => handleNotificationClick(notification.id)}
                                className={cn(
                                    "p-4 cursor-pointer hover:bg-surface transition-colors",
                                    !notification.isRead && "bg-surface/50"
                                )}
                            >
                                <div className="flex items-start gap-3">
                                    <div className={cn(
                                        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                                        notification.isRead ? "bg-border" : "bg-primary/10"
                                    )}>
                                        <span className={cn(
                                            getTypeColor(notification.type),
                                            !notification.isRead && "text-primary"
                                        )}>
                                            {getNotificationIcon(notification.icon)}
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <Typography.Title3 className={cn(
                                                "line-clamp-1",
                                                !notification.isRead && "font-semibold"
                                            )}>
                                                {notification.title}
                                            </Typography.Title3>
                                            <Typography.SmallText className="flex-shrink-0">
                                                {formatRelativeTime(notification.timestamp)}
                                            </Typography.SmallText>
                                        </div>

                                        <Typography.BodyText className="line-clamp-2 mt-1">
                                            {notification.message}
                                        </Typography.BodyText>

                                        {!notification.isRead && (
                                            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <Bell className="w-12 h-12 text-text-subtle mx-auto mb-2" />
                        <Typography.Title3 className="text-text-subtle">
                            No notifications
                        </Typography.Title3>
                        <Typography.BodyText className="text-text-subtle mt-1">
                            You&apos;re all caught up!
                        </Typography.BodyText>
                    </div>
                )}
            </div>

            {/* Footer - show notification settings button */}
            <div className="p-4 border-t border-border">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={onViewAll}
                >
                    <Settings className="w-4 h-4 mr-2" />
                    View all notifications
                </Button>
            </div>
        </>
    );
};

export default NotificationPopover;
