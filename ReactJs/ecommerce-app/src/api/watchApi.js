import watchesData from "../data/watches.json";

export const fetchAllWatches = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(watchesData.watches);
    }, 500);
  });
};

export const fetchWatchById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const watch = watchesData.watches.find((w) => w.id === parseInt(id));
      if (watch) {
        resolve(watch);
      } else {
        reject(new Error("Watch not found"));
      }
    }, 500);
  });
};
