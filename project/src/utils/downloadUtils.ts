/**
 * Utility functions for file downloads
 */

export interface DownloadOptions {
  filename?: string;
  fallbackUrl?: string;
  trackDownload?: boolean;
}

/**
 * Downloads a file from a given URL
 * @param url - The URL of the file to download
 * @param options - Download options
 */
export const downloadFile = async (url: string, options: DownloadOptions = {}): Promise<void> => {
  const {
    filename,
    fallbackUrl,
    trackDownload = true
  } = options;

  try {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      throw new Error('Download not supported in server environment');
    }

    // Create a temporary anchor element
    const link = document.createElement('a');
    
    // Set the href to the file URL
    link.href = url;
    
    // Set the download attribute with custom filename if provided
    if (filename) {
      link.download = filename;
    }
    
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
    
    // Track download event if enabled
    if (trackDownload) {
      console.log(`File download initiated: ${url}`);
      // You can integrate with analytics here
      // Example: gtag('event', 'download', { file_name: filename });
    }
    
  } catch (error) {
    console.error('Error downloading file:', error);
    
    // Fallback: Open in new tab if download fails
    const fallbackTarget = fallbackUrl || url;
    try {
      window.open(fallbackTarget, '_blank');
      console.log(`Fallback: Opening file in new tab: ${fallbackTarget}`);
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      throw new Error('Unable to download file. Please try again.');
    }
  }
};

/**
 * Downloads the CV/Resume file
 */
export const downloadCV = (): Promise<void> => {
  return downloadFile('/resume vaishu.docx', {
    filename: 'Vaishnavi_Gaikwad_Resume.docx',
    trackDownload: true
  });
};

/**
 * Checks if the browser supports file downloads
 */
export const isDownloadSupported = (): boolean => {
  return typeof window !== 'undefined' && 'download' in document.createElement('a');
};

/**
 * Gets the file extension from a filename or URL
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

/**
 * Formats file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};