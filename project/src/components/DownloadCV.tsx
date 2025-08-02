import React from 'react';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface DownloadCVProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const DownloadCV: React.FC<DownloadCVProps> = ({ 
  className = '', 
  variant = 'primary',
  size = 'md'
}) => {
  const handleDownloadCV = () => {
    // Create a simple download link and click it
    const link = document.createElement('a');
    link.href = '/resume%20vaishu.docx';
    link.download = 'Vaishnavi_Gaikwad_Resume.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Define button styles
  const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-indigo-500",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 focus:ring-gray-500",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring-indigo-500"
  };
  
  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const iconSizes = {
    sm: 16,
    md: 18,
    lg: 20
  };

  return (
    <motion.button
      onClick={handleDownloadCV}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      type="button"
    >
      <Download size={iconSizes[size]} />
      Download CV
    </motion.button>
  );
};

export default DownloadCV;