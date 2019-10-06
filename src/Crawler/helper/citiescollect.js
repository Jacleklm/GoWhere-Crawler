const puppeteer = require('puppeteer');
const fs = require('fs');
const { ConvertPinyin } = require('../helper/ConvertPinyin')
const { code } = require('../helper/codegenerate')

const citiescollect = (async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://piao.qunar.com/touch/toNewCityList.htm');
  
  const citiesA = await page.$$eval('a#domestic-A + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesAPY = citiesA.map((val) => ConvertPinyin(val));
  return {
    citiesA: citiesA,
    citiesAPY: citiesAPY
  }
})()

module.exports = {
  citiescollect: citiescollect
} 
