/**
 * @description localStorage的方法简略封装
 */
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

/**
 * @description sessionStorage的方法简略封装
 */
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

/**
 * @description cookie的方法简略封装
 */
export const cookies = {
  set: function (name: string, value: any, expiredays: number) {
    const exdate = new Date();
    exdate.setDate(exdate.getDate() + (expiredays || 30));
    document.cookie = name + '=' + encodeURI(value) + ';path=/;expires=' + exdate.toUTCString();
  },
  get: function (name: string) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    const arr = document.cookie.match(reg);
    if (arr) {
      return decodeURI(arr[2]);
    } else {
      return null;
    }
  },
  del: function (name: string) {
    this.set(name, '', -1);
  },
};

import CryptoJS from 'crypto-js';
// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse("3333e6e143439161");
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse("e3bbe7e3ba84431a");

type TConfig = {
  type: string;
  expire:number;
  isEncrypt: boolean;
}
// 类型 window.localStorage,window.sessionStorage,
const defaultConfig: TConfig = {
    type: 'localStorage', // 本地存储类型 sessionStorage
    expire: 1, // 过期时间 单位：秒
    isEncrypt: true // 默认加密 为了调试方便, 开发过程中可以不加密
}
export class SecretStorage {
  public config: TConfig = defaultConfig;
  private SECRET_KEY: string = SECRET_KEY;
  private SECRET_IV: string = SECRET_IV;
  public _window: any = window;

/**
 * 加密方法
 * @param data
 * @returns {string}
 */
  public encrypt(data: string)  {
    if (typeof data === "object") {
        try {
            data = JSON.stringify(data);
        } catch (error) {
            console.log("encrypt error:", error);
        }
    }
    const dataHex = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(dataHex, this.SECRET_KEY, {
        iv: this.SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
  }

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
  public decrypt (data: string) {
    const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
    const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    const decrypt = CryptoJS.AES.decrypt(str, this.SECRET_KEY, {
        iv: this.SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
 }

  // 删除 removeStorage
  public removeStorage(key: string) {
    const { type } = this.config;
    this._window[type].removeItem((key));
  }

  // 清空 clearStorage
  public clearStorage() {
    const { type } = this.config;
    this._window[type].clear();
  }

  // 获取全部 getAllStorage
  public getStorageAll() {
    const { type } = this.config;
    const len = this._window[type].length // 获取长度
    const arr = [] // 定义数据集
    for (let i = 0; i < len; i++) {
        // 获取key 索引从0开始
        const getKey = this._window[type].key(i)
        // 获取key对应的值
        const getVal = this._window[type].getItem(getKey)
        // 放进数组
        arr[i] = { key: getKey, val: getVal, }
    }
    return arr
  }

  // 设置 setStorage
  public setStorage(key: string, value: any, expire = 0) {
    const {type , expire: defaultExpire, isEncrypt} = this.config;
    if (value === '' || value === null || value === undefined) {
        value = null;
    }

    if (isNaN(expire) || expire < 0) throw new Error("Expire must be a number");
 
    const data = {
        value: value, // 存储值
        time: Date.now(), // 存值时间戳
        expire: (expire || defaultExpire) * 1000 // 过期时间
    }

    const encryptString = isEncrypt
    ? this.encrypt(JSON.stringify(data))
    : JSON.stringify(data);

    this._window[type].setItem((key), encryptString);
  }

  // 获取 getStorage
  public getStorage(key: string) {
    const { type, isEncrypt } = this.config;
    // key 不存在判断
    if (!this._window[type].getItem(key) || JSON.stringify(this._window[type].getItem(key)) === 'null') {
        return null;
    }

    // 优化 持续使用中续期
    const storage = isEncrypt
    ? JSON.parse(this.decrypt(this._window[type].getItem(key)))
    : JSON.parse(this._window[type].getItem(key));

    const nowTime = Date.now();

    // 过期删除
    if (storage.expire && this.config.expire * 6000 < (nowTime - storage.time)) {
        this.removeStorage(key);
        return null;
    } else {
        // 未过期期间被调用 则自动续期 进行保活
        this.setStorage((key), storage.value);
        return storage.value;
    }
  }

  // 是否存在 hasStorage
  public hasStorage (key: string) {
    const arr = this.getStorageAll().filter((item) => {
        return item.key === key;
    })
    return !!arr.length;
  }

  // 获取所有key
  public getStorageKeys () {
    const items = this.getStorageAll()
    const keys = []
    for (let index = 0; index < items.length; index++) {
        keys.push(items[index].key)
    }
    return keys
  }

  // 根据索引获取key
  public getStorageForIndex (index: number)  {
    const { type } = this.config;
    return this._window[type].key(index)
  }

  // 获取localStorage长度
  public getStorageLength ()  {
    const { type } = this.config;
    return this._window[type].length
  }

}
