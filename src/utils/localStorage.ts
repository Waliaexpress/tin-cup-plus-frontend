export const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tin-cup-token');
    }
    return null;
  };
  