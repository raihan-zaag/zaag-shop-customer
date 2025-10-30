'use client';

import * as React from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/common/lib/utils";
import { COUNTRY_CODES } from "@/common/config/constants/common";

const PhoneInput = React.forwardRef(({
    className,
    value = '',
    onChange,
    placeholder = "Enter phone number",
    hasError = false,
    countryCodes = COUNTRY_CODES, // Accept country codes via props, default to common array
    ...props
}, ref) => {
    const [selectedCountryCode, setSelectedCountryCode] = React.useState(''); 
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const dropdownRef = React.useRef(null);

    // Initialize with first country code or default based on available codes
    React.useEffect(() => {
        if (countryCodes.length > 0 && !selectedCountryCode) {
            setIsLoading(true);
            // Simulate loading time for country code initialization
            const timer = setTimeout(() => {
                setSelectedCountryCode(countryCodes[0].code);
                setIsLoading(false);
            }, 100); // Small delay to show loader

            return () => clearTimeout(timer);
        } else if (selectedCountryCode) {
            setIsLoading(false);
        }
    }, [countryCodes, selectedCountryCode]);

    // Parse initial value if provided
    React.useEffect(() => {
        if (value && !isLoading) {
            // Try to extract country code from the value
            const matchedCode = countryCodes.find(country =>
                value.startsWith(country.code)
            );

            if (matchedCode) {
                setSelectedCountryCode(matchedCode.code);
                setPhoneNumber(value.substring(matchedCode.code.length));
            } else {
                setPhoneNumber(value);
            }
        }
    }, [value, countryCodes, isLoading]);

    // Handle phone number change
    const handlePhoneNumberChange = (e) => {
        const newNumber = e.target.value.replace(/[^0-9]/g, ''); // Only allow digits
        setPhoneNumber(newNumber);

        // Combine country code and phone number
        const fullNumber = selectedCountryCode + newNumber;
        onChange?.(fullNumber);
    };

    // Handle country code change
    const handleCountryCodeChange = (code) => {
        setSelectedCountryCode(code);
        setIsDropdownOpen(false);

        // Update the full number with new country code
        const fullNumber = code + phoneNumber;
        onChange?.(fullNumber);
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Check if dropdown should be shown (only if multiple countries)
    const shouldShowDropdown = countryCodes.length > 1;

    return (
        <div className="relative">
            <div className={cn(
                "flex w-full h-12 rounded-primary border bg-background",
                hasError
                    ? "border-red-500 focus-within:ring-1 focus-within:ring-red-500 focus-within:border-red-500"
                    : "border-[var(--color-border)] focus-within:ring-1 focus-within:ring-[var(--color-primary)] focus-within:border-[var(--color-primary)]",
                "transition-colors duration-200",
                className
            )}>
                {/* Country Code Display/Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    {isLoading ? (
                        <div className="h-full flex items-center px-3 py-2 border-r border-border rounded-l-primary">
                            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                        </div>
                    ) : shouldShowDropdown ? (
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="h-full flex items-center px-3 py-2 border-r border-border rounded-l-primary hover:bg-gray-50 focus:outline-none"
                        >
                            <span className="text-sm mr-1">
                                {countryCodes.find(c => c.code === selectedCountryCode)?.flag}
                            </span>
                            <span className="text-sm font-medium">{selectedCountryCode}</span>
                            <ChevronDown
                                className={cn(
                                    "ml-1 h-4 w-4 transition-transform",
                                    isDropdownOpen && "rotate-180"
                                )}
                            />
                        </button>
                    ) : (
                        <div className="h-full flex items-center px-3 py-2 border-r border-border rounded-l-primary">
                            <span className="text-sm mr-1">
                                {countryCodes.find(c => c.code === selectedCountryCode)?.flag}
                            </span>
                            <span className="text-sm font-medium">{selectedCountryCode}</span>
                        </div>
                    )}

                    {/* Dropdown Menu - only show if multiple countries and dropdown is open */}
                    {!isLoading && shouldShowDropdown && isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-border rounded-primary shadow-lg z-50 max-h-60 overflow-auto">
                            {countryCodes.map((country) => (
                                <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => handleCountryCodeChange(country.code)}
                                    className={cn(
                                        "w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center",
                                        selectedCountryCode === country.code && "bg-gray-100"
                                    )}
                                >
                                    <span className="mr-2">{country.flag}</span>
                                    <span className="mr-2 font-medium">{country.code}</span>
                                    <span className="text-gray-500">{country.name || country.country}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Phone Number Input */}
                <input
                    ref={ref}
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder={isLoading ? "Loading..." : placeholder}
                    disabled={isLoading}
                    className={cn(
                        "flex-1 px-3 py-2 text-sm bg-transparent border-0 rounded-r-primary",
                        "text-[var(--color-text-primary)] placeholder-[var(--color-text-subtle)]",
                        "focus:outline-none",
                        "disabled:cursor-not-allowed disabled:opacity-60"
                    )}
                    {...props}
                />
            </div>
        </div>
    );
});

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
