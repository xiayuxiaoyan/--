const path = require('path');
const fs = require('fs');

const FileOption = {
  encoding: 'utf8'
};
// for 1.x
// const defaultVars = require('antd-mobile/lib/style/themes/default');
// for 2.x
const themePath = path.resolve(require.resolve('antd-mobile'), '../style/themes/default.native.js');


// 提前变更文件的品牌变量，防止js引入时，到处的对象内属性值已经被解析为原始品牌变量值
let themeFileStr = fs.readFileSync(themePath, FileOption);
let reg = /('|")#\w*('|");/g;
function handleReplace(str) {
  let flag = str;
  if (str && str === "'#108ee9';") {
    flag = "'#5166B9';";
  }
  return flag;
}
const newFile = themeFileStr.replace(reg, handleReplace);
fs.writeFileSync(
  themePath,
  newFile,
  FileOption
);

const defaultVars = require('antd-mobile/lib/style/themes/default.native');
const customVars = require('../theme');

const themeVars = Object.assign({}, defaultVars, customVars);

if (fs.statSync(themePath).isFile()) {
  fs.writeFileSync(
    themePath,
    `var brandPrimary = "#5166B9"; var brandPrimaryTap = "#1284d6";module.exports = ${JSON.stringify(themeVars)}`
  );
}
