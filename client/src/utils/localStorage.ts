export const setItem = (key: string, value: unknown) => {
  try {
    const data = typeof value === "string" ? value : JSON.stringify(value);
    window.localStorage.setItem(key, data);
  } catch (error) {
    console.log(error);
  }
};

export const getItem = (key: string) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export const logOutUser = () => {
  window.localStorage.clear();
};
