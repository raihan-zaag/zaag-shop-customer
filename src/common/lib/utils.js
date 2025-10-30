import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export function generateBreadcrumbPath(routes, index) {
    if (routes[index] === "product-details") return "/" + routes.join("/");
    return "/" + routes.slice(0, index + 1).join("/");
}

export const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

export const formatTimestamp = (timestamp) => {
    // Convert the timestamp to a JavaScript Date object
    const date = new Date(Number(timestamp));

    // Get date components
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the time in 12-hour format with am/pm
    const amPm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, "0");

    // Construct the formatted date string
    return `${day} ${month}, ${year}, ${formattedHours}:${formattedMinutes} ${amPm}`;
};

export const formatText = (input) => {
    // Convert the input to lowercase and split by underscores
    const words = input.toLowerCase().split("_");

    // Capitalize the first letter of each word
    const formattedWords = words.map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Join the words with spaces and return
    return formattedWords.join(" ");
};

export const formatAddress = (data) => {
    // Destructure the object
    const {
        apartment = "",
        street = "",
        state = "",
        city = "",
        zipCode = "",
        country = "",
    } = data;

    // Build the address string
    let addressParts = [street, state, city];

    // Filter out empty fields and join the address parts
    let formattedAddress = addressParts.filter((part) => part).join(", ");

    // Append the zip code and country if available
    if (zipCode) formattedAddress += `, ${zipCode}`;
    if (country) formattedAddress += `, ${country}`;
    if (apartment) {
        const newApartment = `${apartment}, ` + formattedAddress;
        formattedAddress = newApartment;
    }

    return formattedAddress;
};

export const shallowEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) return false;
    }
    return true;
};

export function formatNumber(price) {
    if (!price) {
        return 0;
    }

    // return parseInt(price * 100) / 100
    return Math.round(price * 100) / 100;
}

export const formatDate = (timestamp) => {
    // Convert the timestamp to a JavaScript Date object
    const date = new Date(timestamp);

    // Get date components
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    // Construct the formatted date string
    return `${day} ${month} ${year}`;
};