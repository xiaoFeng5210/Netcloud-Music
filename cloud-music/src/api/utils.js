import { RankTypes } from "./http.js";

export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
};

// 处理数据，找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

export const filterIdx = (name) => {
  for (var key in RankTypes) {
    if (RankTypes[key] === name) return key;
  }
  return null;
};

// 防抖函数封装
export const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timer);
    }, delay);
  };
};

// 处理歌手列表拼接歌手名字
export const getName = (list) => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};
// 歌手种类
export const categoryTypes = [
  {
    name: "华语男",
    key: "1001",
  },
  {
    name: "华语女",
    key: "1002",
  },
  {
    name: "华语组合",
    key: "1003",
  },
  {
    name: "欧美男",
    key: "2001",
  },
  {
    name: "欧美女",
    key: "2002",
  },
  {
    name: "欧美组合",
    key: "2003",
  },
  {
    name: "日本男",
    key: "6001",
  },
  {
    name: "日本女",
    key: "6002",
  },
  {
    name: "日本组合",
    key: "6003",
  },
  {
    name: "韩国男",
    key: "7001",
  },
  {
    name: "韩国女",
    key: "7002",
  },
  {
    name: "韩国组合",
    key: "7003",
  },
  {
    name: "其他男歌手",
    key: "4001",
  },
  {
    name: "其他女歌手",
    key: "4002",
  },
  {
    name: "其他组合",
    key: "4003",
  },
];

// 歌手首字母
export const alphaTypes = [
  {
    key: "A",
    name: "A",
  },
  {
    key: "B",
    name: "B",
  },
  {
    key: "C",
    name: "C",
  },
  {
    key: "D",
    name: "D",
  },
  {
    key: "E",
    name: "E",
  },
  {
    key: "F",
    name: "F",
  },
  {
    key: "G",
    name: "G",
  },
  {
    key: "H",
    name: "H",
  },
  {
    key: "I",
    name: "I",
  },
  {
    key: "J",
    name: "J",
  },
  {
    key: "K",
    name: "K",
  },
  {
    key: "L",
    name: "L",
  },
  {
    key: "M",
    name: "M",
  },
  {
    key: "N",
    name: "N",
  },
  {
    key: "O",
    name: "O",
  },
  {
    key: "P",
    name: "P",
  },
  {
    key: "Q",
    name: "Q",
  },
  {
    key: "R",
    name: "R",
  },
  {
    key: "S",
    name: "S",
  },
  {
    key: "T",
    name: "T",
  },
  {
    key: "U",
    name: "U",
  },
  {
    key: "V",
    name: "V",
  },
  {
    key: "W",
    name: "W",
  },
  {
    key: "X",
    name: "X",
  },
  {
    key: "Y",
    name: "Y",
  },
  {
    key: "Z",
    name: "Z",
  },
];
