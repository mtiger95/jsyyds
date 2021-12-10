export const localStore = {
  getItem: function (key: string) {
    const result = window.localStorage.getItem(key) ?? '';
    return result?.length > 0 ? JSON.parse(result) : result;
  },
  setItem: function (key: string, data: any) {
    const d = typeof data === 'object' ? JSON.stringify(data) : data;
    window.localStorage.setItem(key, d);
  },
  removeItem: function (key: string) {
    window.localStorage.removeItem(key);
  },
  clear: function () {
    window.localStorage.clear();
  },
};

export const sessionStore = {
  getItem: function (key: string) {
    const result = window.sessionStorage.getItem(key) ?? '';
    return result?.length > 0 ? JSON.parse(result) : result;
  },
  setItem: function (key: string, data: any) {
    const d = typeof data === 'object' ? JSON.stringify(data) : data;
    window.sessionStorage.setItem(key, d);
  },
  removeItem: function (key: string) {
    window.sessionStorage.removeItem(key);
  },
  clear: function () {
    window.sessionStorage.clear();
  },
};

export const cookies = {
  set: function (name, value, expiredays) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + (expiredays || 30));
    document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exdate.toUTCString();
  },
  get: function (name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const arr = document.cookie.match(reg);
    if (arr) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  },
  del: function (name) {
    this.set(name, '', -1);
  },
};
