/**
 * Sample Order Data for testing the My Orders page
 * This includes both active orders and order history
 */

export const sampleActiveOrders = [
  {
    id: 1,
    invoiceNumber: "3513511",
    createdAt: new Date(2025, 7, 25, 10, 30).toISOString(), // August 25, 2025, 10:30 AM
    orderStatus: "ORDER_PLACED",
    paymentMethod: "Credit Card",
    paymentStatus: "PAID",
    transactionId: "TXN48329174",
    invoice: {
      totalFinalPrice: 1515.66,
      subtotal: 1400.00,
      shippingCost: 35.00,
      tax: 80.66
    },
    shippingAddress: {
      name: "John Andersson",
      addressLine1: "123 Main Street",
      city: "Stockholm",
      state: "Stockholm County",
      postalCode: "11130",
      country: "Sweden",
      phone: "+46 70 123 4567"
    },
    orderItems: [
      {
        id: 101,
        product: {
          id: "p101",
          name: "Handcrafted Wool Blanket",
          image: "/images/image_placeholder.png"
        },
        quantity: 2,
        price: 450.00,
        color: "Gray",
        size: "Large"
      },
      {
        id: 102,
        product: {
          id: "p102",
          name: "Decorative Wooden Bowl",
          image: "/images/image_placeholder.png"
        },
        quantity: 1,
        price: 500.00,
        color: "Natural",
        size: "Medium"
      }
    ]
  },
  {
    id: 2,
    invoiceNumber: "3513512",
    createdAt: new Date(2025, 7, 28, 15, 45).toISOString(), // August 28, 2025, 3:45 PM
    orderStatus: "PAYMENT_PENDING",
    paymentMethod: "Bank Transfer",
    paymentStatus: "PENDING",
    transactionId: "TXN48329175",
    invoice: {
      totalFinalPrice: 899.99,
      subtotal: 850.00,
      shippingCost: 20.00,
      tax: 29.99
    },
    shippingAddress: {
      name: "Maria Lindström",
      addressLine1: "456 Pine Avenue",
      city: "Gothenburg",
      state: "Västra Götaland County",
      postalCode: "41456",
      country: "Sweden",
      phone: "+46 73 456 7890"
    },
    orderItems: [
      {
        id: 103,
        product: {
          id: "p103",
          name: "Hand-painted Ceramic Set",
          image: "/images/image_placeholder.png"
        },
        quantity: 1,
        price: 850.00
      }
    ]
  },
  {
    id: 3,
    invoiceNumber: "3513513",
    createdAt: new Date(2025, 7, 30, 9, 20).toISOString(), // August 30, 2025, 9:20 AM
    orderStatus: "SHIPPED",
    paymentMethod: "Credit Card",
    paymentStatus: "PAID",
    transactionId: "TXN48329176",
    invoice: {
      totalFinalPrice: 1250.50,
      subtotal: 1150.00,
      shippingCost: 40.50,
      tax: 60.00
    },
    shippingAddress: {
      name: "Erik Johansson",
      addressLine1: "789 Oak Lane",
      city: "Malmö",
      state: "Skåne County",
      postalCode: "21115",
      country: "Sweden",
      phone: "+46 76 789 1234"
    },
    orderItems: [
      {
        id: 104,
        product: {
          id: "p104",
          name: "Artisanal Wall Hanging",
          image: "/public/images/image_placeholder.png"
        },
        quantity: 1,
        price: 750.00,
        color: "Multicolor"
      },
      {
        id: 105,
        product: {
          id: "p105",
          name: "Handwoven Table Runner",
          image: "/images/image_placeholder.png"
        },
        quantity: 2,
        price: 200.00,
        color: "Red",
        size: "2m"
      }
    ]
  }
];

