import { fcurr, fdate } from "./formating";
import { trans } from "./transcation";
import _ from "lodash";

const helper = {
  curr: fcurr,
  date: fdate,
  trans: trans,
  data: {
    ommit: _.omit,
  },

  getExt,
  getFileName,
  getFileIcon,
  validEmail,
  toPascalCase,
  groupByKey,
  groupByKeyToArr,
  containsLetter,
  colMerged,
};

export default helper;

function getFileIcon(word) {
  if (word.includes(".pdf")) return "icon pdf.svg";
  if (word.includes(".txt")) return "icon txt.svg";
  if (word.includes(".ppt")) return "icon ppt.svg";
  if (word.includes(".xls") || word.includes(".csv")) return "icon xls.svg";
  if (word.includes(".doc")) return "icon xls.svg";
  return "icon image.svg";
}

function getExt(word) {
  return word.substr(word.lastIndexOf("."));
}

function getFileName(word) {
  return word.substr(0, word.lastIndexOf("."));
}

function validEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function toPascalCase(string) {
  if (!string) return null;
  return `${string}`
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(new RegExp(/\s+(.)(\w*)/, "g"), ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}

function groupByKey(array, key) {
  try {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
    }, {});
  } catch (error) {}
}

function groupByKeyToArr(array, key) {
  let result = [];

  array?.map((d) => {
    if (!d) return;
    let index = result.findIndex((dx) => dx.key == d[key]);
    if (index < 0)
      result.push({
        key: d[key],
        data: [d],
      });
    else {
      result[index].data.push(d);
    }
  });

  return result;
}

function containsLetter(inputString) {
  return /[a-zA-Z]/.test(inputString);
}

function colMerged(arr) {
  return Object.values(
    arr.reduce((acc, obj) => {
      let key = `${obj.row}_${obj.col}`;
      if (!acc[key]) {
        acc[key] = { ...obj };
      } else {
        acc[key].str += obj.str;
      }
      return acc;
    }, {})
  );
}
