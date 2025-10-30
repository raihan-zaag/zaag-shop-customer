"use client";
import { useRouter } from "next/navigation";
import { Input } from "@/common/components/ui/input";
import { Search, Loader2, X } from "lucide-react";

const SearchPopover = ({
    showSearchPopover,
    setShowSearchPopover,
    inputValue,
    setInputValue,
    handleInputChange,
    handleClearSearch,
    searchResults,
    isSearching,
    setSearchResults
}) => {
    const router = useRouter();

    if (!showSearchPopover) return null;

    return (
        <div className="fixed inset-0 z-50" onClick={() => setShowSearchPopover(false)}>
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[320px] sm:w-[400px] md:w-[500px]">
                <div
                    className="bg-background border border-border rounded-md shadow-md p-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-4">
                        <div className="relative mb-3">
                            <Input
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Search handicrafts, artisans, categories..."
                                className="pr-8"
                                autoFocus
                            />
                            {inputValue && (
                                <X
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 size-4 cursor-pointer hover:text-primary"
                                    onClick={handleClearSearch}
                                />
                            )}
                        </div>

                        {/* Search Results */}
                        <div className="max-h-80 overflow-y-auto">
                            {isSearching ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="size-6 animate-spin text-primary" />
                                    <span className="ml-2 text-sm text-muted-foreground">Searching...</span>
                                </div>
                            ) : searchResults.length > 0 ? (
                                <div className="space-y-1">
                                    <div className="text-xs text-muted-foreground mb-2 px-1">
                                        {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
                                    </div>
                                    {searchResults.map((result) => (
                                        <div
                                            key={result.id}
                                            className="p-3 hover:bg-muted rounded-md cursor-pointer transition-colors border border-transparent hover:border-border"
                                            onClick={() => {
                                                router.push(`/products/${result.id}`);
                                                setShowSearchPopover(false);
                                                setInputValue("");
                                                setSearchResults([]);
                                            }}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 min-w-0">
                                                    <span className="font-medium text-sm block truncate">{result.name}</span>
                                                    <span className="text-xs text-muted-foreground">{result.category}</span>
                                                </div>
                                                <span className="text-sm text-primary font-semibold ml-2">{result.price}</span>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pt-2 border-t border-border mt-2">
                                        <button
                                            className="w-full text-sm text-primary hover:text-primary/80 py-2 text-center transition-colors"
                                            onClick={() => {
                                                router.push(`/products?search=${encodeURIComponent(inputValue)}`);
                                                setShowSearchPopover(false);
                                                setInputValue("");
                                                setSearchResults([]);
                                            }}
                                        >
                                            View all results for &ldquo;{inputValue}&rdquo;
                                        </button>
                                    </div>
                                </div>
                            ) : inputValue.trim() ? (
                                <div className="py-8 text-center">
                                    <p className="text-sm text-muted-foreground mb-2">No products found for &ldquo;{inputValue}&rdquo;</p>
                                    <button
                                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                                        onClick={() => {
                                            router.push(`/products?search=${encodeURIComponent(inputValue)}`);
                                            setShowSearchPopover(false);
                                            setInputValue("");
                                            setSearchResults([]);
                                        }}
                                    >
                                        Search in all categories
                                    </button>
                                </div>
                            ) : (
                                <div className="py-6 text-center">
                                    <Search className="size-8 text-muted-foreground mx-auto mb-2" />
                                    <p className="text-sm text-muted-foreground">Start typing to search products...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPopover;
