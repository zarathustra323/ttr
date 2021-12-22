const get = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const getAsArray = (key) => {
  const v = get(key);
  return Array.isArray(v) ? v : [];
};

const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const has = (key) => Boolean(localStorage.getItem(key));

const push = (key, value) => {
  const v = getAsArray(key);
  v.push(value);
  set(key, v);
};

const clear = () => localStorage.clear();

export default {
  get,
  getAsArray,
  set,
  has,
  push,
  clear,
};
