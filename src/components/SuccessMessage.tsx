import { CheckCircle, X } from "lucide-react";

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, onClose }) => {
  return (
    <div className="flex items-center justify-between w-full bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-600" />
        <span>{message}</span>
      </div>
      <button onClick={onClose}>
        <X className="w-4 h-4 text-green-700" />
      </button>
    </div>
  );
};

export default SuccessMessage;