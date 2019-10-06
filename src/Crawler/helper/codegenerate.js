//  用来生成查找26个字母的城市的代码的插件

//  包含26个字母的数组
var alphabet = [];
for (var i = 65; i < 91; i++) {
  alphabet.push(String.fromCharCode(i));
}

//  生成代码
//  收集26个字母开头的cities的中文的保存在cities{字母}数组中
//  收集26个字母开头的cities的拼音的保存在cities{字母}PY数组中
const codegenerate = alphabet.map((val) => {
  return `
    const cities${val} = await page.$$eval('a#domestic-${val} + h2 + ul.mp-list a', (city) => {
      return Array.prototype.map.call(city, ci => ci.innerHTML);
    });
    const cities${val}PY = cities${val}.map((val) => ConvertPinyin(val));
    citiesAll.push(cities${val})
    citiesPYAll.push(cities${val}PY)
    `
})
//  组装代码
code = codegenerate.join('')

console.log(code)

module.exports = {
  code: code
}