// UploadCard.tsx
import React, { useRef, useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../store";
import { clearError } from "../../../../../store/slices/kycSlice";
import squareX from "../../../../../assets/square-x.svg";
import upload from "../../../../../assets/upload.svg";
import pdfIcon from "../../../../../assets/pdf-icon.svg";

interface UploadedFile {
  name: string;
  size: string;
  type: string;
  preview?: string;
}

interface UploadCardProps {
  title: string;
  onFileUpload: React.Dispatch<React.SetStateAction<File | null>>;
  fileType: 'businessCert' | 'proofOfAddress' | 'proofOfSourcing' | 'idCard';
}

const UploadCard: React.FC<UploadCardProps> = ({ title, onFileUpload, fileType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const uploadRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [uploadError, setUploadError] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      // Clear previous errors
      dispatch(clearError());
      setUploadError("");

      // File type validation
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        setUploadError("Invalid file type. Please upload PDF, JPG, or PNG files.");
        return;
      }

      // File size check (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setUploadError("File size must not exceed 5MB");
        return;
      }

      const fileSizeKB = (selectedFile.size / 1024).toFixed(2) + " KB";
      const isImage = selectedFile.type.startsWith("image/");
      const preview = isImage ? URL.createObjectURL(selectedFile) : undefined;

      setUploadedFile({
        name: selectedFile.name,
        size: fileSizeKB,
        type: selectedFile.type,
        preview,
      });

      // Update parent state
      onFileUpload(selectedFile);
    }
  };

  const handleRemoveClick = () => {
    setUploadedFile(null);
    setUploadError("");
    onFileUpload(null);
    if (uploadRef.current) {
      uploadRef.current.value = "";
    }
  };

  const handleClickUpload = () => {
    uploadRef.current?.click();
  };

  return (
    <div>
      <p className="text-base font-semibold text-customBrown pb-2">{title}</p>

      {uploadError && (
        <div className="mb-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {uploadError}
        </div>
      )}

      {!uploadedFile ? (
        <div
          className="border w-full px-4 py-6 rounded-[8px] flex flex-col items-center justify-center space-y-3 cursor-pointer hover:border-primary transition-colors"
          onClick={handleClickUpload}
        >
          <input
            type="file"
            ref={uploadRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept=".pdf,.jpg,.jpeg,.png"
            data-filetype={fileType}
          />
          <img src={upload} alt="Upload icon" className="w-[50px] h-[50px]" />
          <span className="text-sm font-normal text-[#5E5E5E] text-center">
            <span className="underline text-primary">Click to upload</span> or
            drag a copy of your valid identification in PDF, JPG or PNG. File
            size must not exceed 5MB
          </span>
        </div>
      ) : (
        <div className="border w-full px-4 py-4 rounded-[8px] flex items-center space-x-4 bg-gray-50">
          {/* File Thumbnail */}
          {uploadedFile.type === "application/pdf" ? (
            <img src={pdfIcon} alt="PDF" className="w-[50px] h-[50px]" />
          ) : (
            <img
              src={uploadedFile.preview}
              alt="Preview"
              className="w-[50px] h-[50px] object-cover rounded"
            />
          )}

          {/* File Info */}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {uploadedFile.name}
            </p>
            <p className="text-xs text-gray-500">{uploadedFile.size}</p>
            <div className="w-full bg-gray-200 rounded-full h-[6px] mt-2">
              <div
                className="bg-primary h-[6px] rounded-full"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>

          {/* Remove Button */}
          <button 
            onClick={handleRemoveClick}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            aria-label="Remove file"
          >
            <img src={squareX} alt="Remove" className="w-[16px] h-[16px]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadCard;