// import React, { useRef, useState, ChangeEvent } from "react";
// import { ImagePlus, Upload } from "lucide-react";

// interface FileUploaderProps {
//   onUpload: (imageData: string) => void; // Changed to pass image data
//   onRemove: () => void;
// }

// // If your FileUploader component needs to be updated, here's a basic implementation:
// const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, onRemove }) => {
//   const [uploaded, setUploaded] = useState(false);
//   const [preview, setPreview] = useState<string>("");

//   // const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file = e.target.files?.[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       const result = reader.result as string;
//   //       setPreview(result);
//   //       setUploaded(true);
//   //       onUpload(result); // Pass the image data back to parent
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };

//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // Compress image to reduce size
//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       const img = new Image();
      
//       img.onload = () => {
//         // Resize to max 600px width/height
//         const maxSize = 600;
//         let { width, height } = img;
        
//         if (width > height) {
//           if (width > maxSize) {
//             height = (height * maxSize) / width;
//             width = maxSize;
//           }
//         } else {
//           if (height > maxSize) {
//             width = (width * maxSize) / height;
//             height = maxSize;
//           }
//         }
        
//         canvas.width = width;
//         canvas.height = height;
//         ctx?.drawImage(img, 0, 0, width, height);
        
//         // Compress to 60% quality
//         const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.6);
        
//         setPreview(compressedDataUrl);
//         setUploaded(true);
//         onUpload(compressedDataUrl);
//       };
      
//       img.src = URL.createObjectURL(file);
//     }
//   };
  
//   const handleRemove = () => {
//     setPreview("");
//     setUploaded(false);
//     onRemove();
//   };

//   return (
//     <div className="w-full h-full relative">
//     {!uploaded ? (
//       <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
//         <Upload className="w-8 h-8 text-gray-400 mb-2" />
//         <span className="text-sm text-gray-500">Click to upload</span>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileSelect}
//           className="hidden"
//         />
//       </label>
//     ) : (
//       <div className="w-full h-full relative">
//         <img 
//           src={preview} 
//           alt="Preview" 
//           className="w-full h-full object-cover rounded"
//         />
//         <button
//           type="button"
//           onClick={handleRemove}
//           className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
//         >
//           ×
//         </button>
//       </div>
//     )}
//   </div>
//   );
// };

// export default FileUploader;

import React, { useState, ChangeEvent } from "react";
import { Upload } from "lucide-react";

interface FileUploaderProps {
  onUpload: (file: File) => void;  // Send file instead of base64
  onRemove: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, onRemove }) => {
  const [uploaded, setUploaded] = useState(false);
  const [preview, setPreview] = useState<string>("");

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // For preview only
      setUploaded(true);
      onUpload(file); // Send file to parent
    }
  };

  const handleRemove = () => {
    setPreview("");
    setUploaded(false);
    onRemove();
  };

  return (
    <div className="w-full h-full relative">
      {!uploaded ? (
        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <span className="text-sm text-gray-500">Click to upload</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
      ) : (
        <div className="w-full h-full relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-cover rounded"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
