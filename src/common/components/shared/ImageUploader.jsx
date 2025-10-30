"use client";
import { IMAGE_BASE_URL } from "@/common/config/constants/apiUrls";
import useImageUpload from "@/common/hooks/common/useImageUpload";
import { useRef } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import { Spinner } from "@/common/components/ui/spinner";

const ImageUploader = ({ profileImage, setProfileImage, isReadOnly }) => {
  const { uploadImage, loading } = useImageUpload();
  const fileInputRef = useRef(null); // Reference to the file input

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("files", file);
      const response = await uploadImage(formData, "profile");
      setProfileImage(`${IMAGE_BASE_URL}/${response[0]}`);
    }
  };

  const handleChangeImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click(); // Programmatically trigger the file input
    }
  };

  return (
    <div className="relative">
      <div className="relative w-30 h-30 rounded-full overflow-hidden bg-gray-100">
        <Image
          src={profileImage || "/images/image_placeholder.png"}
          alt="profile"
          fill
          className="object-cover"
        />
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Spinner size="md" className="text-white" />
          </div>
        )}
      </div>

      {!isReadOnly && (
        <button
          onClick={handleChangeImageClick}
          className="absolute bottom-0 right-0 w-8 h-8 bg-background rounded-full flex items-center justify-center border-2 border-white shadow-sm hover:bg-gray-100 transition-colors"
          disabled={loading}
        >
          <Camera className="size-4 text-primary" />
        </button>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUploader;
