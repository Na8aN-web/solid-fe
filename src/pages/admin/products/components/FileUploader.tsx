import React, { useRef, useState, ChangeEvent } from "react";
import { ImagePlus } from "lucide-react";

interface FileUploaderProps {
  onUpload?: () => void;
  onRemove?: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, onRemove }) => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
      onUpload?.();
    }
  };

  const handleReplaceClick = () => {
    uploadRef.current?.click();
  };

  const handleRemoveClick = () => {
    setPreviewUrl(null);
    if (uploadRef.current) {
      uploadRef.current.value = "";
    }
    onRemove?.();
  };

  return (
    <div className="relative w-full h-full group">
      {/* Hidden file input */}
      <input
        type="file"
        ref={uploadRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*"
      />

      {previewUrl ? (
        <>
          {/* Preview image */}
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover rounded-[12px]"
          />

          {/* Hover overlay with buttons */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300 rounded-[12px]">
            <button
              onClick={handleReplaceClick}
              className="bg-white text-primary text-sm font-normal px-3 py-1 rounded mb-2 hover:bg-gray-100"
            >
              Replace
            </button>
            <button
              onClick={handleRemoveClick}
              className="bg-white text-red-600 text-sm font-normal px-3 py-1 rounded hover:bg-red-700 hover:text-white"
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={handleReplaceClick}
          className="flex flex-col items-center justify-center w-full h-full text-center"
        >
          <ImagePlus className="pb-1" />
          <p className="text-sm font-medium text-customBrown">
            <span className="underline text-sm font-medium text-primary">Click to upload</span> or drag and drop
          </p>
        </button>
      )}
    </div>
  );
};

export default FileUploader;
