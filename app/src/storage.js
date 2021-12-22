const get = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const has = (key) => Boolean(localStorage.getItem(key));

const push = (key, value) => {
  const v = get(key);
  if (!v) {
    set(key, [value]);
  } else {
    v.push(value);
    set(key, v);
  }
};

export default {
  get,
  set,
  has,
  push,
};
