/*
  @Author: 戴伟
  @Date: 2023-04-15 10:16:22
  @FilePath: src\utils\tools\index.ts
  @LastEditTime: ''
  @LastEditors: ''
  @Description:
        do.....
*/


// 防抖
// 触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
// 每次触发事件时都取消之前的延时调用方法
export function debounce(fn:Function, time = 500) {
    let timeout:any = null; // 创建一个标记用来存放定时器的返回值
    return function () {
        clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(() => {
            // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
            // eslint-disable-next-line prefer-rest-params
            fn.apply(this, arguments);
        }, time);
    };
}

//函数节流
// 高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
// 每次触发事件时都判断当前是否有等待执行的延时函数
export function throttle(fn:Function, time = 500) {
    let canRun = true; // 通过闭包保存一个标记
    return function () {
        if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
        canRun = false; // 立即设置为false
        setTimeout(() => {
            // 将外部传入的函数的执行放在setTimeout中
            // eslint-disable-next-line prefer-rest-params
            fn.apply(this, arguments);
            // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
            canRun = true;
        }, time);
    };
}



//生成从minNum到maxNum的随机数
export const randomNum = function (minNum: number, maxNum?: number) {
    // console.log(arguments)
    const _minNum = minNum;
    let _maxNum = maxNum;
    const _len = arguments.length;

    switch (_len) {
        case 1:
            return parseInt(String(Math.random() * _minNum + 1), 10);
            break;
        case 2:
            _maxNum = _maxNum || 0;
            return parseInt(String(Math.random() * (_maxNum - _minNum + 1) + _minNum), 10);
            break;
        default:
            return 0;
            break;
    }
};

//  {key:'value'} => {value:'key'}
export const swapKeysAndValues = function (obj: object) {
    // 👇️ [{color: 'blue'}, {fruit: 'apple'}]
    const swapped = Object.entries(obj).map(
        ([key, value]) => ({[value]: key})
    );
    return Object.assign({}, ...swapped);
}


export const numToChines = (num:(number|string)) => {
    const changeNum: string[] = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const unit: string[] = ["", "十", "百", "千", "万"];
    num = parseInt(String(num));
    const getWan = (temp: (number)) => {
        const _temp = temp.toString()
        const strArr:number[] = _temp.split("").reverse().map(item=>Number(item))
        let newNum = "";
        for (let i = 0; i < strArr.length; i++) {
            newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
        }
        return newNum;
    }
    const overWan:number = Math.floor(num / 10000);
    let noWan: (number|string) = num % 10000;
    if (noWan.toString().length < 4) {
        noWan = "0" + noWan;
    }
    return overWan ? getWan(overWan) + "万" + getWan(Number(noWan)) : getWan(num);
}


export const isUndefined = function (data: any) {
    if (typeof data === 'undefined') {
        return true;
    }
    return false;
}

export const isFunction = function (data: any) {
    if (typeof data === 'function') {
        return true;
    }
    return false;
}

export const isNull = function (data: any) {
    if (data === null) {
        return true;
    }
    return false;
}

export const isNumber = function (data: any) {
    if (typeof data === 'number') {
        return true;
    }
    return false;
}

export const isBoolean = function (data: any) {
    if (typeof data === 'boolean') {
        return true;
    }
    return false;
}

export const isString = function (data: any) {
    if (typeof data === 'string') {
        return true;
    }
    return false;
}


export const isArray = function (data: any) {
    if (Array.isArray(data)) {
        return true;
    }
    return false;
}

export const isObject = function (data: any) {
    if (Object.prototype.toString.call(data) === '[object Object]') {
        return true;
    }
    return false;
}


export const isEmpty = function (data?: any) {
    let _isEmpty = false;
    if (typeof data === "undefined" || data === null || data === "") {
        _isEmpty = true;
    }

    if (isObject(data)) {
        if (Object.keys(data)?.length == 0) {
            _isEmpty = true
        }
    }
    if (isArray(data)) {
        if (data?.length == 0) {
            _isEmpty = true
        }
    }


    return _isEmpty
}
