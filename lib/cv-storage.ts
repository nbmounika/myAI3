// CV Storage utility for localStorage
export interface CVData {
  id: string;
  fileName: string;
  fileData: string; // base64 encoded
  fileType: string;
  uploadedAt: number;
  conversationId: string;
}

const CV_STORAGE_KEY = 'interview-cvs';

export const cvStorage = {
  saveCVData: (cvData: CVData) => {
    if (typeof window === 'undefined') return;
    try {
      const existing = JSON.parse(localStorage.getItem(CV_STORAGE_KEY) || '[]') as CVData[];
      const updated = [...existing, cvData];
      localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save CV data:', error);
    }
  },

  getAllCVs: (): CVData[] => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(CV_STORAGE_KEY) || '[]') as CVData[];
    } catch (error) {
      console.error('Failed to load CVs:', error);
      return [];
    }
  },

  getCVsByConversation: (conversationId: string): CVData[] => {
    if (typeof window === 'undefined') return [];
    try {
      const allCVs = JSON.parse(localStorage.getItem(CV_STORAGE_KEY) || '[]') as CVData[];
      return allCVs.filter(cv => cv.conversationId === conversationId);
    } catch (error) {
      console.error('Failed to get CVs:', error);
      return [];
    }
  },

  fileToBase64: (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]); // Extract base64 part
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },
};
