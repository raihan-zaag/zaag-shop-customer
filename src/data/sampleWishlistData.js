/**
 * Sample wishlist data for development and testing
 */

export const sampleWishlistData = [
  {
    id: "wl-001",
    product: {
      id: "p-001",
      name: "Pleta Woven Jute Carrying Bag",
      regularPrice: 30.00,
      priceAfterDiscount: null,
      thumbnailImage: "/images/image_placeholder.png", // Using placeholder to ensure it works
      stock: 12,
      description: "Handcrafted jute bag made by local artisans using traditional techniques.",
      rating: 4.5
    }
  },
  {
    id: "wl-002",
    product: {
      id: "p-002",
      name: "Casual Round Neck T-Shirt",
      regularPrice: 29.99,
      priceAfterDiscount: 24.99,
      thumbnailImage: "/images/image_placeholder.png", // Using placeholder to ensure it works
      stock: 0,
      description: "Comfortable 100% cotton t-shirt with traditional Nordic patterns.",
      rating: 4.2
    }
  },
  {
    id: "wl-003",
    product: {
      id: "p-003",
      name: "Handcrafted Ceramic Coffee Mug",
      regularPrice: 18.50,
      priceAfterDiscount: null,
      thumbnailImage: "/images/image_placeholder.png", // Using placeholder to ensure it works
      stock: 5,
      description: "Beautiful ceramic mug handmade by skilled artisans from northern Sweden.",
      rating: 4.8
    }
  },
  {
    id: "wl-004",
    product: {
      id: "p-004",
      name: "Woven Wall Hanging Tapestry",
      regularPrice: 75.00,
      priceAfterDiscount: 62.50,
      thumbnailImage: "/images/image_placeholder.png", // Using placeholder to ensure it works
      stock: 3,
      description: "Traditional wall hanging with intricate patterns, handwoven by local artisans.",
      rating: 4.9
    }
  },
  {
    id: "wl-005",
    product: {
      id: "p-005",
      name: "Hand-Carved Wooden Spoon Set",
      regularPrice: 45.00,
      priceAfterDiscount: null,
      thumbnailImage: "/images/image_placeholder.png", // Using placeholder to ensure it works
      stock: 0,
      description: "Set of 3 hand-carved wooden spoons made from sustainable birch wood.",
      rating: 4.7
    }
  },
  {
    id: "wl-006",
    product: {
      id: "p-006",
      name: "Nordic Pattern Wool Mittens",
      regularPrice: 35.00,
      priceAfterDiscount: 29.75,
      thumbnailImage: "/images/image_placeholder.png", // Using placeholder to ensure it works
      stock: 8,
      description: "Warm and stylish mittens knitted with traditional Nordic patterns.",
      rating: 4.6
    }
  }
];

/**
 * Function to simulate fetching wishlist data
 * @returns {Promise} Promise that resolves to the sample wishlist data
 */
export const fetchSampleWishlistData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          content: sampleWishlistData,
          pagination: {
            totalItems: sampleWishlistData.length,
            totalPages: 1,
            currentPage: 1,
            itemsPerPage: 10
          }
        }
      });
    }, 800); // Simulate network delay
  });
};

/**
 * Function to simulate removing an item from the wishlist
 * @param {string} productId - The ID of the product to remove
 * @returns {Promise} Promise that resolves to a success response
 */
export const removeSampleWishlistItem = (productId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          message: "Item removed from wishlist successfully",
          removedProductId: productId
        }
      });
    }, 500); // Simulate network delay
  });
};
