import { useCallback } from 'react';

interface UseDownloadCVReturn {
  downloadCV: () => void;
  isSupported: boolean;
}

export const useDownloadCV = (): UseDownloadCVReturn => {
  const downloadCV = useCallback(() => {
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') {
        console.warn('Download not supported in server environment');
        return;
      }

      // Create a temporary anchor element
      const link = document.createElement('a');
      
      // Set the href to the resume file in the public folder
      link.href = '/resume vaishu.docx';
      
      // Set the download attribute with a custom filename
      link.download = 'Vaishnavi_Gaikwad_Resume.docx';
      
      // Set additional attributes for better compatibility
      link.style.display = 'none';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      
      // Clean up after a short delay
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 100);
      
      // Optional: Track download event (for analytics)
      console.log('CV download initiated successfully');
      
      // Optional: Show success message to user
      // You can integrate with a toast notification system here
      
    } catch (error) {
      console.error('Error downloading CV:', error);
      
      // Fallback: Open in new tab if download fails
      try {
        window.open('/resume vaishu.docx', '_blank');
        console.log('Fallback: Opening CV in new tab');
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        alert('Unable to download CV. Please try again or contact support.');
      }
    }
  }, []);

  // Check if download is supported
  const isSupported = typeof window !== 'undefined' && 'download' in document.createElement('a');

  return {
    downloadCV,
    isSupported
  };
};