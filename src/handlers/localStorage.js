const getLocalStorageNameSpace = namespace => `react-flaggables-${namespace}`;

/**
 * Retrieve items from local storage.
 * @param namespace
 * @returns {*}
 */
const getItems = (namespace) => {
  const ns = getLocalStorageNameSpace(namespace);
  const data = localStorage.getItem(ns);
  if (!data) {
    return [];
  }
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * Function that sets items in local storage.
 * @param namespace<string>
 * @param ids<string[]>
 * @returns {void|boolean}
 */
const setItems = (namespace, ids) => {
  const ns = getLocalStorageNameSpace(namespace);
  try {
    return localStorage.setItem(ns, JSON.stringify(ids));
  } catch (err) {
    console.error(err);
    return false;
  }
};

export {
  setItems,
  getItems,
};