export const sampleOrderHistory = [
  {
    id: 4,
    invoiceNumber: "3513500",
    createdAt: new Date(2025, 6, 15, 11, 25).toISOString(), // July 15, 2025, 11:25 AM
    orderStatus: "DELIVERED",
    paymentMethod: "Credit Card",
    paymentStatus: "PAID",
    transactionId: "TXN48329165",
    invoice: {
      totalFinalPrice: 1875.25,
      subtotal: 1750.00,
      shippingCost: 45.00,
      tax: 80.25
    },
    shippingAddress: {
      name: "Anna Nilsson",
      addressLine1: "101 Birch Road",
      city: "Uppsala",
      state: "Uppsala County",
      postalCode: "75236",
      country: "Sweden",
      phone: "+46 70 321 6547"
    },
    orderItems: [
      {
        id: 106,
        product: {
          id: "p106",
          name: "Traditional Sami Bracelet",
          image: "https://images.unsplash.com/photo-1610616920120-ddaf2afcacf4?q=80&w=2070&auto=format&fit=crop"
        },
        quantity: 3,
        price: 350.00,
        color: "Silver & Blue"
      },
      {
        id: 107,
        product: {
          id: "p107",
          name: "Carved Wooden Reindeer",
          image: "/images/image_placeholder.png"
        },
        quantity: 1,
        price: 700.00,
        size: "Medium"
      }
    ]
  },
  {
    id: 5,
    invoiceNumber: "3513489",
    createdAt: new Date(2025, 6, 2, 16, 10).toISOString(), // July 2, 2025, 4:10 PM
    orderStatus: "DELIVERED",
    paymentMethod: "PayPal",
    paymentStatus: "PAID",
    transactionId: "TXN48329154",
    invoice: {
      totalFinalPrice: 765.30,
      subtotal: 700.00,
      shippingCost: 30.00,
      tax: 35.30
    },
    shippingAddress: {
      name: "Karl Svensson",
      addressLine1: "222 Maple Street",
      city: "Linköping",
      state: "Östergötland County",
      postalCode: "58000",
      country: "Sweden",
      phone: "+46 76 543 2109"
    },
    orderItems: [
      {
        id: 108,
        product: {
          id: "p108",
          name: "Handmade Linen Tablecloth",
          image: "/images/image_placeholder.png"
        },
        quantity: 1,
        price: 450.00,
        color: "White",
        size: "200x140cm"
      },
      {
        id: 109,
        product: {
          id: "p109",
          name: "Traditional Glass Ornaments",
          image: "/images/image_placeholder.png"
        },
        quantity: 5,
        price: 50.00,
        color: "Assorted"
      }
    ]
  },
  {
    id: 6,
    invoiceNumber: "3513472",
    createdAt: new Date(2025, 5, 18, 13, 40).toISOString(), // June 18, 2025, 1:40 PM
    orderStatus: "ORDER_CANCELED",
    paymentMethod: "Credit Card",
    paymentStatus: "REFUNDED",
    transactionId: "TXN48329139",
    invoice: {
      totalFinalPrice: 1200.00,
      subtotal: 1120.00,
      shippingCost: 25.00,
      tax: 55.00
    },
    shippingAddress: {
      name: "Sofia Berg",
      addressLine1: "333 Cedar Avenue",
      city: "Umeå",
      state: "Västerbotten County",
      postalCode: "90187",
      country: "Sweden",
      phone: "+46 70 987 6543"
    },
    orderItems: [
      {
        id: 110,
        product: {
          id: "p110",
          name: "Hand-carved Wooden Spoon Set",
          image: "/images/image_placeholder.png"
        },
        quantity: 2,
        price: 320.00,
        wood: "Birch"
      },
      {
        id: 111,
        product: {
          id: "p111",
          name: "Traditional Woolen Socks",
          image: "/images/image_placeholder.png"
        },
        quantity: 4,
        price: 120.00,
        color: "Nordic Pattern",
        size: "Medium"
      }
    ]
  },
  {
    id: 7,
    invoiceNumber: "3513460",
    createdAt: new Date(2025, 5, 5, 9, 15).toISOString(), // June 5, 2025, 9:15 AM
    orderStatus: "DELIVERED",
    paymentMethod: "Credit Card",
    paymentStatus: "PAID",
    transactionId: "TXN48329128",
    invoice: {
      totalFinalPrice: 2199.99,
      subtotal: 2050.00,
      shippingCost: 50.00,
      tax: 99.99
    },
    shippingAddress: {
      name: "Henrik Lundqvist",
      addressLine1: "444 Elm Street",
      city: "Lund",
      state: "Skåne County",
      postalCode: "22100",
      country: "Sweden",
      phone: "+46 73 654 3210"
    },
    orderItems: [
      {
        id: 112,
        product: {
          id: "p112",
          name: "Traditional Handwoven Rug",
          image: "/images/image_placeholder.png"
        },
        quantity: 1,
        price: 1200.00,
        color: "Traditional Red",
        size: "200x150cm"
      },
      {
        id: 113,
        product: {
          id: "p113",
          name: "Artisanal Leather Journal",
          image: "/images/image_placeholder.png"
        },
        quantity: 2,
        price: 425.00,
        color: "Brown",
        size: "A5"
      }
    ]
  }
];

// Combined data for easy access
export const sampleAllOrders = [...sampleActiveOrders, ...sampleOrderHistory];

// Helper function to mock API response with pagination
export const getPagedOrders = (orders, page = 0, size = 10, searchQuery = "") => {
  let filteredOrders = [...orders];
  
  // Apply search filter if provided
  if (searchQuery) {
    filteredOrders = filteredOrders.filter(order => 
      order.invoiceNumber.includes(searchQuery)
    );
  }
  
  // Calculate pagination
  const start = page * size;
  const end = start + size;
  const pagedData = filteredOrders.slice(start, end);
  
  return pagedData;
};
