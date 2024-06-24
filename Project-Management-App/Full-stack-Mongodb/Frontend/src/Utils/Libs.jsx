
export const getDataFromStorage = (id) => {
    return localStorage.getItem(id);
  };
  

  export const setDataToStorage = (id, data) => {
    localStorage.setItem(id, data);
  };
  

  export const removeDataFromStorage = (id) => {
    localStorage.removeItem(id);
  };
  