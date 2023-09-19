import brandData from "../config/brands.json";
import _ from "lodash";

export function getNowFormatDate(date = new Date()) {
  // let date = new Date();
  let seperator1 = ".";
  let seperator2 = ":";
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  let hours = date.getHours();
  if (hours >= 0 && hours <= 9) {
    hours = "0" + hours;
  }
  let minutes = date.getMinutes();
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  let seconds = date.getSeconds();
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }
  let currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    strDate +
    " " +
    hours +
    seperator2 +
    minutes +
    seperator2 +
    seconds;
  return currentdate;
}

export function getLogo(param = "marklab", mode = false) {
  const file = brandData[0];
  const brand = mode ? param.toLowerCase() + "_light" : param.toLowerCase();
  const fileName = _.get(file, brand)
    ? _.get(file, brand)
    : _.get(file, "marklab");
  return fileName;
}
