"use client";

import { AlertTriangle } from "lucide-react";
import Typography from "@/common/components/Typography";
import { Button } from "@/common/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/common/components/ui/dialog";

/**
 * A reusable confirmation dialog component for confirming user actions
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.open - Whether the dialog is open
 * @param {Function} props.onOpenChange - Function to call when the open state changes
 * @param {string} props.title - Title of the confirmation dialog
 * @param {string|JSX.Element} props.message - Content message of the dialog
 * @param {string} props.confirmText - Text for the confirm button
 * @param {string} props.cancelText - Text for the cancel button
 * @param {Function} props.onConfirm - Function to call when the user confirms
 * @param {Function} props.onCancel - Function to call when the user cancels
 * @param {'primary'|'destructive'|'outline'} props.confirmVariant - Button variant for the confirm button
 * @param {React.ReactNode} props.icon - Icon to display in the dialog title
 */
const ConfirmationDialog = ({
  open,
  onOpenChange,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmVariant = "destructive",
  icon = <AlertTriangle className="size-5 text-destructive" />,
}) => {
  // Handler for cancel button click
  const handleCancel = () => {
    if (onCancel) onCancel();
    onOpenChange(false);
  };

  // Handler for confirm button click
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {icon}
            {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {typeof message === "string" ? (
            <Typography.Paragraph>{message}</Typography.Paragraph>
          ) : (
            message
          )}
        </div>
        
        <DialogFooter className="flex gap-3 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleCancel}
            size="lg"
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={handleConfirm}
            size="lg"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
