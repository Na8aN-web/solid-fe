import React, { useRef, useState, ChangeEvent } from "react";
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
}

const UploadCard: React.FC<UploadCardProps> = ({ title, onFileUpload }) => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];

      // File size check (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size must not exceed 5MB");
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

      //  Update parent state
      onFileUpload(selectedFile);
    }
  };

  const handleRemoveClick = () => {
    setUploadedFile(null);
    onFileUpload(null); // Clear parent state
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

      {!uploadedFile ? (
        <div
          className="border w-full px-4 py-6 rounded-[8px] flex flex-col items-center justify-center space-y-3 cursor-pointer"
          onClick={handleClickUpload}
        >
          <input
            type="file"
            ref={uploadRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept=".pdf, image/*"
          />
          <img src={upload} alt="Upload icon" className="w-[50px] h-[50px]" />
          <span className="text-sm font-normal text-[#5E5E5E] text-center">
            <span className="underline text-primary">Click to upload</span> or
            drag a copy of your valid identification in PDF, JPG or PNG. File
            size must not exceed 5MB
          </span>
        </div>
      ) : (
        <div className="border w-full px-4 py-4 rounded-[8px] flex items-center space-x-4">
          {/* File Thumbnail */}
          {uploadedFile.type === "application/pdf" ? (
            <img src={pdfIcon} alt="PDF" className="w-[80px] h-[80px]" />
          ) : (
            <img
              src={uploadedFile.preview}
              alt="Preview"
              className="w-[50px] h-[50px] object-cover rounded"
            />
          )}

          {/* File Info */}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">
              {uploadedFile.name}
            </p>
            <p className="text-xs text-gray-500">{uploadedFile.size}</p>
            <div className="w-full bg-gray-200 rounded-full h-[6px] mt-2">
              <div
                className="bg-primary h-[6px] rounded-full"
                style={{ width: "100%" }} // static 100% for now
              ></div>
            </div>
          </div>

          {/* Remove Button */}
          <button onClick={handleRemoveClick}>
            <img src={squareX} alt="" className="w-[16px] h-[18px]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadCard;
