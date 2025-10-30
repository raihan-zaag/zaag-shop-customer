"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import Typography from "@/common/components/Typography";
import { cn } from "@/common/lib/utils";

const QuantityControl = ({
  quantity,
  maxQuantity,
  onQuantityChange,
  disabled = false,
  className,
}) => {
  const handleDecrement = () => {
    if (quantity > 1 && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < maxQuantity && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  const canDecrement = quantity > 1 && !disabled;
  const canIncrement = quantity < maxQuantity && !disabled;

  return (
    <div className={cn("flex items-center border border-border rounded-primary px-2", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12 hover:bg-surface"
        onClick={handleDecrement}
        disabled={!canDecrement}
        aria-label="Decrease quantity"
      >
        <Minus className="w-4 h-4" />
      </Button>

      <Typography.Paragraph className="px-4 py-3 text-lg font-semibold min-w-[48px] text-center">
        {quantity.toString().padStart(2, "0")}
      </Typography.Paragraph>

      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12 hover:bg-surface"
        onClick={handleIncrement}
        disabled={!canIncrement}
        aria-label="Increase quantity"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default QuantityControl;
