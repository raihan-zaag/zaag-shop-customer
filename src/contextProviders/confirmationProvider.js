"use client";

import { createContext, useContext, useState, useCallback } from "react";
import ConfirmationDialog from "@/common/components/shared/ConfirmationDialog";

// Create the context
const ConfirmationContext = createContext({
  showConfirmation: () => Promise.resolve(false),
});

/**
 * Provider component for the confirmation dialog
 */
export const ConfirmationProvider = ({ children }) => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    title: "Confirm Action",
    message: "Are you sure you want to proceed with this action?",
    confirmText: "Confirm",
    cancelText: "Cancel",
    confirmVariant: "destructive",
    onConfirm: () => {},
    onCancel: () => {},
  });

  /**
   * Shows a confirmation dialog and returns a promise that resolves when the user responds
   * 
   * @param {Object} options - Configuration for the confirmation dialog
   * @param {string} options.title - The title of the confirmation dialog
   * @param {string|JSX.Element} options.message - The message to display in the dialog
   * @param {string} options.confirmText - The text for the confirm button
   * @param {string} options.cancelText - The text for the cancel button
   * @param {string} options.confirmVariant - The variant for the confirm button
   * @returns {Promise<boolean>} A promise that resolves to true if confirmed, false if canceled
   */
  const showConfirmation = useCallback(({
    title = "Confirm Action",
    message = "Are you sure you want to proceed with this action?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmVariant = "destructive",
  } = {}) => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        title,
        message,
        confirmText,
        cancelText,
        confirmVariant,
        onConfirm: () => {
          setDialogState((prev) => ({ ...prev, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          setDialogState((prev) => ({ ...prev, isOpen: false }));
          resolve(false);
        },
      });
    });
  }, []);

  return (
    <ConfirmationContext.Provider value={{ showConfirmation }}>
      {children}
      <ConfirmationDialog
        open={dialogState.isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) dialogState.onCancel();
        }}
        title={dialogState.title}
        message={dialogState.message}
        confirmText={dialogState.confirmText}
        cancelText={dialogState.cancelText}
        onConfirm={dialogState.onConfirm}
        onCancel={dialogState.onCancel}
        confirmVariant={dialogState.confirmVariant}
      />
    </ConfirmationContext.Provider>
  );
};

/**
 * Hook to use the confirmation dialog
 * @returns {Function} showConfirmation - Function to show a confirmation dialog
 */
export const useConfirmation = () => useContext(ConfirmationContext);
