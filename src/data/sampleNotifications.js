// Sample notification data
export const sampleNotifications = [
  {
    id: 1,
    title: "Order Shipped",
    message: "Your order #12345 has been shipped and is on its way!",
    type: "info",
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    icon: "package"
  },
  {
    id: 2,
    title: "New Promotion",
    message: "Get 20% off on all handcrafted pottery items. Limited time offer!",
    type: "promotion",
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    icon: "tag"
  },
  {
    id: 3,
    title: "Order Delivered",
    message: "Your order #12344 has been successfully delivered.",
    type: "success",
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    icon: "check-circle"
  },
  {
    id: 4,
    title: "Payment Reminder",
    message: "Your payment for order #12343 is due in 2 days.",
    type: "warning",
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    icon: "credit-card"
  },
  {
    id: 5,
    title: "Welcome to Northern Handicrafts",
    message: "Thank you for joining us! Explore our collection of authentic handcrafted items.",
    type: "info",
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    icon: "heart"
  },
  {
    id: 6,
    title: "Product Back in Stock",
    message: "The Handwoven Basket you wishlisted is now available!",
    type: "info",
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    icon: "refresh-cw"
  },
  {
    id: 7,
    title: "Review Request",
    message: "How was your experience with your recent purchase? Leave a review!",
    type: "info",
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    icon: "star"
  }
];

// Helper function to get recent notifications (last 5)
export const getRecentNotifications = () => {
  return sampleNotifications
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);
};

// Helper function to get unread count
export const getUnreadCount = () => {
  return sampleNotifications.filter(notification => !notification.isRead).length;
};

// Helper function to format relative time
export const formatRelativeTime = (timestamp) => {
  const now = new Date();
  const diff = now - new Date(timestamp);
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
};
