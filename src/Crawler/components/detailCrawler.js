const puppeteer = require('puppeteer');
const fs = require('fs');

const detailCrawler = async () => {
  //  打开浏览器并打开去哪儿网移动端页面
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://piao.qunar.com/touch/toNewCityList.htm');
  console.log('go to http://piao.qunar.com/touch/toNewCityList.htm');


  

  //  设置页面成移动端（这里是iphone X），方便click
  await page.setViewport({
    width: 750,
    height: 1624
  });
  console.log('reset viewport');

  //  收集前12个。收集hotCities保存在hotCitiesCN数组中,
  const hotCitiesCN = await page.$$eval('ul.mp-list.mp-tr3 a', (city) => {
    const version1 = Array.prototype.map.call(city, ci => ci.innerHTML) //  querySelectorAll返回的并不是数组，我们要借用数据的map方法，所以用call实现
    const version2 = version1.slice(0, 12)
    return version2
  })
  const hotCitiesCNPY = hotCitiesCN.map((val) => ConvertPinyin(val));
  console.log(`get ${hotCitiesCN.length} cities , start download`)

  //  收集26个字母开头的cities的中文的保存在cities{字母}数组中,又都push进citiesAll数组中
  //  收集26个字母开头的cities的拼音的保存在cities{字母}PY数组中,又都push进citiesPYAll数组中
  const citiesAll = []
  const citiesPYAll = []

  const citiesA = await page.$$eval('a#domestic-A + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesAPY = citiesA.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesA)
  citiesPYAll.push(citiesAPY)

  const citiesB = await page.$$eval('a#domestic-B + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesBPY = citiesB.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesB)
  citiesPYAll.push(citiesBPY)

  const citiesC = await page.$$eval('a#domestic-C + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesCPY = citiesC.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesC)
  citiesPYAll.push(citiesCPY)

  const citiesD = await page.$$eval('a#domestic-D + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesDPY = citiesD.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesD)
  citiesPYAll.push(citiesDPY)

  const citiesE = await page.$$eval('a#domestic-E + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesEPY = citiesE.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesE)
  citiesPYAll.push(citiesEPY)

  const citiesF = await page.$$eval('a#domestic-F + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesFPY = citiesF.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesF)
  citiesPYAll.push(citiesFPY)

  const citiesG = await page.$$eval('a#domestic-G + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesGPY = citiesG.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesG)
  citiesPYAll.push(citiesGPY)

  const citiesH = await page.$$eval('a#domestic-H + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesHPY = citiesH.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesH)
  citiesPYAll.push(citiesHPY)

  const citiesI = await page.$$eval('a#domestic-I + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesIPY = citiesI.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesI)
  citiesPYAll.push(citiesIPY)

  const citiesJ = await page.$$eval('a#domestic-J + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesJPY = citiesJ.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesJ)
  citiesPYAll.push(citiesJPY)

  const citiesK = await page.$$eval('a#domestic-K + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesKPY = citiesK.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesK)
  citiesPYAll.push(citiesKPY)

  const citiesL = await page.$$eval('a#domestic-L + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesLPY = citiesL.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesL)
  citiesPYAll.push(citiesLPY)

  const citiesM = await page.$$eval('a#domestic-M + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesMPY = citiesM.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesM)
  citiesPYAll.push(citiesMPY)

  const citiesN = await page.$$eval('a#domestic-N + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesNPY = citiesN.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesN)
  citiesPYAll.push(citiesNPY)

  const citiesO = await page.$$eval('a#domestic-O + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesOPY = citiesO.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesO)
  citiesPYAll.push(citiesOPY)

  const citiesP = await page.$$eval('a#domestic-P + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesPPY = citiesP.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesP)
  citiesPYAll.push(citiesPPY)

  const citiesQ = await page.$$eval('a#domestic-Q + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesQPY = citiesQ.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesQ)
  citiesPYAll.push(citiesQPY)

  const citiesR = await page.$$eval('a#domestic-R + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesRPY = citiesR.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesR)
  citiesPYAll.push(citiesRPY)

  const citiesS = await page.$$eval('a#domestic-S + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesSPY = citiesS.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesS)
  citiesPYAll.push(citiesSPY)

  const citiesT = await page.$$eval('a#domestic-T + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesTPY = citiesT.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesT)
  citiesPYAll.push(citiesTPY)

  const citiesU = await page.$$eval('a#domestic-U + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesUPY = citiesU.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesU)
  citiesPYAll.push(citiesUPY)

  const citiesV = await page.$$eval('a#domestic-V + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesVPY = citiesV.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesV)
  citiesPYAll.push(citiesVPY)

  const citiesW = await page.$$eval('a#domestic-W + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesWPY = citiesW.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesW)
  citiesPYAll.push(citiesWPY)

  const citiesX = await page.$$eval('a#domestic-X + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesXPY = citiesX.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesX)
  citiesPYAll.push(citiesXPY)

  const citiesY = await page.$$eval('a#domestic-Y + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesYPY = citiesY.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesY)
  citiesPYAll.push(citiesYPY)

  const citiesZ = await page.$$eval('a#domestic-Z + h2 + ul.mp-list a', (city) => {
    return Array.prototype.map.call(city, ci => ci.innerHTML);
  });
  const citiesZPY = citiesZ.map((val) => ConvertPinyin(val));
  citiesAll.push(citiesZ)
  citiesPYAll.push(citiesZPY)
  console.log('finish collecting')
  await browser.close();

  //  生成index的json文件
  const preid = '000'
  var citiesid = 0
  var alphabet = []; //  包含26个字母的数组
  for (var i = 65; i < 91; i++) {
    alphabet.push(String.fromCharCode(i));
  }
  const js = {
    ret: true,
    data: {}
  }
  const List = hotCitiesCN.map((val, index) => {
    var rObj = {};
    rObj.id = preid.concat((index + 1).toString())
    rObj.name = val
    return rObj
  })
  for (var i in List) {
    List[i].spell = hotCitiesCNPY[i]
  }

  const List2 = {}
  alphabet.forEach((val2, index2) => {
    const List3 = citiesAll[index2].map((val, index) => {
      var rObj = {};
      rObj.id = citiesid
      citiesid = citiesid + 1
      rObj.name = val
      rObj.spell = citiesPYAll[index2][index]
      return rObj
    })
    List2[val2] = List3
  })
  
  js.data.hotCities = List
  js.data.cities = List2

  const json = JSON.stringify(js, null, 2)
  console.log('JSON file has benn gengrated')
  fs.writeFile('../result/city.json', json, {
    encoding: 'utf8'
  }, err => {
    if (err) throw err
    console.log('Done')
  })
};

module.exports = detailCrawler
