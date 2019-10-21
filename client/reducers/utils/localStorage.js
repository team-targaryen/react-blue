const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj, getCircularReplacer()));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};


export const sendToLocalStorage=(nameAndCodeLinkedToComponentId, data, currentComponent, history, lastId) =>{
  if (nameAndCodeLinkedToComponentId) {
    localStorage.setObj('nameAndCodeLinkedToComponentId', nameAndCodeLinkedToComponentId);
  }
  if (data) {
    localStorage.setObj('data', data);
  }
  if (currentComponent) {
    localStorage.setObj('currentComponent', currentComponent);
  }
  if (history) {
    localStorage.setObj('history', history);
  }
  if (lastId) {
    localStorage.setObj('lastId', lastId);
  }
}