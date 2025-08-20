// hooks/useFileValidation.ts
import { useState } from 'react';

export const useFileValidation = (maxSizeMB: number = 5) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateFile = (file: File | null, fieldName: string): boolean => {
    if (!file) {
      setErrors(prev => ({ ...prev, [fieldName]: `${fieldName} is required` }));
      return false;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, [fieldName]: "Invalid file type. Please upload PDF, JPG, or PNG files." }));
      return false;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [fieldName]: `File size must not exceed ${maxSizeMB}MB` }));
      return false;
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });

    return true;
  };

  const clearError = (fieldName: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  };

  return { errors, validateFile, clearError };
};