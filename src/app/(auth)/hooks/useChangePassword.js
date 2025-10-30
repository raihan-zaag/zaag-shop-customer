import { useState } from "react";
import { axiosPrivate } from "@/common/config/axios.publicInstance";
import { CHANGE_PASSWORD } from "@/common/config/constants/apiUrls";
import useNotification from "@/common/hooks/useNotification";

const useChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { openSuccessNotification, openErrorNotification } = useNotification();

  const changePassword = async (passwordData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPrivate.patch(CHANGE_PASSWORD, passwordData);

      if (response?.status === 200) {
        openSuccessNotification(
          "Success",
          response?.data?.message || "Password changed successfully."
        );
        return response;
      }
    } catch (err) {
      const errorMessage = err?.response?.data?.message || "Failed to change password";
      setError(errorMessage);
      openErrorNotification("Error", errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { changePassword, loading, error };
};

export default useChangePassword;
